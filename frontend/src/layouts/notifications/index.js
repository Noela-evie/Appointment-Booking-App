import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { notificationApi } from "../../appClient";
import { FaCheckDouble } from "react-icons/fa";

function Notifications() {
  const userId = localStorage.getItem("id");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await notificationApi.getNotifications(userId);
        setNotifications(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [userId]);

  const handleNotificationClick = async (notificationId) => {
    const notification = notifications.find((n) => n._id === notificationId);
    if (!notification.read) {
      try {
        await notificationApi.markNotificationAsRead(notificationId);
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === notificationId
              ? { ...notification, read: true }
              : notification
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="py-3 animate_animated animate_fadeIn">
        <div className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 mb-6">
          <h2 className="text-3xl font-semibold text-white">Notifications</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center">
              <p className="text-lg font-semibold">Loading...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="text-lg font-semibold text-gray-500">
                You have no notifications.
              </p>
            </div>
          ) : (
            notifications
              .slice()
              .reverse()
              .map((notification) => (
                <div
                  key={notification._id}
                  className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105"
                  onClick={() => handleNotificationClick(notification._id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-blue-600">
                      {notification.title || "Notification"}
                    </h3>
                    <FaCheckDouble
                      className={`text-lg ${
                        notification.readStatus ? "text-blue-600" : "text-gray-400"
                      }`}
                      title={notification.readStatus ? "true" : "false"}
                    />
                  </div>
                  <p className="text-lg mb-4">{notification.message}</p>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(notification.created_at)}
                  </p>
                </div>
              ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Notifications;