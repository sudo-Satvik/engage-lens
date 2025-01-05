import { db } from "../config/database";
import { EngagementData, EngagementMetrics } from '../types/index';

const COLLECTION_NAME = 'engagement_metrics';

// Define an interface for the accumulator object
interface AccumulatorType {
    [key: string]: {
        _id: string;
        avgLikes: number;
        avgShares: number;
        avgComments: number;
        count: number;
    }
}

export const EngagementModel = {
    insertMany: async (documents: EngagementData[]) => {
        const collection = db.collection(COLLECTION_NAME);
        const insertPromises = documents.map(doc => collection.insertOne(doc));
        return Promise.all(insertPromises);
    },

    aggregate: async (pipeline: object[]): Promise<EngagementMetrics[]> => {
        const collection = db.collection(COLLECTION_NAME);
        
        return collection.find({}).toArray().then(documents => {
            // Specify the accumulator type
            return documents.reduce<AccumulatorType>((acc, doc) => {
                const postType = doc.postType as string;
                if (!acc[postType]) {
                    acc[postType] = {
                        _id: postType,
                        avgLikes: 0,
                        avgShares: 0,
                        avgComments: 0,
                        count: 0
                    };
                }
                acc[postType].avgLikes += doc.likes;
                acc[postType].avgShares += doc.shares;
                acc[postType].avgComments += doc.comments;
                acc[postType].count++;
                return acc;
            }, {});
        }).then(grouped => {
            return Object.values(grouped).map(group => ({
                ...group,
                avgLikes: group.avgLikes / group.count,
                avgShares: group.avgShares / group.count,
                avgComments: group.avgComments / group.count
            }));
        });
    }
};