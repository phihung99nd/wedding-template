import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
  opacity: number;
  emoji: string;
}

const heartEmojis = ["❤️", "💕", "💖", "💗", "💝", "💞", "💓", "💘"];

export function HeartDropOverlay() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate hearts
    const generateHearts = () => {
      const count = 30; // Number of hearts
      const newHearts: Heart[] = [];

      for (let i = 0; i < count; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position (0-100%)
          animationDuration: 4 + Math.random() * 6, // 4-10 seconds
          delay: Math.random() * 5, // 0-5 seconds delay
          size: 8 + Math.random() * 12, // 8-20px size
          opacity: 0.4 + Math.random() * 0.6, // 0.4-1 opacity
          emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        });
      }

      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-50"
      style={{ zIndex: 9999 }}
    >
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute top-[-20px]"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `fall ${heart.animationDuration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
            filter: "drop-shadow(0 0 2px rgba(255, 192, 203, 0.5))",
          }}
        >
          {heart.emoji}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(-15deg);
          }
          50% {
            transform: translateY(50vh) rotate(15deg);
          }
          100% {
            transform: translateY(100vh) rotate(-15deg);
          }
        }
      `}</style>
    </div>
  );
}

