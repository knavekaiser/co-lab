import {useEffect, useState, useRef, useContext}

export const ChatBox = () =>{
  const { socket } = useContext(SocketContext);
  const user = useRef(Math.random());
  const input = useRef(null);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    socket.on("newData", (data) => {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages.push(data);
        return newMessages;
      });
    });
    return () => socket.disconnect();
  }, []);
  return(
    <div>
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
      <button
        type="button"
        onClick={() => {
          if (socket.connected) {
            socket.disconnect();
          } else {
            socket.connect();
          }
          // console.log(socket);
        }}
      >
        toggle
      </button>
    </form>
    </div>
  )
}


// ul {
//   max-height: 100%;
//   list-style: none;
//   display: flex;
//   flex-direction: column;
//   grid-gap: 0.5rem;
//   grid-template-rows: auto;
//   overflow-y: auto;
//   align-items: flex-start;
// }
// li {
//   height: min-content;
//   max-width: 80%;
//   background: rgba(6, 110, 186, 0.2);
//   margin: 0 auto;
//   padding: 0.25rem 0.5rem;
// }
// .self {
//   border-radius: 0.9rem 0.9rem 0.9rem 0;
//   margin-left: 0;
// }
// .other {
//   border-radius: 0.9rem 0.9rem 0 0.9rem;
//   margin-right: 0;
// }
// form {
//   display: flex;
// }
// input {
//   padding: 0.5rem;
//   flex: 1;
// }
