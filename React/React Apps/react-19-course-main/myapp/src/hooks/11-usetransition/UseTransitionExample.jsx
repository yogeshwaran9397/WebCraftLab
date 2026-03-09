import { useState, useTransition } from "react";

// Generate a large list for demo
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function UseTransitionExample() {
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState(items);
    
    // Step 1: Create transition state
    const [isPending, startTransition] = useTransition();

    const handleSearch = (e) => {
        const value = e.target.value;
        
        // High priority - input responds immediately!
        setSearch(value);

        // Step 2: Wrap slow update in startTransition
        startTransition(() => {
            // This runs as LOW priority - won't block the UI
            const result = items.filter(item => 
                item.toLowerCase().includes(value.toLowerCase())
            );
            setFiltered(result);
        });
    };

    return (
        <div>
            <h1>UseTransition Example</h1>
            <p>Try typing fast - the input stays responsive!</p>
            
            <input 
                value={search}
                onChange={handleSearch}
                placeholder="Search 10,000 items..."
                style={{ padding: "8px", fontSize: "16px", width: "300px" }}
            />
            
            {/* Step 3: Show loading indicator during transition */}
            {isPending && <p style={{color: "blue"}}>Updating list...</p>}
            
            <p>Showing {filtered.length} results (first 100 displayed)</p>
            
            <ul style={{ height: "300px", overflow: "auto" }}>
                {filtered.slice(0, 100).map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
