import HeroSvg from "./../assets/hero.svg?react";
import HeroSection from "./HeroSection";
import { Logo } from "../conts/import";
import PlayerSection from "./PlayerSection";
import { ContextProvider } from "../hooks/Context";
import Links from "./Links";

const Layout = () => {
  return (
    <ContextProvider>
      <div className="overflow-x-hidden min-h-[100dvh]">
        <div className="relative min-h-[100dvh]">
          <div className="z-[-1] h-full w-full bg-yellow-bg absolute">
            <HeroSvg />
          </div>

          <div className="flex items-start">
            <div className="opacity-0 pointer-events-none">
              <Links />
            </div>

            <img src={Logo} className="h-[75px] md:h-[150px] mx-auto" />
            <Links />
          </div>
          <HeroSection />
        </div>

        <PlayerSection />
      </div>
    </ContextProvider>
  );
};

export default Layout;
