import React from "react"
import { Link } from "react-router-dom";
import '../App.css';

function Home() {
    return (

        // <div >
        //     <h1>Home page with button to create a Party</h1>
        // </div>

        <div className="wrapper">
            <Link to="/PartyCreationForm">
                <button class="PartyCreationbutton">
                    create a Party!
            </button>
            </Link>
        </div>


    );
}

export default Home;