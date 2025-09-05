import { Alert } from 'react-native';
import { GEMINI_KEY } from '@env';

import { GoogleGenerativeAI } from '@google/generative-ai';

// Base Gemini setup
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

// Function to send a prompt to Gemini
export const geminiResponse = async (msg: string) => {
  try {
    // Select the model
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    // Send the prompt to Gemini
    const result = await model.generateContent(msg);

    // Extract plain text output
    const text = result.response.text();
    console.log(text);
    return text;
  } catch (error: unknown) {
    console.error(JSON.stringify(error));
    Alert.alert('Network Error');
  }
};
