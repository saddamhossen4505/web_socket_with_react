import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import rug from "random-username-generator";
const user = rug.generate();

// Init socket.
const socket = io("http://localhost:5050");

function App() {
  const [msg, setMsg] = useState("");
  const [userName, setUserName] = useState(user);
  const [chat, setChat] = useState([]);

  // handleMsgSend.
  const handleMsgSend = (e) => {
    e.preventDefault();
    socket.emit("chat", { msg, userName });
    setMsg("");
  };

  useEffect(() => {
    socket.on("chat", (data) => {
      setChat(data);
    });
  }, [chat]);

  return (
    <>
      <h1>{userName}</h1>;
      <br />
      <br />
      <br />
      <br />
      <br />
      {chat.map((item, index) => {
        return (
          <p key={index}>
            <strong style={{ color: "red" }}>{item.userName}</strong>
            {item.msg}
          </p>
        );
      })}
      <div className="msg_area">
        <form onSubmit={handleMsgSend}>
          <input
            type="text"
            placeholder="Message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

export default App;
