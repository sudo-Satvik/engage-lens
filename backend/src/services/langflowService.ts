// src/services/langflow.ts

import LangflowClient from './langflowClient';
import { EngagementMetrics } from "../types/index";
import dotenv from 'dotenv';
const flowIdOrName = '69f6bf64-4f03-4d35-9757-6d8bef6fa1c8';
const langflowId = '7a2336ee-11fb-4fa1-bab5-e8fde6cfc07e';
const applicationToken = process.env.ASTRA_TOKEN || "";
const baseURL = process.env.LANGFLOW_BASE_URL || 'https://api.langflow.astra.datastax.com';

dotenv.config({
  path: ".env",
});

const langflowClient = new LangflowClient(baseURL, applicationToken);

const tweaks = {
  "ChatInput-Egkj1": {},
  "OpenAIModel-9GqFh": {},
  "ChatOutput-GqtHs": {},
  "TextInput-5ksX0": {},
  "CombineText-RwaRn": {},
  "File-gWqMb": {},
  "SplitText-JpfO7": {}
};

export const generateInsights = async (metrics: EngagementMetrics[]): Promise<string> => {
  try {
    console.log("Sending request to Langflow for insights:", { metrics });
    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      JSON.stringify(metrics),
      'chat',
      'chat',
      tweaks,
      false
    );
    console.log("Langflow insights response:", response);
    if (response && response.outputs && response.outputs[0].outputs[0].outputs.message) {
      return response.outputs[0].outputs[0].outputs.message.message.text;
    }
    throw new Error(`Unexpected response format: ${JSON.stringify(response)}`);
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
    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      JSON.stringify({ message, history }),
      'chat',
      'chat',
      tweaks,
      false
    );
    console.log("Langflow response:", response);
    if (response && response.outputs && response.outputs[0].outputs[0].outputs.message) {
      return response.outputs[0].outputs[0].outputs.message.message.text;
    }
    throw new Error(`Unexpected response format: ${JSON.stringify(response)}`);
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error(`Failed to generate chat response: ${error}`);
  }
};