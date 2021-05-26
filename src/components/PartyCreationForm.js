import React from "react";
import { Redirect, withRouter } from "react-router";
import { Label } from "semantic-ui-react";

import Background from '../Create.jpg';





const initialState = {
    name: "",
    theme: "",
    date_time: "",
    dress_code: "",
    comments: "",
    nameError: "",

    nameError2: "", ///////////!!!!!!!!!!!!!!!!!!!!!

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
        let nameError2 = ""; ////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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



        // if (this.state.redirect) {
        //     console.log("Redirect");
        //     return (
        //         <Redirect to="/" />
        //     )
        // }
        let sectionStyle = {
            overflowY: "scroll",
            textAlign: "center",
            padding: "150px",//"350px 300px"
            whitespace: "nowrap",
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

            <div >

                {
                    !(localStorage.getItem('myToken')) ? <Forbid /> :
                        <div>
                            <section style={main}>
                                <div class="ui form" style={sectionStyle}>
                                    <Label>
                                        <div class="fields">
                                            <div class="field">
                                                <Label> Party Title
                                            <div class="ui left icon input">
                                                        <input
                                                            placeholder="Party Title"
                                                            value={this.state.name}
                                                            //Gcopyvalue={this.state.name}
                                                            onChange={this.handleChange}
                                                        //{...console.log(this.state)}
                                                        />
                                                        <i class="glass martini icon"></i>
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
                                            <div class="field">
                                                <Label > The theme of the party
                                    <div class="ui left icon input">
                                                        <input
                                                            placeholder="Theme of the party"
                                                            value1={this.state.theme}
                                                            onChange={this.handleChangeTheme}
                                                        />
                                                        <i class="bookmark icon"></i>
                                                    </div>
                                                </Label>
                                            </div>
                                            <div class="field">
                                                <Label > Enter a date and time for your party booking:
                                    <div class="ui left icon input">
                                                        <input id="party" type="datetime-local" name="partydate"
                                                            value2={this.state.date_time}
                                                            onChange={this.handleChangeDateTime}
                                                        />
                                                        <i class="calendar alternate icon"></i>
                                                    </div>
                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                        {this.state.timeError}
                                                    </div>
                                                </Label>
                                            </div>
                                            <div class="field">
                                                <Label> Dress code
                                    <div class="ui left icon input">
                                                        <input
                                                            placeholder="dress-code for yoyr party"
                                                            value3={this.state.dress_code}
                                                            onChange={this.handleChangeDressCode}
                                                        />
                                                        <i class="pied piper hat icon"></i>
                                                    </div>
                                                </Label>
                                            </div>
                                            <div class="field">
                                                <Label>Party rules
                                        <textarea name="rules" cols="10"
                                                        placeholder="кодес тусовки!!"
                                                        value4={this.state.comments}
                                                        onChange={this.handleChangeComments}
                                                    />
                                                </Label>
                                            </div>

                                        </div>
                                        <button class="ui black submit button"

                                            //onClick={this.handleSubmit}>
                                            onClick={() => {
                                                //preventDefault();
                                                const isValid = this.validate();
                                                if (isValid) {
                                                    this.setState(initialState);  ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
                                                        const response = await fetch("/api/add_new_party", {
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
                                                            //window.location.reload();//!!!
                                                            this.props.history.push('/')
                                                        }
                                                        else if (response.status == 403) {
                                                            console.log("ERRORR");
                                                            //let errno = response.statusText
                                                            //alert(errno)
                                                            let nameError2 = "Restricted for this User " //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                                            this.setState({ nameError2 }); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                                        }
                                                        else if (response.status == 423) {
                                                            localStorage.clear()
                                                            this.props.history.push('/Login')
                                                        }
                                                    })()













                                                }

                                            }

                                            }>

                                            Create Party!
                                    </button>

                                    </Label>
                                </div>
                            </section>
                        </div>
                }
            </div >
        );
    }
}
const Forbid = () => (
    <div>
        <h1>
            Forbidden. You should login first!
        </h1>
    </div>
)

export default withRouter(PartyCreationForm)
