import React from "react"
import { Link } from "react-router-dom";
import '../App.css';
import Background from '../mountaincity2.jpg';

const TITLE="PartyNow!🎉"
function Home() {
    const navStyle = {

        color: 'white'
    }
    let sectionStyle = {
        width: "100%",
        height: "960px",
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'


    };
    document.title = TITLE


    return (

        // <div >
        //     <h1>Home page with button to create a Party</h1>
        // </div>
        <section className='test' style={sectionStyle}>
            <div >

                <nav>
                    {/* <h3>Logo</h3> */}
                    <ul className="nav-links">

                        {console.log("HERE TOKEN", localStorage.getItem('myToken'))}
                        {
                            !(localStorage.getItem('myToken')) ?

                                <Link style={navStyle} to='/Registration'>
                                    <li>Registration</li>
                                </Link> : null
                        }
                        {
                            !(localStorage.getItem('myToken')) ?
                                <Link style={navStyle} to='/Login'>
                                    <li>Login</li>
                                </Link>
                                : null

                        }

                        {
                            !(localStorage.getItem('myToken')) ? null :

                                <Link style={navStyle} to='/Logout'>
                                    <li>Logout</li>
                                </Link>

                        }

                        {
                            !(localStorage.getItem('myToken')) ? null : <Link style={navStyle} to='/PartiesOfUser'>

                                {/* {typeof (localStorage.getItem('myToken')) === undefined ? <div>Zdarova</div> : <li>Your Parties</li>} */}
                                <li>Your Parties</li>
                            </Link>
                        }

                    </ul>
                </nav>
                <div className="wrapper">

                    {
                        !(localStorage.getItem('myToken')) ? null :
                            <Link to="/PartyCreationForm">
                                <button class="PartyCreationbutton">
                                    create a Party!
                        </button>
                            </Link>
                    }

                </div>

            </div>
        </section>






    );
}

export default Home;