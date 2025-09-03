import React, { useState, useMemo, useEffect } from 'react';
import { Bell, MessageSquare, CheckCircle, RefreshCw, AlertTriangle, XCircle, Trash2, Loader } from 'lucide-react'; // Importing additional icons

// NotificationCard component remains the same, but included here for completeness
function NotificationCard({ notification, onToggleRead }) {
    const { id, title, content, date, unread, type } = notification;

    const handleToggle = () => {
        onToggleRead(id);
    };

    // Function to get a color and icon for the type badge based on a consultant's context
    const getTypeDetails = (type) => {
        switch (type) {
            case 'Consultation Reminder': return { color: 'bg-purple-100 text-purple-800', icon: <Bell size={14} /> };
            case 'User Response': return { color: 'bg-blue-100 text-blue-800', icon: <MessageSquare size={14} /> };
            case 'Feedback': return { color: 'bg-pink-100 text-pink-800', icon: <CheckCircle size={14} /> };
            case 'System Update': return { color: 'bg-indigo-100 text-indigo-800', icon: <RefreshCw size={14} /> };
            case 'Alert': return { color: 'bg-red-100 text-red-800', icon: <AlertTriangle size={14} /> };
            default: return { color: 'bg-gray-100 text-gray-800', icon: <Bell size={14} /> };
        }
    };

    const { color: typeColor, icon: typeIcon } = getTypeDetails(type);

    return (
        <div
            className={`relative p-5 border border-gray-200 rounded-xl shadow-md transform hover:scale-[1.005] hover:shadow-lg transition-all duration-300 ease-in-out
        ${unread ? 'bg-purple-50 ring-2 ring-purple-300' : 'bg-white hover:bg-gray-50'}`}
        >
            {unread && (
                <span className="absolute top-3 right-3 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
            )}
            <div className="flex items-center justify-between mb-2">
                <h3 className={`text-xl font-semibold ${unread ? 'text-purple-800' : 'text-gray-900'}`}>{title}</h3>
                <span className="text-sm text-gray-500">{date}</span>
            </div>
            <p className="text-gray-700 mb-3 leading-relaxed">{content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium space-x-1 ${typeColor}`}>
                    {typeIcon} <span>{type}</span>
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

// ConfirmationModal component for user confirmations
function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}


export default function CounsellorNotification() {
    const [notifications, setNotifications] = useState([]); // Start with empty for loading simulation
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null); // 'markAll' or 'clearRead'

    // Simulate fetching notifications
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setNotifications([
                { id: 1, title: "Consultation Reminder", content: "Upcoming session with Client A at 5 PM today. Please review the pre-session notes.", date: "Jul 22, 2025", unread: true, type: "Consultation Reminder" },
                { id: 2, title: "User Response", content: "A user replied to your advice on the 'Project Planning' forum. Check their latest comment.", date: "Jul 21, 2025", unread: false, type: "User Response" },
                { id: 3, title: "Feedback Received", content: "New feedback submitted for your recent report. It's positive!", date: "Jul 20, 2025", unread: true, type: "Feedback" },
                { id: 4, title: "System Update Available", content: "A new feature update for the dashboard is now available. Explore the new analytics tools.", date: "Jul 20, 2025", unread: true, type: "System Update" },
                { id: 5, title: "New Inquiry", content: "A potential client has submitted a new inquiry. Review details in the CRM.", date: "Jul 19, 2025", unread: false, type: "Alert" },
                { id: 6, title: "Meeting Rescheduled", content: "Your meeting with the marketing team has been rescheduled to tomorrow.", date: "Jul 18, 2025", unread: false, type: "Consultation Reminder" },
                { id: 7, title: "Document Shared", content: "Client B has shared new project documents for your review.", date: "Jul 17, 2025", unread: true, type: "User Response" },
                { id: 8, title: "Payment Confirmation", content: "Your recent invoice #12345 has been paid successfully.", date: "Jul 16, 2025", unread: false, type: "System Update" },
            ]);
            setIsLoading(false);
        }, 1500); // Simulate network delay
        return () => clearTimeout(timer);
    }, []);

    // Function to toggle the unread status of a notification
    const toggleReadStatus = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, unread: !n.unread } : n
        ));
    };

    // Functions to handle modal confirmations
    const handleMarkAllConfirm = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
        setModalOpen(false);
    };

    const handleClearReadConfirm = () => {
        setNotifications(notifications.filter(n => n.unread));
        setModalOpen(false);
    };

    const openMarkAllModal = () => {
        setModalAction('markAll');
        setModalOpen(true);
    };

    const openClearReadModal = () => {
        setModalAction('clearRead');
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalAction(null);
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

    // Calculate unread count
    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-50 py-10 font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Header Section */}
                <div className="py-6 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Your Notifications</h1>
                        <p className="text-gray-600">Stay informed about your consultations, client responses, and system updates.</p>
                    </div>
                    <div className="relative">
                        <Bell size={48} className="text-purple-500 opacity-75 hidden sm:block" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                </div>

                {/* Controls Section */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="text"
                        placeholder="Search notifications..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="flex items-center space-x-3 flex-wrap justify-center sm:justify-end">
                        <select
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Unread">Unread</option>
                            <option value="Consultation Reminder">Consultation Reminders</option>
                            <option value="User Response">User Responses</option>
                            <option value="Feedback">Feedback</option>
                            <option value="System Update">System Updates</option>
                            <option value="Alert">Alerts</option>
                        </select>

                        <button
                            onClick={openMarkAllModal}
                            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out whitespace-nowrap"
                        >
                            Mark All as Read
                        </button>

                        <button
                            onClick={openClearReadModal}
                            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-150 ease-in-out whitespace-nowrap flex items-center space-x-2"
                        >
                            <Trash2 size={18} /> <span>Clear Read</span>
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="py-6 space-y-4">
                    {isLoading ? (
                        // Skeleton Loader
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="p-5 border border-gray-200 rounded-xl shadow-md bg-white animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))
                    ) : filteredNotifications.length > 0 ? (
                        filteredNotifications.map((n) => (
                            <NotificationCard
                                key={n.id}
                                notification={n} // Pass the entire notification object
                                onToggleRead={toggleReadStatus} // Pass the toggle function
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <XCircle size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-lg font-medium">No notifications found.</p>
                            <p className="text-sm">Try adjusting your search or filter.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalOpen}
                title={modalAction === 'markAll' ? 'Confirm Mark All as Read' : 'Confirm Clear Read Notifications'}
                message={modalAction === 'markAll' ? 'Are you sure you want to mark all notifications as read?' : 'Are you sure you want to clear all read notifications? This action cannot be undone.'}
                onConfirm={modalAction === 'markAll' ? handleMarkAllConfirm : handleClearReadConfirm}
                onCancel={closeModal}
            />
        </div>
    );
}
