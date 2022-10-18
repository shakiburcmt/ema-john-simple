import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css'

const Login = () => {
    const { signIn } = useContext(AuthContext);

    const handleSignIn = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSignIn}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" required />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p>New to ema john? <Link to="/signup">Create New Account</Link></p>
        </div>
    );
};

export default Login;