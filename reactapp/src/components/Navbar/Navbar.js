import React, { useContext } from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import './styles.css';
import AuthContext from '../../AuthContext';

export const Navbar = () => {
    // const [ user, setUser ] = useState(null);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);


    // const logout = () => {
    //     localStorage.clear();

    //     cookies.remove()

    //     navigate( '/auth' );

    //     setUser( null )
    // };

    const loggingOut = () => {
        console.log("hello")
        logout();
        console.log("hmmm")
        // window.location.reload(false);
    }

    const signin = () => {
        navigate( '/auth' );
    }

    // useEffect( () => {

    //     setUser( JSON.parse( localStorage.getItem( 'userProfile' ) ) )


    // }, [location] );

    return(
        <body>
            <div id='nav-bar'>
                <div id='nav-left'>
                    <h1>MyCalorieTracker</h1>
                </div>
                <div id='nav-right'>
                    {user ? ( <p>Hi, {user.firstName}</p>) : (<p>Welcome, Please Sign In! </p>)}
                    <p>|</p>
                    <p>Settings</p>
                    <p>|</p>
                    {user ? ( <p onClick={ loggingOut } style={{cursor:'pointer'}}>Logout</p> ) : (<p onClick={ signin } style={{cursor:'pointer'}}> Sign In</p>)}
                </div>
            </div>

            {/* <div id='navigation'>
                <Link to="/home" id='home'>Home</Link>
                <Link to="/fooddiary">Food Diary</Link>
                <Link to="/mygoals">My Goals</Link>
            </div> */}
        </body>
    );
};
