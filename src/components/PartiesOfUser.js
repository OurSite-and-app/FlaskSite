import React from "react";
import { List, Header, Rating } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { useEffect, useState } from 'react';
import UpdateParty from './UpdateParty'

let idname = 0
let a = 0 //если приходит не залогиненный
export const PartiesOfUser = props/*party_list , onDelParty*/ => {


    const [count, setCount] = useState(0);
    //const [name, setName] = useState(-1);

    const [party_list, setUsrParty] = useState([]);
    useEffect(() => {
        let myToken = localStorage.getItem('myToken')
        if (!myToken) {
            console.log("My token is ", myToken)
            a = 1
        }
        else {
            fetch("/api/party_by_user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

                }
            }).then(response => {
                if (response.status === 423) {
                    props.history.push('/Login')
                }
                else {
                    response.json().then(data => {
                        setUsrParty(data.party_list);
                    })
                }
            }
            );
        }
    }, []);
    // var colours = ["#80A2CB", "#67CF24", "#F3ED2F", "#F32F4D"];

    // function getRandomIntInclusive(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    // }

    return (
        <div /*style={{ backgroundColor: "#80A2CB""#C0D1E6" }}*/>
            {a === 1 ? <Forbid /> : !(party_list.length) ? <NoParty /> :
                <Container style={{ marginTop: -250 }}>
                    <List >
                        {party_list.map(usrparty => {
                            return (
                                <div class="ui massive form">

                                    <List.Item style={{ margin: 250 }} key={usrparty.title}>

                                        <List style={{ backgroundColor: "#80A2CB", textAlign: "left", width: "200%", }}>
                                            <Header>{usrparty.title}</Header>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Theme: {usrparty.theme}</List.Header>
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Date time: {usrparty.date_time.replace('T', '   ')}</List.Header>
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Dress code: {usrparty.dress_code}</List.Header>
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>Comments: {usrparty.comments}</List.Header>
                                                </List.Content>
                                            </List.Item>


                                            {/* </List> */}
                                            {/* <List.Content>
                                            <List.Description>{"Party theme:"}{usrparty.theme}</List.Description>
                                            <List.Description>{usrparty.date_time}</List.Description>
                                            <List.Description>{usrparty.dress_code}</List.Description>
                                            <List.Description>{usrparty.comments}</List.Description>
                                        </List.Content> */}


                                            {/* <Rating rating={usrparty.rating} maxRating={5} disabled /> */}
                                            <button

                                                onClick={() => {
                                                    (async () => {
                                                        let myToken = localStorage.getItem('myToken')
                                                        const response = await fetch("/api/del_party/" + usrparty.id, {
                                                            method: "DELETE",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                                "x-access-token": myToken.replace(/['"]+/g, '') // убираем лишние кавычки

                                                            }
                                                        });
                                                        console.log("HERE1")


                                                        if (response.ok) {
                                                            console.log("response worked -DELETED!");

                                                            //onDelParty(usrparty)
                                                            window.location.reload();

                                                        }
                                                        else if (response.status === 423) {
                                                            localStorage.clear()
                                                            props.history.push('/Login')
                                                            console.log("ERRORR");
                                                        }
                                                    })()

                                                }}>Delete

                            </button>


                                            <button onClick={() => {
                                                //setName(name + 1)
                                                if (count == 0) {
                                                    setCount(count + 1)
                                                    //setName(0);
                                                }
                                                else if (count == 1) {
                                                    setCount(count - 1)
                                                    //setName(0);


                                                }

                                                //setName(name + usrparty.id)
                                                idname = usrparty.id


                                            }}>
                                                Change
                            </button>
                                            <div>
                                                {console.log("NameLeft", idname)}
                                                {console.log("NameRight", usrparty.title)}

                                                {count === 1 && idname === usrparty.id ? <div> <UpdateParty id={idname} /> </div> : null}


                                            </div>


                                            {/* <div class="ui divider"></div> */}
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
const NoParty = () => (
    <div>
        <h1>
            No parties created.Go create some!
        </h1>
    </div>
)
const Forbid = () => (
    <div>
        <h1>
            You are not logged in!
        </h1>
    </div>
)
export default PartiesOfUser;