import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { patchApi, appointmentApi } from '../../../appClient';
import bgimage from '../../../assets/images/clinicImage.jpg'

const PatientDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('id');

  


  return (
    <div className="patient-dashboard mx-auto p-4 md:p-6 lg:p-8">

      {/* landing page */}
      <section className="p-4 mb-6">
      
      </section>
    </div>
  );
};

export default PatientDashboard;


