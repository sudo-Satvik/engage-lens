import axios from "axios";
import { EngagementMetrics } from "../types/index";

const LANGFLOW_API_URL =
  process.env.LANGFLOW_API_URL ||
  "http://localhost:7860/api/v1/predict/c9428853-eb0b-4040-989d-7832f8ef4bd1";

export const generateInsights = async (
  metrics: EngagementMetrics[]
): Promise<string> => {
  try {
    console.log("Sending request to Langflow for insights:", { metrics });
    const response = await axios.post(LANGFLOW_API_URL, {
      input: {
        metrics: JSON.stringify(metrics),
      },
    });
    console.log("Langflow insights response:", response.data);
    const result = response.data.output || response.data.result || response.data;
    if (typeof result !== 'string') {
      throw new Error(`Unexpected response format: ${JSON.stringify(result)}`);
    }
    return result;
  } catch (error) {
    console.error("Error generating insights:", error);
    throw new Error(`Failed to generate insights: ${error}`);
  }
};

export const generateChatResponse = async (
  message: string,
  history: { role: string; content: string }[]
): Promise<string> => {
  try {
    console.log("Sending request to Langflow:", { message, history });
    const response = await axios.post(LANGFLOW_API_URL, {
      input: {
        message,
        history: JSON.stringify(history),
      },
    });
    console.log("Langflow response:", response.data);
    const result = response.data.output || response.data.result || response.data;
    if (typeof result !== 'string') {
      throw new Error(`Unexpected response format: ${JSON.stringify(result)}`);
    }
    return result;
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error(`Failed to generate chat response: ${error}`);
  }
};
