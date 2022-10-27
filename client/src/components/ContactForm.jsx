import React, { useState } from "react"
import  { useHistory } from "react-router-dom"
import baseUrl from "../utils/contants";


const ContactForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("")
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contact = { firstName, lastName, phoneNumber }
        if (!firstName || !lastName || !phoneNumber) {
            setError("input cannot be empty!");
            console.log("invalid")
        }
        else if (phoneNumber.length > 10) {
            setError("Enter Valid Phone Number!")
        } else {
            const res = await fetch(baseUrl+"/contact/create", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            })
            const data = await res.json();
            if ( res && res.status === 200 ) {
                console.log(res)
                history.push("/contact");

            }
            if (data.message) return setError(data.message)
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="m-auto p-20 flex flex-col justify-center items-center pb-40">
            <h1 className="text-6xl my-10">Enter Your Details Here</h1>
            {error && <h2 className="text-3xl text-red-600">{error}</h2>}
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-2xl" >Enter your first name?</span>
                </label>
                <input onChange={e => setFirstName(e.target.value)} type="text" name="firstName" value={firstName} placeholder="Enter your First Name" className="input input-bordered w-full max-w-xs" />
    
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-2xl">Enter your last name?</span>
                </label>
                <input onChange={e => setLastName(e.target.value)} type="text" name="lastName" value={lastName} placeholder="Enter your Last Name" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-2xl">Enter  your phone number?</span>
                </label>
                <input onChange={e => setPhoneNumber(e.target.value.replace(/\D/, ''))} type="text" min="10" max="10" name="phoneNumber" value={phoneNumber} placeholder="Enter your Phone Number" className="input input-bordered w-full max-w-xs" />
              
            </div>
            <input type="submit" className="btn btn-wide m-5 mb-4 " value="Submit" />
        </form>
    )
}

export default ContactForm;