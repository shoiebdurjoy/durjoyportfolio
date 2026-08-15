'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export type TechItem = {
  name: string;
  category: 'languages' | 'frameworks' | 'systems' | 'ai' | 'creative';
  context: string;
};

interface TechStackPhysicsProps {
  items: TechItem[];
  onHoverItem: (item: TechItem | null) => void;
  isVisible?: boolean;
}

export default function TechStackPhysics({ items, onHoverItem, isVisible }: TechStackPhysicsProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  
  const itemMapRef = useRef<Map<number, { item: TechItem, width: number, height: number }>>(new Map());
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    if (!sceneRef.current) return;
    const currentScene = sceneRef.current;
    
    // Ensure we have a valid width to prevent 0,0 squishing
    const width = currentScene.clientWidth > 0 ? currentScene.clientWidth : (typeof window !== 'undefined' ? window.innerWidth - 64 : 1000);
    const height = 600; 

    // 1. Setup Engine & Gravity
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    engine.gravity.y = 0.5;

    // 2. Setup Canvas Renderer
    const render = Matter.Render.create({
      element: currentScene,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      }
    });
    renderRef.current = render;

    // 3. Create Walls & Floor
    const CATEGORY_PILL = 0x0001;
    const CATEGORY_WALL = 0x0002;

    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      friction: 0.5,
      restitution: 0.2,
      collisionFilter: {
        category: CATEGORY_WALL
      }
    };
    
    const ground = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -5000, width * 2, 100, wallOptions); 

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // 4. Create Tech Pills (Structured Brick-Like Initial State, Suspended in Sky)
    const bodies: Matter.Body[] = [];
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);

    const pillData = shuffledItems.map(item => {
      const textWidth = item.name.length * 8 + 40; 
      const pillWidth = Math.max(120, textWidth);
      return { item, pillWidth, pillHeight: 44 };
    });

    const maxRowWidth = width * 0.85; 
    const gap = 4; 
    const rows: (typeof pillData)[] = [];
    let currentRow: typeof pillData = [];
    let currentRowWidth = 0;

    pillData.forEach(data => {
      if (currentRowWidth + data.pillWidth + gap > maxRowWidth && currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = [];
        currentRowWidth = 0;
      }
      currentRow.push(data);
      currentRowWidth += data.pillWidth + gap;
    });
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    let targetY = height - 25; 

    rows.reverse().forEach((row) => {
      const rowTotalWidth = row.reduce((sum, data) => sum + data.pillWidth, 0) + (row.length - 1) * gap;
      let currentX = (width - rowTotalWidth) / 2; 

      row.forEach((data) => {
        const x = currentX + (data.pillWidth / 2);
        // Suspend high in the sky directly above their target position
        const y = targetY - 1200; 

        const isCreative = data.item.category === 'creative';
        const isAI = data.item.category === 'ai';
        const accentColor = isCreative ? '#E8854A' : isAI ? '#F59E0B' : '#22D3AE';

        const body = Matter.Bodies.rectangle(x, y, data.pillWidth, data.pillHeight, {
          restitution: 0.6,
          friction: 0.1,
          isStatic: true, // IMPORTANT: Suspended mid-air
          chamfer: { radius: data.pillHeight / 2 },
          collisionFilter: {
            category: CATEGORY_PILL
          },
          render: {
            fillStyle: '#111822',
            strokeStyle: accentColor,
            lineWidth: 1
          }
        });
        
        itemMapRef.current.set(body.id, { item: data.item, width: data.pillWidth, height: data.pillHeight });
        bodies.push(body);

        currentX += data.pillWidth + gap;
      });

      targetY -= (44 + gap);
    });

    // Add them immediately, they are static so they will just float unseen
    Matter.Composite.add(engine.world, bodies);

    // 5. Mouse Interaction
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, 
        render: { visible: false }
      },
      collisionFilter: {
        mask: CATEGORY_PILL 
      }
    });
    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;
    
    Matter.Events.on(mouseConstraint, 'mousemove', (event) => {
      const found = Matter.Query.point(bodies, event.mouse.position);
      if (found.length > 0) {
        document.body.style.cursor = 'grab';
        const data = itemMapRef.current.get(found[0].id);
        if (data) onHoverItem(data.item);
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
        const data = itemMapRef.current.get(body.id);
        if (!data) return;

        const { item, width } = data;
        const isCreative = item.category === 'creative';
        const isAI = item.category === 'ai';
        const accentColor = isCreative ? '#E8854A' : isAI ? '#F59E0B' : '#22D3AE';
        
        context.save();
        context.translate(body.position.x, body.position.y);
        context.rotate(body.angle);

        context.beginPath();
        context.arc(-width / 2 + 18, 0, 3.5, 0, 2 * Math.PI);
        context.fillStyle = accentColor;
        context.fill();

        context.font = '500 12px "JetBrains Mono", monospace';
        context.fillStyle = 'rgba(237, 234, 227, 0.9)';
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
    
    setEngineReady(true);

    const handleResize = () => {
      if (!currentScene) return;
      const newWidth = currentScene.clientWidth;
      render.canvas.width = newWidth;
      render.options.width = newWidth;
      
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 50 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: height / 2 });
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

  // Drop animation when scrolled into view
  useEffect(() => {
    if (!isVisible || !engineReady || !engineRef.current) return;
    
    const engine = engineRef.current;
    const pills = engine.world.bodies.filter(b => b.collisionFilter.category === 0x0001);
    
    // Using a ref to prevent dropping multiple times
    const timeouts: NodeJS.Timeout[] = [];
    
    pills.forEach((body, index) => {
      if (body.isStatic) {
        const timeout = setTimeout(() => {
          Matter.Body.setStatic(body, false);
          // Small nudge to ensure it wakes up and falls
          Matter.Body.setVelocity(body, { x: 0, y: 0.1 });
        }, index * 25); 
        timeouts.push(timeout);
      }
    });

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [isVisible, engineReady]);

  return (
    <div className="relative w-full rounded-2xl border border-[rgba(237,234,227,0.06)] bg-[#07090C] shadow-2xl overflow-hidden group">
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
      
      <div className="absolute top-6 right-8 pointer-events-none z-20 flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[3px] text-[#EDEAE3]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3AE] animate-pulse" />
          Interactive Stack
        </div>
        <div className="mt-1 font-mono text-[8px] text-[#EDEAE3]/50">
          PHYSICS ENGINE ONLINE · GRAB & THROW
        </div>
      </div>
      
      <div className="absolute top-1/2 left-4 -translate-y-1/2 -rotate-90 origin-center pointer-events-none z-20 opacity-20 font-mono text-[8px] tracking-[4px] text-[#EDEAE3] uppercase">
        Y-AXIS · GRAVITY 0.5
      </div>
    </div>
  );
}
