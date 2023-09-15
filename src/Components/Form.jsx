import React, { useState } from "react";
import './Form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    
    if (name.trim() === '' || name.trim().length < 5) {
      setErrorMessage('Please enter a valid name (must contain at least 5 characters).');
      setSuccessMessage(false); 
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@([a-zA-Z\-0-9]{3,8}\.)+[a-zA-Z]{2,}$/
    .test(email)) {
      setErrorMessage('Please insert a valid e-mail address.');
      setSuccessMessage(false); 
    } else {
      setErrorMessage('');
      setSuccessMessage(`Hi! ${name.trim()}, will reach out to you in your e-mail!.`);
    }
  };

  const handleNameChange = (event) => {
    
    setErrorMessage('');
    setSuccessMessage(''); 
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
  
    setErrorMessage('');
    setSuccessMessage(''); 
    setEmail(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="main-form">
        <label>Full name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <label>E-mail:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Form;
