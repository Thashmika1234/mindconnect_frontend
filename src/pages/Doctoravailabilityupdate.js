import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DoctorSide() {
  const [date, setDate] = useState(new Date());

  // Availabilities: array of { place, times[] }
  const [availabilities, setAvailabilities] = useState([]);

  const times = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM",
    "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  // Add new availability block
  const addAvailability = () => {
    setAvailabilities([...availabilities, { place: "", times: [] }]);
  };

  // Update place for a block
  const updatePlace = (index, newPlace) => {
    const updated = [...availabilities];
    updated[index].place = newPlace;
    setAvailabilities(updated);
  };

  // Toggle time slot for a block
  const toggleTime = (index, time) => {
    const updated = [...availabilities];
    if (updated[index].times.includes(time)) {
      updated[index].times = updated[index].times.filter((t) => t !== time);
    } else {
      updated[index].times.push(time);
    }
    setAvailabilities(updated);
  };

  // Save all availability
  const handleSave = () => {
    const availabilityData = {
      date: date.toDateString(),
      slots: availabilities,
    };
    console.log("Doctor Availability Saved:", availabilityData);
    alert("Availability updated successfully!");
  };

  return (
    <div className="min-h-screen p-10 font-sans bg-gradient-to-b from-blue-400 to-blue-100">
      {/* Heading */}
      <h2 className="text-4xl text-white mb-8 font-bold">
        Doctor Availability Management
      </h2>

      <div className="flex gap-10">
        {/* Calendar */}
        <div className="flex-1 h-[70vh] bg-white p-5 rounded-2xl shadow-lg flex flex-col">
          <div className="flex-grow">
            <Calendar
              onChange={setDate}
              value={date}
              className="w-full h-full"
            />
          </div>
          <p className="text-lg text-green-900 font-bold mt-2">
            Selected Date: <strong>{date.toDateString()}</strong>
          </p>
        </div>

        {/* Availability Blocks */}
        <div className="w-2/3 bg-white p-5 rounded-2xl shadow-lg overflow-y-auto">
          <h3 className="text-2xl font-bold text-green-900 mb-4">
            Set Availability
          </h3>

          {availabilities.map((block, index) => (
            <div key={index} className="mb-6 p-4 border border-green-300 rounded-xl">
              {/* Place Selection */}
              <label className="block text-green-900 font-semibold mb-2">
                Choose Place
              </label>
              <select
                value={block.place}
                onChange={(e) => updatePlace(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              >
                <option value="">-- Select Place --</option>
                <option value="City Hospital">City Hospital</option>
                <option value="Downtown Clinic">Downtown Clinic</option>
                <option value="Online Consultation">Online Consultation</option>
              </select>

              {/* Time Slot Selection */}
              <h4 className="text-lg font-semibold text-green-900 mb-3">
                Available Time Slots
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {times.map((time, tIndex) => (
                  <label
                    key={tIndex}
                    className={`p-3 border rounded-lg cursor-pointer flex items-center gap-2
                      ${block.times.includes(time)
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-green-100 text-green-900 border-green-300 hover:bg-green-200"}`}
                  >
                    <input
                      type="checkbox"
                      checked={block.times.includes(time)}
                      onChange={() => toggleTime(index, time)}
                      className="w-4 h-4 accent-green-600"
                    />
                    {time}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Add another place button */}
          <button
            onClick={addAvailability}
            className="w-full bg-green-300 hover:bg-green-400 text-green-900 font-bold py-2 px-4 rounded-xl mb-5"
          >
            + Add Another Place
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-xl"
          >
            Save Availability
          </button>
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          .react-calendar {
            border: none;
            width: 100%;
            height: 100%;
          }

          .react-calendar__navigation__label {
            font-size: 2rem; 
            font-weight: bold;
            color: #004d00;
          }

          .react-calendar__tile {
            font-size: 1.25rem;
            font-weight: bold;
            padding: 0.75rem;
            margin: 0.25rem;
          }

          .react-calendar__tile--active {
            background: #004d00 !important;
            color: white !important;
          }

          .react-calendar__tile--now {
            background: #cceccc !important;
            border-radius: 0.5rem;
          }

          .react-calendar__tile:hover {
            background: #80d480 !important;
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
