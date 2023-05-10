import React, { useState } from "react";
import { auth, db } from "../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


const SendMessage = ({ room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    console.log(room)
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      room

    });
    setMessage("");
    
  };
  return (
    
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        room={room}
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
    
  );
};

export default SendMessage;