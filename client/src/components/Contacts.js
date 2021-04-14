import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../context/SiteContext";
import { SocketContext } from "../context/SocketContext";
import useSwr from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Contacts = () => {
  const { onlineSocket, callSocket } = useContext(SocketContext);
  const { user } = useContext(SiteContext);
  const [contacts, setContacts] = useState(null);
  const [online, setOnline] = useState([]);
  const { err, data } = useSwr("/api/contacts", fetcher);
  useEffect(() => {
    if (data?.code === "ok") {
      setContacts(data.contacts);
    }
  }, [data]);
  useEffect(() => {
    onlineSocket.on("members_online", (data) => {
      setOnline(data);
    });
  }, [onlineSocket]);
  return (
    <div>
      <p>Contacts</p>
      <ul>
        {contacts ? (
          contacts.map((contact, i) => (
            <li key={i}>
              <p>
                {contact.name}
                {online.includes(contact.username) && (
                  <>
                    {" "}
                    <span>•</span>
                    <span
                      onClick={() => {
                        onlineSocket.emit("new_call", {
                          host: user.username,
                          guests: [contact.username],
                        });
                      }}
                    >
                      <ion-icon name="call-outline"></ion-icon>
                    </span>{" "}
                  </>
                )}
              </p>
            </li>
          ))
        ) : (
          <li>Loading</li>
        )}
      </ul>
    </div>
  );
};

export default Contacts;
