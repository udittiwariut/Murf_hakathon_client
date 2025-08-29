import { Upload } from "lucide-react";
import React, { useCallback, useRef, useState, type ChangeEvent } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";

const UploadInstruction = ({ setUploadedVideo, setUploadedVideo_file, setVideoFileId }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.type);

    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      dragCounter.current++;
    } else if (e.type === "dragleave") {
      dragCounter.current--;
      if (dragCounter.current == 0) setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files)[0]);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files)[0]);
    }
    e.target.value = "";
  };

  const handleFiles = (videoFiles: File) => {
    if (!videoFiles) {
      alert("Please select video files only.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newVideo = {
        id: Date.now() + Math.random(),
        name: videoFiles.name,
        size: videoFiles.size,
        type: videoFiles.type,
        url: e.target.result,
        status: "completed",
      };

      setUploadedVideo(newVideo);
    };
    setVideoFileId(uuidv4());
    setUploadedVideo_file(videoFiles);
    reader.readAsDataURL(videoFiles);

    // Simulate upload delay
  };

  const onButtonClick = () => {
    fileInputRef?.current.click();
  };
  return (
    <div
      className={`relative px-4 lg:px-8 py-2 lg:py-5 text-center transition-colors duration-200 ${
        dragActive ? "border-black-500 bg-gray-50" : ""
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input ref={fileInputRef} type="file" accept="video/*" onChange={handleChange} className="h-0 w-0" />

      <div className="space-y-4">
        <div className="flex justify-center">
          <Upload className={`w-10 h-10 lg:w-12 lg:h-12 ${dragActive ? "text-black stroke-2" : "text-gray-400"}`} />
        </div>

        <div>
          <h3 className="text-2xl lg:text-3xl font-semibold">
            {dragActive ? "Drop your videos here" : "Upload your videos"}
          </h3>
          <p className="text-lg">Drag and drop your video files here, or click to browse</p>
        </div>
        {dragActive == false ? (
          <Button
            onClick={onButtonClick}
            className="inline-flex items-center text-disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload /> Choose File
          </Button>
        ) : null}

        <p className="text-base">Supported formats: MP4, MOV, AVI, WMV, FLV, WebM</p>
      </div>
    </div>
  );
};

export default UploadInstruction;
