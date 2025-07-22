import React from 'react';

export default function NotificationCard({ title, content, date, unread }) {
    return (
        <div className={`transition-all duration-300 p-4 mb-3 rounded-xl shadow-md border ${unread ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
            <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
            <p className="text-gray-600">{content}</p>
            <p className="text-sm text-right text-gray-400">{date}</p>
        </div>
    );
}
