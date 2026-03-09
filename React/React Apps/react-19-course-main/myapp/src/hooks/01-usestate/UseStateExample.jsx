import { useState } from "react"

export default function UseStateExample(params) {

    const [isVisible, setIsVisible] = useState(false);

    function handleClick() {
        setIsVisible(!isVisible);//toggle
    }
  
   return <div>
        <button onClick={handleClick}>Show Text</button>
        {isVisible && <p>This is the text that gets toggled!</p>}
    </div>
}