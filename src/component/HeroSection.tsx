import React, { useState } from "react";
import { Thumbnail } from "../conts/import";
import { ChevronRightIcon, Upload } from "lucide-react";
import Button from "./Button";
import UploadModal from "./UploadModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-7 items-center justify-center lg:grid-cols-2 mt-7 lg:mt-5 px-5 lg:px-14">
        <div className="justify-self-center lg:px-10 ">
          <div className="text-gray-800 font-bold text-4xl lg:text-6xl text-center lg:text-left">Censor Video</div>
          <div className="text-black font-normal text-base lg:text-2xl mt-2 text-center lg:text-left">
            Bleep or soft out out anything inappropriate, offensive, or private in your video
          </div>
          <div className="mt-5">
            <Button onClick={openModal} className="flex items-center gap-2 mx-auto lg:mx-0">
              <Upload /> Upload Video <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="justify-self-center mt-5">
          <img className="w-[400px] lg:w-[700px] rounded-2xl border-2 thumbnail_box-shadow" src={Thumbnail} />
        </div>
      </div>
      {isModalOpen ? <UploadModal handleCloseModal={handleCloseModal} /> : null}
    </div>
  );
};

export default HeroSection;
