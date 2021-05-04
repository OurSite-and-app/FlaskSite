import React from "react"
import { Link } from "react-router-dom";
import '../App.css';
import Background from '../mountaincity2.jpg';


function Home() {
    const navStyle = {

        color: 'white'
    }
    let sectionStyle = {
        width: "100%",
        height: "970px",
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'


    };



    return (

        // <div >
        //     <h1>Home page with button to create a Party</h1>
        // </div>
        <section className='test' style={sectionStyle}>
            <div >

                <nav>
                    {/* <h3>Logo</h3> */}
                    <ul className="nav-links">
                        <Link style={navStyle} to='/Registration'>
                            <li>Registration</li>
                        </Link>
                        <Link style={navStyle} to='/Login'>
                            <li>Login</li>
                        </Link>
                        <Link style={navStyle} to='/PartiesOfUser'>
                            <li>Your Parties</li>
                        </Link>
                    </ul>
                </nav>
                <div className="wrapper">


                    <Link to="/PartyCreationForm">
                        <button class="PartyCreationbutton">
                            create a Party!
                        </button>
                    </Link>

                </div>

            </div>
        </section>






    );
}

export default Home;