
import React from 'react';
import { InputType } from '../types.ts';
import LoadingSpinner from './LoadingSpinner.tsx';

interface InputFormProps {
  inputType: InputType;
  onInputTypeChange: (type: InputType) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  inputType,
  onInputTypeChange,
  inputValue,
  onInputChange,
  onSubmit,
  isLoading,
}) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What do you want to analyze?
        </label>
        <div className="flex space-x-4">
          {(Object.values(InputType) as Array<InputType>).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onInputTypeChange(type)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${inputType === type
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {type === InputType.TEXT ? 'Text Content' : 'Website URL'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="inputValue" className="block text-sm font-medium text-gray-700 mb-1">
          Enter {inputType === InputType.TEXT ? 'text' : 'URL'} below:
        </label>
        {inputType === InputType.TEXT ? (
          <textarea
            id="inputValue"
            rows={6}
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm transition-colors"
            placeholder="Paste email content, message text, social media post, etc."
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            disabled={isLoading}
            aria-label="Text content to analyze"
          />
        ) : (
          <input
            id="inputValue"
            type="url"
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm transition-colors"
            placeholder="e.g., https://example.com or www.suspicious-site.org"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            disabled={isLoading}
            aria-label="Website URL to analyze"
          />
        )}
        {inputType === InputType.URL && (
            <p className="mt-2 text-xs text-gray-500">
              Note: Analysis is based on URL structure and known patterns. The content of the website itself is not fetched by this tool.
            </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        aria-label={isLoading ? "Analyzing content" : "Submit content for risk analysis"}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size={5} color="text-white" />
            <span className="ml-2">Analyzing...</span>
          </>
        ) : (
          'Check for Risks'
        )}
      </button>
    </form>
  );
};

export default InputForm;