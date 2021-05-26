

import React from "react";

//import '../Login.css';
import { Container, Label } from "semantic-ui-react";
import Background from '../LoginBuildings.jpg';




const initialState = {
    //name: "",
    // password: "",
    nameError: "",
    nameError2: "", ///////////!!!!!!!!!!!!!!!!!!!!!

};
//let Gcopyvalue = "";

class Login extends React.Component {
    state = initialState;



    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    handleChangePass = event => {
        this.setState({ password: event.target.value });
    };






    // handleSubmit = () => {
    //     console.log(this.state);
    // };
    validate = () => {
        let nameError = "";
        let nameError2 = ""; ////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // let passwordError = "";

        if (!this.state.name) {
            nameError = "Username can not be blank";
        }

        if (this.state.name) {

            if (this.state.name.length > 80) {
                nameError = "Username cannot be that long"
            }
        }

        //console.log("VALIDATE", this.props.parties[0].title)






        if (nameError) {
            this.setState({ nameError });
            this.setState({ nameError2 }); ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            //console.log(this.state);
            // clear form
            this.setState(initialState);

        }
    };


    render() {
        let sectionStyle = {
            textAlign: "center",
            padding: "350px 300px"
        }
        let main = {
            width: "100%",
            height: "965px",
            backgroundImage: `url(${Background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            textAlign: "center"

        }

        return (


            <section style={main}>

                <div className="ui form" style={sectionStyle} >
                    <Label>
                        <div class='field'>
                            <Label>Username
                        <div class="ui left icon input">
                                    <input
                                        placeholder="Username"
                                        value={this.state.name}
                                        //Gcopyvalue={this.state.name}
                                        onChange={this.handleChange}
                                    //{...console.log(this.state)}
                                    />
                                    <i class="user icon"></i>

                                </div>
                                <div class="horizontal">
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.nameError}
                                    </div>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.nameError2}
                                    </div>
                                </div>
                            </Label>
                        </div>
                        {/* !!!!!!!!!!!!!! */}
                        <div class="field" >
                            <Label> Password
                        <div class="ui left icon input">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        //Gcopyvalue={this.state.name}
                                        onChange={this.handleChangePass}
                                    //{...console.log(this.state)}
                                    />
                                    <i class="lock icon"></i>
                                </div>
                            </Label>
                        </div>




                        <button class="ui blue submit button"

                            //onClick={this.handleSubmit}>
                            onClick={() => {
                                //preventDefault();
                                const isValid = this.validate();
                                if (isValid) {
                                    this.setState(initialState);  ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                                    this.state.name = this.state.name.trim()

                                    let name = this.state.name
                                    let password = this.state.password


                                    console.log(name);

                                    (async () => {
                                        const data = { name, password };
                                        const response = await fetch("/api/login", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(data)
                                        });
                                        console.log("HERE1")


                                        if (response.ok) {
                                            console.log("response worked!");
                                            let token = await response.json();
                                            //let ex_token = token["token"]
                                            //console.log(ex_token)
                                            //console.log(JSON.stringify(token));
                                            console.log((token["token"]))

                                            // write to storage
                                            localStorage.setItem('myToken', token["token"]);
                                            //console.log("Hello token")
                                            //alert(localStorage.getItem('myToken'))

                                            this.props.history.push('/')
                                        }
                                        else if (response.status == 401) {
                                            console.log("ERRORR");
                                            //let errno = response.statusText
                                            //alert(errno)
                                            let nameError2 = "Incorrect password or login" //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                            this.setState({ nameError2 }); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                        }
                                        else if (response.status == 403) {
                                            console.log("ERRORR");
                                            //let errno = response.statusText
                                            //alert(errno)
                                            let nameError2 = "Incorrect password or login" //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                            this.setState({ nameError2 }); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                        }
                                        else if (response.status == 406) {
                                            console.log("ERRORR");
                                            //let errno = response.statusText
                                            //alert(errno)
                                            let nameError2 = "No email confirmation" //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                            this.setState({ nameError2 }); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                        }
                                        else if (response.status == 410) {
                                            console.log("ERRORR");
                                            //let errno = response.statusText
                                            //alert(errno)
                                            let nameError2 = "The user is blocked" //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                            this.setState({ nameError2 }); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                        }

                                    })()

                                }

                            }

                            }>

                            Login
                    </button>
                    </Label>
                </div >

            </section>

        );
    }
}

export default Login
