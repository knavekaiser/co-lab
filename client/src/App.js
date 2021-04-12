import {
  useState,
  useEffect,
  // useRef,
  useContext,
} from "react";
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

function App() {
  // const socket = useContext(SocketContext);
  // console.log(socket);
  const [value, setValue] = useState("");
  useEffect(() => {
    socket.on("newData", (data) => {
      setValue(data.data);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        test
        <input
          onChange={(e) => {
            setValue(e.target.value);
            socket.emit("test", { data: e.target.value });
          }}
          value={value}
        />
      </header>
    </div>
  );
}

export default App;
