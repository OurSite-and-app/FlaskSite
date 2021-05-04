import React from "react";
import { List, Header, Rating } from "semantic-ui-react";
import { Container } from "semantic-ui-react";


export const PartiesOfUser = ({ party_list /*, onDelParty*/ }) => {

    return (
        <Container style={{ marginTop: 40 }}>
            <List>
                {party_list.map(usrparty => {
                    return (
                        <List.Item key={usrparty.title}>
                            <Header>{usrparty.title}</Header>
                            {/* <Rating rating={usrparty.rating} maxRating={5} disabled /> */}
                            <button

                                onClick={() => {
                                    (async () => {
                                        let myToken = localStorage.getItem('myToken')
                                        const response = await fetch("/del_party/" + usrparty.id, {
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
                                        else {
                                            console.log("ERRORR");
                                        }
                                    })()

                                }}>Delete

                            </button>



                            <button>Change</button>

                        </List.Item>
                    );
                })}
            </List>
        </Container>
    );
}
export default PartiesOfUser;