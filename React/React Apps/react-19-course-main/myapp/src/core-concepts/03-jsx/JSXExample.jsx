import "../../App.css"
export default function JSXExample() {
    // embedded expressions
    const name = "Logesh";

    return <>
            <h1 className="bg-color">Hello {name}</h1>
            <p style={{backgroundColor:"yellow", border:"10px solid black"}}>This is a sample text</p>
        </>
}