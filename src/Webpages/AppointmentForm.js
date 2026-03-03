// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import emailjs from '@emailjs/browser';
// import axios from 'axios';
// import "./AppointmentForm.css";

// function AppointmentForm({ onClose, addAppointment, appointments }) {
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     patientName: "",
//     age: "",
//     gender: "",
//     phone: "",
//     email: "",
//     symptoms: [],
//     date: new Date().toISOString().split("T")[0],
//     time: "",
//     status: "Pending",
//     type: "Cardiology",
//     doctor: "Dr. Pranjal Patil",
//     notes: ""
//   });
  
//   const [errors, setErrors] = useState({});
//   const [symptomsDropdownOpen, setSymptomsDropdownOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const cardiologySymptoms = [
//     "Chest Pain", "Shortness of Breath", "Palpitations", 
//     "High Blood Pressure", "Dizziness", "Fatigue", 
//     "Swelling in Legs", "Irregular Heartbeat",
//     "Nausea", "Sweating", "Pain in Arms", "Jaw Pain",
//     "Lightheadedness", "Rapid Heartbeat", "Slow Heartbeat",
//     "Chest Discomfort", "Coughing", "Ankle Swelling",
//     "Bluish Skin", "Fainting", "Confusion"
//   ];

//   const getMinDate = () => new Date().toISOString().split('T')[0];
  
//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return {
//       date: now.toISOString().split("T")[0],
//       time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
//     };
//   };

//   // Validation Functions
//   const validatePatientName = (name) => {
//     if (!name || name.trim() === "") return "Patient name is required";
//     const trimmed = name.trim();
//     if (trimmed.length < 2) return "Patient name must be at least 2 characters";
//     if (trimmed.length > 50) return "Patient name cannot exceed 50 characters";
//     if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Patient name can only contain letters, spaces, dots, hyphens and apostrophes";
//     return "";
//   };

//   const validateAge = (age) => {
//     if (!age || age === "") return "Age is required";
//     const ageNum = parseInt(age);
//     if (isNaN(ageNum)) return "Age must be a number";
//     if (ageNum < 1) return "Age must be at least 1 year";
//     if (ageNum > 120) return "Age cannot exceed 120 years";
//     return "";
//   };

//   const validateGender = (gender) => {
//     if (!gender || gender === "") return "Please select gender";
//     return "";
//   };

//   const validatePhone = (phone) => {
//     if (!phone || phone === "") return "Phone number is required";
//     const cleaned = phone.replace(/\D/g, '');
//     if (cleaned.length !== 10) return "Phone number must be exactly 10 digits";
//     if (!['7', '8', '9'].includes(cleaned[0])) return "Phone number must start with 7, 8, or 9";
//     return "";
//   };

//   const validateEmail = (email) => {
//     if (!email || email === "") return "Email is required";
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return "Please enter a valid email address";
//     return "";
//   };

//   const validateDate = (date) => {
//     if (!date) return "Appointment date is required";
//     const selectedDate = new Date(date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     if (selectedDate < today) return "Appointment date cannot be in the past";
//     return "";
//   };

//   const validateTime = (time, date) => {
//     if (!time) return "Appointment time is required";
    
//     if (date === getCurrentDateTime().date) {
//       const currentTime = getCurrentDateTime().time;
//       if (time < currentTime) return "Appointment time cannot be in the past";
//     }
    
//     const hour = parseInt(time.split(':')[0]);
//     const minute = parseInt(time.split(':')[1]);
    
//     if (hour < 9 || hour > 19) return "Appointments are only available between 9 AM and 7 PM";
//     if (hour === 19 && minute > 0) return "Last appointment slot is at 7:00 PM";
    
//     return "";
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     const nameError = validatePatientName(formData.patientName);
//     if (nameError) newErrors.patientName = nameError;
    
//     const ageError = validateAge(formData.age);
//     if (ageError) newErrors.age = ageError;
    
//     const genderError = validateGender(formData.gender);
//     if (genderError) newErrors.gender = genderError;
    
//     const phoneError = validatePhone(formData.phone);
//     if (phoneError) newErrors.phone = phoneError;
    
//     const emailError = validateEmail(formData.email);
//     if (emailError) newErrors.email = emailError;
    
//     const dateError = validateDate(formData.date);
//     if (dateError) newErrors.date = dateError;
    
//     const timeError = validateTime(formData.time, formData.date);
//     if (timeError) newErrors.time = timeError;
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === "phone") {
//       const cleaned = value.replace(/\D/g, '');
//       if (cleaned.length <= 10) setFormData(prev => ({ ...prev, [name]: cleaned }));
//     } else if (name === "age") {
//       if (value === "" || /^\d+$/.test(value)) {
//         setFormData(prev => ({ ...prev, [name]: value }));
//       }
//     } else if (name === "patientName") {
//       if (value === "" || /^[a-zA-Z\s\.\-']*$/.test(value)) {
//         setFormData(prev => ({ ...prev, [name]: value }));
//       }
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
    
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleSymptomChange = (symptom) => {
//     setFormData(prev => ({
//       ...prev,
//       symptoms: prev.symptoms.includes(symptom)
//         ? prev.symptoms.filter(s => s !== symptom)
//         : [...prev.symptoms, symptom],
//     }));
//   };

//   const sendEmailConfirmation = async (appointmentData) => {
//     try {
//       const serviceId = 'service_nmfirtr';
//       const templateId = 'template_dprtbk4';
//       const publicKey = 'IdqomYdCZMyAOoCnB';

//       const today = new Date();
//       const registrationDate = today.toLocaleDateString('en-IN', {
//         day: '2-digit', month: '2-digit', year: 'numeric'
//       });
      
//       const registrationTime = today.toLocaleTimeString('en-IN', {
//         hour: '2-digit', minute: '2-digit', hour12: true
//       });

//       const templateParams = {
//         to_email: formData.email,
//         patient_name: formData.patientName,
//         registration_date: registrationDate,
//         registration_time: registrationTime,
//         patient_age: formData.age,
//         patient_gender: formData.gender,
//         patient_phone: formData.phone,
//         appointment_date: formData.date,
//         appointment_time: formData.time,
//         doctor_name: "Dr. Pranjal Patil",
//         clinic_name: 'Medi Care Hospital',
//         clinic_phone: '+91 9876543210',
//         clinic_email: 'appointments@medicare.com'
//       };

//       const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
//       return true;
      
//     } catch (error) {
//       console.error('❌ Failed to send email:', error);
//       return false;
//     }
//   };

//   // ✅ FIXED: handleSubmit with NO ERROR POPUP
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
    
//     setIsLoading(true);
    
//     try {
//       const appointmentData = {
//         patientName: formData.patientName.trim(),
//         age: parseInt(formData.age),
//         gender: formData.gender,
//         phone: formData.phone,
//         email: formData.email,
//         symptoms: formData.symptoms.join(", "),
//         date: formData.date,
//         time: formData.time,
//         type: "Cardiology",
//         doctor: "Dr. Pranjal Patil",
//         status: "Pending",
//         notes: formData.notes || "",
//         bookingDate: getCurrentDateTime().date,
//         bookingTime: getCurrentDateTime().time,
//       };

//       console.log("📤 Sending to backend:", appointmentData);

//       const response = await axios.post('http://localhost:8001/api/appointments', appointmentData, {
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       console.log("✅ Backend response:", response.data);

//       if (addAppointment) {
//         addAppointment(response.data.appointment);
//       }

//       const emailSent = await sendEmailConfirmation(appointmentData);
      
//       // ✅ Success message - yeh dikhega
//       alert(`✅ Appointment booked successfully! ID: ${response.data.appointment.appointmentId}`);
      
//       onClose();
      
//     } catch (error) {
//       console.error("❌ Error:", error);
      
//       // ✅ ERROR POPUP COMPLETELY HATAYA - sirf console log
//       if (error.response && error.response.status === 409) {
//         console.log("⚠️ Time slot already booked, but appointment may have been created?");
//       } else if (error.response) {
//         console.log("⚠️ Backend error:", error.response.data.message);
//       }
      
//       // ✅ Agar appointment book ho gayi hai to popup mat dikhao
//       // Sirf tab alert dikhao jab definitely book nahi hui
//       if (error.response?.status !== 409) {
//         alert("❌ Failed to book appointment. Please try again.");
//       }
      
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="form-overlay" onClick={onClose}>
//       <div className="form-container" onClick={(e) => e.stopPropagation()}>
//         <div className="form-header">
//           <h2>📅 Book Appointment</h2>
//           <button className="close-btn" onClick={onClose} disabled={isLoading}>×</button>
//         </div>
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-section">
//             <h4>Patient Details</h4>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Patient Name *</label>
//                 <input
//                   type="text"
//                   name="patientName"
//                   value={formData.patientName}
//                   onChange={handleChange}
//                   placeholder="Enter full name (letters only)"
//                   required
//                   disabled={isLoading}
//                   className={errors.patientName ? "error" : ""}
//                 />
//                 {errors.patientName && <span className="error-message">{errors.patientName}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Age *</label>
//                 <input
//                   type="text"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   placeholder="Age (numbers only)"
//                   required
//                   disabled={isLoading}
//                   className={errors.age ? "error" : ""}
//                 />
//                 {errors.age && <span className="error-message">{errors.age}</span>}
//               </div>
//             </div>
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                   disabled={isLoading}
//                   className={errors.gender ? "error" : ""}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//                 {errors.gender && <span className="error-message">{errors.gender}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Mobile Number *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="10-digit number (numbers only)"
//                   required
//                   maxLength="10"
//                   disabled={isLoading}
//                   className={errors.phone ? "error" : ""}
//                 />
//                 {errors.phone && <span className="error-message">{errors.phone}</span>}
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group full-width">
//                 <label>Email Address *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="patient@example.com"
//                   required
//                   disabled={isLoading}
//                   className={errors.email ? "error" : ""}
//                 />
//                 {errors.email && <span className="error-message">{errors.email}</span>}
//               </div>
//             </div>
//           </div>

//           <div className="form-section">
//             <h4>Symptoms (Optional)</h4>
//             <div className="symptoms-container">
//               <div 
//                 className="symptoms-select-box"
//                 onClick={() => !isLoading && setSymptomsDropdownOpen(!symptomsDropdownOpen)}
//               >
//                 <div className="selected-symptoms-preview">
//                   {formData.symptoms.length > 0 ? (
//                     <div className="selected-chips">
//                       {formData.symptoms.slice(0, 2).map((symptom) => (
//                         <span key={symptom} className="symptom-chip">
//                           {symptom}
//                           <button 
//                             type="button"
//                             className="chip-remove"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleSymptomChange(symptom);
//                             }}
//                             disabled={isLoading}
//                           >×</button>
//                         </span>
//                       ))}
//                       {formData.symptoms.length > 2 && (
//                         <span className="more-count">
//                           +{formData.symptoms.length - 2} more
//                         </span>
//                       )}
//                     </div>
//                   ) : (
//                     <span className="placeholder">Select symptoms</span>
//                   )}
//                 </div>
//                 <span className={`dropdown-arrow ${symptomsDropdownOpen ? 'open' : ''}`}>▼</span>
//               </div>
              
//               {symptomsDropdownOpen && !isLoading && (
//                 <div className="symptoms-dropdown-menu">
//                   {cardiologySymptoms.map((symptom) => (
//                     <label key={symptom} className="symptom-option">
//                       <input
//                         type="checkbox"
//                         checked={formData.symptoms.includes(symptom)}
//                         onChange={() => handleSymptomChange(symptom)}
//                       />
//                       <span className="checkbox-label">{symptom}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="form-section">
//             <h4>Appointment Details</h4>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Date *</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={formData.date}
//                   min={getMinDate()}
//                   onChange={handleChange}
//                   required
//                   disabled={isLoading}
//                   className={errors.date ? "error" : ""}
//                 />
//                 {errors.date && <span className="error-message">{errors.date}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Time *</label>
//                 <input
//                   type="time"
//                   name="time"
//                   value={formData.time}
//                   onChange={handleChange}
//                   required
//                   disabled={isLoading}
//                   className={errors.time ? "error" : ""}
//                 />
//                 {errors.time && <span className="error-message">{errors.time}</span>}
//                 <small className="field-hint">Working hours: 9 AM - 7 PM</small>
//               </div>
//             </div>
//           </div>

//           <div className="form-actions">
//             <button type="button" onClick={onClose} className="cancel-btn" disabled={isLoading}>
//               Cancel
//             </button>
//             <button type="submit" className="confirm-btn" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <span className="loading-spinner"></span>
//                   Booking...
//                 </>
//               ) : (
//                 "Confirm Appointment"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AppointmentForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import axios from 'axios';
import "./AppointmentForm.css";

function AppointmentForm({ onClose, addAppointment, appointments }) {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    symptoms: [],
    date: new Date().toISOString().split("T")[0],
    time: "",
    status: "Pending",
    type: "Cardiology",
    // doctor: "Dr. Pranjal Patil",
    notes: "",
    visitType: "First Visit"  // ✅ NEW FIELD - default value
  });
  
  const [errors, setErrors] = useState({});
  const [symptomsDropdownOpen, setSymptomsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   const cardiologySymptoms = [
    "Chest Pain", "Shortness of Breath", "Palpitations", 
    "High Blood Pressure", "Dizziness", 
    "Swelling in Legs", "Irregular Heartbeat",
   "Sweating","Jaw Pain",
    "Lightheadedness", "Rapid Heartbeat", "Slow Heartbeat",
    "Chest Discomfort", "Coughing",
    "Bluish Skin", "Fainting", "Confusion"
  ];

  const getMinDate = () => new Date().toISOString().split('T')[0];
  
  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toISOString().split("T")[0],
      time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    };
  };

  // Validation Functions
  const validatePatientName = (name) => {
    if (!name || name.trim() === "") return "Patient name is required";
    const trimmed = name.trim();
    if (trimmed.length < 2) return "Patient name must be at least 2 characters";
    if (trimmed.length > 50) return "Patient name cannot exceed 50 characters";
    if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Patient name can only contain letters, spaces, dots, hyphens and apostrophes";
    return "";
  };

  const validateAge = (age) => {
    if (!age || age === "") return "Age is required";
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return "Age must be a number";
    if (ageNum < 1) return "Age must be at least 1 year";
    if (ageNum > 120) return "Age cannot exceed 120 years";
    return "";
  };

  const validateGender = (gender) => {
    if (!gender || gender === "") return "Please select gender";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone || phone === "") return "Phone number is required";
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) return "Phone number must be exactly 10 digits";
    if (!['7', '8', '9'].includes(cleaned[0])) return "Phone number must start with 7, 8, or 9";
    return "";
  };

  const validateEmail = (email) => {
    if (!email || email === "") return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateDate = (date) => {
    if (!date) return "Appointment date is required";
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return "Appointment date cannot be in the past";
    return "";
  };

  const validateTime = (time, date) => {
    if (!time) return "Appointment time is required";
    
    if (date === getCurrentDateTime().date) {
      const currentTime = getCurrentDateTime().time;
      if (time < currentTime) return "Appointment time cannot be in the past";
    }
    
    const hour = parseInt(time.split(':')[0]);
    const minute = parseInt(time.split(':')[1]);
    
    if (hour < 9 || hour > 19) return "Appointments are only available between 9 AM and 7 PM";
    if (hour === 19 && minute > 0) return "Last appointment slot is at 7:00 PM";
    
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    
    const nameError = validatePatientName(formData.patientName);
    if (nameError) newErrors.patientName = nameError;
    
    const ageError = validateAge(formData.age);
    if (ageError) newErrors.age = ageError;
    
    const genderError = validateGender(formData.gender);
    if (genderError) newErrors.gender = genderError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const dateError = validateDate(formData.date);
    if (dateError) newErrors.date = dateError;
    
    const timeError = validateTime(formData.time, formData.date);
    if (timeError) newErrors.time = timeError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 10) setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else if (name === "age") {
      if (value === "" || /^\d+$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else if (name === "patientName") {
      if (value === "" || /^[a-zA-Z\s\.\-']*$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSymptomChange = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const sendEmailConfirmation = async (appointmentData) => {
    try {
      const serviceId = 'service_nmfirtr';
      const templateId = 'template_dprtbk4';
      const publicKey = 'IdqomYdCZMyAOoCnB';

      const today = new Date();
      const registrationDate = today.toLocaleDateString('en-IN', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      });
      
      const registrationTime = today.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', hour12: true
      });

      const templateParams = {
        to_email: formData.email,
        patient_name: formData.patientName,
        registration_date: registrationDate,
        registration_time: registrationTime,
        patient_age: formData.age,
        patient_gender: formData.gender,
        patient_phone: formData.phone,
        appointment_date: formData.date,
        appointment_time: formData.time,
        // doctor_name: "Dr. Pranjal Patil",
        clinic_name: 'Medi Care Hospital',
        clinic_phone: '+91 9876543210',
        clinic_email: 'appointments@medicare.com'
      };

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const appointmentData = {
        patientName: formData.patientName.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        symptoms: formData.symptoms.join(", "),
        date: formData.date,
        time: formData.time,
        type: "Cardiology",
        // doctor: "Dr. Pranjal Patil",
        status: "Pending",
        notes: formData.notes || "",
        bookingDate: getCurrentDateTime().date,
        bookingTime: getCurrentDateTime().time,
        visitType: formData.visitType  // ✅ NEW FIELD included in API call
      };

      console.log("📤 Sending to backend:", appointmentData);

      const response = await axios.post('http://localhost:8001/api/appointments', appointmentData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log("✅ Backend response:", response.data);

      if (addAppointment) {
        addAppointment(response.data.appointment);
      }

      const emailSent = await sendEmailConfirmation(appointmentData);
      
      alert(`✅ Appointment booked successfully! ID: ${response.data.appointment.appointmentId}`);
      
      onClose();
      
    } catch (error) {
      console.error("❌ Error:", error);
      
      if (error.response && error.response.status === 409) {
        console.log("⚠️ Time slot already booked, but appointment may have been created?");
      } else if (error.response) {
        console.log("⚠️ Backend error:", error.response.data.message);
      }
      
      if (error.response?.status !== 409) {
        alert("❌ Failed to book appointment. Please try again.");
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>📅 Book Appointment</h2>
          <button className="close-btn" onClick={onClose} disabled={isLoading}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h4>Patient Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Patient Name *</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter full name (letters only)"
                  required
                  disabled={isLoading}
                  className={errors.patientName ? "error" : ""}
                />
                {errors.patientName && <span className="error-message">{errors.patientName}</span>}
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age (numbers only)"
                  required
                  disabled={isLoading}
                  className={errors.age ? "error" : ""}
                />
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={errors.gender ? "error" : ""}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number (numbers only)"
                  required
                  maxLength="10"
                  disabled={isLoading}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="patient@example.com"
                  required
                  disabled={isLoading}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>Symptoms (Optional)</h4>
            <div className="symptoms-container">
              <div 
                className="symptoms-select-box"
                onClick={() => !isLoading && setSymptomsDropdownOpen(!symptomsDropdownOpen)}
              >
                <div className="selected-symptoms-preview">
                  {formData.symptoms.length > 0 ? (
                    <div className="selected-chips">
                      {formData.symptoms.slice(0, 2).map((symptom) => (
                        <span key={symptom} className="symptom-chip">
                          {symptom}
                          <button 
                            type="button"
                            className="chip-remove"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSymptomChange(symptom);
                            }}
                            disabled={isLoading}
                          >×</button>
                        </span>
                      ))}
                      {formData.symptoms.length > 2 && (
                        <span className="more-count">
                          +{formData.symptoms.length - 2} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="placeholder">Select symptoms</span>
                  )}
                </div>
                <span className={`dropdown-arrow ${symptomsDropdownOpen ? 'open' : ''}`}>▼</span>
              </div>
              
              {symptomsDropdownOpen && !isLoading && (
                <div className="symptoms-dropdown-menu">
                  {cardiologySymptoms.map((symptom) => (
                    <label key={symptom} className="symptom-option">
                      <input
                        type="checkbox"
                        checked={formData.symptoms.includes(symptom)}
                        onChange={() => handleSymptomChange(symptom)}
                      />
                      <span className="checkbox-label">{symptom}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h4>Appointment Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  min={getMinDate()}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={errors.date ? "error" : ""}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>
              <div className="form-group">
                <label>Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={errors.time ? "error" : ""}
                />
                {errors.time && <span className="error-message">{errors.time}</span>}
                <small className="field-hint">Working hours: 9 AM - 7 PM</small>
              </div>
            </div>

            {/* ✅ NEW FIELD - Visit Type */}
            <div className="form-row">
              <div className="form-group full-width">
                <label>Visit Type</label>
                <select
                  name="visitType"
                  value={formData.visitType}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ddd", width: "100%" }}
                >
                  <option value="First Visit">First Visit (New Patient)</option>
                  <option value="Follow-up">Follow-up Visit</option>
                  {/* <option value="Regular Checkup">Regular Checkup</option>
                  <option value="Emergency">Emergency</option> */}
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn" disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Booking...
                </>
              ) : (
                "Confirm Appointment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;