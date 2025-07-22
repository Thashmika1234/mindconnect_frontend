import React, { useState, useMemo } from 'react';


function NotificationCard({ notification, onToggleRead }) {
    const { id, title, content, date, unread, type } = notification;

    const handleToggle = () => {
        onToggleRead(id);
    };


    const getTypeColor = (type) => {
        switch (type) {
            case 'Appointment': return 'bg-green-100 text-green-800';
            case 'Patient Message': return 'bg-blue-100 text-blue-800';
            case 'Lab Result': return 'bg-purple-100 text-purple-800';
            case 'Reminder': return 'bg-yellow-100 text-yellow-800';
            case 'System Alert': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div
            className={`relative p-5 border border-gray-200 rounded-xl shadow-sm transition-all duration-300 ease-in-out
        ${unread ? 'bg-green-50 ring-2 ring-green-200' : 'bg-white hover:bg-gray-50'}`}
        >
            {unread && (
                <span className="absolute top-3 right-3 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
            )}
            <div className="flex items-center justify-between mb-2">
                <h3 className={`text-xl font-semibold ${unread ? 'text-green-800' : 'text-gray-900'}`}>{title}</h3>
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
            ${unread ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-400 hover:bg-gray-500'}`}
                >
                    {unread ? 'Mark as Read' : 'Mark as Unread'}
                </button>
            </div>
        </div>
    );
}


export default function DoctorNotifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, title: "New Appointment", content: "Patient John Doe has booked a session for 3 PM today.", date: "Jul 22, 2025", unread: true, type: "Appointment" },
        { id: 2, title: "Patient Message", content: "Patient Jane Smith sent a message regarding her medication.", date: "Jul 21, 2025", unread: false, type: "Patient Message" },
        { id: 3, title: "Lab Result Ready", content: "New lab results for patient Emily White are available for review.", date: "Jul 20, 2025", unread: true, type: "Lab Result" },
        { id: 4, title: "Reminder: Daily Rounds", content: "Don't forget your daily patient rounds at 9 AM.", date: "Jul 20, 2025", unread: true, type: "Reminder" },
        { id: 5, title: "System Alert", content: "Database maintenance scheduled for tonight at 1 AM.", date: "Jul 19, 2025", unread: false, type: "System Alert" },
        { id: 6, title: "Follow-up Request", content: "Patient Michael Brown requires a follow-up consultation.", date: "Jul 18, 2025", unread: false, type: "Appointment" },
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
                    <p className="text-gray-600">Manage your appointments, patient messages, and system alerts.</p>
                </div>

                {/* Controls Section */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="text"
                        placeholder="Search notifications..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="flex items-center space-x-3">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Unread">Unread</option>
                            <option value="Appointment">Appointments</option>
                            <option value="Patient Message">Patient Messages</option>
                            <option value="Lab Result">Lab Results</option>
                            <option value="Reminder">Reminders</option>
                            <option value="System Alert">System Alerts</option>
                        </select>

                        <button
                            onClick={markAllAsRead}
                            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out whitespace-nowrap"
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
