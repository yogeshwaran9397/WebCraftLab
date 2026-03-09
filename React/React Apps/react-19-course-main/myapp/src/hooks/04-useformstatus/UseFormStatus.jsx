import { use } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return <button>{pending ? "Form Submitting..." : "Submit"}</button>
}


export default function UseFormstatusExample() {
    
    async function handleSubmit(formData) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log("Form submitted", formData)
    }

    return <div>
        <h2 style={{marginBottom:10}}>UseFormStatus Example</h2>
        <form action={handleSubmit}>
            <div style={{display:"flex", flexDirection:"column"}}>
                <label htmlFor="">Username 
                    <input type="text" name="username" id="" />
                </label>
                <label htmlFor="">Password 
                    <input type="password" name="password" id="" />
                </label>
                <SubmitButton/>
            </div>
        </form>
    </div>
}