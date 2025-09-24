import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DoctorAvailability = () => {
  const [date, setDate] = useState(new Date());
  const [availabilities, setAvailabilities] = useState([]);
  const [places, setPlaces] = useState(["City Hospital", "Downtown Clinic", "Online Consultation"]);
  const [newPlace, setNewPlace] = useState("");

  const doctorId = localStorage.getItem("doctor_id") || 1; // replace fallback later

  const times = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  // Fetch availability for selected date
  useEffect(() => {
    const fetchAvailability = async () => {
      const formattedDate = date.toISOString().split("T")[0];
      try {
        const response = await fetch(
          `http://localhost/mindConnect/services/get_availability.php?doctor_id=${doctorId}&date=${formattedDate}`
        );
        const result = await response.json();
        if (result.status === "success") {
          setAvailabilities(result.data);
        } else {
          setAvailabilities([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAvailability();
  }, [date, doctorId]);

  // Toggle times
  const toggleTime = (index, time) => {
    const newAvailabilities = [...availabilities];
    if (!newAvailabilities[index].times) {
      newAvailabilities[index].times = [];
    }
    if (newAvailabilities[index].times.includes(time)) {
      newAvailabilities[index].times = newAvailabilities[index].times.filter(
        (t) => t !== time
      );
    } else {
      newAvailabilities[index].times.push(time);
    }
    setAvailabilities(newAvailabilities);
  };

  // Update place
  const updatePlace = (index, place) => {
    const newAvailabilities = [...availabilities];
    newAvailabilities[index].place = place;
    setAvailabilities(newAvailabilities);
  };

  // Add new availability block
  const addAvailability = () => {
    setAvailabilities([...availabilities, { place: "", times: [] }]);
  };

  // Add new place
  const handleAddPlace = () => {
    if (newPlace.trim() !== "" && !places.includes(newPlace.trim())) {
      setPlaces([...places, newPlace.trim()]);
      setNewPlace("");
    }
  };

  // Save availability
  const handleSave = async () => {
    const availabilityData = {
      doctor_id: doctorId,
      date: date.toISOString().split("T")[0],
      slots: availabilities,
    };

    try {
      const response = await fetch("http://localhost/mindConnect/services/save_availability.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(availabilityData),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Availability updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen p-5 sm:p-10 font-sans bg-gradient-to-b from-blue-400 to-blue-100">
      <h2 className="text-2xl sm:text-4xl text-white mb-6 sm:mb-8 font-bold text-center sm:text-left">
        Doctor Availability Management
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Calendar */}
        <div className="flex-1 h-[60vh] sm:h-[70vh] bg-white p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col">
          <div className="flex-grow">
            <Calendar onChange={setDate} value={date} className="w-full h-full" />
          </div>
          <p className="text-base sm:text-lg text-green-900 font-bold mt-2 text-center sm:text-left">
            Selected Date: <strong>{date.toDateString()}</strong>
          </p>
        </div>

        {/* Availability Blocks */}
        <div className="w-full lg:w-2/3 bg-white p-4 sm:p-5 rounded-2xl shadow-lg overflow-y-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-4 text-center sm:text-left">
            Set Availability
          </h3>

          {/* Add Place */}
          <div className="mb-5 flex gap-3">
            <input
              type="text"
              value={newPlace}
              onChange={(e) => setNewPlace(e.target.value)}
              placeholder="Enter new place"
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleAddPlace}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 rounded-lg"
            >
              Add
            </button>
          </div>

          {availabilities.map((block, index) => (
            <div key={index} className="mb-6 p-4 border border-green-300 rounded-xl">
              <label className="block text-green-900 font-semibold mb-2">
                Choose Place
              </label>
              <select
                value={block.place}
                onChange={(e) => updatePlace(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              >
                <option value="">-- Select Place --</option>
                {places.map((place, idx) => (
                  <option key={idx} value={place}>
                    {place}
                  </option>
                ))}
              </select>

              <h4 className="text-lg font-semibold text-green-900 mb-3">
                Available Time Slots
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {times.map((time, tIndex) => (
                  <label
                    key={tIndex}
                    className={`p-3 border rounded-lg cursor-pointer flex items-center gap-2 text-sm sm:text-base
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

          <button
            onClick={addAvailability}
            className="w-full bg-green-300 hover:bg-green-400 text-green-900 font-bold py-2 px-4 rounded-xl mb-5"
          >
            + Add Another Place
          </button>

          <button
            onClick={handleSave}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-xl"
          >
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
