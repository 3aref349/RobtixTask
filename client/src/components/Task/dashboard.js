import React, { useState, useEffect } from 'react'
import axios from 'axios';

import '../../utilities/my.css'
import Feed from '../feedback/Feed';
import Customer from '../customer/Customer';


export default function Dashboard() {
    const [customers, setcustomer] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cstId, setCstId] = useState();
    const [feedData, setFeedData] = useState([]);
    const [feedInput, setFeedInput] = useState("");


    const getCustomers = async () => {
        const res = await axios.get('http://localhost:5000/api/customer'

        )
        console.log("here")

        console.log(res.data)
        setcustomer(res.data)
    }

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
                // setStepOne(false)
                // setStepTwo(true)
                // getProjectdefault();
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
              submitFeed();

            })
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

    useEffect(() => {
        getCustomers();


    }, []);
    return (
//         
<div className='wrapper'> 
<h1 className="title">Customer FeedBack</h1>
<div className='splitWrapper'>
<div className='customerWrapper'> <div className="customer">
<Customer />
</div>  </div>
<div className='feedbackWrapper'> <div className="feedwr">
<Feed /> 
</div></div>
    </div>

</div>
    )
}


