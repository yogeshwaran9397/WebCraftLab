import { useState, createContext, useContext } from "react"

const UserContext = createContext(null);

export default function UseContextExample() {
    const [user, setUser] = useState({
        name: "John",
        email: "john@example.com"
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div>
                <Dashboard />
            </div>
        </UserContext.Provider>
    );
}

function Dashboard() {
    const { user, setUser } = useContext(UserContext)
    return <div>
        <h3>Welcome to Simple Context Example</h3>
        <h3>Hi {user.name}</h3>
        <Profile />
        <button onClick={() => setUser({ name: "Jane", email: "jane@example.com" })}>Change User</button>
    </div>
}
function Profile() {
    const { user, setUser } = useContext(UserContext)
    return <div>
        <h4>Profile</h4>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>

    </div>
}


