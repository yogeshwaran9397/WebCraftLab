import { useActionState } from "react";

export default function UseActionState() {

    async function submitForm(previousState, formdata) {
        await new Promise((res,rej) => setTimeout(res, 5000));
        if (formdata.get("username") == "logesh" && formdata.get("password")=="1234") {
            if(previousState == "Login Success")
                return "You already logged in!"
            return "Login Success";
        }
        return "Invalid Credentials";
    }

    const [state, formAction, isPending] = useActionState(submitForm, "Fill the form fields")

    return <div>
        <h2 style={{marginBottom:10}}>UseActionState Example</h2>
        <form action={formAction}>
            <div style={{display:"flex", flexDirection:"column"}}>
                <label htmlFor="">Username 
                    <input type="text" name="username" id="" />
                </label>
                <label htmlFor="">Password 
                    <input type="password" name="password" id="" />
                </label>
                <button type="submit">Submit</button>
            </div>
        </form>
        <p>{isPending ? "Loading..." : state}</p>
    </div>
}