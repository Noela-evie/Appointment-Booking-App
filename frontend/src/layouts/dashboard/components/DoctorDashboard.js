import React, { useState, useEffect } from "react";
import { appointmentApi, eventApi } from "../../../appClient";
import { FaCalendarAlt, FaClock, FaBriefcaseMedical, FaCheckCircle, FaTimesCircle, FaTrash, FaUserAlt, FaPhoneAlt, FaNotesMedical} from "react-icons/fa";
import bookAppointmentBg from "../../../assets/images/appointmentSection.jpg";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [doctorEvents, setDoctorEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const doctorId = localStorage.getItem("id");

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await appointmentApi.getuserAppointments(doctorId);
      const upcoming = response.filter((appointment) => appointment.status === "upcoming");
      const cancelled = response.filter((appointment) => appointment.status === "cancelled");
      setUpcomingAppointments(upcoming);
      setCancelledAppointments(cancelled);
      setAppointments(response);
    };

    const fetchEvents = async () => {
      const response = await eventApi.getEvents(doctorId);
      setDoctorEvents(response);
    };

    fetchAppointments();
    fetchEvents();
  }, [doctorId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    eventApi
      .postEvent(doctorId, { eventName, eventDate, eventTime })
      .then(() => {
        setEventName("");
        setEventDate("");
        setEventTime("");
        alert("Event added successfully!");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("This time is unavailable, change time or date please!");
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div className="container mx-auto py-6 px-4 space-y-8">
      {/* Add Event Form */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Top Section with Image */}
        <div
          className="absolute inset-0 w-full h-48 md:h-60 bg-cover bg-center"
          style={{ backgroundImage: `url(${bookAppointmentBg})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <h2 className="absolute left-6 bottom-4 text-4xl md:text-5xl font-bold text-white z-10">
            Add Event
          </h2>
        </div>
        {/* Form Section */}
        <div className="pt-56 md:pt-72 px-6 md:px-12 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
                Event Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="eventName"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                Event Date:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
                Event Time:
              </label>
              <select
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
              >
                <option value="">Select Time</option>
                <option value="8-10">8:00am-10:00am</option>
                <option value="10-1">10:00am-1:00pm</option>
                <option value="2-4">2:00pm-4:00pm</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add An Event
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Upcoming Appointments */}
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
    <FaCalendarAlt className="mr-2" />
    Upcoming Appointments
  </h2>
  {upcomingAppointments.length === 0 ? (
    <p className="text-gray-500 flex items-center">
      <FaTimesCircle className="mr-2 text-red-500" />
      No upcoming appointments.
    </p>
  ) : (
    upcomingAppointments.map((appointment) => (
      <div key={appointment._id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-600" />
          <span className="font-semibold">Date:</span> {appointment.date}
        </p>
        <p className="flex items-center">
          <FaClock className="mr-2 text-blue-600" />
          <span className="font-semibold">Time:</span> {appointment.time}
        </p>
        <p className="flex items-center">
          <FaBriefcaseMedical className="mr-2 text-blue-600" />
          <span className="font-semibold">Department:</span> {appointment.department}
        </p>
        <p className="flex items-center">
          <FaCheckCircle className="mr-2 text-green-500" />
          <span className="font-semibold">Status:</span> {appointment.status}
        </p>
        <p className="flex items-center">
          <FaUserAlt className="mr-2 text-blue-600" />
          <span className="font-semibold">Patient's Name:</span> {appointment.patientName}
        </p>
        <p className="flex items-center">
          <FaPhoneAlt className="mr-2 text-blue-600" />
          <span className="font-semibold">Phone Number:</span> {appointment.patientPhone}
        </p>
        <p className="flex items-center">
          <FaNotesMedical className="mr-2 text-blue-600" />
          <span className="font-semibold">Reason:</span> {appointment.reason}
        </p>
      </div>
    ))
  )}
</div>

{/* //Cancelled Appointments */}
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
    <FaTimesCircle className="mr-2" />
    Cancelled Appointments
  </h2>
  {cancelledAppointments.length === 0 ? (
    <p className="text-gray-500 flex items-center">
      <FaTimesCircle className="mr-2 text-red-500" />
      No cancelled appointments.
    </p>
  ) : (
    cancelledAppointments.map((appointment) => (
      <div key={appointment._id} className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 shadow-sm">
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-red-600" />
          <span className="font-semibold">Date:</span> {appointment.date}
        </p>
        <p className="flex items-center">
          <FaClock className="mr-2 text-red-600" />
          <span className="font-semibold">Time:</span> {appointment.time}
        </p>
        <p className="flex items-center">
          <FaTimesCircle className="mr-2 text-red-500" />
          <span className="font-semibold">Status:</span> {appointment.status}
        </p>
        <p className="flex items-center">
          <FaUserAlt className="mr-2 text-red-600" />
          <span className="font-semibold">Patient's Name:</span> {appointment.patientName}
        </p>
      </div>
    ))
  )}
</div>

{/* Doctor Events */}
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
    <FaCalendarAlt className="mr-2" /> Events
  </h2>
  {doctorEvents.length === 0 ? (
    <p className="text-gray-500 flex items-center">
      <FaTimesCircle className="mr-2 text-red-500" /> No events available.
    </p>
  ) : (
    doctorEvents.map((event) => (
      <div
        key={event._id}
        className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4 shadow-sm relative"
      >
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-purple-600" />
          <span className="font-semibold">Event Name:</span> {event.eventName}
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-purple-600" />
          <span className="font-semibold">Event Date:</span> {event.eventDate}
        </p>
        <p className="flex items-center">
          <FaClock className="mr-2 text-purple-600" />
          <span className="font-semibold">Event Time:</span> {event.eventTime}
        </p>
        <button
          className="absolute bottom-4 right-4 text-red-600 hover:text-red-700"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this event?")) {
              eventApi.deleteEvent(event._id);
            }
          }}
        >
          <FaTrash size={20} />
        </button>
      </div>
    ))
  )}
</div>

  
</div>
  );
};

export default DoctorDashboard;