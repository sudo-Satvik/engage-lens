import {v4 as uuidv4} from 'uuid'
import { EngagementModel } from '../models/engagementModel'
import {EngagementData, EngagementMetrics} from '../types/index';

export const generateMockData = async(count: number = 100): Promise<EngagementData[]> => {
    const postTypes = ['static', 'reel', 'carousel'];
    const mockData: EngagementData[] = [];

    for(let i = 0; i < count; i++) {
        mockData.push({
            id: uuidv4(),
            postType: postTypes[Math.floor(Math.random() * postTypes.length)],
            likes: Math.floor(Math.random() * 1000),
            shares: Math.floor(Math.random() * 200),
            comments: Math.floor(Math.random() * 100),
            timestamp: Date.now(),
        });
    }

    await EngagementModel.insertMany(mockData);
    return mockData;
}

export const getEngagementMetrics = (): Promise<EngagementMetrics[]> => {
    const pipeline = [
        {
            $group: {
                _id: "$postType",
                avgLikes: {$avg: "$likes"},
                avgShare: {$avg: "$shares"},
                avgComments: {$avg: "$comments"},
                count: {$sum: 1}
            }
        }
    ];

    return EngagementModel.aggregate(pipeline);
}