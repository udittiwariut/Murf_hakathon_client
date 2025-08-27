import HeroSvg from "./../assets/hero.svg?react";
import HeroSection from "./HeroSection";
import { Logo } from "../conts/import";
import PlayerSection from "./PlayerSection";
import { ContextProvider } from "../hooks/Context";

const Layout = () => {
  return (
    <ContextProvider>
      <div className="overflow-x-hidden">
        <div className="relative min-h-[100dvh]">
          <div className="z-[-1] h-[100dvh] w-[100dvw] bg-yellow-bg absolute">
            <HeroSvg />
          </div>

          <img src={Logo} className="h-[150px] mx-auto" />

          <div className="flex z-10 items-center">
            <HeroSection />
          </div>

          <div className="mt-40">
            <PlayerSection />
          </div>
        </div>
      </div>
    </ContextProvider>
  );
};

export default Layout;
