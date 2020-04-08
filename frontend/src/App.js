import React, {useState, useEffect} from 'react';
import io from "socket.io-client"
import './App.css';


let endPoint = "http://localhost:5000"

let socket = io.connect(endPoint);

function App() {
  /*const [messages, setMessages] = useState(["Hello and Welcome"]);
  const [message, setMessage] = useState("");


useEffect(() => {
    socket.on("get_message", msg => {
      setMessages([...messages,msg.message]);
    });
});
 


const onChange = e => {
  setMessage(e.target.value);
};

const onClick = () => {
  if (message !== "") {
    socket.emit("enter_message",message);
    setMessage("");
  }
  else{
    alert("Please Add A Message")
  }
}

  return (
    <div>
    {messages.length > 0 &&
    messages.map(msg => (
      <div>
        <p>{msg}</p>
      </div>
    ))}

    <input value = {message} name = "message" onChange={e => onChange(e)} />
    <button onClick={() => onClick()}>send Message</button></div>
    
  );*/
  return( <div><p>dddddd!!!</p></div>
}

export default App;
