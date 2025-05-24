import { useEffect, useRef } from "react";
import Matter from "matter-js";

const emojis = ["😊", "☕", "🌧️", "🐶", "📚", "🎵", "🌸"];

export default function EmojiPhysics() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engine = useRef(Matter.Engine.create());
  const runner = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    const container = sceneRef.current!;

    // 캔버스 초기화 방지: 기존 캔버스 제거
    container.innerHTML = "";

    const render = Matter.Render.create({
      element: container,
      engine: engine.current,
      options: {
        width: 400,
        height: 600,
        wireframes: false,
        background: "#fefefe",
        pixelRatio: window.devicePixelRatio,
      },
    });

    const world = engine.current.world;
    Matter.World.clear(world, false);

    engine.current.gravity.y = 1;

    const ground = Matter.Bodies.rectangle(200, 590, 400, 20, {
      isStatic: true,
      restitution: 0.1,
      friction: 0.5,
      render: { fillStyle: "#ddd" },
    });

    const leftWall = Matter.Bodies.rectangle(0, 300, 20, 600, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Matter.Bodies.rectangle(400, 300, 20, 600, {
      isStatic: true,
      render: { visible: false },
    });

    Matter.World.add(world, [ground, leftWall, rightWall]);

    const interval = setInterval(() => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const randomX = 50 + Math.random() * 300;
      const body = Matter.Bodies.circle(randomX, -30, 24, {
        restitution: 0.6,
        friction: 0.2,
        density: 0.01,
        frictionAir: 0.02,
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

  return (
    <div
      ref={sceneRef}
      className="w-full h-[600px] mx-auto overflow-hidden bg-transparent"
    />
  );
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
