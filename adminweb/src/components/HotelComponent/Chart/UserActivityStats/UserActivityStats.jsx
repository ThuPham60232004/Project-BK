import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './UserActivityStats.css'; // For custom styles

const UserActivityStats = () => {
  const [activityStats, setActivityStats] = useState({ totalViews: 0, averageDuration: 0 });

  useEffect(() => {
    const fetchActivityStats = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/userActivity/getAllUserActivityStats');
        setActivityStats(response.data);
      } catch (error) {
        console.error("Error fetching user activity stats:", error);
      }
    };

    fetchActivityStats();
  }, []);

  const data = [
    { name: 'Tổng lượt view', value: activityStats.totalViews },
    { name: 'Trung bình (s)', value: activityStats.averageDuration }//Thời gian trung bình = Tổng thời gian của tất cả phiên hoạt động / Tổng số phiên hoạt động
  ];

  return (
    <div className="user-activity-stats">
      <h2>User Activity Statistics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityStats;
