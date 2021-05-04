import React from "react";
import { Redirect, withRouter } from "react-router";






const initialState = {
    name: "",
    theme: "",
    date_time: "",
    dress_code: "",
    comments: "",
    nameError: "",
    timeError: "",
    emailError: "",
    passwordError: "",
    redirect: false
};
//let Gcopyvalue = "";

class PartyCreationForm extends React.Component {
    state = initialState;



    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    handleChangeTheme = event => {
        this.setState({ theme: event.target.value });
    };
    handleChangeDateTime = event => {
        this.setState({ date_time: event.target.value });
    };



    handleChangeDressCode = event => {
        this.setState({ dress_code: event.target.value });
    };

    handleChangeComments = event => {
        this.setState({ comments: event.target.value });
    };





    // handleSubmit = () => {
    //     console.log(this.state);
    // };
    validate = () => {
        let data = localStorage.getItem('myToken')
        console.log(typeof (data)) //!!!!!!!!!!!!!!! тут можно проверять тайм-аут токена
        let nameError = "";
        let timeError = "";
        // let passwordError = "";

        if (!this.state.name) {
            nameError = "name cannot be blank";
        }
        if (!this.state.date_time) {
            timeError = "time should be chosen"
        }

        // if (!this.state.email.includes("@")) {
        //   emailError = "invalid email";
        // }
        if (this.state.name.length > 80) {
            nameError = "Name of the party cannot be that long"
        }
        console.log("VALIDATE", this.props.parties)

        //console.log("VALIDATE", this.props.parties[0].title)
        console.log("The length", this.props.parties.length)

        if (this.props.parties.length) {
            for (let i = 0; i < this.props.parties.length; i++) {
                if (this.state.name === this.props.parties[i].title) {
                    console.log("DUPLICATE name")
                    nameError = "This name of the party is already in use.Pick another one"
                }
            }
        }






        if (nameError || timeError) {
            this.setState({ nameError });
            this.setState({ timeError });
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
                    //Gcopyvalue={this.state.name}
                    onChange={this.handleChange}
                //{...console.log(this.state)}
                />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.nameError}
                </div>
                <div>
                    <input
                        placeholder="Theme of the party"
                        value1={this.state.theme}
                        onChange={this.handleChangeTheme}
                    />
                </div>
                <div>
                    <div>
                        <label for="party">Enter a date and time for your party booking:</label>
                    </div>
                    <input id="party" type="datetime-local" name="partydate"
                        value2={this.state.date_time}
                        onChange={this.handleChangeDateTime}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.timeError}
                    </div>
                </div>
                <div>
                    <input
                        placeholder="dress-code for yoyr party"
                        value3={this.state.dress_code}
                        onChange={this.handleChangeDressCode}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="кодес тусовки!!"
                        value4={this.state.comments}
                        onChange={this.handleChangeComments}
                    />
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
                            this.state.name = this.state.name.trim()

                            let title = this.state.name
                            let theme = this.state.theme
                            let date_time = this.state.date_time
                            let dress_code = this.state.dress_code
                            let comments = this.state.comments

                            console.log(title);
                            console.log(theme);
                            console.log(date_time);
                            console.log(dress_code);
                            console.log(comments);






                            (async () => {
                                let myToken = localStorage.getItem('myToken')
                                const party = { title, theme, date_time, dress_code, comments };
                                const response = await fetch("/add_new_party", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

                                    },
                                    body: JSON.stringify(party)
                                });
                                console.log("HERE1")


                                if (response.ok) {
                                    console.log("response worked!");
                                    this.props.onNewParty(party)
                                    window.location.reload();//!!!
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
