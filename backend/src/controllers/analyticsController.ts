import { Request, Response } from "express";
import {
  generateMockData,
  getEngagementMetrics,
  getAllPost,
} from "../services/analyticsService";
import { generateInsights } from "../services/langflowService";

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

      const count = req.body.count || 50;
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
        const count = 50;
        const mockData = await generateMockData(count);
        res.json(mockData);
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
      res.json(insights);
    } catch (error) {
      console.error("Error in getInsights:", error);
      res.status(500).json({ error: "Error getting insights" });
    }
  },

  getAllPost: async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await getAllPost();
      res.json(posts);
    } catch (error) {
      console.error("Error in getAllPost:", error);
      res.status(500).json({ error: "Error getting posts" });
    }
  },
};
