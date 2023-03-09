import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export const Auth = () => {
    const [ showPassword, setShowPassword ] = useState( false );
    const [ isSignUp, setIsSignUp ] = useState( false );
    const [ formData, setFormData ] = useState( initialState );


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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = ( e ) => {
        e.preventDefault();

        console.log( formData );

        if( isSignUp ) {
            console.log( 'Sign Up Form', formData )
        }
        else {
            console.log( 'Sign In Form', formData )
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
                            <div class="form-outline mb-4">
                                <input name='firstName' label='First Name' onChange={ handleChange } id='firstNameInput' class='form-control' />
                                <label class='form-label' for='firstNameInput' >First Name</label>
                            </div>
                            <div class="form-outline mb-4">
                                <input name='lastName' label='Last Name' onChange={ handleChange } id='lastNameInput' class='form-control'/>
                                <label class='form-label' for='lastNameInput'>Last Name</label>
                            </div>
                        </>
                    )
                }
                <div class='form-outline mb-4'>
                    <input name='email' label='Email Address' onChange={ handleChange } type='email' id='emailInput' class='form-control'/>
                    <label class='form-label' for='emailInput'>Email</label>
                </div>
                <div class='form-outline mb-4'>
                    <input name='password' label='Password' onChange={ handleChange } type={ showPassword ? 'text' : 'password' } id='passwordInput' class='form-control' />
                    <label class='form-label' for='passwordInput'>Password</label>
                    <button onClick={handleShowPassword} class='btn btn-link'>{ showPassword ? 'Hide Password' : 'Show Password' }</button>
                </div>
                { isSignUp && 
                <div class='form-outline mb-4'>
                    <input name='confirmPassword' label='Confirm Password' onChange={ handleChange } type='password' id='confirmPasswordInput' class='form-control'/>
                    <label class='form-label' for='confirmPasswordInput'>Confirm Password</label>
                </div>
                }
                <button type='submit' class='btn btn-primary btn-block mb-4'>
                    { isSignUp ? 'Sign Up' : 'Sign In' }
                </button>
                <button onClick={ switchMode } type='button' class='btn btn-secondary btn-block mb-4 '>
                    { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                </button>
            </form>
        </div>
    )
};

export default Auth;
