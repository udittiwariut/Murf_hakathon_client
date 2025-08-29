import { Check, CrossIcon, Play, X } from "lucide-react";

const UploadVideoInfo = ({ uploadedVideo, removeVideo, }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
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

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between ">
            <div>
              <h4 className="text-md font-medium text-wrap truncate">{uploadedVideo.name}</h4>
              <p className="text-base text-gray-500">
                {formatFileSize(uploadedVideo.size)} • {uploadedVideo.type}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              {uploadedVideo.status === "completed" && <Check strokeWidth={4} className="w-8 h-8 text-green-500" />}
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
    </div>
  );
};

export default UploadVideoInfo;
