import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-600">Total Students</h2>
                    <p className="text-3xl font-bold text-blue-600">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-600">Total Teachers</h2>
                    <p className="text-3xl font-bold text-green-600">56</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-600">Active Courses</h2>
                    <p className="text-3xl font-bold text-purple-600">89</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
