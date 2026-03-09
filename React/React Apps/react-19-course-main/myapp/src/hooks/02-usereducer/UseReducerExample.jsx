import { useReducer } from "react"

const initalState = { count: 0 }
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            break;
    }
}

export default function UseReducerExample() {
    const [state, dispatch] = useReducer(reducer, initalState)

    return <div>
        <h2 style={{ marginBottom: 10 }}>useReducer Example</h2>
        <h3>Count: {state.count}</h3>
        <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
        <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
}