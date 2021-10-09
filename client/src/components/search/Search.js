
import React, { useState, useEffect } from 'react'
import axios from 'axios';

import {
    Button,
    FeedDate,
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

export default function Search() {
    const [customers, setcustomer] = useState([]);
    const [cstId, setCstId] = useState();
    const [feedData, setFeedData] = useState([]);
    const [searchFeed, setSearchedFeed] = useState([]);
    const [feedInput, setFeedInput] = useState("");











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

    const searchOnFeedback = (e) => {
        e.preventDefault()
        try {
            const searchArray = feedData;
            console.log(searchArray)
            var FOUND = -1;
            let getarray = [];
            for (var i = 0; i < feedData.length; i++) {
                // console.log(feedData)
                var str = "";

                // intitae Loop

                str = feedData[i].feedback;

                let words = str.split(' ');
                console.log(words);
                for (var x = 0; x < words.length; x++) {
                    console.log("second loop efore if condition")

                    if (words[x] == feedInput) {
                        getarray.push(feedData[i]);
                    }
                    console.log("after condition")

                }

            }
            console.log("after second loop")
            console.log("setstate of arrayed")
            console.log(getarray);
            setSearchedFeed(getarray);

        } catch
        {
            return console.error();
        }
    }

    useEffect(() => {
        getCustomers();


    }, []);
    return (
        <div className="searchWrapper" >
            <h1 className="title">Search</h1>
            <div className="searchContainer">
                <div className=" getFeed">
                    <div>

                        <select className="Btn" onChange={(e) => setCstId(e.target.value)}>
                            {customers.map((item) => (
                                <option key={item.id} value={item.id} >{item.name}</option>
                            ))}
                        </select>

                        <button className="Btn" onClick={() => search()}> Search</button>
                    </div>
                    <div className="searchkeyword">
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
                                    onSubmit={(e) => searchOnFeedback(e)}

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
                                        <Button
                                            color={MAIN_COLOR}
                                            fluid size="large"

                                        >
                                            Submit
                                        </Button>
                                    </Segment>
                                </Form>

                            </Grid.Column>
                        </Grid> </>


                        <div>
                            <div className="cstList">
                                <Stack spacing={1}>
                                    {searchFeed.map((serachitem) => (
                                        <Item key={serachitem.id}>  <p style={{ fontSize: '20px' }}>{serachitem.feedback}</p></Item>
                                    ))}

                                </Stack>
                            </div>
                        </div>

                    </div>


                </div>



            </div>
        </div>
    )
}
