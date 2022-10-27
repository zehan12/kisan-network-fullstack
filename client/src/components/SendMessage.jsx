import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../utils/contants";

const SendMessage = () => {
    const id = useParams();
    const [contact, setContact] = useState("");
    const [ message, setMessage ] = useState("");
    const [ OTP, setOTP ] = useState("");
    const [ error, setError ] = useState("");
 
    useEffect(() => {
        const OTP = generateOTP()
        setMessage(`Hi, Your OTP is: ${OTP}`)
        setOTP(OTP)
        getContact(id.id.slice(1))
    }, [id])


    const generateOTP = () => {
        return Math.random().toString().substring(3, 9)
    }

    const getContact = async (id) => {
        const res = await fetch(`${baseUrl}/${id}/view`);
        const data = await res.json()
        setContact(data.contact)
        if (data) console.log(data)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { phoneNumber, firstName, lastName } = contact
        const  name = firstName + " " + lastName
        const sendData = { name, phoneNumber, message, OTP }
        const res = await fetch(baseUrl+"/api/message", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendData)
        })

        const data = await res.json();
        if ( res.status === 401 ) setError(data)
        if ( res && res.status ===  200 ) console.log(data,"res 200")
        if (data) console.log(data,"data")
    }
    return (
        <div>
            <h1 className="text-center">Send Message</h1>
            { error && <h2 className="text-2xl text-red-700 text-center">{error}</h2> }
            <div className="h-screen">
                {
                    contact ?
                        <div className="form-control m-auto mt-20 text-left" style={{ width: "50%" }} >
                            <label className="label flex flex-col text-left">
                                <span className="label-text text-2xl m-1">Full Name : { contact.firstName + "  " + contact.lastName }</span>
                                <span className="label-text-alt text-2xl m-1">Phone Number : { contact.phoneNumber }</span>
                            </label>
                            <textarea onChange={(e)=>{setMessage(e.target.value)}} className="textarea textarea-bordered h-24 my-5" value={message} placeholder="Enter message"></textarea>
                            <button onClick={handleSubmit} type="submit" className="btn  bg-green-500 border-none"> Send Message</button>
                        </div>
                        : ""
                }
            </div>
        </div>
    )
}

export default SendMessage;