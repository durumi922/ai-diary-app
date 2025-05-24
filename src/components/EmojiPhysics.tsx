import { useEffect, useRef } from "react";
import Matter from "matter-js";

type Props = {
  emojis: string[];
};

export default function EmojiPhysics({ emojis }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engine = useRef(Matter.Engine.create());
  const runner = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    const container = sceneRef.current!;
    container.innerHTML = "";

    const render = Matter.Render.create({
      element: container,
      engine: engine.current,
      options: {
        width: 400,
        height: 600,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });

    const world = engine.current.world;
    Matter.World.clear(world, false);
    engine.current.gravity.y = 1;

    // 바닥 + 벽 설정
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

    // 전달된 이모지만 떨어지게!
    emojis.forEach((emoji, index) => {
      setTimeout(() => {
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
      }, index * 500); // 이모지당 0.5초 간격으로 떨어짐
    });

    runner.current = Matter.Runner.create();
    Matter.Runner.run(runner.current, engine.current);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner.current!);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine.current);
    };
  }, [emojis]);

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
