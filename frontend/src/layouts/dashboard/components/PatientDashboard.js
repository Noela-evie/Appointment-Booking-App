import React, { useState, useEffect } from 'react';
import { appointmentApi, profileApi, patchApi, notificationApi } from '../../../appClient';
import { FaUserMd, FaCalendarAlt, FaInfoCircle, FaClock, FaPhone } from 'react-icons/fa';
import appointmentsBg from '../../../assets/images/appointmentsBg.jpg';
import bookAppointmentBg from '../../../assets/images/appointmentSection.jpg';

const PatientDashboard = () => {
  const userId = localStorage.getItem('id');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await profileApi.getUserProfile(userId);
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await appointmentApi.getuserAppointments(userId);
        setAppointments(response);
      } catch (error) {
        console.error(error);
        setAppointments([]);
      }
    };

    fetchUserProfile();
    fetchAppointments();
  }, [userId]);
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  
 // handleBookAppointment function
 const handleBookAppointment = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const availableDoctors = await appointmentApi.getDoctorAvailability(department, date, time);
    if (!availableDoctors || availableDoctors.length === 0) {
      alert("No doctors available at the selected time. Try another slot.");
      return;
    }
    const selectedDoctor = availableDoctors[Math.floor(Math.random() * availableDoctors.length)];
    const appointmentData = {
      date,
      time,
      patientName: name,
      patientPhone: phone,
      doctorName: selectedDoctor.name,
      doctorPhone: selectedDoctor.phone,
      department,
      reason,
      status: "upcoming",
      patient: userId,
      doctor: selectedDoctor._id,
    };
    await appointmentApi.postAppointment(selectedDoctor._id, userId, appointmentData);
    // Create notifications for both patient and doctor
    const patientNotificationData = {
      type: "message",
      message: `Your appointment is booked with Dr. ${selectedDoctor.name} at ${time} on ${date}.`,
      patient: userId,
    };
    await notificationApi.postAppointmentNotification(userId, patientNotificationData);
    const doctorNotificationData = {
      type: "message",
      message: `You have been booked for an appointment with ${name}, ${phone}, ${email} at ${time} on ${date}. Reason: ${reason}.`,
      doctor: selectedDoctor._id,
    };
    await notificationApi.postAppointmentNotification(selectedDoctor._id, doctorNotificationData);
    alert("Appointment booked successfully!");
    // Reset form fields
    setDepartment("");
    setDate("");
    setTime("");
    setReason("");
  } catch (error) {
    if (error.response.status === 400) {
      alert("This time is unavailable, change time or date please!");
    } else {
      console.error(error);
    }
  } finally {
    setLoading(false);
  }
};

const handleCancelAppointment = async (appointmentId) => {
  if (window.confirm("Are you sure you want to cancel this appointment?")) {
    try {
      await patchApi.patchAppointmentStatus(appointmentId);
      alert("Appointment cancelled successfully!");
    } catch (error) {
      console.error(error);
    }
  }
};
  return (
    <div className="container mx-auto py-6 px-4 animate_fadeIn">
      {/* Book Appointment Form */}
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        {/* Top Section with Image */}
        <div
          className="absolute inset-0 w-full h-48 md:h-60 bg-cover bg-center"
          style={{ backgroundImage: `url(${bookAppointmentBg})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <h2 className="absolute left-6 bottom-4 text-4xl md:text-5xl font-bold text-white z-10">
            Book Your Appointment
          </h2>
        </div>
        {/* Form Section */}
        <div className="pt-56 md:pt-72 px-6 md:px-12 pb-8">
          <form className="space-y-6" onSubmit={handleBookAppointment}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <label className="block text-lg font-medium mb-2">
                  Department:
                </label>
                <select
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Cardiology">Cardiology</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">
                  Date: CAN NOT BE A WEEKEND
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <label className="block text-lg font-medium mb-2">
                  Time:
                </label>
                <select
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                >
                  <option value="">Select Time</option>
                  <option value="8-10">8:00am-10:00am</option>
                  <option value="10-1">10:00am-1:00pm</option>
                  <option value="2-4">2:00pm-4:00pm</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">
                  Reason:
                </label>
                <textarea
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600"
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
    {/* Appointments */}
    <div className="md:col-span-2 relative bg-white rounded-lg shadow-lg p-6 overflow-hidden mb-8">
  <img src={appointmentsBg} alt="Appointments Background" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
  <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center relative z-10">
    <FaClock className="mr-3" />
    Appointments
  </h3>
  <div className="relative z-10">
    {appointments.filter(appointment => appointment.status === "upcoming").length > 0 ? (
      <ul className="space-y-6">
        {appointments.filter(appointment => appointment.status === "upcoming").map((appointment) => (
          <li key={appointment._id} className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              {/* Appointment Details */}
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <FaUserMd className="text-blue-500 mr-2" />
                  <p className="text-lg font-bold text-gray-800">
                    <b>Doctor:</b> {appointment.doctorName}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <FaCalendarAlt className="text-blue-500 mr-2" />
                  <p className="text-lg text-gray-600">
                    <b>Date:</b> {new Date(appointment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <FaClock className="text-blue-500 mr-2" />
                  <p className="text-lg text-gray-600">
                    <b>Time:</b> {appointment.time}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <FaInfoCircle className="text-blue-500 mr-2" />
                  <p className="text-lg text-gray-600">
                    <b>Reason:</b> {appointment.reason}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <FaPhone className="text-blue-500 mr-2" />
                  <p className="text-lg text-gray-600">
                    <b>Dr's Contact:</b> {appointment.doctorPhone}
                  </p>
                </div>
              </div>
              {/* Cancel Button */}
              <button onClick={() => handleCancelAppointment(appointment._id)} className="mt-4 md:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-600 transition duration-200">
                Cancel
              </button>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-lg text-gray-600">No upcoming appointments.</p>
    )}
  </div>
</div>
  </div>
);
};

export default PatientDashboard;