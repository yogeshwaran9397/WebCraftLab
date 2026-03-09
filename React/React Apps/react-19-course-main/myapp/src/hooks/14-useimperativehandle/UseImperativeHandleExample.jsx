import { useRef, useImperativeHandle, forwardRef, useState } from "react";

// Step 1: Create child component wrapped with forwardRef
const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef();
    const [value, setValue] = useState("");
    
    // Step 2: Define what methods parent can access
    useImperativeHandle(ref, () => ({
        // These are the ONLY methods parent can use
        focus: () => {
            inputRef.current.focus();
        },
        clear: () => {
            setValue("");
            inputRef.current.focus();
        },
        getValue: () => {
            return value;
        },
        shake: () => {
            inputRef.current.style.animation = "shake 0.5s";
            setTimeout(() => {
                inputRef.current.style.animation = "";
            }, 500);
        }
    }));

    return (
        <>
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
            `}</style>
            <input 
                ref={inputRef} 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={props.placeholder}
                style={{ 
                    padding: "10px", 
                    fontSize: "16px", 
                    width: "300px",
                    border: "2px solid #ccc",
                    borderRadius: "5px"
                }}
            />
        </>
    );
});

export default function UseImperativeHandleExample() {
    const inputRef = useRef();
    const [message, setMessage] = useState("");

    const handleGetValue = () => {
        const value = inputRef.current.getValue();
        setMessage(`Input value is: "${value}"`);
    };

    const handleValidate = () => {
        const value = inputRef.current.getValue();
        if (value.length < 3) {
            setMessage("Input must be at least 3 characters!");
            inputRef.current.shake();
        } else {
            setMessage("Valid! ✓");
        }
    };

    return (
        <div>
            <h1>UseImperativeHandle Example</h1>
            <p>Parent controls child through custom methods!</p>
            
            <CustomInput ref={inputRef} placeholder="Type something..." />
            
            <div style={{ marginTop: "15px" }}>
                {/* Step 3: Parent uses the exposed methods */}
                <button onClick={() => inputRef.current.focus()} style={btnStyle}>
                    Focus
                </button>
                <button onClick={() => inputRef.current.clear()} style={btnStyle}>
                    Clear
                </button>
                <button onClick={handleGetValue} style={btnStyle}>
                    Get Value
                </button>
                <button onClick={() => inputRef.current.shake()} style={btnStyle}>
                    Shake
                </button>
                <button onClick={handleValidate} style={{...btnStyle, background: "#4CAF50"}}>
                    Validate
                </button>
            </div>
            
            {message && (
                <p style={{ 
                    marginTop: "15px", 
                    padding: "10px", 
                    background: "#f0f0f0", 
                    borderRadius: "5px" 
                }}>
                    {message}
                </p>
            )}
        </div>
    );
}

const btnStyle = {
    padding: "10px 15px",
    marginRight: "10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    background: "#2196F3",
    color: "white"
};
