import React, { useState } from 'react'

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handlSend = () => {
        if (input.trim()){
            setMessages([...messages, { user: true, text: input}]);
            //send Input to backend chatbot API (Implement API Later)
            setInput('');
        }
    };
    return(
        <div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.user ? 'user-msg' : 'bot-msg'}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlSend()}
            />
            <button onClick={handlSend}>Send</button>
        </div>
    )
}

export default ChatBot;
