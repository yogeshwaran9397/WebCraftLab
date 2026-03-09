import { useMemo, useState } from "react"

const items = ["Apple", 'Banana', "Orange", "Mango", "Grapes"];
export default function UseMemoExample() {  
    const [search, setSearch] = useState("");
    const [counter, setCounter] = useState(0);

    const filterItems = useMemo(() => {
        console.log("Filtering...")
        return items.filter((item) => item.includes(search))
    }, [search])
   
    return <div>
            <h1>UseMemo Example</h1>
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Fruits" />
            <h3>Filtered Items:</h3>
            <ul>
                {filterItems.map(item => <li>{item}</li>)}
            </ul>
            <h3>Count: {counter}</h3>
            <button onClick={() => setCounter( state => state + 1)}>Increase Count</button>
        </div>
    
}