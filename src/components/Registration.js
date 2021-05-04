

import React from "react";






const initialState = {
    //name: "",
    // password: "",
    nameError: "",
    nameError2: "", ///////////!!!!!!!!!!!!!!!!!!!!!

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






    // handleSubmit = () => {
    //     console.log(this.state);
    // };
    validate = () => {
        let nameError = "";
        let nameError2 = ""; ////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // let passwordError = "";

        if (!this.state.name) {
            nameError = "name cannot be blank";
        }

        if (this.state.name.length > 80) {
            nameError = "Your name cannot be that long"
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

        return (



            <div>
                <div>
                    <input
                        placeholder="name"
                        value={this.state.name}
                        //Gcopyvalue={this.state.name}
                        onChange={this.handleChange}
                    //{...console.log(this.state)}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.nameError}
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.nameError2}
                    </div>
                    {/* !!!!!!!!!!!!!! */}
                    <input
                        placeholder="password"
                        value={this.state.password}
                        //Gcopyvalue={this.state.name}
                        onChange={this.handleChangePass}
                    //{...console.log(this.state)}
                    />
                </div>


                <button

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
                                const response = await fetch("/user", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(data)
                                });
                                console.log("HERE1")


                                if (response.ok) {
                                    console.log("response worked!");
                                }
                                else {
                                    console.log("ERRORR");
                                    let nameError2 = "Duplicate name,choose another one" //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                    this.setState({ nameError2 }); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                                    //alert("WRONG")
                                }
                            })()




                        }

                    }

                    }>

                    Register!
                    </button>

            </div >
        );
    }
}

export default Registration
