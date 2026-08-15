'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';

export type TechItem = {
  name: string;
  category: 'languages' | 'frameworks' | 'systems' | 'ai' | 'creative';
  context: string;
};

interface TechStackPhysicsProps {
  items: TechItem[];
  onHoverItem: (item: TechItem | null) => void;
}

export default function TechStackPhysics({ items, onHoverItem }: TechStackPhysicsProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  
  const itemMapRef = useRef<Map<number, TechItem>>(new Map());

  useEffect(() => {
    if (!sceneRef.current) return;
    const currentScene = sceneRef.current;
    const width = currentScene.clientWidth;
    const height = 600; 

    // 1. Setup Engine & Gravity
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    // Premium, floaty low-gravity feel
    engine.gravity.y = 0.15;

    // 2. Setup Canvas Renderer
    const render = Matter.Render.create({
      element: currentScene,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio,
      }
    });
    renderRef.current = render;

    // 3. Create Walls, Floor, and Invisible Shelves
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      friction: 0.5,
      restitution: 0.2 
    };
    
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -1000, width * 2, 100, wallOptions); 

    // Create 3 invisible static shelves to create vertical distribution
    const shelf1 = Matter.Bodies.rectangle(width * 0.25, height * 0.45, width * 0.25, 20, wallOptions);
    const shelf2 = Matter.Bodies.rectangle(width * 0.75, height * 0.35, width * 0.25, 20, wallOptions);
    const shelf3 = Matter.Bodies.rectangle(width * 0.5, height * 0.75, width * 0.4, 20, wallOptions);

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ceiling, shelf1, shelf2, shelf3]);

    // 4. Create Tech Pills
    const bodies: Matter.Body[] = [];
    
    // Shuffle items so they don't fall in the same order
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);

    shuffledItems.forEach((item, index) => {
      // Stagger start positions across the width and high above
      const x = (width * 0.1) + (Math.random() * (width * 0.8));
      const y = -100 - (index * 80); 
      
      const textWidth = item.name.length * 8 + 60; 
      const pillWidth = Math.max(130, textWidth);
      const pillHeight = 44;

      const body = Matter.Bodies.rectangle(x, y, pillWidth, pillHeight, {
        restitution: 0.4, // Slight bounce
        friction: 0.05,
        frictionAir: 0.015, // Air resistance adds to the premium feel
        chamfer: { radius: pillHeight / 2 }, // Rounded collision box
        render: {
          visible: false // We will custom draw it in afterRender
        }
      });
      
      itemMapRef.current.set(body.id, item);
      bodies.push(body);
    });

    Matter.Composite.add(engine.world, bodies);

    // 5. Mouse Interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false }
      }
    });
    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;
    
    // Subtle Cursor Management
    Matter.Events.on(mouseConstraint, 'mousemove', (event) => {
      const found = Matter.Query.point(bodies, event.mouse.position);
      if (found.length > 0) {
        document.body.style.cursor = 'grab';
        const item = itemMapRef.current.get(found[0].id);
        if (item) onHoverItem(item);
      } else {
        document.body.style.cursor = 'crosshair';
        onHoverItem(null);
      }
    });

    Matter.Events.on(mouseConstraint, 'mousedown', () => {
      const found = Matter.Query.point(bodies, mouse.position);
      if (found.length > 0) {
        document.body.style.cursor = 'grabbing';
      }
    });
    
    Matter.Events.on(mouseConstraint, 'mouseup', () => {
      document.body.style.cursor = 'crosshair';
    });

    // 6. Custom HD Renderer
    Matter.Events.on(render, 'afterRender', () => {
      const context = render.context;
      
      bodies.forEach((body) => {
        const item = itemMapRef.current.get(body.id);
        if (!item) return;

        const isCreative = item.category === 'creative';
        const isAI = item.category === 'ai';
        const accentColor = isCreative ? '#E8854A' : isAI ? '#F59E0B' : '#22D3AE';
        const isHovered = document.body.style.cursor === 'grab' || document.body.style.cursor === 'grabbing'; // Rough hover check, better to track specific body
        
        const width = body.bounds.max.x - body.bounds.min.x;
        const height = body.bounds.max.y - body.bounds.min.y;

        context.save();
        context.translate(body.position.x, body.position.y);
        context.rotate(body.angle);

        // Draw Pill Background
        context.beginPath();
        context.roundRect(-width / 2, -height / 2, width, height, height / 2);
        
        // Premium glassmorphism / dark aesthetic (Brighter to contrast background)
        context.fillStyle = 'rgba(25, 33, 44, 0.95)';
        context.fill();

        // Glowing Border (Fully opaque for visibility)
        context.lineWidth = 1;
        context.strokeStyle = accentColor; 
        context.stroke();

        // Draw Indicator Dot
        context.beginPath();
        context.arc(-width / 2 + 18, 0, 3.5, 0, 2 * Math.PI);
        context.fillStyle = accentColor;
        // Dot Glow
        context.shadowColor = accentColor;
        context.shadowBlur = 8;
        context.fill();
        context.shadowBlur = 0; // Reset shadow for text

        // Draw Text
        context.font = '500 12px "JetBrains Mono", monospace';
        context.fillStyle = 'rgba(237, 234, 227, 0.9)'; // Text color
        context.textAlign = 'left';
        context.textBaseline = 'middle';
        context.fillText(item.name, -width / 2 + 32, 1);
        
        context.restore();
      });
    });

    // 7. Run Engine
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    // Resize Handler
    const handleResize = () => {
      if (!currentScene) return;
      const newWidth = currentScene.clientWidth;
      render.canvas.width = newWidth;
      render.options.width = newWidth;
      
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 50 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: height / 2 });
      
      // Update shelves on resize to keep them proportional
      Matter.Body.setPosition(shelf1, { x: newWidth * 0.25, y: height * 0.45 });
      Matter.Body.setPosition(shelf2, { x: newWidth * 0.75, y: height * 0.35 });
      Matter.Body.setPosition(shelf3, { x: newWidth * 0.5, y: height * 0.75 });
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
      render.canvas = null as any;
      render.context = null as any;
      render.textures = {};
    };
  }, [items, onHoverItem]);

  return (
    <div className="relative w-full rounded-2xl border border-[rgba(237,234,227,0.06)] bg-[#07090C] shadow-2xl overflow-hidden group">
      {/* Subtle Architectural Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(237,234,227,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(237,234,227,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div 
        ref={sceneRef} 
        className="w-full h-[600px] cursor-crosshair relative z-10"
      />
      
      {/* Refined Context / Instructions (Matches editorial aesthetic) */}
      <div className="absolute top-6 right-8 pointer-events-none z-20 flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[3px] text-[#EDEAE3]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3AE] animate-pulse" />
          Interactive Stack
        </div>
        <div className="mt-1 font-mono text-[8px] text-[#EDEAE3]/50">
          PHYSICS ENGINE ONLINE · GRAB & THROW
        </div>
      </div>
      
      {/* Left Axis Label */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 -rotate-90 origin-center pointer-events-none z-20 opacity-20 font-mono text-[8px] tracking-[4px] text-[#EDEAE3] uppercase">
        Y-AXIS · GRAVITY 0.15
      </div>
    </div>
  );
}
