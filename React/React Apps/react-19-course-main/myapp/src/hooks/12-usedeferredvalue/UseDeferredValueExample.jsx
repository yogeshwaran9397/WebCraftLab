import { useState, useDeferredValue, useMemo } from "react";

// Large dataset for demo
const products = Array.from({ length: 10000 }, (_, i) => `Product ${i + 1}`);

export default function UseDeferredValueExample() {
    const [search, setSearch] = useState("");
    
    // Step 1: Create a deferred (delayed) version of search
    const deferredSearch = useDeferredValue(search);
    
    // Step 2: Use the DEFERRED value for expensive filtering
    const filteredProducts = useMemo(() => {
        console.log("Filtering with:", deferredSearch);
        return products.filter(product => 
            product.toLowerCase().includes(deferredSearch.toLowerCase())
        );
    }, [deferredSearch]); // Uses DEFERRED value, not immediate!

    // Step 3: Check if we're showing "stale" results
    const isStale = search !== deferredSearch;

    return (
        <div>
            <h1>UseDeferredValue Example</h1>
            <p>Type fast - list updates with a slight delay to keep input smooth!</p>
            
            <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                style={{ padding: "8px", fontSize: "16px", width: "300px" }}
            />
            
            <p>
                Immediate value: <strong>{search}</strong> | 
                Deferred value: <strong>{deferredSearch}</strong>
            </p>
            
            {/* Step 4: Dim list when showing stale data */}
            <div style={{ 
                opacity: isStale ? 0.5 : 1, 
                transition: "opacity 0.2s" 
            }}>
                <p>Found {filteredProducts.length} products (showing first 50)</p>
                <ul style={{ height: "300px", overflow: "auto" }}>
                    {filteredProducts.slice(0, 50).map(product => (
                        <li key={product}>{product}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
