import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseUrl from "../utils/contants";

const ContactDetail = () => {
    const id = useParams()
    const [contact, setContact] = useState("");

    useEffect(() => {
        getContact(id.id.slice(1))
    }, [id])

    const getContact = async (id) => {
        try {
            const res = await fetch(`${baseUrl}/contact/${id}/view`);
            const data = await res.json();
            setContact(data.contact)
        } catch (error) {
            console.log(error);
        }
    }



    console.log(contact)

    return (
        <>
            <h1 className="m-7 text-center">Contact Details Page</h1>

            <div className="h-screen m-7 pt-10">
                {contact ?
                    <div className="border-4 m-auto p-4" style={{ width: "30%" }}>
                        <h2 className="text-3xl text-center p-8">Contact Info</h2>
                        <div className="flex justify-around m-4">
                            <h3>First Name:</h3>
                            <h3>{contact.firstName}</h3>
                        </div>
                        <div className="flex justify-around m-4">
                            <h3>Last Name:</h3>
                            <h3>{contact.lastName}</h3>
                        </div>
                        <div className="flex justify-around m-4">
                            <h3>Phone Number:</h3>
                            <h3>{contact.phoneNumber}</h3>
                        </div>
                        <div className="flex justify-around m-8">
                            <Link to="/contact">
                                <button className="btn btn-primary">Go Back</button>
                            </Link>
                            <Link to={`/sendmessage/:${contact._id}`}>
                                <button className="btn border-none bg-green-600" title="send OTP to this contact">
                                    Sent
                                </button>
                            </Link>
                        </div>
                    </div>
                    : <h2 className="text-center text-3xl text-red-600">
                        Contact Info Not Found !!!
                    </h2>
                }
            </div>
        </>

    )
}


export default ContactDetail;