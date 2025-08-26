import { Check, CrossIcon, Play, Upload, X } from "lucide-react";
import React, { useCallback, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import Button from "./Button";
import MultiSelectTags from "./MultiSelect";
import useOutSideToClose from "../hooks/useOutSideToClose";
import { useAxios } from "../hooks/useAxios";
import { BACKEND_BASE_URL } from "../conts/conts";

const UploadModal = ({ handleCloseModal }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  const [uploadedVideo_file, setUploadedVideo_file] = useState<any>(null);

  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);
  const { data, sendRequest, error, loading } = useAxios({
    url: `${BACKEND_BASE_URL}/censor`,
    method: "POST",
  });

  const modalRef = useRef<HTMLElement | null>(null);

  useOutSideToClose({ ref: modalRef, close: handleCloseModal });

  const handleDrag = useCallback((e: DragEvent) => {
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

  const handleDrop = useCallback((e: DragEvent) => {
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
    console.log(videoFiles);

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
    setUploadedVideo_file(videoFiles);
    reader.readAsDataURL(videoFiles);

    // Simulate upload delay
  };

  const onButtonClick = () => {
    fileInputRef?.current.click();
  };

  const removeVideo = () => {
    setUploadedVideo(null);
    setUploadedVideo_file(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFormSubmit = () => {
    const formdata = new FormData();
    console.log(uploadedVideo);

    formdata.append("file", uploadedVideo_file);
    formdata.append("words_to_censor", JSON.stringify(selectedTags));

    sendRequest({ data: formdata });
  };

  return (
    <div className="absolute top-0 h-[100dvh] w-[100dvw] flex items-center justify-center overflow-hidden bg-black/50">
      <div ref={modalRef} className="w-[700px] bg-white border-2 py-4 z-10 rounded-xl overflow-hidden border-b-7">
        {uploadedVideo ? (
          <div className="space-y-4">
            <div key={uploadedVideo.id} className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {uploadedVideo.url && uploadedVideo.type.startsWith("video/") ? (
                      <video src={uploadedVideo.url} className="w-full h-full object-cover" muted />
                    ) : (
                      <Play className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-md font-medium  truncate">{uploadedVideo.name}</h4>
                      <p className="text-base text-gray-500">
                        {formatFileSize(uploadedVideo.size)} • {uploadedVideo.type}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {uploadedVideo.status === "completed" && (
                        <Check strokeWidth={4} className="w-8 h-8 text-green-500" />
                      )}
                      {uploadedVideo.status === "error" && <CrossIcon className="w-5 h-5 text-red-500" />}

                      <button
                        onClick={() => removeVideo()}
                        className="p-1 text-gray-400 cursor-pointer hover:text-red-500 transition-colors duration-200"
                        title="Remove video"
                      >
                        <X className="w-8 h-8 text-red-500" strokeWidth={4} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <MultiSelectTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </div>

            <Button
              onClick={handleFormSubmit}
              disabled={selectedTags.length === 0}
              className="mx-auto disabled:opacity-50 disabled:cursor-not-allowed "
            >
              Submit
            </Button>
          </div>
        ) : (
          <div
            className={`relative px-8 py-5 text-center transition-colors duration-200 ${
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
                <Upload className={`w-12 h-12 ${dragActive ? "text-black stroke-2" : "text-gray-400"}`} />
              </div>

              <div>
                <h3 className="text-3xl font-semibold mb-2">
                  {dragActive ? "Drop your videos here" : "Upload your videos"}
                </h3>
                <p className="text-base mb-4">Drag and drop your video files here, or click to browse</p>
              </div>
              {dragActive == false ? (
                <Button
                  onClick={onButtonClick}
                  className="inline-flex items-center  text-disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload /> Choose File
                </Button>
              ) : null}

              <p className="text-base">Supported formats: MP4, MOV, AVI, WMV, FLV, WebM</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
