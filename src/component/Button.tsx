import { type ButtonHTMLAttributes, type ReactNode } from "react";
import cn from "../utlis/cn";

interface Button_type extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

const Button = ({ className, ...props }: Button_type) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-button-bg outline-none border-2 border-black text-black  rounded-lg cursor-pointer font-semibold text-lg px-10 py-2  flex h-12 items-center justify-center overflow-hidden  transition-all [box-shadow:0px_4px_1px_black] active:translate-y-[2px] active:shadow-none disabled:pointer-events-none",
        className
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
