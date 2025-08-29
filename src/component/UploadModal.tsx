import React, { useContext, useRef, useState } from "react";
import Button from "./Button";
import MultiSelectTags from "./MultiSelect";
import useOutSideToClose from "../hooks/useOutSideToClose";
import { useAxios } from "../hooks/useAxios";
import { BACKEND_BASE_URL, CENSOR_TYPE } from "../conts/conts";
import { Context } from "../hooks/Context";
import { loader } from "../conts/import";
import UploadVideoInfo from "./UploadVideoInfo";
import UploadInstruction from "./UploadInstruction";
import MyCheckbox from "./CheckBox";

const UploadModal = ({ handleCloseModal }) => {
  const [selectedTags, setSelectedTags] = useState({});
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  const [censorType, setCensorType] = useState<any>(CENSOR_TYPE.ATUO);
  const [transcript, setTranscript] = useState([]);

  const [uploadedVideo_file, setUploadedVideo_file] = useState<any>(null);
  const [VideoFileId, setVideoFileId] = useState<any>(null);
  const { setFileName } = useContext(Context);

  const { sendRequest, error, loading } = useAxios({
    url: `${BACKEND_BASE_URL}/censor`,
    method: "POST",
  });

  const getTranscript = useAxios({
    url: `${BACKEND_BASE_URL}/get-transcript`,
    method: "POST",
  });

  const modalRef = useRef<HTMLElement | null>(null);

  useOutSideToClose({ ref: modalRef, close: handleCloseModal, isLocked: loading });

  const removeVideo = () => {
    setUploadedVideo(null);
    setUploadedVideo_file(null);
  };

  const handleFormSubmit = () => {
    const formdata = new FormData();

    formdata.append("file", uploadedVideo_file, VideoFileId);
    if (censorType === CENSOR_TYPE.CUSTOM) {
      if (Object.keys(selectedTags).length == 0) {
        alert("Select At least one word");
        return;
      }
      formdata.append("words_to_censor", JSON.stringify(selectedTags));
    }
    sendRequest({ data: formdata }).then((res) => {
      setFileName(res.fileName);
      handleCloseModal();
    });
  };

  const handleCustomWordsCheck = () => {
    if (transcript.length === 0) {
      const formdata = new FormData();
      formdata.append("file", uploadedVideo_file, VideoFileId);
      getTranscript.sendRequest({ data: formdata }).then((res) => {
        const words = new Set();

        res[0].forEach((element) => {
          words.add(element.word);
        });

        setTranscript(Array.from(words));
      });
    }

    setCensorType(CENSOR_TYPE.CUSTOM);
  };

  return (
    <div className="absolute top-0 h-[100dvh] w-[100dvw] flex items-center justify-center overflow-hidden bg-black/50">
      <div
        ref={modalRef}
        className="w-[400px] lg:w-[700px] min-h-[200px]  bg-white border-2 py-1 lg:py-4 z-10 rounded-xl overflow-hidden border-b-7"
      >
        {loading ? (
          <div className="h-full w-full ">
            <img src={loader} className="h-[200px] lg:h-[300px] mx-auto" />
            <div className="flex items-center mt-2 gap-1 justify-center">
              <p className="text-base">Cleaning your video</p>
              <div className="dot-loader mt-0.5"></div>
            </div>
          </div>
        ) : uploadedVideo ? (
          <div className="space-y-2 lg:space-y-4">
            <UploadVideoInfo removeVideo={removeVideo} uploadedVideo={uploadedVideo} />

            <div className="flex gap-5 px-5">
              <MyCheckbox
                handleChange={() => setCensorType(CENSOR_TYPE.ATUO)}
                isChecked={censorType == CENSOR_TYPE.ATUO}
              >
                Auto Profanity Detector
              </MyCheckbox>

              <MyCheckbox handleChange={handleCustomWordsCheck} isChecked={censorType == CENSOR_TYPE.CUSTOM}>
                Add Words Transcript
              </MyCheckbox>
            </div>

            {censorType === CENSOR_TYPE.CUSTOM ? (
              <MultiSelectTags
                transcript={transcript}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                isLoading={getTranscript.loading}
              />
            ) : null}

            <Button
              onClick={handleFormSubmit}
              disabled={getTranscript.loading}
              className="mx-auto disabled:opacity-50 disabled:cursor-not-allowed my-2"
            >
              Submit
            </Button>
          </div>
        ) : (
          <UploadInstruction
            setVideoFileId={setVideoFileId}
            setUploadedVideo={setUploadedVideo}
            setUploadedVideo_file={setUploadedVideo_file}
          />
        )}
      </div>
    </div>
  );
};

export default UploadModal;
