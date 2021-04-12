import { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "./context/socketContext";
import io from "socket.io-client";
import "./App.css";

// function Play() {
//   const [stream, setStream] = useState(null);
//   const player = useRef(null);
//   return (
//     <div>
//       <button
//         onClick={async () => {
//           await navigator.mediaDevices
//             .getUserMedia({ audio: true, video: false })
//             .then((_stream) => {
//               setStream(_stream);
//               console.log(_stream);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }}
//       >
//         play
//       </button>
//       {stream && <audio ref={player} src={stream} controls />}
//     </div>
//   );
// }

const socket = io();

function resizeWindow() {
  let vh = window.innerHeight * 0.01;
  document.body.style.setProperty("--vh", `${vh}px`);
}

function App() {
  // const socket = useContext(SocketContext);
  // console.log(socket);
  const user = useRef(Math.random());
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const input = useRef(null);
  useEffect(() => {
    window.addEventListener("resize", () => resizeWindow());
    resizeWindow();
    socket.on("newData", (data) => {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages.push(data);
        return newMessages;
      });
    });
  }, []);
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <div className="App">
      <ul className="messages">
        {messages.map((item, i) => (
          <li className={item.id === user.current ? "self" : "other"} key={i}>
            {item.message}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("newMessage", { id: user.current, message: value });
          setValue("");
          input.current.focus();
        }}
      >
        <input
          ref={input}
          required={true}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default App;
