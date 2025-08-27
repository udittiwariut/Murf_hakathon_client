import React, { useState, useRef } from "react";
import { X, Plus, Cross } from "lucide-react";
import { CURSE_WORDS } from "../conts/conts";
import Button from "./Button";

const MultiSelectTags = ({ selectedTags, setSelectedTags }) => {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  const addTag = (tag) => {
    if (tag.trim() && !selectedTags.includes(tag.trim())) {
      setSelectedTags([...selectedTags, tag.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setSelectedTags(selectedTags.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-2 lg:mt-5">
      <h2 className="text-lg lg:text-2xl font-semibold">Add words you want to be censored</h2>

      <div>
        <div className="flex flex-wrap gap-2 py-3">
          {selectedTags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border-2 text-sm font-semibold rounded-md shadow-sm"
            >
              {tag}
              <button
                onClick={() => removeTag(index)}
                className="flex items-center cursor-pointer justify-center w-4 h-4 rounded-full transition-colors duration-200"
                aria-label={`Remove ${tag}`}
              >
                <X className="w-5 h-5 hover:text-red-500" strokeWidth={4} />
              </button>
            </span>
          ))}
        </div>

        <div className="relative">
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
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Quick Add:</h3>
        <div className="flex flex-wrap gap-2">
          {CURSE_WORDS.filter((suggestion) => !selectedTags.includes(suggestion))
            .slice(0, 6)
            .map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addTag(suggestion)}
                className="px-3 flex gap-1 items-center py-1 text-sm bg-white border border-gray-900  rounded-md hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-black focus:border-black-500 transition-all duration-200"
              >
                <Plus className="h-4 w-4"/> {suggestion}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectTags;
