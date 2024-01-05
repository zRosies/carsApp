export const LoadBarAnimation = () => {
  return (
    <>
      <div className=" w-[160px] h-[160px]  mx-auto relative">
        <div className=" w-[160px] h-[160px] rounded-[50%]  p-[18px] shadow-ringShadow">
          <div className="w-[120px] h-[120px]  rounded-[50%] shadow-innerRing flex justify-center items-center">
            <p>65%</p>
          </div>
        </div>
        <svg
          className="stroke-red-500 stroke-[20px] fill-none absolute top-0 left-0 animate-loadBar"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="160px"
          height="160px"
          style={{strokeDasharray: '372', strokeDashoffset: '300'}}
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stop-color="#e91e63" />
              <stop offset="100%" stop-color="#673ab7" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="70" stroke-linecap="round" />
        </svg>
      </div>
    </>
  );
};




//tailwind config

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        ringShadow:
          "6px 6px 10px -1px rgba(0, 0, 0, 0.15), 6px 6px 10px -1px rgba(255, 255, 255, 0.7)",
        innerRing:
          "inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2), inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7), -0.5px -0.5px  0px rgba(255, 255, 255, 0.1), 0.5px 0.5px 0px rgba(255, 255, 255, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.1) ",
      },
      animation: {
        loadBar: "loadBar 2s linear infinite",
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 3s linear infinite",
        star: "star 6s linear infinite",
      },
      keyframes: {
        loadBar: {
          "100%": {
            strokeDashoffset: "0",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        star: {
          "20%": {
            transform: "translateX(200px) translateY(-400px) rotate(20deg)",
          },
          "40%": {
            transform: "translateX(400px) translateY(0px) rotate(-20deg)",
          },
          "60%": {
            transform: "translateX(-200px) translateY(-400px) rotate(20deg)",
          },
          "80%": {
            transform: "translateX(400px) translateY(250px) rotate(20deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;


