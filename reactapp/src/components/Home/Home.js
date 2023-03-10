import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

export const Home = () => {



    return(
        <body>
            <div >
                <div class="nav">
                    <h1 class="nav-title">CalorieTracker</h1>
                    <ul class="nav-links">
                        <li>Hi, <a href="#">User</a></li>
                        <li>|</li>
                        <li><a href="#">Home</a></li>
                        <li>|</li>
                        <li><a href="#">Settings</a></li>
                        <li>|</li>
                        <li><button class="btn">Sign In</button></li>
                    </ul>
                </div>  
            </div>

        </body>
    )
};