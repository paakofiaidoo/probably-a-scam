import React, {useState} from 'react';
import {updateSubmissionFeedback} from "@/services/firestoreService.ts";

interface FeedbackButtonsProps {
    analysisPerformed: boolean,
    submission?: string
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({analysisPerformed, submission}) => {
    const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);

    if (!analysisPerformed) {
        return null;
    }

    const handleFeedback = (type: 'correct' | 'incorrect_scam' | 'incorrect_not_scam') => {
        // In a real app, this would send data to a backend.
        // For MVP, just update local state to show a message.
        console.log(`Feedback received: ${type}`);

        if (submission){updateSubmissionFeedback(submission, type)}
        if (type === 'correct') setFeedbackGiven("Thanks! We're glad the analysis was helpful.");
        if (type === 'incorrect_scam') setFeedbackGiven("Thanks for flagging this as a scam. We'll review it.");
        if (type === 'incorrect_not_scam') setFeedbackGiven("Thanks for flagging this as not a scam. We'll review it.");

    };

    if (feedbackGiven) {
        return (
            <div className="mt-6 p-3 bg-blue-100 text-blue-700 rounded-md text-sm text-center">
                {feedbackGiven}
            </div>
        );
    }

    return (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2 text-center">Was this analysis helpful?</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                    onClick={() => handleFeedback('correct')}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-md transition-colors"
                >
                    👍 Yes, it was accurate
                </button>
                <button
                    onClick={() => handleFeedback('incorrect_scam')}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-md transition-colors"
                >
                    👎 No, this IS a scam
                </button>
                <button
                    onClick={() => handleFeedback('incorrect_not_scam')}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
                >
                    👎 No, this is NOT a scam
                </button>
            </div>
        </div>
    );
};

export default FeedbackButtons;