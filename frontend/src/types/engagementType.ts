export interface EngagementData {
    id: string;
    postType: string;
    likes: number;
    shares: number;
    comments: number;
    timestamp: number;
}

export interface EngagementMetrics {
    _id: string;
    avgLikes: number;
    avgShares: number;
    avgComments: number;
    count: number;
}