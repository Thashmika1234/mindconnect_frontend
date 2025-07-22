import React, { useState, useMemo } from 'react';

// Define the NotificationCard component directly within this file for simplicity
// In a real project, you would keep it in its own file as '../components/NotificationCard'
function NotificationCard({ notification, onToggleRead }) {
    const { id, title, content, date, unread, type } = notification;

    const handleToggle = () => {
        onToggleRead(id);
    };

    // Function to get a color for the type badge
    const getTypeColor = (type) => {
        switch (type) {
            case 'Alert': return 'bg-red-100 text-red-800';
            case 'Comment': return 'bg-green-100 text-green-800';
            case 'Update': return 'bg-purple-100 text-purple-800';
            case 'Message': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div
            className={`relative p-5 border border-gray-200 rounded-xl shadow-sm transition-all duration-300 ease-in-out
        ${unread ? 'bg-blue-50 ring-2 ring-blue-200' : 'bg-white hover:bg-gray-50'}`}
        >
            {unread && (
                <span className="absolute top-3 right-3 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
            )}
            <div className="flex items-center justify-between mb-2">
                <h3 className={`text-xl font-semibold ${unread ? 'text-blue-800' : 'text-gray-900'}`}>{title}</h3>
                <span className="text-sm text-gray-500">{date}</span>
            </div>
            <p className="text-gray-700 mb-3 leading-relaxed">{content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
                    {type}
                </span>
                <button
                    onClick={handleToggle}
                    className={`px-3 py-1 rounded-md text-white font-medium transition-colors duration-200
            ${unread ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 hover:bg-gray-500'}`}
                >
                    {unread ? 'Mark as Read' : 'Mark as Unread'}
                </button>
            </div>
        </div>
    );
}


export default function App() { // Renamed to App for direct rendering in Canvas
    const [notifications, setNotifications] = useState([
        { id: 1, title: "Reply from Dr. Smith", content: "Hi, I’ve reviewed your concern and will get back to you by end of day.", date: "Jul 21, 2025", unread: true, type: "Alert" },
        { id: 2, title: "Community Comment", content: "Another user replied to your question in the 'General Discussion' forum.", date: "Jul 20, 2025", unread: false, type: "Comment" },
        { id: 3, title: "System Update Available", content: "A new version of our platform is now available with exciting features and bug fixes!", date: "Jul 19, 2025", unread: true, type: "Update" },
        { id: 4, title: "New Message from Support", content: "We've received your inquiry regarding your recent order and will assign a team member shortly.", date: "Jul 18, 2025", unread: false, type: "Message" },
        { id: 5, title: "Reminder: Upcoming Appointment", content: "You have an appointment scheduled for tomorrow at 10 AM with Dr. Lee.", date: "Jul 17, 2025", unread: true, type: "Alert" },
        { id: 6, title: "New Follower Notification", content: "John Doe started following your profile.", date: "Jul 16, 2025", unread: false, type: "Comment" },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    // Function to toggle the unread status of a notification
    const toggleReadStatus = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, unread: !n.unread } : n
        ));
    };

    // Function to mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    // Memoized filtered notifications for performance
    const filteredNotifications = useMemo(() => {
        return notifications.filter(notification => {
            const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterType === 'All' ||
                (filterType === 'Unread' && notification.unread) ||
                (filterType === notification.type);
            return matchesSearch && matchesFilter;
        });
    }, [notifications, searchTerm, filterType]);

    return (
        <div className="min-h-screen bg-gray-50 py-10 font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Header Section */}
                <div className="py-6 border-b border-gray-200">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Your Notifications</h1>
                    <p className="text-gray-600">Stay up-to-date with your important alerts and updates.</p>
                </div>

                {/* Controls Section */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="text"
                        placeholder="Search notifications..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="flex items-center space-x-3">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Unread">Unread</option>
                            <option value="Alert">Alerts</option>
                            <option value="Comment">Comments</option>
                            <option value="Update">Updates</option>
                            <option value="Message">Messages</option>
                        </select>

                        <button
                            onClick={markAllAsRead}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out whitespace-nowrap"
                        >
                            Mark All as Read
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="py-6 space-y-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((n) => (
                            <NotificationCard
                                key={n.id}
                                notification={n} // Pass the entire notification object
                                onToggleRead={toggleReadStatus} // Pass the toggle function
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p className="text-lg font-medium">No notifications found.</p>
                            <p className="text-sm">Try adjusting your search or filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
