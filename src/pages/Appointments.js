import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Appointment() {
  const [date, setDate] = useState(new Date());

  // Placeholder doctor availability (time + place)
  const slots = [
    { time: "09:00 AM", place: "City Hospital" },
    { time: "10:00 AM", place: "City Hospital" },
    { time: "11:00 AM", place: "City Hospital" },
    { time: "12:00 PM", place: "Downtown Clinic" },
    { time: "01:00 PM", place: "Downtown Clinic" },
    { time: "02:00 PM", place: "Online Consultation" },
    { time: "03:00 PM", place: "Online Consultation" },
    { time: "04:00 PM", place: "City Hospital" },
    { time: "05:00 PM", place: "Downtown Clinic" }
  ];

  return (
    <div className="min-h-screen p-10 font-sans 
                    bg-gradient-to-b from-blue-400 to-blue-100">
      {/* Heading */}
      <h2 className="text-4xl text-white mb-8 font-bold">
        Select an Appointment Date
      </h2>

      {/* Flex container for calendar + timetable */}
      <div className="flex space-x-10">
        
        {/* Calendar container (left side) */}
        <div className="w-3/4 h-[70vh] bg-white p-5 rounded-2xl shadow-lg flex flex-col">
          <div className="flex-grow">
            <Calendar
              onChange={setDate}
              value={date}
              className="w-full h-full"
            />
          </div>
          {/* Selected date */}
          <p className="text-xl text-blue-900 font-bold mt-0">
            Selected Date: <strong>{date.toDateString()}</strong>
          </p>
        </div>

        {/* Timetable (right side) */}
        <div className="w-1/4 bg-white p-5 rounded-2xl shadow-lg overflow-y-auto">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Available Slots</h3>
          <ul className="space-y-3">
            {slots.map((slot, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 bg-blue-100 text-blue-900 font-semibold rounded-lg cursor-pointer hover:bg-blue-200"
              >
                <span>{slot.time}</span>
                <span className="text-sm text-gray-700 italic">{slot.place}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Custom CSS for calendar styling */}
      <style>
        {`
          .react-calendar {
            border: none;
            width: 100%;
            height: 100%;
          }

          .react-calendar__navigation__label {
            font-size: 1.75rem; /* month/year size */
            font-weight: bold;
            color: #004080;
          }

          .react-calendar__tile {
            font-size: 1.25rem;
            font-weight: bold;
            padding: 0.75rem;
            margin: 0.25rem;
          }

          .react-calendar__tile--active {
            background: #004080 !important;
            color: white !important;
          }

          .react-calendar__tile--now {
            background: #cce0ff !important;
            border-radius: 0.5rem;
          }

          .react-calendar__tile:hover {
            background: #80b3ff !important;
            color: white;
            border-radius: 0.5rem;
          }

          .react-calendar__month-view__days__row {
            height: 60px;
          }
        `}
      </style>
    </div>
  );
}
