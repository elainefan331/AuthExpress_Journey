import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const isDisabled = username.length < 4 || password.length < 6 || email.length < 1 || firstName.length < 1 || lastName.length < 1 || confirmPassword.length < 1

  return (
    <div className='signup-modal-container'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className='signup-form-container'>
        <label>
          Email
          </label>
          <input
            placeholder=" Email (required)"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          </label>
          <input
            placeholder=" Username (minimum 4 characters)"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          </label>
          <input
            placeholder=" First Name (required)"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          </label>
          <input
            placeholder=" Last Name (required)"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          </label>
          <input
            placeholder=" Password (minimum 6 characters)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          </label>
          <input
            placeholder=" Confirm Password (required)"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button 
          type="submit"
          disabled={isDisabled}
          className={isDisabled? 'disable-signup-button' : 'signup-button'}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
