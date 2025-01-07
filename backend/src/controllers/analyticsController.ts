import { Request, Response } from "express";
import {
  generateMockData,
  getEngagementMetrics,
  getAllPost,
} from "../services/analyticsService";
import { generateChatResponse, generateInsights } from "../services/langflowService";

const DEFAULT_DATA_COUNT = 500;

export const analyticsController = {
  generateMockData: async (req: Request, res: Response): Promise<void> => {
    try {
      const existingMetrics = await getEngagementMetrics();
      if (existingMetrics && existingMetrics.length > 0) {
        res.json({
          message: "Mock data has already been generated",
          sample: existingMetrics,
        });
        return;
      }

      const count = 500;
      console.log("count from the frontend", count)
      const mockData = await generateMockData(count);
      res.json({
        message: "Mock data generated successfully",
        sample: mockData,
      });
    } catch (error) {
      console.error("Error in generateMockData:", error);
      res.status(500).json({ error: "Error generating mock data" });
    }
  },

  getEngagementMetrics: async (req: Request, res: Response): Promise<void> => {
    try {
      const metrics = await getEngagementMetrics();
      if (!metrics || metrics.length === 0) {
        const mockData = await generateMockData(DEFAULT_DATA_COUNT);
        const newMetrics = await getEngagementMetrics();
        res.json({newMetrics, mockData});
      } else {
        res.json(metrics);
      }
    } catch (error) {
      console.error("Error in getEngagementMetrics:", error);
      res.status(500).json({ error: "Error getting engagement metrics" });
    }
  },

  getInsights: async (req: Request, res: Response): Promise<void> => {
    try {
      const metrics = await getEngagementMetrics();
      const insights = await generateInsights(metrics);
      res.json({insights});
    } catch (error) {
      console.error("Error in getInsights:", error);
      res.status(500).json({ error: "Error getting insights" });
    }
  },

  getAllPost: async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      const posts = await getAllPost(); // Assuming getAllPost function exists elsewhere and fetches all posts
      const paginatedPosts = posts.slice(skip, skip + limit);
      const total = posts.length;

      res.json({
        posts: paginatedPosts,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total
      });
    } catch (error) {
      console.error("Error in getAllPost:", error);
      res.status(500).json({ error: "Error getting posts" });
    }
  },

  chat: async (req: Request, res: Response): Promise<void> => {
    try {
      const { message, history } = req.body;
      console.log("Received chat request:", { message, history });
      
      if (!message || !history) {
        throw new Error("Missing required parameters: message or history");
      }

      const chatResponse = await generateChatResponse(message, history);
      console.log("Chat response generated:", chatResponse);
      
      res.json({ message: chatResponse });
    } catch (error) {
      console.error("Error in chat:", error);
      res.status(500).json({ error: "Error generating chat response", details: error });
    }
  },
};
