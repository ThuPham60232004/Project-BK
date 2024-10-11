import UserActivity from "../models/UserActivity.js";

export const logUserActivity = async (req, res, next) => {
    const userId = req.body.userId; // Nhận userId từ body thay vì req.userId
    const pageUrl = req.originalUrl; 
    const duration = req.body.duration || 0; 

    if (!userId) {
      return res.status(400).send({ message: 'User ID is required' });
    }

    const activity = new UserActivity({
      userId,
      pageUrl,
      duration,
    });

    console.log('Logging activity for user:', userId, 'at path:', pageUrl, 'with duration:', duration);

    try {
      await activity.save();
      res.status(200).send({ message: 'Activity logged successfully' });
    } catch (err) {
      console.error('Error saving activity:', err);
      next(err);
    }
};


// Thống kê lượt view và thời gian trung bình
export const getUserActivityStats = async (req, res, next) => {
    try {
      const userId = req.params.id;
      
      const totalViews = await UserActivity.countDocuments({ userId });

      const avgDuration = await UserActivity.aggregate([
        { $match: { userId: userId } },
        { $group: { _id: null, averageDuration: { $avg: "$duration" } } },
      ]);
  
      res.status(200).json({
        totalViews,
        averageDuration: avgDuration.length ? avgDuration[0].averageDuration : 0,
      });
    } catch (err) {
      next(err);
    }
  };
  