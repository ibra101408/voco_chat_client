import './App.css';
import io from 'socket.io-client';
import {useState} from "react";

const socket = io.connect('http://localhost:3001');

function App() {
    const [username, setUsername] = useState("");
   // const [room, setRoom] = useState("");
    const room = "voco";
    const joinRoom = () =>{
        if (username !== ""){
            socket.emit("join_room", room);
        }
    };

  return (
    <div className="App">
        <h3> Join a Chat </h3>
        <input
            type="text"
            placeholder="Username"
        onChange={(event) => {
            setUsername(event.target.value);
        }}/>
        <button onClick={joinRoom}> Join </button>



    </div>
  );
}

export default App;
