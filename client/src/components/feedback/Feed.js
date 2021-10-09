import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
    Button,
    Form,
    Grid,
    Segment
} from "semantic-ui-react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { MAIN_COLOR } from "../../utilities/theme";
import '../../utilities/my.css'




const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Feed() {
    const [customers, setcustomer] = useState([]);
    const [cstId, setCstId] = useState();
    const [feedData, setFeedData] = useState([]);
    const [feedInput, setFeedInput] = useState("");
    const [nextStep, setNextStep] = useState(true);


    const getCustomers = async () => {
        const res = await axios.get('http://localhost:5000/api/customer'

        )
        console.log("here")

        console.log(res.data);
        setcustomer(res.data);
    }



    const search = (e) => {

        axios.put('http://localhost:5000/api/feed/', {
            cstId: cstId,


        }
            , {
                withCredentials: true,
            }
        )

            .then(function (response) {
                console.log(response);
                setFeedData(response.data)
                // setStepOne(false)
                // setStepTwo(true)
                //getCustomers();
                // submitProjectData();


            })
    }

    const submitFeed = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/feed/', {
            feedback: feedInput,
            cstId: cstId

        }
            , {
                withCredentials: true,
            }
        )

            .then(function (response) {
                console.log(response);
                // setStepOne(false)
                // setStepTwo(true)
                // getProjectdefault();
                search(e);


            })
    }

    const addform = () => {
        setNextStep(false);


    }

    useEffect(() => {
        getCustomers();


    }, []);
    return (

        <div>
            <h2 className="title">FeedBack List </h2>
            <div>


                <select className="Btn" onChange={(e) => setCstId(e.target.value)}>

                    {customers.map((item) => (
                        <option key={item.id} value={item.id} >{item.name}</option>
                    ))}
                </select>

                <button className="Btn" onClick={() => search()}> Search</button>
            </div>
            <div>
                <><Grid
                    padded
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    textAlign="center"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>

                        <Form
                            size="large"
                            onSubmit={(e) => submitFeed(e)}

                        // error={errors}
                        >
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name="feedback"

                                    iconPosition="left"
                                    placeholder="feedback "
                                    onChange={(e) => setFeedInput(e.target.value)}
                                    autoComplete="feedback"
                                    focus
                                    label=" FeedBack"
                                    required
                                // error={errors && errors.title}
                                />
                                <Button color={MAIN_COLOR} fluid size="large" onClick={(e) => search(e)} >
                                    Submit
                                </Button>
                            </Segment>
                        </Form>

                    </Grid.Column>
                </Grid> </>
            </div>


            <div className="cstList">
                <Stack spacing={1}>
                    {feedData.map((item) => (
                        <Item key={item.id}>  <p style={{ fontSize: '20px' }}>{item.feedback}</p></Item>
                    ))}

                </Stack>
            </div>

            {

            }
        </div>



    )
}
