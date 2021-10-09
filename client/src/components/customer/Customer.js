import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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

export default function Customer() {
    const history = useHistory()
    const [customers, setcustomer] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [firstStep, setFirstStep] = useState(true);

    // get Customers 
    const getCustomers = async () => {
        const res = await axios.get('http://localhost:5000/api/customer'

        )
        console.log("here")

        console.log(res.data)
        setcustomer(res.data)
    }

    // Add a new cst 

    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/customer/', {
            name: name,
            email: email

        }
            , {
                withCredentials: true,
            }
        )

            .then(function (response) {
                console.log(response);
                setFirstStep(true);
                getCustomers();

            })
    }

    const formStep = () => {
        setFirstStep(false);

    }

    useEffect(() => {
        getCustomers();


    }, []);


    return (

        <div className="cstClass">
            {
                firstStep ? <>
                    <h2 className="title">Customers List </h2>
                    <button className="Btn" onClick={() => formStep()} > add cst</button>

                    <div className="cstList">
                        <Stack spacing={1}>
                            {customers.map((cst) => (
                                <Item key={cst.id}>  <p>{cst.name}</p> </Item>
                            ))}

                        </Stack>
                    </div>
                </> : <>
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
                                onSubmit={(e) => submit(e)}

                            // error={errors}
                            >
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        name="name"
                                        icon="name"
                                        iconPosition="left"
                                        placeholder="Cst Name "
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="Name"
                                        focus
                                        label=" Customer Name "
                                        required
                                    // error={errors && errors.title}
                                    />
                                    <Form.Input
                                        fluid
                                        name="email"
                                        icon="email"
                                        iconPosition="left"
                                        placeholder="Email "
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="Email"
                                        focus
                                        label="Email "
                                        required
                                    // error={errors && errors.title}
                                    />

                                    <Button onClick={() => { history.go('/') }}
                                        color={MAIN_COLOR} fluid size="large"  >
                                        Submit
                                    </Button>
                                </Segment>
                            </Form>

                        </Grid.Column>
                    </Grid> </>

                </>

            }


        </div>





    )
}
