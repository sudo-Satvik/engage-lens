import {Router} from 'express';
import {analyticsController} from '../controllers/analyticsController';
const router = Router();

router.route("/generate-mock-data").post(analyticsController.generateMockData);
router.route("/engagement-metrics").get(analyticsController.getEngagementMetrics);
router.route("/insights").get(analyticsController.getInsights);

export default router;