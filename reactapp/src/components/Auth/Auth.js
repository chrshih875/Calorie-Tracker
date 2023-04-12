import React, { useState, useContext  } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AuthContext from '../../AuthContext';
import { useNavigate } from "react-router-dom";

// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const initialState = { FirstName: '', LastName: '', email: '', password: '', ConfirmPassword: '' };
const secondState = { email: '', password: '' };

export const Auth = () => {
    const navigate = useNavigate();
    const [ showPassword, setShowPassword ] = useState( false );
    const [ isSignUp, setIsSignUp ] = useState( false );
    const [ formData, setFormData ] = useState( initialState );
    const [ loginData, setLoginData] = useState( secondState );
    const { login, register } = useContext(AuthContext);

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword( ( prevShowPassword ) => !prevShowPassword );
    }

    const switchMode = (e) => {
        e.preventDefault();
        setIsSignUp( ( prevIsSignUp ) => !prevIsSignUp );
        handleShowPassword( false );
    };

    const handleChange = ( e ) => {
        isSignUp ? setFormData({ ...formData, [e.target.name]: e.target.value})
        : setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async( e ) => {
        e.preventDefault();

        if( isSignUp ) {
            await register(formData);
        }
        else {
            await login(loginData);
            navigate('/home')
        }
    };

    return (
        <div>
            {
                isSignUp ? <h1>Sign Up</h1> : <h1>Sign In</h1>
            }
            <form onSubmit={ handleSubmit }>
                {
                    isSignUp && (
                        <>
                            <div className="form-outline mb-4">
                                <input name='FirstName' label='First Name' onChange={ handleChange } id='firstNameInput' className='form-control' />
                                <label className='form-label' htmlFor='firstNameInput' >First Name</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input name='LastName' label='Last Name' onChange={ handleChange } id='lastNameInput' className='form-control'/>
                                <label className='form-label' htmlFor='lastNameInput'>Last Name</label>
                            </div>
                        </>
                    )
                }
                <div className='form-outline mb-4'>
                    <input name='email' label='Email Address' onChange={ handleChange } type='email' id='emailInput' className='form-control'/>
                    <label className='form-label' htmlFor='emailInput'>Email</label>
                </div>
                <div className='form-outline mb-4'>
                    <input name='password' label='Password' onChange={ handleChange } type={ showPassword ? 'text' : 'password' } id='passwordInput' className='form-control' />
                    <label className='form-label' htmlFor='passwordInput'>Password</label>
                    <button onClick={handleShowPassword} className='btn btn-link'>{ showPassword ? 'Hide Password' : 'Show Password' }</button>
                </div>
                { isSignUp &&
                <div className='form-outline mb-4'>
                    <input name='ConfirmPassword' label='Confirm Password' onChange={ handleChange } type='password' id='confirmPasswordInput' className='form-control'/>
                    <label className='form-label' htmlFor='confirmPasswordInput'>Confirm Password</label>
                </div>
                }
                <button type='submit' className='btn btn-primary btn-block mb-4'>
                    { isSignUp ? 'Sign Up' : 'Sign In' }
                </button>
                <button onClick={ switchMode } type='button' className='btn btn-secondary btn-block mb-4 '>
                    { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                </button>
            </form>
        </div>
    )
};

export default Auth;