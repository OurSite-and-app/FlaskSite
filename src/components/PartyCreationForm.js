import React from "react";
import { Redirect, withRouter } from "react-router";






const initialState = {
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    redirect: false
};
let Gcopyvalue = "";

class PartyCreationForm extends React.Component {
    state = initialState;



    handleChange = event => {
        this.setState({ name: event.target.value });
    };



    // handleSubmit = () => {
    //     console.log(this.state);
    // };
    validate = () => {
        let nameError = "";
        // let passwordError = "";

        if (!this.state.name) {
            nameError = "name cannot be blank";
        }

        // if (!this.state.email.includes("@")) {
        //   emailError = "invalid email";
        // }

        if (nameError) {
            this.setState({ nameError });
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



        if (this.state.redirect) {
            console.log("Redirect");
            return (
                <Redirect to="/" />
            )
        }

        return (



            <div>

                <input
                    placeholder="party title"
                    value={this.state.name}
                    Gcopyvalue={this.state.name}
                    onChange={this.handleChange}
                //{...console.log(this.state)}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.nameError}
                </div>


                <button

                    //onClick={this.handleSubmit}>
                    onClick={() => {
                        //preventDefault();
                        const isValid = this.validate();
                        if (isValid) {
                            //console.log(this.state);
                            console.log("ture");

                            // clear form
                            //this.setState(initialState);
                            //this.state.redirect = true
                            let title = this.state.name
                            console.log(title);





                            (async () => {
                                const party = { title };
                                const response = await fetch("/add_party", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(party)
                                });
                                console.log("HERE1")


                                if (response.ok) {
                                    console.log("response worked!");
                                }
                                else {
                                    console.log("ERRORR");
                                }
                            })()
                            this.props.history.push('/')












                        }

                    }

                    }>

                    submit
                    </button>

            </div >
        );
    }
}

export default withRouter(PartyCreationForm)
