import { v4 as uuidv4 } from "uuid";
import { EngagementModel } from "../models/engagementModel";
import { EngagementData, EngagementMetrics } from "../types/index";
import { getCollection } from "../config/database";
import {createObjectCsvWriter} from 'csv-writer';

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const csvWriter = createObjectCsvWriter({
  path: 'engagement_data.csv',
  header: [
    {id: 'id', title: 'ID'},
    {id: 'postType', title: 'Post_Types'},
    {id: 'likes', title: 'Likes'},
    {id: 'shares', title: 'Shares'},
    {id: 'comments', title: 'Comments'},
    {id: 'timestamp', title: 'Timestamp'},
  ],
});

export const generateMockData = async (
  count: number = 200
): Promise<EngagementData[]> => {
  const postTypes = ["static", "reel", "carousel"];
  const mockData: EngagementData[] = [];
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate());


  for (let i = 0; i < count; i++) {
    mockData.push({
      id: uuidv4(),
      postType: postTypes[Math.floor(Math.random() * postTypes.length)],
      likes: Math.floor(Math.random() * 1000),
      shares: Math.floor(Math.random() * 200),
      comments: Math.floor(Math.random() * 100),
      timestamp: generateRandomDate(startDate, endDate).getTime(),
    });
  }

  try {
    await EngagementModel.insertMany(mockData);
    console.log("Mock data inserted into DB successfully");

    await csvWriter.writeRecords(mockData);
    console.log("Mock data written to CSV successfully");

    return mockData;
  } catch (error) {
    console.error("Error writing CSV:", error);
    throw error;
  }
};


export const getEngagementMetrics = (): Promise<EngagementMetrics[]> => {
  const pipeline = [
    {
      $group: {
        _id: "$postType",
        avgLikes: { $avg: "$likes" },
        avgShares: { $avg: "$shares" },
        avgComments: { $avg: "$comments" },
        count: { $sum: 1 },
      },
    },
  ];

  return EngagementModel.aggregate(pipeline);
};

export const getAllPost = async () => {
  const collection = getCollection("engagement_metrics");
  const result = await collection.find({}).toArray();
  return result;
};
