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
      <div className="grid grid-cols-2 items-center mt-5 px-14">
        <div className="justify-self-center px-10">
          <div className="text-gray-800 font-bold text-6xl">Censor Video</div>
          <div className="text-black font-normal text-2xl mt-2">
            Bleep or soft out out anything inappropriate, offensive, or private in your video
          </div>
          <div className="mt-5">
            <Button onClick={openModal} className="flex items-center gap-2">
              <Upload /> Upload Video <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="justify-self-center">
          <img className="w-[700px] rounded-2xl border-2 thumbnail_box-shadow" src={Thumbnail} />
        </div>
      </div>
      {isModalOpen ? <UploadModal handleCloseModal={handleCloseModal} /> : null}
    </div>
  );
};

export default HeroSection;
