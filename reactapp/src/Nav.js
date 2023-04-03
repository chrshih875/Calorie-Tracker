import { NavLink } from 'react-router-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'materialize-css/dist/css/materialize.min.css'

function Nav() {

  return (
    <nav>
        <div id="nav-wrapper teal">
            <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><NavLink className="dropdown-item" aria-current="page" to="/">Home</NavLink></li>
            </ul>
        </div>
    </nav>
        )
    }
export default Nav;
