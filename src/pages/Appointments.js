import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Appointment() {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const doctorId = 1; // TODO: Replace with logged-in doctor's ID

  // Fetch available slots whenever date changes
  useEffect(() => {
    const fetchSlots = async () => {
      const formattedDate = date.toISOString().split("T")[0];
      try {
        const response = await fetch(
          `http://localhost/mindConnect/services/fetch_slots.php?doctor_id=${doctorId}&date=${formattedDate}`
        );
        const result = await response.json();
        if (result.status === "success") {
          setSlots(result.data);
        } else {
          setSlots([]);
        }
      } catch (error) {
        console.error("Failed to fetch slots:", error);
        setSlots([]);
      }
    };
    fetchSlots();
  }, [date]);

  // Book selected slot
  const handleBook = async () => {
    if (!selectedSlot) {
      alert("Please select a slot first!");
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];

    try {
      const response = await fetch(
        "http://localhost/mindConnect/services/book_appointment.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctor_id: doctorId,
            date: formattedDate,
            slot: selectedSlot.time,
          }),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        alert("Appointment booked successfully!");
        setSelectedSlot(null);
        // Refresh slots after booking
        setSlots(slots.filter((s) => s.time !== selectedSlot.time));
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen p-5 sm:p-10 font-sans bg-gradient-to-b from-blue-400 to-blue-100">
      <h2 className="text-2xl sm:text-4xl text-white mb-6 sm:mb-8 font-bold text-center sm:text-left">
        Select an Appointment Date
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Calendar */}
        <div className="flex-1 h-[60vh] sm:h-[70vh] bg-white p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col">
          <div className="flex-grow">
            <Calendar onChange={setDate} value={date} className="w-full h-full" />
          </div>
          <p className="text-base sm:text-lg text-blue-900 font-bold mt-2 text-center sm:text-left">
            Selected Date: <strong>{date.toDateString()}</strong>
          </p>
        </div>

        {/* Available slots */}
        <div className="w-full lg:w-1/3 bg-white p-4 sm:p-5 rounded-2xl shadow-lg overflow-y-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4 text-center sm:text-left">
            Available Slots
          </h3>

          {slots.length === 0 ? (
            <p className="text-gray-700 italic">No slots available for this date.</p>
          ) : (
            <ul className="space-y-3">
              {slots.map((slot, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg cursor-pointer border ${
                    selectedSlot === slot
                      ? "bg-blue-600 text-white border-blue-700"
                      : "bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  <span>{slot.time}</span>
                  <span className="text-sm text-gray-700 italic">{slot.place}</span>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={handleBook}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-xl mt-5"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
