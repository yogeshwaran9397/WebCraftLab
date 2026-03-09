import { useState } from "react"

export default function EventHandlingExample() {
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setMessage(event.target.value)
    }
    return <>
        <h1>Event Handling Example</h1>
        <input type="text" onChange={handleChange} placeholder="Enter Message" />
        <p>{message}</p>
    </>
}