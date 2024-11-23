import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { adminApi, appointmentApi } from '../../../appClient';
import { Chart, registerables } from 'chart.js';
import {
  FaCalendarAlt,
  FaTimesCircle,
  FaClock,
  FaBriefcaseMedical,
  FaCheckCircle,
  FaUserAlt,
  FaPhoneAlt,
  FaNotesMedical,
} from 'react-icons/fa';

Chart.register(...registerables);

const AdminDashboard = () => {
  const [doctors, setDoctors] = React.useState([]);
  const [patients, setPatients] = React.useState([]);
  const [allAppointments, setAllAppointments] = React.useState([]);
  const [appointments, setAppointments] = React.useState({
    cancelled: [],
    upcoming: [],
    successful: [],
  });
  const [filteredDoctors, setFilteredDoctors] = React.useState([]);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      const data = await appointmentApi.getAllAppointments();
      setAllAppointments(data);
      const groupedAppointments = data.reduce(
        (acc, appointment) => {
          if (!acc[appointment.status]) {
            acc[appointment.status] = [];
          }
          acc[appointment.status].push(appointment);
          return acc;
        },
        {
          cancelled: [],
          upcoming: [],
          successful: [],
        }
      );
      setAppointments(groupedAppointments);
    };
    adminApi.getAllDoctors().then((data) => setDoctors(data));
    adminApi.getAllUsers().then((data) => setPatients(data));
    fetchAppointments();
  }, []);

  const handleFilterDoctors = (department) => {
    const filtered = doctors.filter((doctor) => doctor.department === department);
    setFilteredDoctors(filtered);
  };

  // Graph Data
  const lineGraphData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Total Appointments',
        data: allAppointments.reduce((acc, appointment) => {
          const month = new Date(appointment.date).getMonth();
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, []),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barGraphData = {
    labels: doctors.map((doctor) => doctor.department),
    datasets: [
      {
        label: 'Appointments by Department',
        data: doctors.map((doctor) => {
          const appointmentsForDoctor = allAppointments.filter((appointment) => appointment.doctorId === doctor._id);
          return appointmentsForDoctor.length;
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieGraphData = {
    labels: ['Upcoming', 'Cancelled', 'Successful'],
    datasets: [
      {
        label: 'Appointment Status Distribution',
        data: [
          appointments.upcoming.length,
          appointments.cancelled.length,
          appointments.successful.length,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Admin Dashboard</h1>

      {/* Doctors Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Doctors</h2>
        <select
          className="form-select mb-4 p-2 border rounded-md"
          onChange={(e) => handleFilterDoctors(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="General Medicine">General Medicine</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Cardiology">Cardiology</option>
        </select>
        {filteredDoctors.length === 0 ? (
          <p className="text-gray-500">No doctors available for this department.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
              <p className="font-bold text-blue-600">{doctor.name}</p>
              <p className="text-gray-700">Department: {doctor.department}</p>
              <p className="text-gray-700">Phone: {doctor.phone}</p>
            </div>
          ))
        )}
      </div>

      {/* Patients Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Patients</h2>
        {patients.length === 0 ? (
          <p className="text-gray-500">No patients found.</p>
        ) : (
          patients.map((patient) => (
            <div key={patient._id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
              <p className="font-bold text-blue-600">{patient.name}</p>
              <p className="text-gray-700">Email: {patient.email}</p>
              <p className="text-gray-700">Phone: {patient.phone}</p>
            </div>
          ))
        )}
      </div>

      {/* Appointments Section */}
      {['Upcoming', 'Cancelled', 'Successful'].map((type) => {
        const appointmentType = appointments[type.toLowerCase()];
        const color = type === 'Cancelled' ? 'text-red-500' : type === 'Successful' ? 'text-green-500' : 'text-blue-600';
        return (
          <div className="bg-white rounded-lg shadow-md p-6 mb-4" key={type}>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${color}`}>
              <FaCalendarAlt className="mr-2" />
              {type} Appointments
            </h2>
            {appointmentType.length === 0 ? (
              <p className="text-gray-500 flex items-center">
                <FaTimesCircle className="mr-2 text-red-500" />
                No {type.toLowerCase()} appointments.
              </p>
            ) : (
              appointmentType.map((appointment) => (
                <div key={appointment._id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-600" />
                    <span className="font-semibold">Date:</span> {appointment.date}
                  </p>
                  <p className="flex items-center">
                    <FaUserAlt className="mr-2 text-blue-600" />
                    <span className="font-semibold">Department:</span> {appointment.department}
                  </p>
                </div>
              ))
            )}
          </div>
        );
      })}

      {/* Graphs Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Analytics</h2>
        <h3 className="text-xl font-bold mb-4">Total Appointments Over Time</h3>
        <Line data={lineGraphData} />
        <h3 className="text-xl font-bold mb-4">Appointments by Department</h3>
        <Bar data={barGraphData} />
        <h3 className="text-xl font-bold mb-4">Appointment Status Distribution</h3>
        <Pie data={pieGraphData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
