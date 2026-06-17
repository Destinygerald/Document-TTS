import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

/**
    IMPORTANT!!
  
    This component requires the following CSS class to be present for the inner glow:
  
    .ai-glow-spill-mask {
      mask-image: radial-gradient(
        ellipse 100% 100% at 50% 50%,
        transparent 50%,
        black 100%
      );
    }
   */

type AIGradientBorderProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
};

export const AIGradientBorder = ({
  children,
  className,
  duration = 3,
}: AIGradientBorderProps) => {
  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });
  }, [duration, turn]);

  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, #f472b600 5%, #f472b6 10%, #c084fc 18%, #818cf8 26%, #38bdf8 34%, #2dd4bf 42%, #fbbf24 46%, #fbbf2400 52%, transparent 56%)`;

  return (
    <div className={twMerge("relative p-px", className)}>
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-[inherit]"
      />

      <div className="relative w-[100%] h-[100%] rounded-[inherit] overflow-hidden">
        <div className="relative w-[100%] h-[100%] flex flex-col items-center justify-center text-white z-[2]">
          {children}
        </div>

        <motion.div
          style={{
            backgroundImage: gradient,
          }}
          className="ai-glow-spill-mask opacity-70 blur-2xl pointer-events-none absolute inset-[-40%] z-10 overflow-hidden"
        ></motion.div>
      </div>
    </div>
  );
};

// const AIGradientAnimationCard = () => {
//   return (
//     <AIGradientBorder className="mx-auto w-full max-w-sm rounded-3xl border border-neutral-700">
//       <div className="grid gap-6 bg-neutral-900 p-4 pb-6">
//         <Logo />
//         <UserQuestion />
//       </div>
//     </AIGradientBorder>
//   );
// };
