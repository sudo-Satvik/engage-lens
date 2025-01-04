import axios from "axios";
import {EngagementMetrics} from '../types/index';


const LANGFLOW_API_URL = process.env.LANGFLOW_API_URL || "http://localhost:7860/api/v1/predict";

export const generateInsights = async (metrics: EngagementMetrics[]): Promise<string> => {
    try {
        const response = await axios.post(LANGFLOW_API_URL, {
            input: {
                metrics: JSON.stringify(metrics)
            }
        });
        console.log("insigts data", response.data);
        return response.data.output;
    } catch (error) {
        console.error("Error generating insights:", error);
        throw error;
    }
}