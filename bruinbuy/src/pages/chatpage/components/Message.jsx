import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ChatContext } from "../../../contexts/ChatContext";


const Message = ({ message }) => {

    const {User} = useContext(UserContext)

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    return(
        <div ref={ref} className={`message ${message.senderId === User && "owner"}`}>
            <div className="messageContent">
                {<p>{message.text}</p>}
                <img></img>
            </div>
        </div>
    )
}

export default Message