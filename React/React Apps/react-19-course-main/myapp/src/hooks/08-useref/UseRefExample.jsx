import { useRef } from "react"

export default function UseRefExample() {
    const inputRef = useRef();

    const handleFocus = () => {
        inputRef.current.focus();
    }

    return <div>
            <h1>UseRef Example</h1>
            <input ref={inputRef} type="text" name="" id="" placeholder="Click the button to focus me!" />
            <button onClick={handleFocus} >Focus the Input</button>
        </div>
    
}