import { IoSend } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';

const ChatPage = () => {
    const { name } = JSON.parse(localStorage.getItem('name'));
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the messages container when new messages are added
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (message.trim() !== '') {
            setMessages((prevMessages) => [...prevMessages, { text: message, sender: name }]);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents the newline character from being inserted
            handleSend(); // Call the send function when Enter is pressed
        }
    };

    const formatMessageText = (text) => {
        // Use regular expression to identify text between two asterisks and apply bold styling
        return text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
    };

    return (
        <div className="h-full w-full flex flex-col">
            <div
                ref={messagesContainerRef}
                className="flex-grow py-3 px-2 overflow-y-auto pb-24 w-full"
            >
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-2 p-2 w-full ${msg.sender === name ? 'justify-end' : 'justify-start flex-row-reverse'}`}>
                        <div className={`w-8 h-8 ${msg.sender === name ? 'order-2' : 'order-1'}`}>
                            <img src={`https://ui-avatars.com/api/?name=${name}&&background=312E81&color=fff`} alt="" className="bg-white rounded-full overflow-hidden border-2 object-cover w-full h-full max-w-[64px]" />
                        </div>
                        <div className={`bg-white p-2 rounded-sm relative text-black ${msg.sender === name ? 'bg-slate-500 ' : 'bg-slate-200  '} ${msg.sender === name ? 'text-right' : ''}`}>
                            <h3 className="md:text-xs text-[10px] font-medium mb-1">{msg.sender}</h3>
                            <p
                                className="md:text-base text-sm break-words w-[18rem]"
                                dangerouslySetInnerHTML={{ __html: formatMessageText(msg.text) }}
                            />

                            <span className={`absolute ${msg.sender == name ? '-right-[13px]' : '-left-[13px] rotate-180'} -top-1 text-xl text-white`}>
                                <FaCaretRight />
                            </span>

                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full h-12 flex-shrink-0 flex bg-slate-200 pt-2 absolute bottom-0">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-slate-500 text-white px-3 outline-0 placeholder:text-slate-200 resize-none py-2"
                    placeholder="Enter your message"
                />
                <button
                    onClick={handleSend}
                    className="px-5 bg-black text-white"
                >
                    <IoSend />
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
