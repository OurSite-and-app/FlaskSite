

import React from "react";
import { Label } from "semantic-ui-react";
import Background from '../RegisterBuilding2.jpg';






const initialState = {
    //name: "",
    // password: "",
    nameError: "",
    nameError2: "", ///////////!!!!!!!!!!!!!!!!!!!!!
    nameErrorPass: "",
    nameErrorEmail: "",
    nameErrorEmail2: ""

};
//let Gcopyvalue = "";

class Registration extends React.Component {
    state = initialState;



    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    handleChangePass = event => {
        this.setState({ password: event.target.value });
    };
    handleChangeEmail = event => {
        this.setState({ email: event.target.value });
    };






    // handleSubmit = () => {
    //     console.log(this.state);
    // };
    validate = () => {
        let nameError = "";
        let nameError2 = ""; ////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let nameErrorPass = ""
        let nameErrorEmail = ""
        let nameErrorEmail2 = ""

        // let passwordError = "";

        if (!this.state.name) {
            nameError = "Username can not be blank";
        }

        if (this.state.name && this.state.name.length > 80) {
            nameError = "Username can not be that long"
        }

        //console.log("VALIDATE", this.props.parties[0].title)
        if (!this.state.password) {
            nameErrorPass = "Password cannot be blank";
        }

        if (this.state.password && this.state.password.length > 80) {
            nameErrorPass = "User's password can not be that long"
        }

        if (!this.state.email) {
            nameErrorEmail = "User's email can not be blank"
        }
        if (this.state.email && (!this.state.email.includes("@") || !this.state.email.includes("."))) {
            nameErrorEmail = "This is not an email"
        }
        if (this.state.email && this.state.email.length > 80) {
            nameErrorEmail = "User's email can not be that long"
        }







        if (nameError || nameErrorPass || nameErrorEmail) {
            this.setState({ nameError });
            this.setState({ nameError2 }); ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            this.setState({ nameErrorPass })
            this.setState({ nameErrorEmail })
            this.setState({ nameErrorEmail2 })


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
                <div class="ui form" style={sectionStyle}>
                    <Label>
                        <div class="field">
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

                                <div>
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
                        <div class="field">
                            <Label >Password
                        <div class="ui left icon input">
                                    <input type="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        //Gcopyvalue={this.state.name}
                                        onChange={this.handleChangePass}
                                    //{...console.log(this.state)}
                                    />
                                    <i class="lock icon"></i>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.nameErrorPass}
                                    </div>
                                </div>

                            </Label>
                        </div>

                        <div class="field">
                            <Label> User Email
                        <div class="ui left icon input">
                                    <input
                                        placeholder="Email"
                                        value={this.state.email}
                                        //Gcopyvalue={this.state.name}
                                        onChange={this.handleChangeEmail}
                                    //{...console.log(this.state)}
                                    />
                                    <i class="envelope icon"></i>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.nameErrorEmail}
                                    </div>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.nameErrorEmail2}
                                    </div>
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
                                    let email = this.state.email


                                    console.log(name);

                                    (async () => {
                                        const data = { name, password, email };
                                        const response = await fetch("/api/user", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(data)
                                        });
                                        console.log("HERE1")


                                        if (response.ok) {
                                            console.log("response worked!");
                                            this.props.history.push('/')
                                        }
                                        else if (response.status == 401) {
                                            console.log("ERRORR");
                                            let nameError2 = "Duplicate name,choose another one" //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                            this.setState({ nameError2 }); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                                            //alert("WRONG")
                                        }
                                        else if (response.status == 403) {
                                            let nameErrorEmail2 = "Email already in use"
                                            this.setState({ nameErrorEmail2 })
                                        }
                                    })()




                                }

                            }

                            }>

                            Register
                    </button>
                    </Label>
                </div >
            </section>
        );
    }
}

export default Registration
