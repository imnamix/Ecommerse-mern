// import React from "react";
// import Layout from "./../components/Layout/Layout";
// import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
// const Contact = () => {
//   return (
//     <Layout title={"Contact us"}>
//       <div className="row contactus ">
//         <div className="col-md-6 ">
//           <img
//             src="/images/contactus.jpeg"
//             alt="contactus"
//             style={{ width: "100%" }}
//           />
//         </div>
//         <div className="col-md-4">
//           <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
//           <p className="text-justify mt-2">
//             any query and info about prodduct feel free to call anytime we 24X7
//             vaialible
//           </p>
//           <p className="mt-3">
//             <BiMailSend /> : www.help@ecommerceapp.com
//           </p>
//           <p className="mt-3">
//             <BiPhoneCall /> : 012-3456789
//           </p>
//           <p className="mt-3">
//             <BiSupport /> : 1800-0000-0000 (toll free)
//           </p>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Contact;
// ContactUs.js
import React, { useState } from 'react';
import Layout from "./../components/Layout/Layout";
import axios from 'axios';


const styles = {
  form: {
    marginTop: '60px',
    fontFamily: 'Arial, sans-serif',
    marginLeft:'50px',
    height: '70vh',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center', // Center the h4 element horizontally
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    minHeight: '100px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post('/submit-form', formData);
      console.log(response.data);
      setMessage('Form submitted successfully!');
      // Optionally, you can reset the form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      setMessage('Error submitting form. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const { name, email, subject, message: userMessage } = formData;

  return (
    <Layout title={"Contact us"} >
    <div className='nan' style={{display:'flex'}}>
      <h2>Contact Us</h2>
      <div className="col-md-6 " style={{marginTop:'90px',marginLeft:'-150px', marginBottom:'120px'}}>
         <img
            src="/images/contactus.jpeg"
            alt="contactus"
           style={{ width: "100%" }}
        />
      </div>       
      <div className="col-md-4 mt-2" >
      <form onSubmit={handleSubmit} style={styles.form}>
      <h4 style={styles.heading}>Contact us</h4>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Subject:</label>
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Message:</label>
        <textarea
          name="message"
          value={userMessage}
          onChange={handleChange}
          style={styles.textarea}
          required
        ></textarea>
      </div>
      <button type="submit" style={styles.button}>Submit</button>
    </form>
    </div>
    </div>
    </Layout>
  );
};

export default ContactForm;


