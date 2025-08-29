import React, { useState } from "react";
import { X, Plus, Loader } from "lucide-react";

const MultiSelectTags = ({ transcript, selectedTags, setSelectedTags, isLoading }) => {
  const [isChanged, setIsChanged] = useState(false);
  // const [inputValue, setInputValue] = useState("");

  // const inputRef = useRef(null);

  const addTag = (tag) => {
    if (tag.trim() && !Object.hasOwn(selectedTags, tag.trim())) {
      selectedTags[tag.trim()] = 1;
      // setInputValue("");
      setIsChanged(!isChanged);
    }
  };

  const removeTag = (toDelete) => {
    delete selectedTags[toDelete];
    setIsChanged(!isChanged);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-2 lg:mt-5 px-2">
      <h2 className="text-lg lg:text-2xl font-semibold">Add words you want to be censored</h2>
      {Object.keys(selectedTags).length ? (
        <div>
          <div className="flex flex-wrap gap-2 py-3">
            {Object.keys(selectedTags).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border-2 text-sm font-semibold rounded-md shadow-sm"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="flex items-center cursor-pointer justify-center w-4 h-4 rounded-full transition-colors duration-200"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="w-5 h-5 hover:text-red-500" strokeWidth={4} />
                </button>
              </span>
            ))}
          </div>

          {/* <div className="relative">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addTag(inputValue);
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Ex: Name, Address"
                  className="w-full px-4 py-2 border  rounded-md focus:ring-2 focus:ring-black-500 focus:border-black-500 outline-none transition-all duration-200"
                />
              </form>
            </div>

            <Button
              className=" [box-shadow:0px_2px_1px_black] flex gap-1 h-10 lg:h-10 px-8"
              onClick={() => addTag(inputValue)}
              disabled={!inputValue.trim()}
            >
              <Plus className="w-4 h-4" strokeWidth={4} />
              Add
            </Button>
          </div>
        </div> */}
        </div>
      ) : null}

      {isLoading ? (
        <p className="text-lg animate-pulse flex gap-2 justify-center my-3">
          Generating transcript
          <Loader className="animate-spin" />
        </p>
      ) : null}

      {transcript.length ? (
        <div className="mt-6 ">
          <h3 className="text-lg font-medium mb-3">Transcript:</h3>

          <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
            {transcript.map((words, index) =>
              Object.hasOwn(selectedTags, words.trim()) ? null : (
                <button
                  key={index}
                  onClick={() => addTag(words)}
                  className="px-3 flex gap-1 cursor-pointer items-center py-1 text-sm bg-white border border-gray-900  rounded-md hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-black focus:border-black-500 transition-all duration-200"
                >
                  <Plus className="h-4 w-4" /> {words}
                </button>
              )
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MultiSelectTags;
