import { db } from "../config/database";
import {EngagementData, EngagementMetrics} from '../types/index';


const collection = db.collection("social_media_engagement");

export const EngagementModel = {
    insertMany: async (data: EngagementData[]) => {
        return await collection.insertMany(data);
    },
    find: async (query: object = {}) => {
        return await collection.find(query).toArray();
    },
    aggregate: async (pipeline: object[]): Promise<EngagementMetrics[]> => {
        const result = await collection.find({}).toArray();
        // Perform aggregation in memory
        const grouped = result.reduce((acc, item) => {
            if (!acc[item.postType]) {
                acc[item.postType] = {
                    _id: item.postType,
                    totalLikes: 0,
                    totalShares: 0,
                    totalComments: 0,
                    count: 0
                };
            }
            acc[item.postType].totalLikes += item.likes;
            acc[item.postType].totalShares += item.shares;
            acc[item.postType].totalComments += item.comments;
            acc[item.postType].count++;
            return acc;
        }, {} as Record<string, any>);

        return Object.values(grouped).map(group => ({
            _id: group._id,
            avgLikes: group.totalLikes / group.count,
            avgShares: group.totalShares / group.count,
            avgComments: group.totalComments / group.count,
            count: group.count
        }));
    }
};