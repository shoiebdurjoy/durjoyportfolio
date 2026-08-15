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
  
  // Create a mapping from body id to item for hover events
  const itemMapRef = useRef<Map<number, TechItem>>(new Map());

  useEffect(() => {
    if (!sceneRef.current) return;
    const currentScene = sceneRef.current;

    // 1. Setup Engine
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    // Slight gravity
    engine.gravity.y = 0.5;

    // 2. Setup Renderer (Optional: we can render natively via Canvas for massive performance)
    // We will use the built-in canvas renderer but style the bodies to look like our pills!
    const width = currentScene.clientWidth;
    const height = 500; // Fixed canvas height

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

    // 3. Create Walls & Floor
    const wallOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -1000, width * 2, 100, wallOptions); // Tall ceiling for falling

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // 4. Create Tech Pills
    const bodies: Matter.Body[] = [];
    
    items.forEach((item, index) => {
      // Calculate random start position above the viewport
      const x = Math.random() * (width - 100) + 50;
      const y = -100 - (index * 60); // Stagger drop
      
      const isCreative = item.category === 'creative';
      const isAI = item.category === 'ai';
      
      // Determine pill dimensions based on text length
      const textWidth = item.name.length * 10 + 40; // Approx
      const pillWidth = Math.max(120, textWidth);
      const pillHeight = 44;

      const body = Matter.Bodies.rectangle(x, y, pillWidth, pillHeight, {
        restitution: 0.6, // Bounciness
        friction: 0.1,
        render: {
          fillStyle: '#0D1117',
          strokeStyle: isCreative ? '#E8854A' : isAI ? '#F59E0B' : '#22D3AE',
          lineWidth: 2,
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
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    // Keep mouse in sync with render scale
    render.mouse = mouse;
    
    // Hover Events
    Matter.Events.on(mouseConstraint, 'mousemove', (event) => {
      const found = Matter.Query.point(bodies, event.mouse.position);
      if (found.length > 0) {
        document.body.style.cursor = 'grab';
        const item = itemMapRef.current.get(found[0].id);
        if (item) onHoverItem(item);
      } else {
        document.body.style.cursor = 'default';
        onHoverItem(null);
      }
    });

    Matter.Events.on(mouseConstraint, 'mousedown', () => {
      document.body.style.cursor = 'grabbing';
    });
    Matter.Events.on(mouseConstraint, 'mouseup', () => {
      document.body.style.cursor = 'default';
    });

    // Custom Render Loop to draw Text over Bodies
    Matter.Events.on(render, 'afterRender', () => {
      const context = render.context;
      bodies.forEach((body) => {
        const item = itemMapRef.current.get(body.id);
        if (!item) return;
        
        context.save();
        context.translate(body.position.x, body.position.y);
        context.rotate(body.angle);
        
        // Draw Text
        context.font = '500 13px "JetBrains Mono", monospace';
        context.fillStyle = '#EDEAE3';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(item.name, 0, 0);
        
        context.restore();
      });
    });

    // 6. Run Engine
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    // Resize Handler
    const handleResize = () => {
      const newWidth = currentScene.clientWidth;
      render.canvas.width = newWidth;
      render.options.width = newWidth;
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 50 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: height / 2 });
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -1000 });
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
    <div className="relative w-full rounded-2xl overflow-hidden border border-[rgba(237,234,227,0.08)] bg-[#07090C] shadow-2xl">
      <div 
        ref={sceneRef} 
        className="w-full h-[500px] cursor-crosshair"
      />
      {/* Overlay Instructions */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="px-4 py-1.5 rounded-full bg-[#0D1117]/80 backdrop-blur border border-[#F59E0B]/30 font-mono text-[9px] uppercase tracking-[3px] text-[#F59E0B]"
        >
          PHYSICS ENGINE ACTIVE // DRAG TO THROW
        </motion.div>
      </div>
    </div>
  );
}
