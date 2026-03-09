import { useState, useEffect, useDebugValue } from "react";

// Custom Hook #1: Track online/offline status
function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Shows in React DevTools: "OnlineStatus: 🟢 Online" or "🔴 Offline"
    useDebugValue(isOnline ? "🟢 Online" : "🔴 Offline");

    return isOnline;
}

// Custom Hook #2: Track window size
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Shows in React DevTools: "WindowSize: 1920x1080"
    useDebugValue(`${size.width}x${size.height}`);

    return size;
}

// Custom Hook #3: Track mouse position with expensive formatting
function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    // Second argument = formatter function (only called when DevTools is open)
    // This is good for expensive formatting!
    useDebugValue(position, pos => `Mouse at (${pos.x}, ${pos.y})`);

    return position;
}

export default function UseDebugValueExample() {
    const isOnline = useOnlineStatus();
    const windowSize = useWindowSize();
    const mousePosition = useMousePosition();
    
    return (
        <div>
            <h1>UseDebugValue Example</h1>
            <p>Open React DevTools to see custom debug labels!</p>
            
            <div style={{ 
                background: "#f5f5f5", 
                padding: "20px", 
                borderRadius: "10px",
                marginTop: "20px"
            }}>
                <h3>Custom Hook Values:</h3>
                
                <p style={{ 
                    padding: "10px", 
                    background: isOnline ? "#e8f5e9" : "#ffebee",
                    borderRadius: "5px"
                }}>
                    <strong>Network Status:</strong> {isOnline ? "🟢 Online" : "🔴 Offline"}
                </p>
                
                <p style={{ padding: "10px", background: "#e3f2fd", borderRadius: "5px" }}>
                    <strong>Window Size:</strong> {windowSize.width} x {windowSize.height}
                </p>
                
                <p style={{ padding: "10px", background: "#fff3e0", borderRadius: "5px" }}>
                    <strong>Mouse Position:</strong> X: {mousePosition.x}, Y: {mousePosition.y}
                </p>
            </div>
            
            <div style={{ 
                marginTop: "20px", 
                padding: "15px", 
                background: "#fffde7",
                borderRadius: "5px",
                border: "1px solid #ffd54f"
            }}>
                <strong>💡 How to see debug values:</strong>
                <ol>
                    <li>Open React DevTools (F12 → Components tab)</li>
                    <li>Select this component in the tree</li>
                    <li>Look at the hooks section on the right</li>
                    <li>You'll see the custom labels instead of just "Hook"!</li>
                </ol>
            </div>
        </div>
    );
}
