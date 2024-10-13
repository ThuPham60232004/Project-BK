import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './UserActivityStats.css';

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
    { name: 'Trung bình (s)', value: activityStats.averageDuration }
  ];

  return (
    <div className="userActivityStats">
      <h2>Thống Kê Hoạt Động Người Dùng</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4a90e2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityStats;
