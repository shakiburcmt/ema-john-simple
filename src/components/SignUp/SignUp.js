import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css'

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        if (password.length < 6) {
            setError('Password should be 6 characters or more.')
        }
        else if (password !== confirm) {
            setError('Password did not match.')
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" placeholder="re-type password" required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            <p style={{ color: 'red' }}>{error}</p>
        </div>
    );
};

export default SignUp;