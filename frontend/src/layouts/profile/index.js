import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { profileApi, patchApi, notificationApi } from "../../appClient";
import { FaUser, FaEnvelope, FaPhone, FaUserMd, FaBuilding, FaIdCard } from "react-icons/fa"; // Importing icons

const Profile = () => {
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [NIN, setNIN] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let response;
        if (role === "doctor") {
          response = await profileApi.getDoctorProfile(id);
        } else {
          response = await profileApi.getUserProfile(id);
        }
        const userData = response;
        setName(userData.name);
        setEmail(userData.email);
        setNIN(userData.NIN);
        setPhone(userData.phone);
        if (role === "doctor") {
          setSpecialty(userData.specialty);
          setDepartment(userData.department);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, [role, id]);

  const handleUpdatePhone = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePhone(role, id, phone);
      const notificationData = {
        ...(role === "doctor" && { doctor: id }),
      ...(role === "patient" && { patient: id }),
        type:'message',
        message: `Hello ${name}, you have successfully changed your phone number to ${phone}!`,
      };
      await postNotification(notificationData);
      alert("You have a new notification!");
      alert("Phone number updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update phone number");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const updatePhone = async (role, id, phone) => {
    if (role === "doctor") {
      return await patchApi.patchDoctorPhone(id, phone);
    } else {
      return await patchApi.patchUserPhone(id, phone);
    }
  };
  
  const postNotification = async (id, notificationData) => {
    try {
      const notificationResponse = await notificationApi.postNotification(id, notificationData);
      console.log("Notification response:", notificationResponse);
    } catch (notificationError) {
      console.error("Error posting notification:", notificationError);
    }
  };
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="py-3 animate_animated animate_fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name as Heading */}
          <div className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-semibold text-white">
              <FaUser className="inline-block mr-2" /> {name}
            </h2>
          </div>

          {/* Role-based Welcome Message */}
          <div className="col-span-2 bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              {role === "doctor" 
                ? `Welcome ${name} to your doctor profile, add events to your calendar in your dashboard to avoid getting an appointment booked in the times when you are occupied, edit your phone number if needed to ensure patients get to you easily.`
                : `Welcome ${name} to your profile, you can edit your phone number if changed, to ensure that we can contact you when you book an appointment.`}
            </h3>
          </div>

          {/* Email Information */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              <FaEnvelope className="inline-block mr-2" /> Email
            </h3>
            <p className="text-lg">{email}</p>
          </div>

          {/* NIN Information */}
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              <FaIdCard className="inline-block mr-2" /> NIN
            </h3>
            <p className="text-lg">{NIN}</p>
          </div>

          {role === "doctor" && (
            <>
              {/* Specialty Information */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  <FaUserMd className="inline-block mr-2" /> Specialty
                </h3>
                <p className="text-lg">{specialty}</p>
              </div>

              {/* Department Information */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  <FaBuilding className="inline-block mr-2" /> Department
                </h3>
                <p className="text-lg">{department}</p>
              </div>
            </>
          )}

          {/* Phone Information and Update */}
<div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
  <h3 className="text-2xl font-semibold text-blue-600 mb-4">
    <FaPhone className="inline-block mr-2" /> Phone Number
  </h3>
  <form className="space-y-4">
    <div>
      <label className="block text-lg font-medium mb-2">Phone Number:</label>
      <input 
        type="tel" 
        className="block w-full rounded-lg shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 p-3 transition duration-200 ease-in-out hover:ring-2 hover:ring-blue-500" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
    </div>
    <button 
      type="button" 
      onClick={handleUpdatePhone} 
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none transition-transform duration-200 hover:scale-105" 
      disabled={loading}
    >
      {loading ? "Updating..." : "Update Phone Number"}
    </button>
  </form>
</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
