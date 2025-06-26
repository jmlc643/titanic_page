/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Titanic passenger data for prediction
 */
export interface PassengerData {
  pclass: number;
  sex: string;
  age: number;
  sibsp: number;
  parch: number;
  fare: number;
  embarked: string;
  alone: boolean;
}

/**
 * Prediction result from the backend API
 */
export interface BackendPredictionResponse {
  prediction: number;
  survived: string;
}

/**
 * Enhanced prediction result for frontend display
 */
export interface PredictionResult {
  survived: boolean;
  confidence: number;
  survivedText: string;
  features: {
    name: string;
    value: string | number | boolean;
    importance: number;
  }[];
}
