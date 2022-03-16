import React, {useEffect, useState} from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import moment from "moment";
import CharacterCounter from 'react-character-counter';


function Chat({socket, username, room}){
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const date_create = moment().format("DD.MM.YYYY hh:mm")
    const [counter, setCount] = React.useState(0);

    const recalc = (e) => {
        console.log('val - ', e);
        setCount(e.target.value.length);

    }
    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: date_create,

            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
            console.log(data);
        });
    }, [socket]);

    return (
        <div>
            <div className="chat-window">
                <div className="chat-header">

                </div>

                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                <div>
                                    <div className="message-content">
                                        <p><p>{messageContent.message}<br /></p>
                                        <p id="meta">{messageContent.author}  • {messageContent.time}</p></p>

                                        <div className="message-meta">

                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                    </ScrollToBottom>
                </div>

                <div className="chat-footer">
                    <p className="current-user"><br />{username}</p>
                    <div className="counter">
                        <CharacterCounter id="counter" value={currentMessage} maxLength={100} >
                            <textarea
                                name="inp"
                                type="text"
                                value={currentMessage}
                                maxLength={100}
                                className="full_height_Width"
                                placeholder="hey.."
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value)
                                }}
                                  onKeyPress={(event) => {
                                      event.key === "Enter" && sendMessage();
                                  }}
                            />
                        </CharacterCounter>
                    </div>
                </div>
                <button id="send" onClick = {sendMessage}>Send</button>
            </div>
        </div>
    )
}
export default Chat;
