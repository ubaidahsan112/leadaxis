import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }) => {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinished(true);

      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center
        bg-transparent backdrop-blur-[3px]
        transition-opacity duration-500
        ${finished ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex items-center gap-2">
        <span className="loader-dot dot-1" />
        <span className="loader-dot dot-2" />
        <span className="loader-dot dot-3" />
        <span className="loader-dot dot-4" />
      </div>

      <style>{`
        .loader-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
          animation: bounceDot 0.9s ease-in-out infinite;
        }

        .dot-1 {
          animation-delay: 0s;
        }

        .dot-2 {
          background: #bef264;
          animation-delay: 0.15s;
        }

        .dot-3 {
          background: white;
          animation-delay: 0.3s;
        }

        .dot-4 {
          background: #bef264;
          animation-delay: 0.45s;
        }

        @keyframes bounceDot {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;