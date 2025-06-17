
import React, { useState, useCallback } from 'react';
import { InputType, AnalysisResult, RiskRanking } from './types.ts';
import InputForm from './components/InputForm.tsx';
import ResultDisplay from './components/ResultDisplay.tsx';
import FeedbackButtons from './components/FeedbackButtons.tsx';
import BuyMeACoffeeCard from './components/DonationCard.tsx';
import { analyzeContent } from './services/geminiService.ts';
import { saveSubmission } from './services/firestoreService.ts'; // New import

const App: React.FC = () => {
  const [inputType, setInputType] = useState<InputType>(InputType.TEXT);
  const [inputValue, setInputValue] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisPerformed, setAnalysisPerformed] = useState<boolean>(false);
  const [submission, setSubmission] = useState("")


  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleInputTypeChange = useCallback((type: InputType) => {
    setInputType(type);
    setInputValue(''); 
    setAnalysisResult(null);
    setError(null);
    setAnalysisPerformed(false);
  }, []);

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      setError("Input cannot be empty.");
      setAnalysisPerformed(true); // Show "Awaiting Analysis" or similar if input cleared and was empty.
      setAnalysisResult(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null); 

    try {
      const result = await analyzeContent(inputType, inputValue);
      setAnalysisResult(result);

      // Check for specific API key error message from geminiService
      if (result.ranking === RiskRanking.UNKNOWN && result.explanation.includes("API_KEY") && result.explanation.includes("not configured")) {
        setError(result.explanation);
      } else if (result.ranking !== RiskRanking.UNKNOWN) {
        // Save to Firestore if analysis was successful (not an API key error, etc.)
        try {
          await saveSubmission(inputType, inputValue, result).then((submissionId)=>{
            setSubmission(submissionId)
          });
          console.log("Submission saved successfully.");
        } catch (firestoreError) {
          console.error("Failed to save submission to Firestore:", firestoreError);
          // Append to existing error or set a new one for Firestore
          setError(prevError => 
            prevError 
            ? `${prevError}\nAdditionally, failed to save submission details.` 
            : "Analysis complete, but failed to save submission details. Please try again later."
          );
        }
      }
    } catch (e) {
      console.error("Submission error:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Failed to get analysis: ${errorMessage}`);
      setAnalysisResult({
        ranking: RiskRanking.UNKNOWN,
        explanation: `An error occurred: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
      setAnalysisPerformed(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Probably a Scam?
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Get AI-powered analysis to detect potential scams, phishing, and social engineering in texts and URLs.
          </p>
        </header>

        <main>
          <InputForm
            inputType={inputType}
            onInputTypeChange={handleInputTypeChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md shadow whitespace-pre-line">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          
          {analysisPerformed && <ResultDisplay result={analysisResult} />}

          <FeedbackButtons analysisPerformed={analysisPerformed} submission={submission} />
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Probably a Scam. AI analysis for educational purposes.</p>
          <p className="mt-1">Remember: AI analysis is a tool, not a guarantee. Always exercise caution.</p>
          
          <BuyMeACoffeeCard />

          <p className="mt-4 text-xs text-gray-400">Powered by Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;