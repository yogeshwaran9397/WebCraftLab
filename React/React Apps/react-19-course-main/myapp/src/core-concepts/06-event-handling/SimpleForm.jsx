export default function SimpleForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.name.value)
        console.log(event.target.email.value)
    }
    return <>
        <h1>Simple Form</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter name" />
            <input type="text" name="email" placeholder="Enter email" />
            <button type="submit" className="bg-color">Submit</button>
        </form>
    </>
}