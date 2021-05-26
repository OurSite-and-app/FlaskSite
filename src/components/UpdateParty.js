import React, { Component } from "react";
import { Route, withRouter } from 'react-router-dom';
import { Label } from "semantic-ui-react";
// class UpdateParty extends Component {


//     render() {
//         return (
//             <div>
//                 {this.props.id}
//             </div>
//         )
//     };






// }
// export default UpdateParty







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

class UpdateParty extends React.Component {
    state = initialState;





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


        if (!this.state.date_time) {
            timeError = "time should be chosen"
        }

        // if (!this.state.email.includes("@")) {
        //   emailError = "invalid email";
        // }


        //console.log("VALIDATE", this.props.parties[0].title)






        if (timeError) {
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



        // if (this.state.redirect) {
        //     console.log("Redirect");
        //     return (
        //         <Redirect to="/" />
        //     )
        // }

        return (


            <Label >
                <div class="ui form">
                    <div class="fields" >
                        <div class="field">
                            <Label > New theme of the party
                        <input
                                    placeholder="New theme"
                                    value1={this.state.theme}
                                    onChange={this.handleChangeTheme}
                                />
                            </Label>
                        </div>
                        <div class="field">
                            <Label > New date time of the party
                        <input id="party" type="datetime-local" name="partydate"
                                    value2={this.state.date_time}
                                    onChange={this.handleChangeDateTime}
                                />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.timeError}
                                </div>
                            </Label>
                        </div>
                        <div class="field">
                            <Label > New dress code
                        <input
                                    placeholder="dress-code"
                                    value3={this.state.dress_code}
                                    onChange={this.handleChangeDressCode}
                                />
                            </Label>
                        </div>
                        <div class="field">
                            <textarea
                                placeholder="new party rules"
                                value4={this.state.comments}
                                onChange={this.handleChangeComments}
                            />
                        </div>

                    </div>
                    <button class="ui black submit button"

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

                                let theme = this.state.theme
                                let date_time = this.state.date_time
                                let dress_code = this.state.dress_code
                                let comments = this.state.comments

                                console.log(theme);
                                console.log(date_time);
                                console.log(dress_code);
                                console.log(comments);






                                (async () => {
                                    let myToken = localStorage.getItem('myToken')
                                    const party = { theme, date_time, dress_code, comments };
                                    const response = await fetch("/api/ch_party/" + this.props.id, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

                                        },
                                        body: JSON.stringify(party)
                                    });
                                    console.log("HERE1")


                                    if (response.ok) {
                                        console.log("response worked!");

                                        window.location.reload();//!!!
                                    }
                                    else if (response.status === 423) {
                                        localStorage.clear()
                                        this.props.history.push('/Login')
                                        console.log("ERRORR");
                                    }
                                })()












                            }

                        }

                        }>

                        Update
                    </button>

                </div >
            </Label>
        );
    }
}

export default withRouter(UpdateParty)
