import { useEffect, useRef } from "react";
import Matter from "matter-js";

const emojis = ["😊", "☕", "🌧️", "🐶", "📚", "🎵", "🌸"];

export default function EmojiPhysics() {
  const sceneRef = useRef(null);
  const engine = useRef(Matter.Engine.create());
  const runner = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    const render = Matter.Render.create({
      element: sceneRef.current!,
      engine: engine.current,
      options: {
        width: 400,
        height: 600,
        wireframes: false,
        background: "#fefefe",
      },
    });

    const world = engine.current.world;
    Matter.World.clear(world, false);

    engine.current.gravity.y = 1; // 중력 적용

    const ground = Matter.Bodies.rectangle(200, 590, 400, 20, {
      isStatic: true,
      restitution: 1,
      friction: 0,
      render: { fillStyle: "#ddd" },
    });

    const leftWall = Matter.Bodies.rectangle(0, 300, 20, 600, {
      isStatic: true,
    });
    const rightWall = Matter.Bodies.rectangle(400, 300, 20, 600, {
      isStatic: true,
    });

    Matter.World.add(world, [ground, leftWall, rightWall]);

    const interval = setInterval(() => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const body = Matter.Bodies.circle(200, 0, 24, {
        restitution: 0.9,
        friction: 0.005,
        density: 0.001,
        render: {
          sprite: {
            texture: createEmojiDataUrl(emoji),
            xScale: 1,
            yScale: 1,
          },
        },
      });
      Matter.World.add(world, body);
    }, 1000);

    runner.current = Matter.Runner.create();
    Matter.Runner.run(runner.current, engine.current);
    Matter.Render.run(render);

    return () => {
      clearInterval(interval);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner.current!);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine.current);
    };
  }, []);

  return <div ref={sceneRef} className="w-full h-[600px] mx-auto" />;
}

function createEmojiDataUrl(emoji: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = 48;
  canvas.height = 48;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "32px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 24, 24);
  return canvas.toDataURL();
}
