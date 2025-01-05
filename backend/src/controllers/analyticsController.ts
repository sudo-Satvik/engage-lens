import {Request, Response} from 'express';
import {generateMockData, getEngagementMetrics} from '../services/analyticsService';
import {generateInsights} from '../services/langflowService';


export const analyticsController = {
    generateMockData: async (req: Request, res: Response) => {
        try {
            const count = req.body.count || 100;
            console.log("count 1", count);
            const mockData = await generateMockData(count);
            console.log("mock data", mockData);
            res.json({message: `Mock data generated ${mockData.length} entries`, sample: mockData});
        } catch (error) {
            res.status(500).json({error: "Error generating mock data"});
        }
    },

    getEngagementMetrics: async(req: Request, res: Response) => {
        try {
            const metrics = await getEngagementMetrics();
            res.json(metrics);
        } catch (error) {
            res.status(500).json({error: "Error getting engagement metrics"});
        }
    },

    getInsights: async(req: Request, res: Response) => {
        try {
            const metrics = await getEngagementMetrics();
            const insights = await generateInsights(metrics);
            res.json(insights);
        } catch (error) {
            res.status(500).json({error: "Error getting insights"});
        }
    }
}