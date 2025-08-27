import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../hooks/Context";
import { BACKEND_BASE_URL } from "../conts/conts";

const PlayerSection = () => {
  const { fileName } = useContext(Context);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  }, [fileName]);

  return (
    <div ref={ref} className={`bg-yellow-pink ${fileName ? "pb-10 mt-40" : ""}`}>
      {fileName ? (
        <div>
          <div className="text-black font-medium text-5xl mt-2 text-center">Your censored video is ready</div>
          <div className="flex items-center justify-center w-[700px] h-[400px] bg-white border-2 py-4 z-10 rounded-xl overflow-hidden border-b-7 mx-auto mt-10">
            <video width="600" controls src={BACKEND_BASE_URL + "/stream/" + fileName} />
          </div>{" "}
        </div>
      ) : null}
    </div>
  );
};

export default PlayerSection;
