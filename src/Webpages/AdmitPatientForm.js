

// // // // import React, { useState, useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import "./AdmitPatientForm.css";

// // // // function AdmitPatientForm() {
// // // //   const navigate = useNavigate();

// // // //   const [formData, setFormData] = useState({
// // // //     patientName: "",
// // // //     patientId: "",
// // // //     age: "",
// // // //     gender: "Male",
// // // //     address: "",
// // // //     phone: "",
// // // //     nameOfKin: "",
// // // //     kinContact: "",
// // // //     bedNo: "",
// // // //     fromDate: new Date().toISOString().split('T')[0],
// // // //     toDate: "",
// // // //     symptoms: [],
// // // //     admittingDoctor: ""
// // // //   });

// // // //   const [errors, setErrors] = useState({});
// // // //   const [filteredPatients, setFilteredPatients] = useState([]);
// // // //   const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
// // // //   const [availableBedsList, setAvailableBedsList] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [symptomsDropdownOpen, setSymptomsDropdownOpen] = useState(false);

// // // //   const [existingAdmissions, setExistingAdmissions] = useState([]);

// // // //   const cardiologySymptoms = [
// // // //     "Chest Pain", "Shortness of Breath", "Palpitations",
// // // //     "High Blood Pressure", "Dizziness", "Fatigue",
// // // //     "Swelling in Legs", "Irregular Heartbeat", "Nausea",
// // // //     "Sweating", "Pain in Arms", "Jaw Pain", "Lightheadedness",
// // // //     "Rapid Heartbeat", "Slow Heartbeat", "Chest Discomfort",
// // // //     "Coughing", "Ankle Swelling", "Bluish Skin", "Fainting", "Confusion"
// // // //   ];

// // // //   // Fetch available beds from backend
// // // //   const fetchAvailableBeds = async () => {
// // // //     try {
// // // //       const response = await fetch('http://localhost:8001/api/availablebeds');
// // // //       const data = await response.json();
// // // //       if (data.success) {
// // // //         setAvailableBedsList(data.data);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching available beds:', error);
// // // //     }
// // // //   };

// // // //   // Fetch existing admissions
// // // //   const fetchAdmissions = async () => {
// // // //     try {
// // // //       const response = await fetch('http://localhost:8001/api/admitpatient');
// // // //       const data = await response.json();
// // // //       if (data.success) {
// // // //         setExistingAdmissions(data.data);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching admissions:', error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchAdmissions();
// // // //     fetchAvailableBeds();
// // // //   }, []);

// // // //   const getMinDate = () => new Date().toISOString().split('T')[0];

// // // //   // Validation Functions for each field
// // // //   const validatePatientName = (name) => {
// // // //     if (!name || name.trim() === "") return "Patient name is required";
// // // //     const trimmed = name.trim();
// // // //     if (trimmed.length < 2) return "Patient name must be at least 2 characters";
// // // //     if (trimmed.length > 50) return "Patient name cannot exceed 50 characters";
// // // //     if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Patient name can only contain letters, spaces, dots, hyphens and apostrophes";
// // // //     return "";
// // // //   };

// // // //   const validateAge = (age) => {
// // // //     if (!age || age === "") return "Age is required";
// // // //     const ageNum = parseInt(age);
// // // //     if (isNaN(ageNum)) return "Age must be a number";
// // // //     if (ageNum < 1) return "Age must be at least 1 year";
// // // //     if (ageNum > 120) return "Age cannot exceed 120 years";
// // // //     return "";
// // // //   };

// // // //   const validatePhone = (phone, fieldName = "Phone") => {
// // // //     if (!phone || phone === "") return `${fieldName} number is required`;
// // // //     const cleaned = phone.replace(/\D/g, '');
// // // //     if (cleaned.length !== 10) return `${fieldName} number must be exactly 10 digits`;
// // // //     if (!['7', '8', '9'].includes(cleaned[0])) return `${fieldName} number must start with 7, 8, or 9`;
// // // //     return "";
// // // //   };

// // // //   const validateKinContact = (contact) => {
// // // //     if (!contact || contact === "") return "Emergency contact number is required";
// // // //     const cleaned = contact.replace(/\D/g, '');
// // // //     if (cleaned.length !== 10) return "Emergency contact must be exactly 10 digits";
// // // //     if (!['7', '8', '9'].includes(cleaned[0])) return "Emergency contact must start with 7, 8, or 9";
// // // //     return "";
// // // //   };

// // // //   const validateBedNo = (bedNo) => {
// // // //     if (!bedNo || bedNo === "") return "Bed number is required";
    
// // // //     const formattedBed = formatBedNo(bedNo);
// // // //     if (!formattedBed) return "Please enter a valid bed number (e.g., B1, B2)";
    
// // // //     if (!availableBedsList.includes(formattedBed)) {
// // // //       return `Bed ${formattedBed} is not available. Available beds: ${availableBedsList.join(', ')}`;
// // // //     }
    
// // // //     // Check if bed is occupied by another admitted patient
// // // //     const isOccupied = existingAdmissions.some(adm => 
// // // //       adm.bedNo === formattedBed && adm.status === "Admitted"
// // // //     );
    
// // // //     if (isOccupied) return `Bed ${formattedBed} is already occupied by another patient`;
    
// // // //     return "";
// // // //   };

// // // //   const validateFromDate = (date) => {
// // // //     if (!date) return "Admission date is required";
// // // //     const selectedDate = new Date(date);
// // // //     const today = new Date();
// // // //     today.setHours(0, 0, 0, 0);
// // // //     if (selectedDate < today) return "Admission date cannot be in the past";
// // // //     return "";
// // // //   };

// // // //   const validateToDate = (toDate, fromDate) => {
// // // //     if (!toDate) return ""; // Optional field
// // // //     if (toDate < fromDate) return "Discharge date cannot be before admission date";
// // // //     return "";
// // // //   };

// // // //   const validateAdmittingDoctor = (doctor) => {
// // // //     if (!doctor || doctor.trim() === "") return "Admitting doctor name is required";
// // // //     const trimmed = doctor.trim();
// // // //     if (trimmed.length < 3) return "Doctor name must be at least 3 characters";
// // // //     if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Doctor name can only contain letters, spaces, dots, hyphens and apostrophes";
// // // //     return "";
// // // //   };

// // // //   // Check if bed is already occupied by an admitted patient
// // // //   const isBedOccupied = (bedNo) => {
// // // //     return existingAdmissions.some(adm => 
// // // //       adm.bedNo === bedNo && adm.status === "Admitted"
// // // //     );
// // // //   };

// // // //   // Ensure bed number is in correct format (e.g., B1, B2)
// // // //   const formatBedNo = (bed) => {
// // // //     if (!bed) return "";
// // // //     const match = bed.match(/^[bB]?(\d+)$/);
// // // //     return match ? `B${match[1]}` : bed;
// // // //   };

// // // //   const validateForm = () => {
// // // //     const newErrors = {};

// // // //     const nameError = validatePatientName(formData.patientName);
// // // //     if (nameError) newErrors.patientName = nameError;

// // // //     const ageError = validateAge(formData.age);
// // // //     if (ageError) newErrors.age = ageError;

// // // //     const phoneError = validatePhone(formData.phone, "Phone");
// // // //     if (phoneError) newErrors.phone = phoneError;

// // // //     const kinError = validateKinContact(formData.kinContact);
// // // //     if (kinError) newErrors.kinContact = kinError;

// // // //     const bedError = validateBedNo(formData.bedNo);
// // // //     if (bedError) newErrors.bedNo = bedError;

// // // //     const fromDateError = validateFromDate(formData.fromDate);
// // // //     if (fromDateError) newErrors.fromDate = fromDateError;

// // // //     if (formData.toDate) {
// // // //       const toDateError = validateToDate(formData.toDate, formData.fromDate);
// // // //       if (toDateError) newErrors.toDate = toDateError;
// // // //     }

// // // //     const doctorError = validateAdmittingDoctor(formData.admittingDoctor);
// // // //     if (doctorError) newErrors.admittingDoctor = doctorError;

// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;

// // // //     if (name === "phone" || name === "kinContact") {
// // // //       // Only allow numbers
// // // //       const cleaned = value.replace(/\D/g, '');
// // // //       if (cleaned.length <= 10) setFormData(prev => ({ ...prev, [name]: cleaned }));
// // // //     } else if (name === "age") {
// // // //       // Only allow numbers
// // // //       if (value === "" || /^\d+$/.test(value)) {
// // // //         setFormData(prev => ({ ...prev, [name]: value }));
// // // //       }
// // // //     } else if (name === "patientName" || name === "admittingDoctor" || name === "nameOfKin") {
// // // //       // Allow only letters, spaces, dots, hyphens for name fields
// // // //       if (value === "" || /^[a-zA-Z\s\.\-']*$/.test(value)) {
// // // //         setFormData(prev => ({ ...prev, [name]: value }));
// // // //       }
// // // //     } else if (name === "patientName") {
// // // //       setFormData(prev => ({ ...prev, [name]: value }));

// // // //       if (value.length >= 2) {
// // // //         const results = searchPatients(value);
// // // //         setFilteredPatients(results);
// // // //         setShowPatientSuggestions(results.length > 0);
// // // //       } else {
// // // //         setShowPatientSuggestions(false);
// // // //       }
// // // //     } else {
// // // //       setFormData(prev => ({ ...prev, [name]: value }));
// // // //     }

// // // //     if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
// // // //   };

// // // //   const handleSymptomChange = (symptom) => {
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       symptoms: prev.symptoms.includes(symptom)
// // // //         ? prev.symptoms.filter(s => s !== symptom)
// // // //         : [...prev.symptoms, symptom],
// // // //     }));
// // // //   };

// // // //   // Search patients function
// // // //   const searchPatients = (query) => {
// // // //     const savedPatients = localStorage.getItem('patients');
// // // //     if (!savedPatients) return [];
// // // //     const patients = JSON.parse(savedPatients);
// // // //     return patients.filter(p =>
// // // //       p.patientName?.toLowerCase().includes(query.toLowerCase()) ||
// // // //       p.phone?.includes(query)
// // // //     );
// // // //   };

// // // //   const selectPatient = (patient) => {
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       patientName: patient.patientName,
// // // //       patientId: patient.id,
// // // //       age: patient.age,
// // // //       gender: patient.gender,
// // // //       address: patient.address || "",
// // // //       phone: patient.phone,
// // // //       nameOfKin: patient.nameOfKin || "",
// // // //       kinContact: patient.kinContact || "",
// // // //     }));
// // // //     setShowPatientSuggestions(false);
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!validateForm()) return;

// // // //     setIsLoading(true);

// // // //     const formattedBed = formatBedNo(formData.bedNo);
    
// // // //     // Double-check if bed is still available
// // // //     if (isBedOccupied(formattedBed)) {
// // // //       alert(`❌ Bed ${formattedBed} is already occupied! Please select another bed.`);
// // // //       setIsLoading(false);
// // // //       return;
// // // //     }

// // // //     const submissionData = {
// // // //       id: `ADM-${Date.now()}`,
// // // //       ...formData,
// // // //       bedNo: formattedBed,
// // // //       admissionDate: new Date().toISOString().split('T')[0],
// // // //       admissionTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
// // // //       status: "Admitted"
// // // //     };

// // // //     try {
// // // //       const response = await fetch('http://localhost:8001/api/admitpatient', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify(submissionData)
// // // //       });

// // // //       const data = await response.json();

// // // //       if (data.success) {
// // // //         alert(`✅ Patient ${formData.patientName} admitted to Bed ${formattedBed}`);
// // // //         navigate("/receptionist-dashboard/admitlist");
// // // //       } else {
// // // //         alert(`❌ Error: ${data.message}`);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error admitting patient:', error);
// // // //       alert('❌ Failed to admit patient. Please try again.');
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   // ✅ FIXED: Handle cancel - go back to previous page
// // // //   const handleCancel = () => {
// // // //     console.log("🔙 Going back to previous page");
// // // //     navigate("./reception-dashboard"); // -1 means go back one page in history
// // // //   };

// // // //   return (
// // // //     <div className="form-overlay">
// // // //       <div className="form-container">
// // // //         <div className="form-header">
// // // //           <h2>🏥 Admit Patient</h2>
// // // //           <button 
// // // //             className="close-btn" 
// // // //             onClick={handleCancel} 
// // // //             disabled={isLoading}
// // // //             type="button"
// // // //           >
// // // //             ×
// // // //           </button>
// // // //         </div>

// // // //         <form onSubmit={handleSubmit}>
// // // //           <datalist id="bed-numbers">
// // // //             {availableBedsList.map((bed, i) => <option key={i} value={bed} />)}
// // // //           </datalist>

// // // //           <div className="form-section">
// // // //             <h4>Patient Information</h4>
// // // //             <div className="form-group patient-search-container">
// // // //               <label>Patient Name *</label>
// // // //               <input
// // // //                 type="text"
// // // //                 name="patientName"
// // // //                 value={formData.patientName}
// // // //                 onChange={handleChange}
// // // //                 placeholder="Search or enter patient name (letters only)"
// // // //                 required
// // // //                 disabled={isLoading}
// // // //                 className={errors.patientName ? "error" : ""}
// // // //                 autoComplete="off"
// // // //               />
// // // //               {errors.patientName && <span className="error-message">{errors.patientName}</span>}

// // // //               {showPatientSuggestions && filteredPatients.length > 0 && !isLoading && (
// // // //                 <div className="patient-suggestions">
// // // //                   {filteredPatients.map(patient => (
// // // //                     <div
// // // //                       key={patient.id}
// // // //                       className="patient-suggestion-item"
// // // //                       onClick={() => selectPatient(patient)}
// // // //                     >
// // // //                       <strong>{patient.patientName}</strong>
// // // //                       <span>Age: {patient.age} | Phone: {patient.phone}</span>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             <div className="form-row">
// // // //               <div className="form-group">
// // // //                 <label>Age *</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   name="age"
// // // //                   value={formData.age}
// // // //                   onChange={handleChange}
// // // //                   placeholder="Age (numbers only)"
// // // //                   min="1"
// // // //                   max="120"
// // // //                   required
// // // //                   disabled={isLoading}
// // // //                   className={errors.age ? "error" : ""}
// // // //                 />
// // // //                 {errors.age && <span className="error-message">{errors.age}</span>}
// // // //               </div>
// // // //               <div className="form-group">
// // // //                 <label>Gender</label>
// // // //                 <select 
// // // //                   name="gender" 
// // // //                   value={formData.gender} 
// // // //                   onChange={handleChange}
// // // //                   disabled={isLoading}
// // // //                 >
// // // //                   <option value="Male">Male</option>
// // // //                   <option value="Female">Female</option>
// // // //                   <option value="Other">Other</option>
// // // //                 </select>
// // // //               </div>
// // // //             </div>

// // // //             <div className="form-row">
// // // //               <div className="form-group full-width">
// // // //                 <label>Address</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   name="address"
// // // //                   value={formData.address}
// // // //                   onChange={handleChange}
// // // //                   placeholder="Enter address"
// // // //                   disabled={isLoading}
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div className="form-row">
// // // //               <div className="form-group">
// // // //                 <label>Mobile Number *</label>
// // // //                 <input
// // // //                   type="tel"
// // // //                   name="phone"
// // // //                   value={formData.phone}
// // // //                   onChange={handleChange}
// // // //                   placeholder="10-digit number (numbers only)"
// // // //                   maxLength="10"
// // // //                   required
// // // //                   disabled={isLoading}
// // // //                   className={errors.phone ? "error" : ""}
// // // //                 />
// // // //                 {errors.phone && <span className="error-message">{errors.phone}</span>}
// // // //               </div>
// // // //               <div className="form-group">
// // // //                 <label>Emergency Contact Name</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   name="nameOfKin"
// // // //                   value={formData.nameOfKin}
// // // //                   onChange={handleChange}
// // // //                   placeholder="Contact name (letters only)"
// // // //                   disabled={isLoading}
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div className="form-row">
// // // //               <div className="form-group">
// // // //                 <label>Emergency Contact *</label>
// // // //                 <input
// // // //                   type="tel"
// // // //                   name="kinContact"
// // // //                   value={formData.kinContact}
// // // //                   onChange={handleChange}
// // // //                   placeholder="10-digit number (numbers only)"
// // // //                   maxLength="10"
// // // //                   required
// // // //                   disabled={isLoading}
// // // //                   className={errors.kinContact ? "error" : ""}
// // // //                 />
// // // //                 {errors.kinContact && <span className="error-message">{errors.kinContact}</span>}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="form-section">
// // // //             <h4>Admission Details</h4>
// // // //             <div className="form-row">
// // // //               <div className="form-group">
// // // //                 <label>Bed Number *</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   name="bedNo"
// // // //                   value={formData.bedNo}
// // // //                   onChange={handleChange}
// // // //                   placeholder="Select bed number (e.g., B1)"
// // // //                   list="bed-numbers"
// // // //                   required
// // // //                   disabled={isLoading}
// // // //                   className={errors.bedNo ? "error" : ""}
// // // //                 />
// // // //                 {errors.bedNo && <span className="error-message">{errors.bedNo}</span>}
// // // //                 <small className="field-hint">Available beds: {availableBedsList.length}</small>
// // // //               </div>
// // // //               <div className="form-group">
// // // //                 <label>Admission Date *</label>
// // // //                 <input
// // // //                   type="date"
// // // //                   name="fromDate"
// // // //                   value={formData.fromDate}
// // // //                   onChange={handleChange}
// // // //                   min={getMinDate()}
// // // //                   required
// // // //                   disabled={isLoading}
// // // //                   className={errors.fromDate ? "error" : ""}
// // // //                 />
// // // //                 {errors.fromDate && <span className="error-message">{errors.fromDate}</span>}
// // // //               </div>
// // // //             </div>

// // // //             <div className="form-row">
// // // //               <div className="form-group">
// // // //                 <label>Expected Discharge Date</label>
// // // //                 <input
// // // //                   type="date"
// // // //                   name="toDate"
// // // //                   value={formData.toDate}
// // // //                   onChange={handleChange}
// // // //                   min={formData.fromDate || getMinDate()}
// // // //                   disabled={isLoading}
// // // //                   className={errors.toDate ? "error" : ""}
// // // //                 />
// // // //                 {errors.toDate && <span className="error-message">{errors.toDate}</span>}
// // // //               </div>
// // // //               <div className="form-group">
// // // //                 <label>Admitting Doctor *</label>
// // // //                 <input
// // // //                   type="text"
// // // //                   name="admittingDoctor"
// // // //                   value={formData.admittingDoctor}
// // // //                   onChange={handleChange}
// // // //                   placeholder="Doctor name (letters only)"
// // // //                   required
// // // //                   disabled={isLoading}
// // // //                   className={errors.admittingDoctor ? "error" : ""}
// // // //                 />
// // // //                 {errors.admittingDoctor && <span className="error-message">{errors.admittingDoctor}</span>}
// // // //               </div>
// // // //             </div>

// // // //             <div className="form-section">
// // // //               <h4>Symptoms (Optional)</h4>
// // // //               <div className="symptoms-container">
// // // //                 <div 
// // // //                   className="symptoms-select-box"
// // // //                   onClick={() => !isLoading && setSymptomsDropdownOpen(!symptomsDropdownOpen)}
// // // //                 >
// // // //                   <div className="selected-symptoms-preview">
// // // //                     {formData.symptoms.length > 0 ? (
// // // //                       <div className="selected-chips">
// // // //                         {formData.symptoms.slice(0, 2).map((symptom) => (
// // // //                           <span key={symptom} className="symptom-chip">
// // // //                             {symptom}
// // // //                             <button 
// // // //                               type="button"
// // // //                               className="chip-remove"
// // // //                               onClick={(e) => {
// // // //                                 e.stopPropagation();
// // // //                                 handleSymptomChange(symptom);
// // // //                               }}
// // // //                               disabled={isLoading}
// // // //                             >×</button>
// // // //                           </span>
// // // //                         ))}
// // // //                         {formData.symptoms.length > 2 && (
// // // //                           <span className="more-count">
// // // //                             +{formData.symptoms.length - 2} more
// // // //                           </span>
// // // //                         )}
// // // //                       </div>
// // // //                     ) : (
// // // //                       <span className="placeholder">Select symptoms</span>
// // // //                     )}
// // // //                   </div>
// // // //                   <span className={`dropdown-arrow ${symptomsDropdownOpen ? 'open' : ''}`}>▼</span>
// // // //                 </div>
                
// // // //                 {symptomsDropdownOpen && !isLoading && (
// // // //                   <div className="symptoms-dropdown-menu">
// // // //                     {cardiologySymptoms.map((symptom) => (
// // // //                       <label key={symptom} className="symptom-option">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           checked={formData.symptoms.includes(symptom)}
// // // //                           onChange={() => handleSymptomChange(symptom)}
// // // //                         />
// // // //                         <span className="checkbox-label">{symptom}</span>
// // // //                       </label>
// // // //                     ))}
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="form-actions">
// // // //             <button 
// // // //               type="button" 
// // // //               onClick={handleCancel} 
// // // //               className="cancel-btn" 
// // // //               disabled={isLoading}
// // // //             >
// // // //               Cancel
// // // //             </button>
// // // //             <button 
// // // //               type="submit" 
// // // //               className="confirm-btn"
// // // //               disabled={isLoading}
// // // //             >
// // // //               {isLoading ? (
// // // //                 <>
// // // //                   <span className="loading-spinner"></span>
// // // //                   Admitting...
// // // //                 </>
// // // //               ) : (
// // // //                 "✓ Admit Patient"
// // // //               )}
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AdmitPatientForm;

// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import "./AdmitPatientForm.css";

// // // function AdmitPatientForm() {
// // //   const navigate = useNavigate();

// // //   const [formData, setFormData] = useState({
// // //     patientName: "",
// // //     patientId: "",
// // //     age: "",
// // //     gender: "Male",
// // //     address: "",
// // //     phone: "",
// // //     nameOfKin: "",
// // //     kinContact: "",
// // //     bedNo: "",
// // //     fromDate: new Date().toISOString().split('T')[0],
// // //     toDate: "",
// // //     symptoms: [],
// // //     admittingDoctor: ""
// // //   });

// // //   const [errors, setErrors] = useState({});
// // //   const [filteredPatients, setFilteredPatients] = useState([]);
// // //   const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
// // //   const [availableBedsList, setAvailableBedsList] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [symptomsDropdownOpen, setSymptomsDropdownOpen] = useState(false);
// // //   const [existingAdmissions, setExistingAdmissions] = useState([]);
// // //   const [registeredPatients, setRegisteredPatients] = useState([]); // ✅ Store registered patients

// // //   const cardiologySymptoms = [
// // //     "Chest Pain", "Shortness of Breath", "Palpitations",
// // //     "High Blood Pressure", "Dizziness", "Fatigue",
// // //     "Swelling in Legs", "Irregular Heartbeat", "Nausea",
// // //     "Sweating", "Pain in Arms", "Jaw Pain", "Lightheadedness",
// // //     "Rapid Heartbeat", "Slow Heartbeat", "Chest Discomfort",
// // //     "Coughing", "Ankle Swelling", "Bluish Skin", "Fainting", "Confusion"
// // //   ];

// // //   // ✅ Fetch registered patients from backend
// // //   const fetchRegisteredPatients = async () => {
// // //     try {
// // //       const response = await fetch('http://localhost:8001/api/patients');
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setRegisteredPatients(data.data || []);
// // //         console.log(`✅ Loaded ${data.data?.length || 0} registered patients`);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching registered patients:', error);
// // //     }
// // //   };

// // //   // Fetch available beds from backend
// // //   const fetchAvailableBeds = async () => {
// // //     try {
// // //       const response = await fetch('http://localhost:8001/api/availablebeds');
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setAvailableBedsList(data.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching available beds:', error);
// // //     }
// // //   };

// // //   // Fetch existing admissions
// // //   const fetchAdmissions = async () => {
// // //     try {
// // //       const response = await fetch('http://localhost:8001/api/admitpatient');
// // //       const data = await response.json();
// // //       if (data.success) {
// // //         setExistingAdmissions(data.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching admissions:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchRegisteredPatients(); // ✅ Fetch registered patients
// // //     fetchAdmissions();
// // //     fetchAvailableBeds();
// // //   }, []);

// // //   const getMinDate = () => new Date().toISOString().split('T')[0];

// // //   // Validation Functions for each field
// // //   const validatePatientName = (name) => {
// // //     if (!name || name.trim() === "") return "Patient name is required";
// // //     const trimmed = name.trim();
// // //     if (trimmed.length < 2) return "Patient name must be at least 2 characters";
// // //     if (trimmed.length > 50) return "Patient name cannot exceed 50 characters";
// // //     if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Patient name can only contain letters, spaces, dots, hyphens and apostrophes";
// // //     return "";
// // //   };

// // //   const validateAge = (age) => {
// // //     if (!age || age === "") return "Age is required";
// // //     const ageNum = parseInt(age);
// // //     if (isNaN(ageNum)) return "Age must be a number";
// // //     if (ageNum < 1) return "Age must be at least 1 year";
// // //     if (ageNum > 120) return "Age cannot exceed 120 years";
// // //     return "";
// // //   };

// // //   const validatePhone = (phone, fieldName = "Phone") => {
// // //     if (!phone || phone === "") return `${fieldName} number is required`;
// // //     const cleaned = phone.replace(/\D/g, '');
// // //     if (cleaned.length !== 10) return `${fieldName} number must be exactly 10 digits`;
// // //     if (!['7', '8', '9'].includes(cleaned[0])) return `${fieldName} number must start with 7, 8, or 9`;
// // //     return "";
// // //   };

// // //   const validateKinContact = (contact) => {
// // //     if (!contact || contact === "") return "Emergency contact number is required";
// // //     const cleaned = contact.replace(/\D/g, '');
// // //     if (cleaned.length !== 10) return "Emergency contact must be exactly 10 digits";
// // //     if (!['7', '8', '9'].includes(cleaned[0])) return "Emergency contact must start with 7, 8, or 9";
// // //     return "";
// // //   };

// // //   const validateBedNo = (bedNo) => {
// // //     if (!bedNo || bedNo === "") return "Bed number is required";
    
// // //     const formattedBed = formatBedNo(bedNo);
// // //     if (!formattedBed) return "Please enter a valid bed number (e.g., B1, B2)";
    
// // //     if (!availableBedsList.includes(formattedBed)) {
// // //       return `Bed ${formattedBed} is not available. Available beds: ${availableBedsList.join(', ')}`;
// // //     }
    
// // //     // Check if bed is occupied by another admitted patient
// // //     const isOccupied = existingAdmissions.some(adm => 
// // //       adm.bedNo === formattedBed && adm.status === "Admitted"
// // //     );
    
// // //     if (isOccupied) return `Bed ${formattedBed} is already occupied by another patient`;
    
// // //     return "";
// // //   };

// // //   const validateFromDate = (date) => {
// // //     if (!date) return "Admission date is required";
// // //     const selectedDate = new Date(date);
// // //     const today = new Date();
// // //     today.setHours(0, 0, 0, 0);
// // //     if (selectedDate < today) return "Admission date cannot be in the past";
// // //     return "";
// // //   };

// // //   const validateToDate = (toDate, fromDate) => {
// // //     if (!toDate) return ""; // Optional field
// // //     if (toDate < fromDate) return "Discharge date cannot be before admission date";
// // //     return "";
// // //   };

// // //   const validateAdmittingDoctor = (doctor) => {
// // //     if (!doctor || doctor.trim() === "") return "Admitting doctor name is required";
// // //     const trimmed = doctor.trim();
// // //     if (trimmed.length < 3) return "Doctor name must be at least 3 characters";
// // //     if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Doctor name can only contain letters, spaces, dots, hyphens and apostrophes";
// // //     return "";
// // //   };

// // //   // Check if bed is already occupied by an admitted patient
// // //   const isBedOccupied = (bedNo) => {
// // //     return existingAdmissions.some(adm => 
// // //       adm.bedNo === bedNo && adm.status === "Admitted"
// // //     );
// // //   };

// // //   // Ensure bed number is in correct format (e.g., B1, B2)
// // //   const formatBedNo = (bed) => {
// // //     if (!bed) return "";
// // //     const match = bed.match(/^[bB]?(\d+)$/);
// // //     return match ? `B${match[1]}` : bed;
// // //   };

// // //   const validateForm = () => {
// // //     const newErrors = {};

// // //     const nameError = validatePatientName(formData.patientName);
// // //     if (nameError) newErrors.patientName = nameError;

// // //     const ageError = validateAge(formData.age);
// // //     if (ageError) newErrors.age = ageError;

// // //     const phoneError = validatePhone(formData.phone, "Phone");
// // //     if (phoneError) newErrors.phone = phoneError;

// // //     const kinError = validateKinContact(formData.kinContact);
// // //     if (kinError) newErrors.kinContact = kinError;

// // //     const bedError = validateBedNo(formData.bedNo);
// // //     if (bedError) newErrors.bedNo = bedError;

// // //     const fromDateError = validateFromDate(formData.fromDate);
// // //     if (fromDateError) newErrors.fromDate = fromDateError;

// // //     if (formData.toDate) {
// // //       const toDateError = validateToDate(formData.toDate, formData.fromDate);
// // //       if (toDateError) newErrors.toDate = toDateError;
// // //     }

// // //     const doctorError = validateAdmittingDoctor(formData.admittingDoctor);
// // //     if (doctorError) newErrors.admittingDoctor = doctorError;

// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;

// // //     if (name === "phone" || name === "kinContact") {
// // //       // Only allow numbers
// // //       const cleaned = value.replace(/\D/g, '');
// // //       if (cleaned.length <= 10) setFormData(prev => ({ ...prev, [name]: cleaned }));
// // //     } else if (name === "age") {
// // //       // Only allow numbers
// // //       if (value === "" || /^\d+$/.test(value)) {
// // //         setFormData(prev => ({ ...prev, [name]: value }));
// // //       }
// // //     } else if (name === "patientName" || name === "admittingDoctor" || name === "nameOfKin") {
// // //       // Allow only letters, spaces, dots, hyphens for name fields
// // //       if (value === "" || /^[a-zA-Z\s\.\-']*$/.test(value)) {
// // //         setFormData(prev => ({ ...prev, [name]: value }));
// // //       }
// // //     } else if (name === "patientName") {
// // //       setFormData(prev => ({ ...prev, [name]: value }));

// // //       // ✅ Search in registered patients
// // //       if (value.length >= 2) {
// // //         const results = searchPatients(value);
// // //         setFilteredPatients(results);
// // //         setShowPatientSuggestions(results.length > 0);
// // //       } else {
// // //         setShowPatientSuggestions(false);
// // //       }
// // //     } else {
// // //       setFormData(prev => ({ ...prev, [name]: value }));
// // //     }

// // //     if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
// // //   };

// // //   const handleSymptomChange = (symptom) => {
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       symptoms: prev.symptoms.includes(symptom)
// // //         ? prev.symptoms.filter(s => s !== symptom)
// // //         : [...prev.symptoms, symptom],
// // //     }));
// // //   };

// // //   // ✅ FIXED: Search patients from registered patients list
// // //   const searchPatients = (query) => {
// // //     if (!registeredPatients || registeredPatients.length === 0) return [];
    
// // //     return registeredPatients.filter(p =>
// // //       p.patientName?.toLowerCase().includes(query.toLowerCase()) ||
// // //       p.phone?.includes(query)
// // //     );
// // //   };

// // //   // ✅ FIXED: Select patient and auto-fill all matching fields
// // //   const selectPatient = (patient) => {
// // //     console.log("✅ Selected patient:", patient);
    
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       patientName: patient.patientName || "",
// // //       patientId: patient.id || patient._id || "",
// // //       age: patient.age || "",
// // //       gender: patient.gender || "Male",
// // //       address: patient.address || "",
// // //       phone: patient.phone || "",
// // //       nameOfKin: patient.nameOfKin || "",
// // //       kinContact: patient.kinContact || "",
// // //       // Keep existing values for bed, dates, doctor, symptoms
// // //       bedNo: prev.bedNo,
// // //       fromDate: prev.fromDate,
// // //       toDate: prev.toDate,
// // //       admittingDoctor: prev.admittingDoctor,
// // //       symptoms: prev.symptoms
// // //     }));
    
// // //     setShowPatientSuggestions(false);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!validateForm()) return;

// // //     setIsLoading(true);

// // //     const formattedBed = formatBedNo(formData.bedNo);
    
// // //     // Double-check if bed is still available
// // //     if (isBedOccupied(formattedBed)) {
// // //       alert(`❌ Bed ${formattedBed} is already occupied! Please select another bed.`);
// // //       setIsLoading(false);
// // //       return;
// // //     }

// // //     const submissionData = {
// // //       id: `ADM-${Date.now()}`,
// // //       ...formData,
// // //       bedNo: formattedBed,
// // //       admissionDate: new Date().toISOString().split('T')[0],
// // //       admissionTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
// // //       status: "Admitted"
// // //     };

// // //     try {
// // //       const response = await fetch('http://localhost:8001/api/admitpatient', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(submissionData)
// // //       });

// // //       const data = await response.json();

// // //       if (data.success) {
// // //         alert(`✅ Patient ${formData.patientName} admitted to Bed ${formattedBed}`);
// // //         navigate("/receptionist-dashboard/admitlist");
// // //       } else {
// // //         alert(`❌ Error: ${data.message}`);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error admitting patient:', error);
// // //       alert('❌ Failed to admit patient. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // ✅ FIXED: Handle cancel - go back to previous page
// // //   const handleCancel = () => {
// // //     console.log("🔙 Going back to previous page");
// // //     navigate(-1); // Go back one page in history
// // //   };

// // //   return (
// // //     <div className="form-overlay">
// // //       <div className="form-container">
// // //         <div className="form-header">
// // //           <h2>🏥 Admit Patient</h2>
// // //           <button 
// // //             className="close-btn" 
// // //             onClick={handleCancel} 
// // //             disabled={isLoading}
// // //             type="button"
// // //           >
// // //             ×
// // //           </button>
// // //         </div>

// // //         <form onSubmit={handleSubmit}>
// // //           <datalist id="bed-numbers">
// // //             {availableBedsList.map((bed, i) => <option key={i} value={bed} />)}
// // //           </datalist>

// // //           <div className="form-section">
// // //             <h4>Patient Information</h4>
// // //             <div className="form-group patient-search-container">
// // //               <label>Patient Name *</label>
// // //               <input
// // //                 type="text"
// // //                 name="patientName"
// // //                 value={formData.patientName}
// // //                 onChange={handleChange}
// // //                 placeholder="Search or enter patient name (letters only)"
// // //                 required
// // //                 disabled={isLoading}
// // //                 className={errors.patientName ? "error" : ""}
// // //                 autoComplete="off"
// // //               />
// // //               {errors.patientName && <span className="error-message">{errors.patientName}</span>}

// // //               {showPatientSuggestions && filteredPatients.length > 0 && !isLoading && (
// // //                 <div className="patient-suggestions">
// // //                   {filteredPatients.map(patient => (
// // //                     <div
// // //                       key={patient.id || patient._id}
// // //                       className="patient-suggestion-item"
// // //                       onClick={() => selectPatient(patient)}
// // //                     >
// // //                       <strong>{patient.patientName}</strong>
// // //                       <span>Age: {patient.age} | Phone: {patient.phone}</span>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div className="form-row">
// // //               <div className="form-group">
// // //                 <label>Age *</label>
// // //                 <input
// // //                   type="text"
// // //                   name="age"
// // //                   value={formData.age}
// // //                   onChange={handleChange}
// // //                   placeholder="Age (numbers only)"
// // //                   min="1"
// // //                   max="120"
// // //                   required
// // //                   disabled={isLoading}
// // //                   className={errors.age ? "error" : ""}
// // //                 />
// // //                 {errors.age && <span className="error-message">{errors.age}</span>}
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Gender</label>
// // //                 <select 
// // //                   name="gender" 
// // //                   value={formData.gender} 
// // //                   onChange={handleChange}
// // //                   disabled={isLoading}
// // //                 >
// // //                   <option value="Male">Male</option>
// // //                   <option value="Female">Female</option>
// // //                   <option value="Other">Other</option>
// // //                 </select>
// // //               </div>
// // //             </div>

// // //             <div className="form-row">
// // //               <div className="form-group full-width">
// // //                 <label>Address</label>
// // //                 <input
// // //                   type="text"
// // //                   name="address"
// // //                   value={formData.address}
// // //                   onChange={handleChange}
// // //                   placeholder="Enter address"
// // //                   disabled={isLoading}
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="form-row">
// // //               <div className="form-group">
// // //                 <label>Mobile Number *</label>
// // //                 <input
// // //                   type="tel"
// // //                   name="phone"
// // //                   value={formData.phone}
// // //                   onChange={handleChange}
// // //                   placeholder="10-digit number (numbers only)"
// // //                   maxLength="10"
// // //                   required
// // //                   disabled={isLoading}
// // //                   className={errors.phone ? "error" : ""}
// // //                 />
// // //                 {errors.phone && <span className="error-message">{errors.phone}</span>}
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Emergency Contact Name</label>
// // //                 <input
// // //                   type="text"
// // //                   name="nameOfKin"
// // //                   value={formData.nameOfKin}
// // //                   onChange={handleChange}
// // //                   placeholder="Contact name (letters only)"
// // //                   disabled={isLoading}
// // //                 />
// // //               </div>
// // //             </div>

// // //             <div className="form-row">
// // //               <div className="form-group">
// // //                 <label>Emergency Contact *</label>
// // //                 <input
// // //                   type="tel"
// // //                   name="kinContact"
// // //                   value={formData.kinContact}
// // //                   onChange={handleChange}
// // //                   placeholder="10-digit number (numbers only)"
// // //                   maxLength="10"
// // //                   required
// // //                   disabled={isLoading}
// // //                   className={errors.kinContact ? "error" : ""}
// // //                 />
// // //                 {errors.kinContact && <span className="error-message">{errors.kinContact}</span>}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="form-section">
// // //             <h4>Admission Details</h4>
// // //             <div className="form-row">
// // //               <div className="form-group">
// // //                 <label>Bed Number *</label>
// // //                 <input
// // //                   type="text"
// // //                   name="bedNo"
// // //                   value={formData.bedNo}
// // //                   onChange={handleChange}
// // //                   placeholder="Select bed number (e.g., B1)"
// // //                   list="bed-numbers"
// // //                   required
// // //                   disabled={isLoading}
// // //                   className={errors.bedNo ? "error" : ""}
// // //                 />
// // //                 {errors.bedNo && <span className="error-message">{errors.bedNo}</span>}
// // //                 <small className="field-hint">Available beds: {availableBedsList.length}</small>
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Admission Date *</label>
// // //                 <input
// // //                   type="date"
// // //                   name="fromDate"
// // //                   value={formData.fromDate}
// // //                   onChange={handleChange}
// // //                   min={getMinDate()}
// // //                   required
// // //                   disabled={isLoading}
// // //                   className={errors.fromDate ? "error" : ""}
// // //                 />
// // //                 {errors.fromDate && <span className="error-message">{errors.fromDate}</span>}
// // //               </div>
// // //             </div>

// // //             <div className="form-row">
// // //               <div className="form-group">
// // //                 <label>Expected Discharge Date</label>
// // //                 <input
// // //                   type="date"
// // //                   name="toDate"
// // //                   value={formData.toDate}
// // //                   onChange={handleChange}
// // //                   min={formData.fromDate || getMinDate()}
// // //                   disabled={isLoading}
// // //                   className={errors.toDate ? "error" : ""}
// // //                 />
// // //                 {errors.toDate && <span className="error-message">{errors.toDate}</span>}
// // //               </div>
// // //               <div className="form-group">
// // //                 <label>Admitting Doctor *</label>
// // //                 <input
// // //                   type="text"
// // //                   name="admittingDoctor"
// // //                   value={formData.admittingDoctor}
// // //                   onChange={handleChange}
// // //                   placeholder="Doctor name (letters only)"
// // //                   required
// // //                   disabled={isLoading}
// // //                   className={errors.admittingDoctor ? "error" : ""}
// // //                 />
// // //                 {errors.admittingDoctor && <span className="error-message">{errors.admittingDoctor}</span>}
// // //               </div>
// // //             </div>

// // //             <div className="form-section">
// // //               <h4>Symptoms (Optional)</h4>
// // //               <div className="symptoms-container">
// // //                 <div 
// // //                   className="symptoms-select-box"
// // //                   onClick={() => !isLoading && setSymptomsDropdownOpen(!symptomsDropdownOpen)}
// // //                 >
// // //                   <div className="selected-symptoms-preview">
// // //                     {formData.symptoms.length > 0 ? (
// // //                       <div className="selected-chips">
// // //                         {formData.symptoms.slice(0, 2).map((symptom) => (
// // //                           <span key={symptom} className="symptom-chip">
// // //                             {symptom}
// // //                             <button 
// // //                               type="button"
// // //                               className="chip-remove"
// // //                               onClick={(e) => {
// // //                                 e.stopPropagation();
// // //                                 handleSymptomChange(symptom);
// // //                               }}
// // //                               disabled={isLoading}
// // //                             >×</button>
// // //                           </span>
// // //                         ))}
// // //                         {formData.symptoms.length > 2 && (
// // //                           <span className="more-count">
// // //                             +{formData.symptoms.length - 2} more
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                     ) : (
// // //                       <span className="placeholder">Select symptoms</span>
// // //                     )}
// // //                   </div>
// // //                   <span className={`dropdown-arrow ${symptomsDropdownOpen ? 'open' : ''}`}>▼</span>
// // //                 </div>
                
// // //                 {symptomsDropdownOpen && !isLoading && (
// // //                   <div className="symptoms-dropdown-menu">
// // //                     {cardiologySymptoms.map((symptom) => (
// // //                       <label key={symptom} className="symptom-option">
// // //                         <input
// // //                           type="checkbox"
// // //                           checked={formData.symptoms.includes(symptom)}
// // //                           onChange={() => handleSymptomChange(symptom)}
// // //                         />
// // //                         <span className="checkbox-label">{symptom}</span>
// // //                       </label>
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="form-actions">
// // //             <button 
// // //               type="button" 
// // //               onClick={handleCancel} 
// // //               className="cancel-btn" 
// // //               disabled={isLoading}
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button 
// // //               type="submit" 
// // //               className="confirm-btn"
// // //               disabled={isLoading}
// // //             >
// // //               {isLoading ? (
// // //                 <>
// // //                   <span className="loading-spinner"></span>
// // //                   Admitting...
// // //                 </>
// // //               ) : (
// // //                 "✓ Admit Patient"
// // //               )}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default AdmitPatientForm;


// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./AdmitPatientForm.css";

// // function AdmitPatientForm() {
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     patientName: "",
// //     patientId: "",
// //     age: "",
// //     gender: "Male",
// //     address: "",
// //     phone: "",
// //     nameOfKin: "",
// //     kinContact: "",
// //     bedNo: "",
// //     fromDate: new Date().toISOString().split('T')[0],
// //     toDate: "",
// //     symptoms: [],
// //     admittingDoctor: ""
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [filteredPatients, setFilteredPatients] = useState([]);
// //   const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
// //   const [availableBedsList, setAvailableBedsList] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [symptomsDropdownOpen, setSymptomsDropdownOpen] = useState(false);
// //   const [existingAdmissions, setExistingAdmissions] = useState([]);
// //   const [registeredPatients, setRegisteredPatients] = useState([]);
// //   const [selectedPatientValid, setSelectedPatientValid] = useState(false); // ✅ Track if valid patient selected

// //   const cardiologySymptoms = [
// //     "Chest Pain", "Shortness of Breath", "Palpitations",
// //     "High Blood Pressure", "Dizziness", "Fatigue",
// //     "Swelling in Legs", "Irregular Heartbeat", "Nausea",
// //     "Sweating", "Pain in Arms", "Jaw Pain", "Lightheadedness",
// //     "Rapid Heartbeat", "Slow Heartbeat", "Chest Discomfort",
// //     "Coughing", "Ankle Swelling", "Bluish Skin", "Fainting", "Confusion"
// //   ];

// //   // ✅ Fetch registered patients from backend
// //   const fetchRegisteredPatients = async () => {
// //     try {
// //       const response = await fetch('http://localhost:8001/api/patients');
// //       const data = await response.json();
// //       if (data.success) {
// //         setRegisteredPatients(data.data || []);
// //         console.log(`✅ Loaded ${data.data?.length || 0} registered patients`);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching registered patients:', error);
// //     }
// //   };

// //   // Fetch available beds from backend
// //   const fetchAvailableBeds = async () => {
// //     try {
// //       const response = await fetch('http://localhost:8001/api/availablebeds');
// //       const data = await response.json();
// //       if (data.success) {
// //         setAvailableBedsList(data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching available beds:', error);
// //     }
// //   };

// //   // Fetch existing admissions
// //   const fetchAdmissions = async () => {
// //     try {
// //       const response = await fetch('http://localhost:8001/api/admitpatient');
// //       const data = await response.json();
// //       if (data.success) {
// //         setExistingAdmissions(data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching admissions:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRegisteredPatients();
// //     fetchAdmissions();
// //     fetchAvailableBeds();
// //   }, []);

// //   const getMinDate = () => new Date().toISOString().split('T')[0];

// //   // Validation Functions
// //   const validatePatientName = (name) => {
// //     if (!name || name.trim() === "") return "Patient name is required";
    
// //     // ✅ Check if patient exists in registered list
// //     const patientExists = registeredPatients.some(p => 
// //       p.patientName?.toLowerCase() === name.toLowerCase()
// //     );
    
// //     if (!patientExists && !selectedPatientValid) {
// //       return "Patient must be selected from registered patients list";
// //     }
// //     return "";
// //   };

// //   const validateAge = (age) => {
// //     if (!age || age === "") return "Age is required";
// //     const ageNum = parseInt(age);
// //     if (isNaN(ageNum)) return "Age must be a number";
// //     if (ageNum < 1) return "Age must be at least 1 year";
// //     if (ageNum > 120) return "Age cannot exceed 120 years";
// //     return "";
// //   };

// //   const validatePhone = (phone, fieldName = "Phone") => {
// //     if (!phone || phone === "") return `${fieldName} number is required`;
// //     const cleaned = phone.replace(/\D/g, '');
// //     if (cleaned.length !== 10) return `${fieldName} number must be exactly 10 digits`;
// //     if (!['7', '8', '9'].includes(cleaned[0])) return `${fieldName} number must start with 7, 8, or 9`;
// //     return "";
// //   };

// //   const validateKinContact = (contact) => {
// //     if (!contact || contact === "") return "Emergency contact number is required";
// //     const cleaned = contact.replace(/\D/g, '');
// //     if (cleaned.length !== 10) return "Emergency contact must be exactly 10 digits";
// //     if (!['7', '8', '9'].includes(cleaned[0])) return "Emergency contact must start with 7, 8, or 9";
// //     return "";
// //   };

// //   const validateBedNo = (bedNo) => {
// //     if (!bedNo || bedNo === "") return "Bed number is required";
    
// //     const formattedBed = formatBedNo(bedNo);
// //     if (!formattedBed) return "Please enter a valid bed number (e.g., B1, B2)";
    
// //     if (!availableBedsList.includes(formattedBed)) {
// //       return `Bed ${formattedBed} is not available. Available beds: ${availableBedsList.join(', ')}`;
// //     }
    
// //     const isOccupied = existingAdmissions.some(adm => 
// //       adm.bedNo === formattedBed && adm.status === "Admitted"
// //     );
    
// //     if (isOccupied) return `Bed ${formattedBed} is already occupied by another patient`;
    
// //     return "";
// //   };

// //   const validateFromDate = (date) => {
// //     if (!date) return "Admission date is required";
// //     const selectedDate = new Date(date);
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
// //     if (selectedDate < today) return "Admission date cannot be in the past";
// //     return "";
// //   };

// //   const validateToDate = (toDate, fromDate) => {
// //     if (!toDate) return "";
// //     if (toDate < fromDate) return "Discharge date cannot be before admission date";
// //     return "";
// //   };

// //   const validateAdmittingDoctor = (doctor) => {
// //     if (!doctor || doctor.trim() === "") return "Admitting doctor name is required";
// //     const trimmed = doctor.trim();
// //     if (trimmed.length < 3) return "Doctor name must be at least 3 characters";
// //     if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Doctor name can only contain letters, spaces, dots, hyphens and apostrophes";
// //     return "";
// //   };

// //   const isBedOccupied = (bedNo) => {
// //     return existingAdmissions.some(adm => 
// //       adm.bedNo === bedNo && adm.status === "Admitted"
// //     );
// //   };

// //   const formatBedNo = (bed) => {
// //     if (!bed) return "";
// //     const match = bed.match(/^[bB]?(\d+)$/);
// //     return match ? `B${match[1]}` : bed;
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     const nameError = validatePatientName(formData.patientName);
// //     if (nameError) newErrors.patientName = nameError;

// //     const ageError = validateAge(formData.age);
// //     if (ageError) newErrors.age = ageError;

// //     const phoneError = validatePhone(formData.phone, "Phone");
// //     if (phoneError) newErrors.phone = phoneError;

// //     const kinError = validateKinContact(formData.kinContact);
// //     if (kinError) newErrors.kinContact = kinError;

// //     const bedError = validateBedNo(formData.bedNo);
// //     if (bedError) newErrors.bedNo = bedError;

// //     const fromDateError = validateFromDate(formData.fromDate);
// //     if (fromDateError) newErrors.fromDate = fromDateError;

// //     if (formData.toDate) {
// //       const toDateError = validateToDate(formData.toDate, formData.fromDate);
// //       if (toDateError) newErrors.toDate = toDateError;
// //     }

// //     const doctorError = validateAdmittingDoctor(formData.admittingDoctor);
// //     if (doctorError) newErrors.admittingDoctor = doctorError;

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name === "phone" || name === "kinContact") {
// //       const cleaned = value.replace(/\D/g, '');
// //       if (cleaned.length <= 10) setFormData(prev => ({ ...prev, [name]: cleaned }));
// //     } else if (name === "age") {
// //       if (value === "" || /^\d+$/.test(value)) {
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //       }
// //     } else if (name === "patientName" || name === "admittingDoctor" || name === "nameOfKin") {
// //       if (value === "" || /^[a-zA-Z\s\.\-']*$/.test(value)) {
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //       }
// //     } else if (name === "patientName") {
// //       setFormData(prev => ({ ...prev, [name]: value }));
      
// //       // ✅ Reset validation when typing
// //       setSelectedPatientValid(false);

// //       // ✅ Search in registered patients
// //       if (value.length >= 2) {
// //         const results = searchPatients(value);
// //         setFilteredPatients(results);
// //         setShowPatientSuggestions(results.length > 0);
// //       } else {
// //         setShowPatientSuggestions(false);
// //       }
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }

// //     if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
// //   };

// //   const handleSymptomChange = (symptom) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       symptoms: prev.symptoms.includes(symptom)
// //         ? prev.symptoms.filter(s => s !== symptom)
// //         : [...prev.symptoms, symptom],
// //     }));
// //   };

// //   // ✅ Search patients from registered patients list
// //   const searchPatients = (query) => {
// //     if (!registeredPatients || registeredPatients.length === 0) return [];
    
// //     return registeredPatients.filter(p =>
// //       p.patientName?.toLowerCase().includes(query.toLowerCase()) ||
// //       p.phone?.includes(query)
// //     );
// //   };

// //   // ✅ Select patient and auto-fill all matching fields
// //   const selectPatient = (patient) => {
// //     console.log("✅ Selected registered patient:", patient);
    
// //     setFormData(prev => ({
// //       ...prev,
// //       patientName: patient.patientName || "",
// //       patientId: patient.id || patient._id || "",
// //       age: patient.age || "",
// //       gender: patient.gender || "Male",
// //       address: patient.address || "",
// //       phone: patient.phone || "",
// //       nameOfKin: patient.nameOfKin || "",
// //       kinContact: patient.kinContact || "",
// //       // Keep existing values for bed, dates, doctor, symptoms
// //       bedNo: prev.bedNo,
// //       fromDate: prev.fromDate,
// //       toDate: prev.toDate,
// //       admittingDoctor: prev.admittingDoctor,
// //       symptoms: prev.symptoms
// //     }));
    
// //     // ✅ Mark as valid registered patient
// //     setSelectedPatientValid(true);
// //     setShowPatientSuggestions(false);
    
// //     // Clear any name error
// //     if (errors.patientName) {
// //       setErrors(prev => ({ ...prev, patientName: "" }));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // ✅ Final validation - must have valid registered patient
// //     if (!selectedPatientValid) {
// //       alert("❌ Please select a patient from the registered patients list!");
// //       return;
// //     }
    
// //     if (!validateForm()) return;

// //     setIsLoading(true);

// //     const formattedBed = formatBedNo(formData.bedNo);
    
// //     if (isBedOccupied(formattedBed)) {
// //       alert(`❌ Bed ${formattedBed} is already occupied! Please select another bed.`);
// //       setIsLoading(false);
// //       return;
// //     }

// //     const submissionData = {
// //       id: `ADM-${Date.now()}`,
// //       ...formData,
// //       bedNo: formattedBed,
// //       admissionDate: new Date().toISOString().split('T')[0],
// //       admissionTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
// //       status: "Admitted"
// //     };

// //     try {
// //       const response = await fetch('http://localhost:8001/api/admitpatient', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(submissionData)
// //       });

// //       const data = await response.json();

// //       if (data.success) {
// //         alert(`✅ Patient ${formData.patientName} admitted to Bed ${formattedBed}`);
// //         navigate("/receptionist-dashboard/admitlist");
// //       } else {
// //         alert(`❌ Error: ${data.message}`);
// //       }
// //     } catch (error) {
// //       console.error('Error admitting patient:', error);
// //       alert('❌ Failed to admit patient. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     console.log("🔙 Going back to previous page");
// //     navigate(-1);
// //   };

// //   return (
// //     <div className="form-overlay">
// //       <div className="form-container">
// //         <div className="form-header">
// //           <h2>🏥 Admit Patient</h2>
// //           <button 
// //             className="close-btn" 
// //             onClick={handleCancel} 
// //             disabled={isLoading}
// //             type="button"
// //           >
// //             ×
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit}>
// //           <datalist id="bed-numbers">
// //             {availableBedsList.map((bed, i) => <option key={i} value={bed} />)}
// //           </datalist>

// //           <div className="form-section">
// //             <h4>Patient Information</h4>
// //             <div className="form-group patient-search-container">
// //               <label>Patient Name *</label>
// //               <input
// //                 type="text"
// //                 name="patientName"
// //                 value={formData.patientName}
// //                 onChange={handleChange}
// //                 placeholder="Search and select from registered patients"
// //                 required
// //                 disabled={isLoading}
// //                 className={`${errors.patientName ? "error" : ""} ${selectedPatientValid ? "valid" : ""}`}
// //                 autoComplete="off"
// //               />
// //               {errors.patientName && <span className="error-message">{errors.patientName}</span>}
// //               {!selectedPatientValid && formData.patientName && !errors.patientName && (
// //                 <span className="warning-message">⚠️ Please select from suggestions</span>
// //               )}

// //               {showPatientSuggestions && filteredPatients.length > 0 && !isLoading && (
// //                 <div className="patient-suggestions">
// //                   {filteredPatients.map(patient => (
// //                     <div
// //                       key={patient.id || patient._id}
// //                       className="patient-suggestion-item"
// //                       onClick={() => selectPatient(patient)}
// //                     >
// //                       <strong>{patient.patientName}</strong>
// //                       <span>Age: {patient.age} | Phone: {patient.phone}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label>Age *</label>
// //                 <input
// //                   type="text"
// //                   name="age"
// //                   value={formData.age}
// //                   onChange={handleChange}
// //                   placeholder="Age (numbers only)"
// //                   min="1"
// //                   max="120"
// //                   required
// //                   disabled={isLoading}
// //                   className={errors.age ? "error" : ""}
// //                   readOnly={selectedPatientValid} // ✅ Read-only if selected from registered
// //                 />
// //                 {errors.age && <span className="error-message">{errors.age}</span>}
// //               </div>
// //               <div className="form-group">
// //                 <label>Gender</label>
// //                 <select 
// //                   name="gender" 
// //                   value={formData.gender} 
// //                   onChange={handleChange}
// //                   disabled={isLoading || selectedPatientValid} // ✅ Disabled if selected from registered
// //                 >
// //                   <option value="Male">Male</option>
// //                   <option value="Female">Female</option>
// //                   <option value="Other">Other</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="form-row">
// //               <div className="form-group full-width">
// //                 <label>Address</label>
// //                 <input
// //                   type="text"
// //                   name="address"
// //                   value={formData.address}
// //                   onChange={handleChange}
// //                   placeholder="Enter address"
// //                   disabled={isLoading || selectedPatientValid} // ✅ Disabled if selected from registered
// //                 />
// //               </div>
// //             </div>

// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label>Mobile Number *</label>
// //                 <input
// //                   type="tel"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   placeholder="10-digit number (numbers only)"
// //                   maxLength="10"
// //                   required
// //                   disabled={isLoading || selectedPatientValid} // ✅ Disabled if selected from registered
// //                   className={errors.phone ? "error" : ""}
// //                 />
// //                 {errors.phone && <span className="error-message">{errors.phone}</span>}
// //               </div>
// //               <div className="form-group">
// //                 <label>Emergency Contact Name</label>
// //                 <input
// //                   type="text"
// //                   name="nameOfKin"
// //                   value={formData.nameOfKin}
// //                   onChange={handleChange}
// //                   placeholder="Contact name (letters only)"
// //                   disabled={isLoading || selectedPatientValid} // ✅ Disabled if selected from registered
// //                 />
// //               </div>
// //             </div>

// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label>Emergency Contact *</label>
// //                 <input
// //                   type="tel"
// //                   name="kinContact"
// //                   value={formData.kinContact}
// //                   onChange={handleChange}
// //                   placeholder="10-digit number (numbers only)"
// //                   maxLength="10"
// //                   required
// //                   disabled={isLoading || selectedPatientValid} // ✅ Disabled if selected from registered
// //                   className={errors.kinContact ? "error" : ""}
// //                 />
// //                 {errors.kinContact && <span className="error-message">{errors.kinContact}</span>}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="form-section">
// //             <h4>Admission Details</h4>
// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label>Bed Number *</label>
// //                 <input
// //                   type="text"
// //                   name="bedNo"
// //                   value={formData.bedNo}
// //                   onChange={handleChange}
// //                   placeholder="Select bed number (e.g., B1)"
// //                   list="bed-numbers"
// //                   required
// //                   disabled={isLoading}
// //                   className={errors.bedNo ? "error" : ""}
// //                 />
// //                 {errors.bedNo && <span className="error-message">{errors.bedNo}</span>}
// //                 <small className="field-hint">Available beds: {availableBedsList.length}</small>
// //               </div>
// //               <div className="form-group">
// //                 <label>Admission Date *</label>
// //                 <input
// //                   type="date"
// //                   name="fromDate"
// //                   value={formData.fromDate}
// //                   onChange={handleChange}
// //                   min={getMinDate()}
// //                   required
// //                   disabled={isLoading}
// //                   className={errors.fromDate ? "error" : ""}
// //                 />
// //                 {errors.fromDate && <span className="error-message">{errors.fromDate}</span>}
// //               </div>
// //             </div>

// //             <div className="form-row">
// //               <div className="form-group">
// //                 <label>Expected Discharge Date</label>
// //                 <input
// //                   type="date"
// //                   name="toDate"
// //                   value={formData.toDate}
// //                   onChange={handleChange}
// //                   min={formData.fromDate || getMinDate()}
// //                   disabled={isLoading}
// //                   className={errors.toDate ? "error" : ""}
// //                 />
// //                 {errors.toDate && <span className="error-message">{errors.toDate}</span>}
// //               </div>
// //               <div className="form-group">
// //                 <label>Admitting Doctor *</label>
// //                 <input
// //                   type="text"
// //                   name="admittingDoctor"
// //                   value={formData.admittingDoctor}
// //                   onChange={handleChange}
// //                   placeholder="Doctor name (letters only)"
// //                   required
// //                   disabled={isLoading}
// //                   className={errors.admittingDoctor ? "error" : ""}
// //                 />
// //                 {errors.admittingDoctor && <span className="error-message">{errors.admittingDoctor}</span>}
// //               </div>
// //             </div>

// //             <div className="form-section">
// //               <h4>Symptoms (Optional)</h4>
// //               <div className="symptoms-container">
// //                 <div 
// //                   className="symptoms-select-box"
// //                   onClick={() => !isLoading && setSymptomsDropdownOpen(!symptomsDropdownOpen)}
// //                 >
// //                   <div className="selected-symptoms-preview">
// //                     {formData.symptoms.length > 0 ? (
// //                       <div className="selected-chips">
// //                         {formData.symptoms.slice(0, 2).map((symptom) => (
// //                           <span key={symptom} className="symptom-chip">
// //                             {symptom}
// //                             <button 
// //                               type="button"
// //                               className="chip-remove"
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 handleSymptomChange(symptom);
// //                               }}
// //                               disabled={isLoading}
// //                             >×</button>
// //                           </span>
// //                         ))}
// //                         {formData.symptoms.length > 2 && (
// //                           <span className="more-count">
// //                             +{formData.symptoms.length - 2} more
// //                           </span>
// //                         )}
// //                       </div>
// //                     ) : (
// //                       <span className="placeholder">Select symptoms</span>
// //                     )}
// //                   </div>
// //                   <span className={`dropdown-arrow ${symptomsDropdownOpen ? 'open' : ''}`}>▼</span>
// //                 </div>
                
// //                 {symptomsDropdownOpen && !isLoading && (
// //                   <div className="symptoms-dropdown-menu">
// //                     {cardiologySymptoms.map((symptom) => (
// //                       <label key={symptom} className="symptom-option">
// //                         <input
// //                           type="checkbox"
// //                           checked={formData.symptoms.includes(symptom)}
// //                           onChange={() => handleSymptomChange(symptom)}
// //                         />
// //                         <span className="checkbox-label">{symptom}</span>
// //                       </label>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="form-actions">
// //             <button 
// //               type="button" 
// //               onClick={handleCancel} 
// //               className="cancel-btn" 
// //               disabled={isLoading}
// //             >
// //               Cancel
// //             </button>
// //             <button 
// //               type="submit" 
// //               className="confirm-btn"
// //               disabled={isLoading || !selectedPatientValid} // ✅ Disable if no valid patient
// //             >
// //               {isLoading ? (
// //                 <>
// //                   <span className="loading-spinner"></span>
// //                   Admitting...
// //                 </>
// //               ) : (
// //                 "✓ Admit Patient"
// //               )}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdmitPatientForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdmitPatientForm.css";

// function AdmitPatientForm() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     patientName: "",
//     patientId: "",
//     age: "",
//     gender: "Male",
//     address: "",
//     phone: "",
//     nameOfKin: "",
//     kinContact: "",
//     bedNo: "",
//     fromDate: new Date().toISOString().split('T')[0],
//     toDate: "",
//     symptoms: [],
//     admittingDoctor: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
//   const [availableBedsList, setAvailableBedsList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [symptomsDropdownOpen, setSymptomsDropdownOpen] = useState(false);
//   const [existingAdmissions, setExistingAdmissions] = useState([]);
//   const [registeredPatients, setRegisteredPatients] = useState([]);
//   const [selectedPatientValid, setSelectedPatientValid] = useState(false);

//   const cardiologySymptoms = [
//     "Chest Pain", "Shortness of Breath", "Palpitations",
//     "High Blood Pressure", "Dizziness", "Fatigue",
//     "Swelling in Legs", "Irregular Heartbeat", "Nausea",
//     "Sweating", "Pain in Arms", "Jaw Pain", "Lightheadedness",
//     "Rapid Heartbeat", "Slow Heartbeat", "Chest Discomfort",
//     "Coughing", "Ankle Swelling", "Bluish Skin", "Fainting", "Confusion"
//   ];

//   // ✅ Fetch registered patients from backend
//   const fetchRegisteredPatients = async () => {
//     try {
//       console.log("📥 Fetching registered patients...");
//       const response = await fetch('http://localhost:8001/api/patients');
//       const data = await response.json();
//       console.log("📥 Response:", data);
      
//       if (data.success) {
//         setRegisteredPatients(data.data || []);
//         console.log(`✅ Loaded ${data.data?.length || 0} registered patients`);
//         console.log("Patients list:", data.data);
//       } else {
//         console.error("❌ Failed to fetch patients:", data.message);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching registered patients:', error);
//     }
//   };

//   // Fetch available beds from backend
//   const fetchAvailableBeds = async () => {
//     try {
//       const response = await fetch('http://localhost:8001/api/availablebeds');
//       const data = await response.json();
//       if (data.success) {
//         setAvailableBedsList(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching available beds:', error);
//     }
//   };

//   // Fetch existing admissions
//   const fetchAdmissions = async () => {
//     try {
//       const response = await fetch('http://localhost:8001/api/admitpatient');
//       const data = await response.json();
//       if (data.success) {
//         setExistingAdmissions(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching admissions:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRegisteredPatients();
//     fetchAdmissions();
//     fetchAvailableBeds();
//   }, []);

//   const getMinDate = () => new Date().toISOString().split('T')[0];

//   // Validation Functions
//   const validatePatientName = (name) => {
//     if (!name || name.trim() === "") return "Patient name is required";
    
//     const patientExists = registeredPatients.some(p => 
//       p.patientName?.toLowerCase() === name.toLowerCase()
//     );
    
//     if (!patientExists && !selectedPatientValid) {
//       return "Patient must be selected from registered patients list";
//     }
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

//   const validatePhone = (phone, fieldName = "Phone") => {
//     if (!phone || phone === "") return `${fieldName} number is required`;
//     const cleaned = phone.replace(/\D/g, '');
//     if (cleaned.length !== 10) return `${fieldName} number must be exactly 10 digits`;
//     if (!['7', '8', '9'].includes(cleaned[0])) return `${fieldName} number must start with 7, 8, or 9`;
//     return "";
//   };

//   const validateKinContact = (contact) => {
//     if (!contact || contact === "") return "Emergency contact number is required";
//     const cleaned = contact.replace(/\D/g, '');
//     if (cleaned.length !== 10) return "Emergency contact must be exactly 10 digits";
//     if (!['7', '8', '9'].includes(cleaned[0])) return "Emergency contact must start with 7, 8, or 9";
//     return "";
//   };

//   const validateBedNo = (bedNo) => {
//     if (!bedNo || bedNo === "") return "Bed number is required";
    
//     const formattedBed = formatBedNo(bedNo);
//     if (!formattedBed) return "Please enter a valid bed number (e.g., B1, B2)";
    
//     if (!availableBedsList.includes(formattedBed)) {
//       return `Bed ${formattedBed} is not available. Available beds: ${availableBedsList.join(', ')}`;
//     }
    
//     const isOccupied = existingAdmissions.some(adm => 
//       adm.bedNo === formattedBed && adm.status === "Admitted"
//     );
    
//     if (isOccupied) return `Bed ${formattedBed} is already occupied by another patient`;
    
//     return "";
//   };

//   const validateFromDate = (date) => {
//     if (!date) return "Admission date is required";
//     const selectedDate = new Date(date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     if (selectedDate < today) return "Admission date cannot be in the past";
//     return "";
//   };

//   const validateToDate = (toDate, fromDate) => {
//     if (!toDate) return "";
//     if (toDate < fromDate) return "Discharge date cannot be before admission date";
//     return "";
//   };

//   const validateAdmittingDoctor = (doctor) => {
//     if (!doctor || doctor.trim() === "") return "Admitting doctor name is required";
//     const trimmed = doctor.trim();
//     if (trimmed.length < 3) return "Doctor name must be at least 3 characters";
//     if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Doctor name can only contain letters, spaces, dots, hyphens and apostrophes";
//     return "";
//   };

//   const isBedOccupied = (bedNo) => {
//     return existingAdmissions.some(adm => 
//       adm.bedNo === bedNo && adm.status === "Admitted"
//     );
//   };

//   const formatBedNo = (bed) => {
//     if (!bed) return "";
//     const match = bed.match(/^[bB]?(\d+)$/);
//     return match ? `B${match[1]}` : bed;
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const nameError = validatePatientName(formData.patientName);
//     if (nameError) newErrors.patientName = nameError;

//     const ageError = validateAge(formData.age);
//     if (ageError) newErrors.age = ageError;

//     const phoneError = validatePhone(formData.phone, "Phone");
//     if (phoneError) newErrors.phone = phoneError;

//     const kinError = validateKinContact(formData.kinContact);
//     if (kinError) newErrors.kinContact = kinError;

//     const bedError = validateBedNo(formData.bedNo);
//     if (bedError) newErrors.bedNo = bedError;

//     const fromDateError = validateFromDate(formData.fromDate);
//     if (fromDateError) newErrors.fromDate = fromDateError;

//     if (formData.toDate) {
//       const toDateError = validateToDate(formData.toDate, formData.fromDate);
//       if (toDateError) newErrors.toDate = toDateError;
//     }

//     const doctorError = validateAdmittingDoctor(formData.admittingDoctor);
//     if (doctorError) newErrors.admittingDoctor = doctorError;

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "phone" || name === "kinContact") {
//       const cleaned = value.replace(/\D/g, '');
//       if (cleaned.length <= 10) setFormData(prev => ({ ...prev, [name]: cleaned }));
//     } else if (name === "age") {
//       if (value === "" || /^\d+$/.test(value)) {
//         setFormData(prev => ({ ...prev, [name]: value }));
//       }
//     } else if (name === "patientName" || name === "admittingDoctor" || name === "nameOfKin") {
//       if (value === "" || /^[a-zA-Z\s\.\-']*$/.test(value)) {
//         setFormData(prev => ({ ...prev, [name]: value }));
//       }
//     } 
    
//     // ✅ Special handling for patientName search
//     if (name === "patientName") {
//       setFormData(prev => ({ ...prev, [name]: value }));
//       setSelectedPatientValid(false);

//       // ✅ Search in registered patients
//       if (value.length >= 2) {
//         console.log("🔍 Searching for:", value);
//         const results = searchPatients(value);
//         console.log("📋 Search results:", results);
//         setFilteredPatients(results);
//         setShowPatientSuggestions(results.length > 0);
//       } else {
//         setShowPatientSuggestions(false);
//         setFilteredPatients([]);
//       }
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }

//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
//   };

//   const handleSymptomChange = (symptom) => {
//     setFormData(prev => ({
//       ...prev,
//       symptoms: prev.symptoms.includes(symptom)
//         ? prev.symptoms.filter(s => s !== symptom)
//         : [...prev.symptoms, symptom],
//     }));
//   };

//   // ✅ Search patients from registered patients list
//   const searchPatients = (query) => {
//     if (!registeredPatients || registeredPatients.length === 0) {
//       console.log("⚠️ No registered patients available");
//       return [];
//     }
    
//     const results = registeredPatients.filter(p =>
//       p.patientName?.toLowerCase().includes(query.toLowerCase()) ||
//       p.phone?.includes(query)
//     );
    
//     console.log(`🔍 Found ${results.length} matches for "${query}"`);
//     return results;
//   };

//   // ✅ Select patient and auto-fill all matching fields
//   const selectPatient = (patient) => {
//     console.log("✅ Selected registered patient:", patient);
    
//     setFormData(prev => ({
//       ...prev,
//       patientName: patient.patientName || "",
//       patientId: patient.id || patient._id || "",
//       age: patient.age || "",
//       gender: patient.gender || "Male",
//       address: patient.address || "",
//       phone: patient.phone || "",
//       nameOfKin: patient.nameOfKin || "",
//       kinContact: patient.kinContact || "",
//       bedNo: prev.bedNo,
//       fromDate: prev.fromDate,
//       toDate: prev.toDate,
//       admittingDoctor: prev.admittingDoctor,
//       symptoms: prev.symptoms
//     }));
    
//     setSelectedPatientValid(true);
//     setShowPatientSuggestions(false);
//     setFilteredPatients([]);
    
//     if (errors.patientName) {
//       setErrors(prev => ({ ...prev, patientName: "" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!selectedPatientValid) {
//       alert("❌ Please select a patient from the registered patients list!");
//       return;
//     }
    
//     if (!validateForm()) return;

//     setIsLoading(true);

//     const formattedBed = formatBedNo(formData.bedNo);
    
//     if (isBedOccupied(formattedBed)) {
//       alert(`❌ Bed ${formattedBed} is already occupied! Please select another bed.`);
//       setIsLoading(false);
//       return;
//     }

//     const submissionData = {
//       id: `ADM-${Date.now()}`,
//       ...formData,
//       bedNo: formattedBed,
//       admissionDate: new Date().toISOString().split('T')[0],
//       admissionTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
//       status: "Admitted"
//     };

//     try {
//       const response = await fetch('http://localhost:8001/api/admitpatient', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submissionData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert(`✅ Patient ${formData.patientName} admitted to Bed ${formattedBed}`);
//         navigate("/receptionist-dashboard/admitlist");
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Error admitting patient:', error);
//       alert('❌ Failed to admit patient. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     console.log("🔙 Going back to previous page");
//     navigate("./reception-dashboard");
//   };

//   return (
//     <div className="form-overlay">
//       <div className="form-container">
//         <div className="form-header">
//           <h2>🏥 Admit Patient</h2>
//           <button 
//             className="close-btn" 
//             onClick={handleCancel} 
//             disabled={isLoading}
//             type="button"
//           >
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <datalist id="bed-numbers">
//             {availableBedsList.map((bed, i) => <option key={i} value={bed} />)}
//           </datalist>

//           <div className="form-section">
//             <h4>Patient Information</h4>
//             <div className="form-group patient-search-container">
//               <label>Patient Name *</label>
//               <input
//                 type="text"
//                 name="patientName"
//                 value={formData.patientName}
//                 onChange={handleChange}
//                 placeholder="Search and select from registered patients"
//                 required
//                 disabled={isLoading}
//                 className={`${errors.patientName ? "error" : ""} ${selectedPatientValid ? "valid" : ""}`}
//                 autoComplete="off"
//               />
//               {errors.patientName && <span className="error-message">{errors.patientName}</span>}
//               {!selectedPatientValid && formData.patientName && !errors.patientName && (
//                 <span className="warning-message">⚠️ Please select from suggestions</span>
//               )}

//               {/* ✅ Suggestions dropdown */}
//               {showPatientSuggestions && filteredPatients.length > 0 && !isLoading && (
//                 <div className="patient-suggestions">
//                   {filteredPatients.map(patient => (
//                     <div
//                       key={patient.id || patient._id}
//                       className="patient-suggestion-item"
//                       onClick={() => selectPatient(patient)}
//                     >
//                       <strong>{patient.patientName}</strong>
//                       <span>Age: {patient.age} | Phone: {patient.phone}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Age *</label>
//                 <input
//                   type="text"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   placeholder="Age (numbers only)"
//                   min="1"
//                   max="120"
//                   required
//                   disabled={isLoading || selectedPatientValid}
//                   className={errors.age ? "error" : ""}
//                   readOnly={selectedPatientValid}
//                 />
//                 {errors.age && <span className="error-message">{errors.age}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Gender</label>
//                 <select 
//                   name="gender" 
//                   value={formData.gender} 
//                   onChange={handleChange}
//                   disabled={isLoading || selectedPatientValid}
//                 >
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group full-width">
//                 <label>Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Enter address"
//                   disabled={isLoading || selectedPatientValid}
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Mobile Number *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="10-digit number (numbers only)"
//                   maxLength="10"
//                   required
//                   disabled={isLoading || selectedPatientValid}
//                   className={errors.phone ? "error" : ""}
//                 />
//                 {errors.phone && <span className="error-message">{errors.phone}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Emergency Contact Name</label>
//                 <input
//                   type="text"
//                   name="nameOfKin"
//                   value={formData.nameOfKin}
//                   onChange={handleChange}
//                   placeholder="Contact name (letters only)"
//                   disabled={isLoading || selectedPatientValid}
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Emergency Contact *</label>
//                 <input
//                   type="tel"
//                   name="kinContact"
//                   value={formData.kinContact}
//                   onChange={handleChange}
//                   placeholder="10-digit number (numbers only)"
//                   maxLength="10"
//                   required
//                   disabled={isLoading || selectedPatientValid}
//                   className={errors.kinContact ? "error" : ""}
//                 />
//                 {errors.kinContact && <span className="error-message">{errors.kinContact}</span>}
//               </div>
//             </div>
//           </div>

//           <div className="form-section">
//             <h4>Admission Details</h4>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Bed Number *</label>
//                 <input
//                   type="text"
//                   name="bedNo"
//                   value={formData.bedNo}
//                   onChange={handleChange}
//                   placeholder="Select bed number (e.g., B1)"
//                   list="bed-numbers"
//                   required
//                   disabled={isLoading}
//                   className={errors.bedNo ? "error" : ""}
//                 />
//                 {errors.bedNo && <span className="error-message">{errors.bedNo}</span>}
//                 <small className="field-hint">Available beds: {availableBedsList.length}</small>
//               </div>
//               <div className="form-group">
//                 <label>Admission Date *</label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={formData.fromDate}
//                   onChange={handleChange}
//                   min={getMinDate()}
//                   required
//                   disabled={isLoading}
//                   className={errors.fromDate ? "error" : ""}
//                 />
//                 {errors.fromDate && <span className="error-message">{errors.fromDate}</span>}
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Expected Discharge Date</label>
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={formData.toDate}
//                   onChange={handleChange}
//                   min={formData.fromDate || getMinDate()}
//                   disabled={isLoading}
//                   className={errors.toDate ? "error" : ""}
//                 />
//                 {errors.toDate && <span className="error-message">{errors.toDate}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Admitting Doctor *</label>
//                 <input
//                   type="text"
//                   name="admittingDoctor"
//                   value={formData.admittingDoctor}
//                   onChange={handleChange}
//                   placeholder="Doctor name (letters only)"
//                   required
//                   disabled={isLoading}
//                   className={errors.admittingDoctor ? "error" : ""}
//                 />
//                 {errors.admittingDoctor && <span className="error-message">{errors.admittingDoctor}</span>}
//               </div>
//             </div>

//             <div className="form-section">
//               <h4>Symptoms (Optional)</h4>
//               <div className="symptoms-container">
//                 <div 
//                   className="symptoms-select-box"
//                   onClick={() => !isLoading && setSymptomsDropdownOpen(!symptomsDropdownOpen)}
//                 >
//                   <div className="selected-symptoms-preview">
//                     {formData.symptoms.length > 0 ? (
//                       <div className="selected-chips">
//                         {formData.symptoms.slice(0, 2).map((symptom) => (
//                           <span key={symptom} className="symptom-chip">
//                             {symptom}
//                             <button 
//                               type="button"
//                               className="chip-remove"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleSymptomChange(symptom);
//                               }}
//                               disabled={isLoading}
//                             >×</button>
//                           </span>
//                         ))}
//                         {formData.symptoms.length > 2 && (
//                           <span className="more-count">
//                             +{formData.symptoms.length - 2} more
//                           </span>
//                         )}
//                       </div>
//                     ) : (
//                       <span className="placeholder">Select symptoms</span>
//                     )}
//                   </div>
//                   <span className={`dropdown-arrow ${symptomsDropdownOpen ? 'open' : ''}`}>▼</span>
//                 </div>
                
//                 {symptomsDropdownOpen && !isLoading && (
//                   <div className="symptoms-dropdown-menu">
//                     {cardiologySymptoms.map((symptom) => (
//                       <label key={symptom} className="symptom-option">
//                         <input
//                           type="checkbox"
//                           checked={formData.symptoms.includes(symptom)}
//                           onChange={() => handleSymptomChange(symptom)}
//                         />
//                         <span className="checkbox-label">{symptom}</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="form-actions">
//             <button 
//               type="button" 
//               onClick={handleCancel} 
//               className="cancel-btn" 
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className="confirm-btn"
//               disabled={isLoading || !selectedPatientValid}
//             >
//               {isLoading ? (
//                 <>
//                   <span className="loading-spinner"></span>
//                   Admitting...
//                 </>
//               ) : (
//                 "✓ Admit Patient"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdmitPatientForm;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AdmitPatientForm.css";

// function AdmitPatientForm() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     patientName: "",
//     patientId: "",
//     age: "",
//     gender: "Male",
//     address: "",
//     phone: "",
//     nameOfKin: "",
//     kinContact: "",
//     bedNo: "",
//     fromDate: new Date().toISOString().split('T')[0],
//     toDate: "",
//     symptoms: [],
//     admittingDoctor: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
//   const [availableBedsList, setAvailableBedsList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [symptomsDropdownOpen, setSymptomsDropdownOpen] = useState(false);
//   const [existingAdmissions, setExistingAdmissions] = useState([]);
//   const [registeredPatients, setRegisteredPatients] = useState([]);
//   const [selectedPatientValid, setSelectedPatientValid] = useState(false);
//   const [nonRegisteredError, setNonRegisteredError] = useState(""); // ✅ New state for non-registered error

//   const cardiologySymptoms = [
//     "Chest Pain", "Shortness of Breath", "Palpitations", 
//     "High Blood Pressure", "Dizziness", 
//     "Swelling in Legs", "Irregular Heartbeat",
//    "Sweating","Jaw Pain",
//     "Lightheadedness", "Rapid Heartbeat", "Slow Heartbeat",
//     "Chest Discomfort", "Coughing",
//     "Bluish Skin", "Fainting", "Confusion"
//   ];

//   // ✅ Fetch registered patients from backend
//   const fetchRegisteredPatients = async () => {
//     try {
//       console.log("📥 Fetching registered patients...");
//       const response = await fetch('http://localhost:8001/api/patients');
//       const data = await response.json();
//       console.log("📥 Response:", data);
      
//       if (data.success) {
//         setRegisteredPatients(data.data || []);
//         console.log(`✅ Loaded ${data.data?.length || 0} registered patients`);
//       } else {
//         console.error("❌ Failed to fetch patients:", data.message);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching registered patients:', error);
//     }
//   };

//   // Fetch available beds from backend
//   const fetchAvailableBeds = async () => {
//     try {
//       const response = await fetch('http://localhost:8001/api/availablebeds');
//       const data = await response.json();
//       if (data.success) {
//         setAvailableBedsList(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching available beds:', error);
//     }
//   };

//   // Fetch existing admissions
//   const fetchAdmissions = async () => {
//     try {
//       const response = await fetch('http://localhost:8001/api/admitpatient');
//       const data = await response.json();
//       if (data.success) {
//         setExistingAdmissions(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching admissions:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRegisteredPatients();
//     fetchAdmissions();
//     fetchAvailableBeds();
//   }, []);

//   const getMinDate = () => new Date().toISOString().split('T')[0];

//   // Validation Functions
//   const validatePatientName = (name) => {
//     if (!name || name.trim() === "") return "Patient name is required";
    
//     // ✅ Check if name exists in registered patients
//     const patientExists = registeredPatients.some(p => 
//       p.patientName?.toLowerCase() === name.toLowerCase()
//     );
    
//     if (!patientExists && !selectedPatientValid) {
//       return "❌ Patient not found in registered list! Please select from suggestions.";
//     }
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

//   const validatePhone = (phone, fieldName = "Phone") => {
//     if (!phone || phone === "") return `${fieldName} number is required`;
//     const cleaned = phone.replace(/\D/g, '');
//     if (cleaned.length !== 10) return `${fieldName} number must be exactly 10 digits`;
//     if (!['7', '8', '9'].includes(cleaned[0])) return `${fieldName} number must start with 7, 8, or 9`;
//     return "";
//   };

//   const validateKinContact = (contact) => {
//     if (!contact || contact === "") return "Emergency contact number is required";
//     const cleaned = contact.replace(/\D/g, '');
//     if (cleaned.length !== 10) return "Emergency contact must be exactly 10 digits";
//     if (!['7', '8', '9'].includes(cleaned[0])) return "Emergency contact must start with 7, 8, or 9";
//     return "";
//   };

//   const validateBedNo = (bedNo) => {
//     if (!bedNo || bedNo === "") return "Bed number is required";
    
//     const formattedBed = formatBedNo(bedNo);
//     if (!formattedBed) return "Please enter a valid bed number (e.g., B1, B2)";
    
//     if (!availableBedsList.includes(formattedBed)) {
//       return `Bed ${formattedBed} is not available. Available beds: ${availableBedsList.join(', ')}`;
//     }
    
//     const isOccupied = existingAdmissions.some(adm => 
//       adm.bedNo === formattedBed && adm.status === "Admitted"
//     );
    
//     if (isOccupied) return `Bed ${formattedBed} is already occupied by another patient`;
    
//     return "";
//   };

//   const validateFromDate = (date) => {
//     if (!date) return "Admission date is required";
//     const selectedDate = new Date(date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     if (selectedDate < today) return "Admission date cannot be in the past";
//     return "";
//   };

//   const validateToDate = (toDate, fromDate) => {
//     if (!toDate) return "";
//     if (toDate < fromDate) return "Discharge date cannot be before admission date";
//     return "";
//   };

//   const validateAdmittingDoctor = (doctor) => {
//     if (!doctor || doctor.trim() === "") return "Admitting doctor name is required";
//     const trimmed = doctor.trim();
//     if (trimmed.length < 3) return "Doctor name must be at least 3 characters";
//     if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Doctor name can only contain letters, spaces, dots, hyphens and apostrophes";
//     return "";
//   };

//   const isBedOccupied = (bedNo) => {
//     return existingAdmissions.some(adm => 
//       adm.bedNo === bedNo && adm.status === "Admitted"
//     );
//   };

//   const formatBedNo = (bed) => {
//     if (!bed) return "";
//     const match = bed.match(/^[bB]?(\d+)$/);
//     return match ? `B${match[1]}` : bed;
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const nameError = validatePatientName(formData.patientName);
//     if (nameError) newErrors.patientName = nameError;

//     const ageError = validateAge(formData.age);
//     if (ageError) newErrors.age = ageError;

//     const phoneError = validatePhone(formData.phone, "Phone");
//     if (phoneError) newErrors.phone = phoneError;

//     const kinError = validateKinContact(formData.kinContact);
//     if (kinError) newErrors.kinContact = kinError;

//     const bedError = validateBedNo(formData.bedNo);
//     if (bedError) newErrors.bedNo = bedError;

//     const fromDateError = validateFromDate(formData.fromDate);
//     if (fromDateError) newErrors.fromDate = fromDateError;

//     if (formData.toDate) {
//       const toDateError = validateToDate(formData.toDate, formData.fromDate);
//       if (toDateError) newErrors.toDate = toDateError;
//     }

//     const doctorError = validateAdmittingDoctor(formData.admittingDoctor);
//     if (doctorError) newErrors.admittingDoctor = doctorError;

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "phone" || name === "kinContact") {
//       const cleaned = value.replace(/\D/g, '');
//       if (cleaned.length <= 10) setFormData(prev => ({ ...prev, [name]: cleaned }));
//     } else if (name === "age") {
//       if (value === "" || /^\d+$/.test(value)) {
//         setFormData(prev => ({ ...prev, [name]: value }));
//       }
//     } else if (name === "patientName" || name === "admittingDoctor" || name === "nameOfKin") {
//       if (value === "" || /^[a-zA-Z\s\.\-']*$/.test(value)) {
//         setFormData(prev => ({ ...prev, [name]: value }));
//       }
//     } 
    
//     // ✅ Special handling for patientName search
//     if (name === "patientName") {
//       setFormData(prev => ({ ...prev, [name]: value }));
//       setSelectedPatientValid(false);
//       setNonRegisteredError(""); // Clear previous error

//       // ✅ Search in registered patients
//       if (value.length >= 2) {
//         console.log("🔍 Searching for:", value);
//         const results = searchPatients(value);
//         console.log("📋 Search results:", results);
//         setFilteredPatients(results);
//         setShowPatientSuggestions(results.length > 0);
        
//         // ✅ If no results found and user has typed full name, show error
//         if (results.length === 0 && value.length > 2) {
//           setNonRegisteredError("❌ This patient is not registered! Please register first.");
//         }
//       } else {
//         setShowPatientSuggestions(false);
//         setFilteredPatients([]);
//         setNonRegisteredError("");
//       }
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }

//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
//   };

//   const handleSymptomChange = (symptom) => {
//     setFormData(prev => ({
//       ...prev,
//       symptoms: prev.symptoms.includes(symptom)
//         ? prev.symptoms.filter(s => s !== symptom)
//         : [...prev.symptoms, symptom],
//     }));
//   };

//   // ✅ Search patients from registered patients list
//   const searchPatients = (query) => {
//     if (!registeredPatients || registeredPatients.length === 0) {
//       console.log("⚠️ No registered patients available");
//       return [];
//     }
    
//     const results = registeredPatients.filter(p =>
//       p.patientName?.toLowerCase().includes(query.toLowerCase()) ||
//       p.phone?.includes(query)
//     );
    
//     console.log(`🔍 Found ${results.length} matches for "${query}"`);
//     return results;
//   };

//   // ✅ Select patient and auto-fill all matching fields
//   const selectPatient = (patient) => {
//     console.log("✅ Selected registered patient:", patient);
    
//     setFormData(prev => ({
//       ...prev,
//       patientName: patient.patientName || "",
//       patientId: patient.id || patient._id || "",
//       age: patient.age || "",
//       gender: patient.gender || "Male",
//       address: patient.address || "",
//       phone: patient.phone || "",
//       nameOfKin: patient.nameOfKin || "",
//       kinContact: patient.kinContact || "",
//       bedNo: prev.bedNo,
//       fromDate: prev.fromDate,
//       toDate: prev.toDate,
//       admittingDoctor: prev.admittingDoctor,
//       symptoms: prev.symptoms
//     }));
    
//     setSelectedPatientValid(true);
//     setShowPatientSuggestions(false);
//     setFilteredPatients([]);
//     setNonRegisteredError(""); // Clear any error
    
//     if (errors.patientName) {
//       setErrors(prev => ({ ...prev, patientName: "" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!selectedPatientValid) {
//       alert("❌ Please select a patient from the registered patients list!");
//       return;
//     }
    
//     if (!validateForm()) return;

//     setIsLoading(true);

//     const formattedBed = formatBedNo(formData.bedNo);
    
//     if (isBedOccupied(formattedBed)) {
//       alert(`❌ Bed ${formattedBed} is already occupied! Please select another bed.`);
//       setIsLoading(false);
//       return;
//     }

//     const submissionData = {
//       id: `ADM-${Date.now()}`,
//       ...formData,
//       bedNo: formattedBed,
//       admissionDate: new Date().toISOString().split('T')[0],
//       admissionTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
//       status: "Admitted"
//     };

//     try {
//       const response = await fetch('http://localhost:8001/api/admitpatient', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submissionData)
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert(`✅ Patient ${formData.patientName} admitted to Bed ${formattedBed}`);
//         navigate("/receptionist-dashboard/admitlist");
//       } else {
//         alert(`❌ Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('Error admitting patient:', error);
//       alert('❌ Failed to admit patient. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     console.log("🔙 Going back to previous page");
//     navigate("./reception-dashboard");
//   };

//   // ✅ Check if all patient fields should be disabled
//   const shouldDisablePatientFields = () => {
//     return isLoading || selectedPatientValid;
//   };

//   return (
//     <div className="form-overlay">
//       <div className="form-container">
//         <div className="form-header">
//           <h2>🏥 Admit Patient</h2>
//           <button 
//             className="close-btn" 
//             onClick={handleCancel} 
//             disabled={isLoading}
//             type="button"
//           >
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <datalist id="bed-numbers">
//             {availableBedsList.map((bed, i) => <option key={i} value={bed} />)}
//           </datalist>

//           <div className="form-section">
//             <h4>Patient Information</h4>
//             <div className="form-group patient-search-container">
//               <label>Patient Name *</label>
//               <input
//                 type="text"
//                 name="patientName"
//                 value={formData.patientName}
//                 onChange={handleChange}
//                 placeholder="Search and select from registered patients"
//                 required
//                 disabled={isLoading}
//                 className={`${errors.patientName ? "error" : ""} ${selectedPatientValid ? "valid" : ""}`}
//                 autoComplete="off"
//               />
//               {errors.patientName && <span className="error-message">{errors.patientName}</span>}
              
//               {/* ✅ Show non-registered error immediately */}
//               {nonRegisteredError && !selectedPatientValid && (
//                 <span className="error-message" style={{ color: '#dc3545', fontWeight: 'bold' }}>
//                   {nonRegisteredError}
//                 </span>
//               )}
              
//               {!selectedPatientValid && formData.patientName && !errors.patientName && !nonRegisteredError && (
//                 <span className="warning-message">⚠️ Please select from suggestions</span>
//               )}

//               {/* Suggestions dropdown */}
//               {showPatientSuggestions && filteredPatients.length > 0 && !isLoading && (
//                 <div className="patient-suggestions">
//                   {filteredPatients.map(patient => (
//                     <div
//                       key={patient.id || patient._id}
//                       className="patient-suggestion-item"
//                       onClick={() => selectPatient(patient)}
//                     >
//                       <strong>{patient.patientName}</strong>
//                       <span>Age: {patient.age} | Phone: {patient.phone}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Age *</label>
//                 <input
//                   type="text"
//                   name="age"
//                   value={formData.age}
//                   onChange={handleChange}
//                   placeholder="Age (numbers only)"
//                   min="1"
//                   max="120"
//                   required
//                   disabled={shouldDisablePatientFields()}
//                   className={errors.age ? "error" : ""}
//                   readOnly={selectedPatientValid}
//                 />
//                 {errors.age && <span className="error-message">{errors.age}</span>}
//               </div>
//               <div className="form-group">
//                 <label>Gender</label>
//                 <select 
//                   name="gender" 
//                   value={formData.gender} 
//                   onChange={handleChange}
//                   disabled={shouldDisablePatientFields()}
//                 >
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group full-width">
//                 <label>Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="Enter address"
//                   disabled={shouldDisablePatientFields()}
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Mobile Number *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="10-digit number (numbers only)"
//                   maxLength="10"
//                   required
//                   disabled={shouldDisablePatientFields()}
//                   className={errors.phone ? "error" : ""}
//                 />
//                 {errors.phone && <span className="error-message">{errors.phone}</span>}
//               </div>
              
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Emergency Contact *</label>
//                 <input
//                   type="tel"
//                   name="kinContact"
//                   value={formData.kinContact}
//                   onChange={handleChange}
//                   placeholder="10-digit number (numbers only)"
//                   maxLength="10"
//                   required
//                   disabled={shouldDisablePatientFields()}
//                   className={errors.kinContact ? "error" : ""}
//                 />
//                 {errors.kinContact && <span className="error-message">{errors.kinContact}</span>}
//               </div>
//             </div>
//           </div>

//           <div className="form-section">
//             <h4>Admission Details</h4>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Bed Number *</label>
//                 <input
//                   type="text"
//                   name="bedNo"
//                   value={formData.bedNo}
//                   onChange={handleChange}
//                   placeholder="Select bed number (e.g., B1)"
//                   list="bed-numbers"
//                   required
//                   disabled={isLoading}
//                   className={errors.bedNo ? "error" : ""}
//                 />
//                 {errors.bedNo && <span className="error-message">{errors.bedNo}</span>}
//                 <small className="field-hint">Available beds: {availableBedsList.length}</small>
//               </div>

              
              
              
//             </div>
//             <div className="form-row">
//                 <div className="form-group">
//                 <label>Admission Date *   </label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={formData.fromDate}
//                   onChange={handleChange}
//                   min={getMinDate()}
//                   required
//                   disabled={isLoading}
//                   className={errors.fromDate ? "error" : ""}
//                 />
//                 {errors.fromDate && <span className="error-message">{errors.fromDate}</span>}
//               </div>
//               <div className="form-groupp">
//                 <label>Expected Discharge Date *</label>
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={formData.toDate}
//                   onChange={handleChange}
//                   min={formData.fromDate || getMinDate()}
//                   disabled={isLoading}
//                   className={errors.toDate ? "error" : ""}
//                 />
//                 {errors.toDate && <span className="error-message">{errors.toDate}</span>}
//               </div>
//             </div>

            

//             <div className="form-section">
//               <h4>Symptoms (Optional)</h4>
//               <div className="symptoms-container">
//                 <div 
//                   className="symptoms-select-box"
//                   onClick={() => !isLoading && setSymptomsDropdownOpen(!symptomsDropdownOpen)}
//                 >
//                   <div className="selected-symptoms-preview">
//                     {formData.symptoms.length > 0 ? (
//                       <div className="selected-chips">
//                         {formData.symptoms.slice(0, 2).map((symptom) => (
//                           <span key={symptom} className="symptom-chip">
//                             {symptom}
//                             <button 
//                               type="button"
//                               className="chip-remove"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleSymptomChange(symptom);
//                               }}
//                               disabled={isLoading}
//                             >×</button>
//                           </span>
//                         ))}
//                         {formData.symptoms.length > 2 && (
//                           <span className="more-count">
//                             +{formData.symptoms.length - 2} more
//                           </span>
//                         )}
//                       </div>
//                     ) : (
//                       <span className="placeholder">Select symptoms</span>
//                     )}
//                   </div>
//                   <span className={`dropdown-arrow ${symptomsDropdownOpen ? 'open' : ''}`}>▼</span>
//                 </div>
                
//                 {symptomsDropdownOpen && !isLoading && (
//                   <div className="symptoms-dropdown-menu">
//                     {cardiologySymptoms.map((symptom) => (
//                       <label key={symptom} className="symptom-option">
//                         <input
//                           type="checkbox"
//                           checked={formData.symptoms.includes(symptom)}
//                           onChange={() => handleSymptomChange(symptom)}
//                         />
//                         <span className="checkbox-label">{symptom}</span>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="form-actions">
//             <button 
//               type="button" 
//               onClick={handleCancel} 
//               className="cancel-btn" 
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className="confirm-btn"
//               disabled={isLoading || !selectedPatientValid}
//             >
//               {isLoading ? (
//                 <>
//                   <span className="loading-spinner"></span>
//                   Admitting...
//                 </>
//               ) : (
//                 "✓ Admit Patient"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdmitPatientForm;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdmitPatientForm.css";

function AdmitPatientForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    age: "",
    gender: "Male",
    address: "",
    phone: "",
    nameOfKin: "",
    kinContact: "",
    bedNo: "",
    fromDate: new Date().toISOString().split('T')[0],
    toDate: "",
    symptoms: [],
    admittingDoctor: ""
  });

  const [errors, setErrors] = useState({});
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [availableBedsList, setAvailableBedsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [symptomsDropdownOpen, setSymptomsDropdownOpen] = useState(false);
  const [existingAdmissions, setExistingAdmissions] = useState([]);
  const [registeredPatients, setRegisteredPatients] = useState([]);
  const [selectedPatientValid, setSelectedPatientValid] = useState(false);
  const [nonRegisteredError, setNonRegisteredError] = useState("");

  const cardiologySymptoms = [
    "Chest Pain", "Shortness of Breath", "Palpitations", 
    "High Blood Pressure", "Dizziness", 
    "Swelling in Legs", "Irregular Heartbeat",
   "Sweating","Jaw Pain",
    "Lightheadedness", "Rapid Heartbeat", "Slow Heartbeat",
    "Chest Discomfort", "Coughing",
    "Bluish Skin", "Fainting", "Confusion"
  ];

  // ✅ Fetch registered patients from backend
  const fetchRegisteredPatients = async () => {
    try {
      console.log("📥 Fetching registered patients...");
      const response = await fetch('http://localhost:8001/api/patients');
      const data = await response.json();
      console.log("📥 Response:", data);
      
      if (data.success) {
        setRegisteredPatients(data.data || []);
        console.log(`✅ Loaded ${data.data?.length || 0} registered patients`);
      } else {
        console.error("❌ Failed to fetch patients:", data.message);
      }
    } catch (error) {
      console.error('❌ Error fetching registered patients:', error);
    }
  };

  // Fetch available beds from backend
  const fetchAvailableBeds = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/availablebeds');
      const data = await response.json();
      if (data.success) {
        setAvailableBedsList(data.data);
      }
    } catch (error) {
      console.error('Error fetching available beds:', error);
    }
  };

  // Fetch existing admissions
  const fetchAdmissions = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/admitpatient');
      const data = await response.json();
      if (data.success) {
        setExistingAdmissions(data.data);
      }
    } catch (error) {
      console.error('Error fetching admissions:', error);
    }
  };

  useEffect(() => {
    fetchRegisteredPatients();
    fetchAdmissions();
    fetchAvailableBeds();
  }, []);

  const getMinDate = () => new Date().toISOString().split('T')[0];

  // Validation Functions
  const validatePatientName = (name) => {
    if (!name || name.trim() === "") return "Patient name is required";
    
    // ✅ Check if name exists in registered patients
    const patientExists = registeredPatients.some(p => 
      p.patientName?.toLowerCase() === name.toLowerCase()
    );
    
    if (!patientExists && !selectedPatientValid) {
      return "❌ Patient not found in registered list! Please select from suggestions.";
    }
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

  const validatePhone = (phone, fieldName = "Phone") => {
    if (!phone || phone === "") return `${fieldName} number is required`;
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) return `${fieldName} number must be exactly 10 digits`;
    if (!['7', '8', '9'].includes(cleaned[0])) return `${fieldName} number must start with 7, 8, or 9`;
    return "";
  };

  const validateKinContact = (contact) => {
    if (!contact || contact === "") return "Emergency contact number is required";
    const cleaned = contact.replace(/\D/g, '');
    if (cleaned.length !== 10) return "Emergency contact must be exactly 10 digits";
    if (!['7', '8', '9'].includes(cleaned[0])) return "Emergency contact must start with 7, 8, or 9";
    return "";
  };

  const validateBedNo = (bedNo) => {
    if (!bedNo || bedNo === "") return "Bed number is required";
    
    const formattedBed = formatBedNo(bedNo);
    if (!formattedBed) return "Please enter a valid bed number (e.g., B1, B2)";
    
    if (!availableBedsList.includes(formattedBed)) {
      return `Bed ${formattedBed} is not available. Available beds: ${availableBedsList.join(', ')}`;
    }
    
    const isOccupied = existingAdmissions.some(adm => 
      adm.bedNo === formattedBed && adm.status === "Admitted"
    );
    
    if (isOccupied) return `Bed ${formattedBed} is already occupied by another patient`;
    
    return "";
  };

  const validateFromDate = (date) => {
    if (!date) return "Admission date is required";
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return "Admission date cannot be in the past";
    return "";
  };

  const validateToDate = (toDate, fromDate) => {
    if (!toDate) return "";
    if (toDate < fromDate) return "Discharge date cannot be before admission date";
    return "";
  };

  const validateAdmittingDoctor = (doctor) => {
    if (!doctor || doctor.trim() === "") return "Admitting doctor name is required";
    const trimmed = doctor.trim();
    if (trimmed.length < 3) return "Doctor name must be at least 3 characters";
    if (!/^[a-zA-Z\s\.\-']+$/.test(trimmed)) return "Doctor name can only contain letters, spaces, dots, hyphens and apostrophes";
    return "";
  };

  const isBedOccupied = (bedNo) => {
    return existingAdmissions.some(adm => 
      adm.bedNo === bedNo && adm.status === "Admitted"
    );
  };

  const formatBedNo = (bed) => {
    if (!bed) return "";
    const match = bed.match(/^[bB]?(\d+)$/);
    return match ? `B${match[1]}` : bed;
  };

  const validateForm = () => {
    const newErrors = {};

    const nameError = validatePatientName(formData.patientName);
    if (nameError) newErrors.patientName = nameError;

    const ageError = validateAge(formData.age);
    if (ageError) newErrors.age = ageError;

    const phoneError = validatePhone(formData.phone, "Phone");
    if (phoneError) newErrors.phone = phoneError;

    const kinError = validateKinContact(formData.kinContact);
    if (kinError) newErrors.kinContact = kinError;

    const bedError = validateBedNo(formData.bedNo);
    if (bedError) newErrors.bedNo = bedError;

    const fromDateError = validateFromDate(formData.fromDate);
    if (fromDateError) newErrors.fromDate = fromDateError;

    if (formData.toDate) {
      const toDateError = validateToDate(formData.toDate, formData.fromDate);
      if (toDateError) newErrors.toDate = toDateError;
    }

    const doctorError = validateAdmittingDoctor(formData.admittingDoctor);
    if (doctorError) newErrors.admittingDoctor = doctorError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "kinContact") {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 10) setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else if (name === "age") {
      if (value === "" || /^\d+$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else if (name === "patientName" || name === "admittingDoctor" || name === "nameOfKin") {
      if (value === "" || /^[a-zA-Z\s\.\-']*$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } 
    
    // ✅ Special handling for patientName search
    if (name === "patientName") {
      setFormData(prev => ({ ...prev, [name]: value }));
      setSelectedPatientValid(false);
      setNonRegisteredError(""); // Clear previous error

      // ✅ Search in registered patients
      if (value.length >= 2) {
        console.log("🔍 Searching for:", value);
        const results = searchPatients(value);
        console.log("📋 Search results:", results);
        setFilteredPatients(results);
        setShowPatientSuggestions(results.length > 0);
        
        // ✅ If no results found and user has typed full name, show error
        if (results.length === 0 && value.length > 2) {
          setNonRegisteredError("❌ This patient is not registered! Please register first.");
        }
      } else {
        setShowPatientSuggestions(false);
        setFilteredPatients([]);
        setNonRegisteredError("");
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSymptomChange = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  // ✅ Search patients from registered patients list
  const searchPatients = (query) => {
    if (!registeredPatients || registeredPatients.length === 0) {
      console.log("⚠️ No registered patients available");
      return [];
    }
    
    const results = registeredPatients.filter(p =>
      p.patientName?.toLowerCase().includes(query.toLowerCase()) ||
      p.phone?.includes(query)
    );
    
    console.log(`🔍 Found ${results.length} matches for "${query}"`);
    return results;
  };

  // ✅ Select patient and auto-fill all matching fields
  const selectPatient = (patient) => {
    console.log("✅ Selected registered patient:", patient);
    
    setFormData(prev => ({
      ...prev,
      patientName: patient.patientName || "",
      patientId: patient.id || patient._id || "",
      age: patient.age || "",
      gender: patient.gender || "Male",
      address: patient.address || "",
      phone: patient.phone || "",
      nameOfKin: patient.nameOfKin || "",
      kinContact: patient.kinContact || "",
      bedNo: prev.bedNo,
      fromDate: prev.fromDate,
      toDate: prev.toDate,
      admittingDoctor: prev.admittingDoctor,
      symptoms: prev.symptoms
    }));
    
    setSelectedPatientValid(true);
    setShowPatientSuggestions(false);
    setFilteredPatients([]);
    setNonRegisteredError(""); // Clear any error
    
    if (errors.patientName) {
      setErrors(prev => ({ ...prev, patientName: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPatientValid) {
      alert("❌ Please select a patient from the registered patients list!");
      return;
    }
    
    if (!validateForm()) return;

    setIsLoading(true);

    const formattedBed = formatBedNo(formData.bedNo);
    
    if (isBedOccupied(formattedBed)) {
      alert(`❌ Bed ${formattedBed} is already occupied! Please select another bed.`);
      setIsLoading(false);
      return;
    }

    const submissionData = {
      id: `ADM-${Date.now()}`,
      ...formData,
      bedNo: formattedBed,
      admissionDate: new Date().toISOString().split('T')[0],
      admissionTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      status: "Admitted"
    };

    try {
      const response = await fetch('http://localhost:8001/api/admitpatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ Patient ${formData.patientName} admitted to Bed ${formattedBed}`);
        navigate("/receptionist-dashboard/admitlist");
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error admitting patient:', error);
      alert('❌ Failed to admit patient. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("🔙 Going back to previous page");
    navigate("./reception-dashboard");
  };

  // ✅ Check if all patient fields should be disabled
  const shouldDisablePatientFields = () => {
    return isLoading || selectedPatientValid;
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>🏥 Admit Patient</h2>
          <button 
            className="close-btn" 
            onClick={handleCancel} 
            disabled={isLoading}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <datalist id="bed-numbers">
            {availableBedsList.map((bed, i) => <option key={i} value={bed} />)}
          </datalist>

          <div className="form-section">
            <h4>Patient Information</h4>
            <div className="form-group patient-search-container">
              <label>Patient Name *</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Search and select from registered patients"
                required
                disabled={isLoading}
                className={`${errors.patientName ? "error" : ""} ${selectedPatientValid ? "valid" : ""}`}
                autoComplete="off"
              />
              {errors.patientName && <span className="error-message">{errors.patientName}</span>}
              
              {/* ✅ Show non-registered error immediately */}
              {nonRegisteredError && !selectedPatientValid && (
                <span className="error-message" style={{ color: '#dc3545', fontWeight: 'bold' }}>
                  {nonRegisteredError}
                </span>
              )}
              
              {!selectedPatientValid && formData.patientName && !errors.patientName && !nonRegisteredError && (
                <span className="warning-message">⚠️ Please select from suggestions</span>
              )}

              {/* Suggestions dropdown */}
              {showPatientSuggestions && filteredPatients.length > 0 && !isLoading && (
                <div className="patient-suggestions">
                  {filteredPatients.map(patient => (
                    <div
                      key={patient.id || patient._id}
                      className="patient-suggestion-item"
                      onClick={() => selectPatient(patient)}
                    >
                      <strong>{patient.patientName}</strong>
                      <span>Age: {patient.age} | Phone: {patient.phone}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age (numbers only)"
                  min="1"
                  max="120"
                  required
                  disabled={shouldDisablePatientFields()}
                  className={errors.age ? "error" : ""}
                  readOnly={selectedPatientValid}
                />
                {errors.age && <span className="error-message">{errors.age}</span>}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  disabled={shouldDisablePatientFields()}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  disabled={shouldDisablePatientFields()}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number (numbers only)"
                  maxLength="10"
                  required
                  disabled={shouldDisablePatientFields()}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Emergency Contact *</label>
                <input
                  type="tel"
                  name="kinContact"
                  value={formData.kinContact}
                  onChange={handleChange}
                  placeholder="10-digit number (numbers only)"
                  maxLength="10"
                  required
                  disabled={shouldDisablePatientFields()}
                  className={errors.kinContact ? "error" : ""}
                />
                {errors.kinContact && <span className="error-message">{errors.kinContact}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>Admission Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Bed Number *</label>
                <input
                  type="text"
                  name="bedNo"
                  value={formData.bedNo}
                  onChange={handleChange}
                  placeholder="Select bed number (e.g., B1)"
                  list="bed-numbers"
                  required
                  disabled={isLoading}
                  className={errors.bedNo ? "error" : ""}
                />
                {errors.bedNo && <span className="error-message">{errors.bedNo}</span>}
                <small className="field-hint">Available beds: {availableBedsList.length}</small>
              </div>

            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Admission Date *  </label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  min={getMinDate()}
                  required
                  disabled={isLoading}
                  className={errors.fromDate ? "error" : ""}
                />
                {errors.fromDate && <span className="error-message">{errors.fromDate}</span>}
              </div>
              
              {/* ✅ FIXED: Changed from 'form-groupp' to 'form-group' */}
              <div className="form-groupp">
                <label>Expected Discharge Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  min={formData.fromDate || getMinDate()}
                  disabled={isLoading}
                  className={errors.toDate ? "error" : ""}
                />
                {errors.toDate && <span className="error-message">{errors.toDate}</span>}
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
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleCancel} 
              className="cancel-btn" 
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="confirm-btn"
              disabled={isLoading || !selectedPatientValid}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Admitting...
                </>
              ) : (
                "✓ Admit Patient"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdmitPatientForm;