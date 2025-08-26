import React from "react";

import HeroSvg from "./../assets/hero.svg?react";
import HeroSection from "./HeroSection";
import { Logo } from "../conts/import";

const Layout = () => {
  return (
    <div className="relative">
      <div className="z-[-1] h-[100dvh] w-[100dvw] bg-yellow-bg absolute">
        <HeroSvg />
      </div>

      <img src={Logo} className="h-[150px] mx-auto"/>

      <div className="flex z-10 items-center">
        <HeroSection />
      </div>
    </div>
  );
};

export default Layout;
