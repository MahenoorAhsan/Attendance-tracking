import React from "react";
export const Dashboard = () => {
    return (
      <div className="p-4">
        <div  className="p-6 bg-white shadow-xl mt-4">
              <p className="text-2xl">👋 Welcome to the Attendance Tracker Dashboard!</p>
              <p className="ml-6 text-lg">Easily monitor, manage, and sync attendance records in real-time.</p>

          <div className="flex-col text-lg p-4 mt-4">
              <p>✅ View daily summaries</p>
              <p>✅ Sync data seamlessly</p>
              <p>✅ Stay updated with the latest reports</p>
          </div>
        </div>
      </div>
    );
  };