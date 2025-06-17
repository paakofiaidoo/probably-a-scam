
import React from 'react';
import { AnalysisResult, RiskRanking } from '../types.ts';
import { RISK_RANKING_CONFIG } from '../constants.tsx';

interface ResultDisplayProps {
  result: AnalysisResult | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) {
    return (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <div className="flex items-center">
                {RISK_RANKING_CONFIG[RiskRanking.UNKNOWN].icon}
                <h3 className={`ml-3 text-lg font-semibold ${RISK_RANKING_CONFIG[RiskRanking.UNKNOWN].textColor}`}>
                    {RISK_RANKING_CONFIG[RiskRanking.UNKNOWN].label}
                </h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
                Submit text or a URL above to get an analysis.
            </p>
        </div>
    );
  }

  const config = RISK_RANKING_CONFIG[result.ranking] || RISK_RANKING_CONFIG[RiskRanking.UNKNOWN];

  return (
    <div className={`mt-8 p-6 shadow-lg rounded-xl border ${config.borderColor} ${config.bgColor}`}>
      <div className="flex items-center">
        {config.icon}
        <h3 className={`ml-3 text-xl font-semibold ${config.textColor}`}>
          {config.label}
        </h3>
      </div>
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-800 mb-1">Explanation:</h4>
        <p className={`text-sm ${config.textColor} whitespace-pre-wrap`}>{result.explanation}</p>
      </div>
    </div>
  );
};

export default ResultDisplay;