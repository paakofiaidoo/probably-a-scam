import { db } from '../firebaseConfig.ts';
import { collection, addDoc, serverTimestamp, Timestamp , updateDoc,increment,doc} from 'firebase/firestore';
import { InputType, AnalysisResult, RiskRanking } from '../types.ts';

export interface SubmissionData {
  text: string | null;
  url: string | null;
  timestamp: Timestamp;
  ranking: RiskRanking;
  explanation: string;
  feedbackCount: number;
  inputType: InputType;
}

export const saveSubmission = async (
  inputType: InputType,
  inputValue: string,
  analysis: AnalysisResult
): Promise<string> => {
  if (!db) {
    console.error("Firestore database instance is not available. Submission aborted.");
    throw new Error("Firestore not initialized.");
  }

  try {
    const submissionToSave: SubmissionData = {
      text: inputType === InputType.TEXT ? inputValue : null,
      url: inputType === InputType.URL ? inputValue : null,
      timestamp: serverTimestamp(),
      ranking: analysis.ranking,
      explanation: analysis.explanation,
      inputType: inputType,
    };

    const docRef = await addDoc(collection(db, "submissions"), submissionToSave);
    console.log("Submission saved to Firestore with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving submission to Firestore: ", error);
    // Propagate the error to be handled by the caller (e.g., display a UI message)
    throw error;
  }
};



export const updateSubmissionFeedback = async (
    submissionId: string,
    feedback: string,
): Promise<void> => {
  if (!db) {
    console.error("Firestore database instance is not available. Submission aborted.");
    throw new Error("Firestore not initialized.");
  }

  try {
    const submissionRef = doc(db, "submissions", submissionId);

    const updateData = {
      feedbackCount: increment(1),
      lastFeedback: feedback,
      lastUpdated: serverTimestamp()
    };

    await updateDoc(submissionRef, updateData);
    console.log("Submission feedback updated successfully for ID: ", submissionId);
  } catch (error) {
    console.error("Error updating submission feedback in Firestore: ", error);
    throw error;
  }
};