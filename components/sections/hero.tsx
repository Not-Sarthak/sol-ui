"use client";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const Hero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const { theme } = useTheme();

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const darkBackgroundImage = useMotionTemplate`
    radial-gradient(
      125% 125% at 50% 0%, 
      black 50%, 
      ${color}
    )
  `;

  const lightBackgroundImage = useMotionTemplate`
    radial-gradient(
      125% 125% at 50% 0%, 
      white 50%, 
      ${color}
    )
  `;

  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  // Determine the background image based on the current theme
  const backgroundImage = theme === "dark" ? darkBackgroundImage : lightBackgroundImage;

  return (
    <motion.section
      style={{
        backgroundImage: backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-white dark:bg-black px-4 py-24 text-black dark:text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full bg-gray-300/50 dark:bg-gray-600/50 px-3 py-1.5 text-sm text-black dark:text-gray-200">
          Beta Now Live!
        </span>
        <h1 className="max-w-4xl bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Build Solana Websites, at Warp Speed
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed text-gray-700 dark:text-gray-200 md:text-lg md:leading-relaxed">
          Create Solana sites at warp speed with our reusable, style-ready components—purely OPOS magic!
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <Link href="/components">
        <motion.button
          style={{
            border, 
            boxShadow, 
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative w-56 flex justify-center items-center gap-1.5 rounded-full bg-gray-200/10 dark:bg-gray-950/10 px-4 py-2 text-gray-900 dark:text-gray-50 transition-colors hover:bg-gray-300/50 dark:hover:bg-gray-950/50"
        >
          Explore Components
          <ChevronRight className=""/>
        </motion.button>
        </Link>
        {/* <motion.button
          style={{
            border, 
            boxShadow, 
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative w-56 flex justify-center items-center gap-1.5 rounded-full bg-gray-200/10 dark:bg-gray-950/10 px-4 py-2 text-gray-900 dark:text-gray-50 transition-colors hover:bg-gray-300/50 dark:hover:bg-gray-950/50"
        >
          Explore Hooks
          <ChevronRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button> */}
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={70} count={1000} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};
