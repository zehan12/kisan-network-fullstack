import React, { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai"
import { GrMail } from "react-icons/gr"
import { Link } from "react-router-dom";
import baseUrl from "../utils/contants";


const ContactList = () => {

    const [contacts, setContact] = useState([]);

    const fetchContacts = async () => {
        const res = await fetch(baseUrl+"/contact/list");
        const data = await res.json()
        setContact(data.listOfContact)
    }

    useEffect(() => {
        fetchContacts();
    }, [])

    useEffect(() => {
    }, [contacts])

    const handleDelete = async (id) => {
        console.log(id)
        const res = await fetch(`${baseUrl}/contact/${id}/delete`,{
            method:"DELETE",
        });
        const data = await res.json();
        console.log(data)
        if ( res && res.status === 200 ) fetchContacts()
    }



    return (
        <>
            <h1 className="text-center text-4xl my-7">List of Contact</h1>


            {
                contacts.length === 0 ? <div className="h-screen text-center">
                    <h2 className="text-2xl text-center m-7">No Contact List is Here </h2>
                    <Link to="/create">  <button className="btn btn-primary mt-8 cursor-pointer">Click Here to Create</button></Link>
                </div>

                    :
                    <div className="overflow-x-auto relative m-auto h-screen" style={{ width: "80%" }}>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        First Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Last Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Phone Number
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Action
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Contact Detail
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {contact.firstName}
                                        </th>
                                        <td className="py-4 px-6">
                                            {contact.lastName}
                                        </td>
                                        <td className="py-4 px-6">
                                            {contact.phoneNumber}
                                        </td>
                                        <td className="py-4 px-6 flex">
                                            <button title="delete this contact">
                                                <AiTwotoneDelete data-id={contact._id} id={contact._id}
                                                onClick={() => {
                                                     handleDelete(contact._id);
                                                }}
                                                    className="text-2xl hover:text-red-600 cursor-pointer mr-3" />
                                            </button>
                                            <Link to={`/sendmessage/:${contact._id}`}>
                                                <button title="send OTP to this contact">
                                                    <GrMail className="text-2xl hover:text-green-600 cursor-pointer" />
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="py-4 px-6 ml-3 cursor-pointer">
                                            <Link to={`/contacts/:${contact._id}`}>view contact</Link>
                                        </td>
                                    </tr>))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
}

export default ContactList;