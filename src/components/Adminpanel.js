import React from "react";
import { List, Header, Rating } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { useEffect, useState } from 'react';
let a = 0 // 1
let b = 0 //2
export const Adminpanel = props => {


    //const [count, setCount] = useState(0);
    //const [name, setName] = useState(-1);

    const [users, setUsrParty] = useState([]);
    useEffect(() => {
        let myToken = localStorage.getItem('myToken')
        if (!myToken) {
            console.log("My token is ", myToken)
            b = 1;
        }
        else {
            fetch("/api/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

                }
            }).then(response => {
                if (response.status === 403) {
                    a = 1
                    console.log("HErer")
                }
                else {
                    console.log("HErer2")

                    response.json().then(data => {
                        setUsrParty(data.users);
                    })
                }
            });
        }
    }, []);
  const [curPage, setPage] = useState(window.location.href);
    useEffect(() => {
        return () => {
            //console.log("Here")
            localStorage.clear()
        }
    }, curPage)




    return (
        <div>
        
            {a === 1 ? <Forbid /> : b === 1 ? <Forbid2 /> :
            <Container style={{ marginTop: -250 }}>
                <List >
                    {/* {console.log(users)} */}
                    {users.filter(function (name) { return name.name != 'Admin' }).map(usr => {
                        return (
                            <div class="ui massive form">
                                <List.Item style={{ margin: 250 }} key={usr.name}>
                                    <List style={{ textAlign: "left" }}>
                                        <Header>{usr.name}</Header>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>Email: {usr.email}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>Public_id: {usr.public_id}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                        <button class="ui black submit button"

                                            onClick={() => {
                                                (async () => {
                                                    let myToken = localStorage.getItem('myToken')
                                                    const response = await fetch("/api/user/" + usr.public_id, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

                                                        }
                                                    });
                                                    console.log("HERE1")


                                                    if (response.ok) {
                                                        console.log("response worked -Blocked!");
                                                        console.log(usr.block_user, usr.public_id)

                                                        //onDelParty(usrparty)
                                                        window.location.reload();

                                                    }
                                                    else if (response.status === 423) {
                                                        localStorage.clear()
                                                        props.history.push('/admin')
                                                        console.log("ERRORR");
                                                    }
                                                })()

                                            }}>{!(usr.block_user) ? "BlockUser" : "Unblock User"}

                                        </button>
                                        <button class="ui black submit button"
                                            onClick={() => {
                                                (async () => {
                                                    let myToken = localStorage.getItem('myToken')
                                                    const response = await fetch("/api/restr_user/" + usr.public_id, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

                                                        }
                                                    });
                                                    console.log("HERE1")


                                                    if (response.ok) {
                                                        console.log("response worked -Restricted!");
                                                        console.log(usr.restricted, usr.public_id)

                                                        //onDelParty(usrparty)
                                                        window.location.reload();

                                                    }
                                                    else if (response.status === 423) {
                                                        localStorage.clear()
                                                        props.history.push('/admin')
                                                        console.log("ERRORR");
                                                    }
                                                })()


                                            }}>{!(usr.restricted) ? "Restrict User" : "Unrestrict User"}


                                        </button>

                                        <button class="ui black submit button"
                                            onClick={() => {
                                                (async () => {
                                                    let myToken = localStorage.getItem('myToken')
                                                    const response = await fetch("/api/reset_password/" + usr.public_id, {
                                                        method: "PUT",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

                                                        }
                                                    });
                                                    console.log("HERE1")


                                                    if (response.ok) {
                                                        console.log("response worked -ChangedPass!");

                                                        //onDelParty(usrparty)
                                                        window.location.reload();

                                                    }
                                                    else if (response.status === 423) {
                                                        localStorage.clear()
                                                        props.history.push('/admin')
                                                        console.log("ERRORR");
                                                    }
                                                })()
                                            }}>Change Pass

                                </button>
                                        <button class="ui black submit button"
                                            onClick={() => {
                                                (async () => {
                                                    let myToken = localStorage.getItem('myToken')
                                                    const response = await fetch("/api/user/" + usr.public_id, {
                                                        method: "DELETE",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

                                                        }
                                                    });
                                                    console.log("HERE1")


                                                    if (response.ok) {
                                                        console.log("response worked -Deleted User!");

                                                        //onDelParty(usrparty)
                                                        window.location.reload();

                                                    }
                                                    else if (response.status === 423) {
                                                        localStorage.clear()
                                                        props.history.push('/admin')
                                                        console.log("ERRORR");
                                                    }
                                                })()
                                            }}>Delete User

                                </button>

                                    </List>


                                    <div class="ui divider"></div>

                                </List.Item>
                            </div>
                        );
                    })}
                </List>
            </Container>
            }
        
        </div>
    );
}

const Forbid = () => (
    <div>
        <h1>
            Forbidden. Not allowed.
        </h1>
    </div>
)

const Forbid2 = () => (
    <div>
        <h1>
            Forbidden. Not logged in.
        </h1>
    </div>
)

export default Adminpanel;