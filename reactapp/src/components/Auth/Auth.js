import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const initialState = { FirstName: '', LastName: '', Email: '', Password: '', ConfirmPassword: '' };
const secondState = { Email: '', Password: '' };

export const Auth = () => {
    const [ showPassword, setShowPassword ] = useState( false );
    const [ isSignUp, setIsSignUp ] = useState( false );
    const [ formData, setFormData ] = useState( initialState );
    const [ loginData, setLoginData] = useState( secondState );
    const [ token, setToken ] = useState("")


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
        isSignUp ? setFormData({ ...formData, [e.target.name]: e.target.value }) : setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async( e ) => {
        e.preventDefault();

        // console.log( formData );

        if( isSignUp ) {
            console.log( 'Sign Up Form', formData )
            return axios.post("http://localhost:8080/register", formData)
            .then(response => {
                console.log(response)
            })
            .catch((err) => { console.log("form sub err", err) })
        }
        else {
            console.log( 'Sign In Form', loginData )
            const tmpToken = await axios.post(`http://localhost:8080/login`, loginData)
            .then((response) => {
                console.log(response)
                setToken(tmpToken)
                console.log( "token", token )
                return tmpToken
        });
            // const loginURL = `http://localhost:8080/login?email=${loginData.email}&password=${loginData.password}`;
            // const fetchConfig = {
            //     method: 'post',
            //     body: JSON.stringify({
            //         Email: loginData.email,
            //         Password: loginData.password
            //     }),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // };
            // const response = await fetch (loginURL, fetchConfig);
            // console.log("x", x)
            // if (x.ok){
            //     console.log("Login done")
            // }else {
            //     console.log("bum")
            // }
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
                                <input name='FirstName' label='First Name' onChange={ handleChange } id='FirstNameInput' className='form-control' />
                                <label className='form-label' htmlFor='FirstNameInput' >First Name</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input name='LastName' label='Last Name' onChange={ handleChange } id='LastNameInput' className='form-control'/>
                                <label className='form-label' htmlFor='LastNameInput'>Last Name</label>
                            </div>
                        </>
                    )
                }
                <div className='form-outline mb-4'>
                    <input name='Email' label='Email Address' onChange={ handleChange } type='email' id='EmailInput' className='form-control'/>
                    <label className='form-label' htmlFor='EmailInput'>Email</label>
                </div>
                <div className='form-outline mb-4'>
                    <input name='Password' label='Password' onChange={ handleChange } type={ showPassword ? 'text' : 'password' } id='PasswordInput' className='form-control' />
                    <label className='form-label' htmlFor='PasswordInput'>Password</label>
                    <button onClick={handleShowPassword} className='btn btn-link'>{ showPassword ? 'Hide Password' : 'Show Password' }</button>
                </div>
                { isSignUp &&
                <div className='form-outline mb-4'>
                    <input name='ConfirmPassword' label='Confirm Password' onChange={ handleChange } type='password' id='ConfirmPasswordInput' className='form-control'/>
                    <label className='form-label' htmlFor='ConfirmPasswordInput'>Confirm Password</label>
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
