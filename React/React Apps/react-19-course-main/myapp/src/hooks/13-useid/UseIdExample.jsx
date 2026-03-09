import { useId } from "react";

// Reusable form field component
function FormField({ label, type = "text", placeholder }) {
    // Step 1: Generate unique ID for this instance
    const id = useId();
    
    return (
        <div style={{ marginBottom: "15px" }}>
            {/* Step 2: Use ID for accessibility - label connects to input */}
            <label 
                htmlFor={id} 
                style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
                {label}
            </label>
            <input 
                id={id} 
                type={type} 
                placeholder={placeholder}
                style={{ padding: "8px", width: "250px" }}
            />
            <small style={{ display: "block", color: "gray" }}>
                Generated ID: {id}
            </small>
        </div>
    );
}

// Another reusable component using useId
function CheckboxField({ label }) {
    const id = useId();
    
    return (
        <div style={{ marginBottom: "10px" }}>
            <input id={id} type="checkbox" />
            <label htmlFor={id} style={{ marginLeft: "8px" }}>{label}</label>
        </div>
    );
}

export default function UseIdExample() {
    return (
        <div>
            <h1>UseId Example</h1>
            <p>Each field gets a unique, SSR-safe ID automatically!</p>
            
            <form>
                {/* Each FormField gets its OWN unique ID */}
                <FormField label="Email" type="email" placeholder="you@example.com" />
                <FormField label="Password" type="password" placeholder="Enter password" />
                <FormField label="Username" placeholder="Enter username" />
                
                <hr style={{ margin: "20px 0" }} />
                
                <CheckboxField label="Remember me" />
                <CheckboxField label="Subscribe to newsletter" />
                <CheckboxField label="Accept terms and conditions" />
                
                <button type="submit" style={{ marginTop: "10px", padding: "10px 20px" }}>
                    Submit
                </button>
            </form>
        </div>
    );
}
