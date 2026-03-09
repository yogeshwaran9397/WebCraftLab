import { useCallback, useState, memo } from "react"

// Child component wrapped in memo - only re-renders if props change
const ExpensiveButton = memo(({ onClick, label }) => {
    console.log(`Rendering button: ${label}`);
    return <button onClick={onClick}>{label}</button>;
});

export default function UseCallbackExample() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    // ✅ GOOD: Wrapped in useCallback - function reference stays same
    const handleIncrement = useCallback(() => {
        setCount(c => c + 1);
    }, []); // Empty deps = function never recreated

    // ❌ BAD: Not wrapped - recreated every render
    const handleDecrement = () => {
        setCount(c => c - 1);
    };

    return (
        <div>
            <h1>UseCallback Example</h1>
            <h3>Count: {count}</h3>
            
            {/* This button WON'T re-render when text changes */}
            <ExpensiveButton onClick={handleIncrement} label="Increment (Stable)" />
            
            {/* This button WILL re-render on every keystroke */}
            <ExpensiveButton onClick={handleDecrement} label="Decrement (Unstable)" />
            
            <br /><br />
            <input 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Type here to see difference..."
            />
            <p style={{color: "gray"}}>Check console to see which buttons re-render!</p>
        </div>
    );
}
