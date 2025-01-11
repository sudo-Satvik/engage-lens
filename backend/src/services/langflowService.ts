// src/services/langflow.ts

import LangflowClient from './langflowClient';
import { EngagementMetrics } from "../types/index";

const flowIdOrName = '00894e68-8ca9-4b66-82dc-a136a706c7ad';
const langflowId = '6c902b61-f18a-4666-b457-0926f9532a23';
const applicationToken = process.env.DATASTAX_TOKEN || '';
const baseURL = process.env.LANGFLOW_BASE_URL || 'https://api.langflow.astra.datastax.com';

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