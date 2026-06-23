import React, { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { GeminiAiChatBot } from "../../services/AIapi";
import ReactMarkdown from "react-markdown";
import { useRef } from "react";
import { useEffect } from "react";
const AIChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! How can I help you today?"
    }
  ]);

  const bottomRef = useRef(null)
  const [loading, SetLoading] = useState(false)
  const [message, setMessage] = useState("")

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ])

    setMessage("");

    try {
      SetLoading(true)
      const data = await GeminiAiChatBot(userMessage)
      console.log("data", data)

      if(!data.success){
        return console.log("messageAI",data.message)
      }
      
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong.",
        },
      ])
    } finally {
      SetLoading(false)
    }



  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <>

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition"
      >
        {open ? <FaTimes size={20} /> : <FaRobot size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 w-80 h-[500px] bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">

          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center gap-2">
            <FaRobot />
            <h2 className="font-semibold">Shop.Co AI Assistant</h2>
          </div>

          {/* Messages */}
          <div className="h-[380px] overflow-y-auto p-4 bg-gray-50/20">


            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 p-3 rounded-xl w-fit max-w-[90%] ${msg.sender === "user" ? "bg-black text-white ml-auto" : "bg-gray-200"}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="mb-3 p-3 rounded-xl bg-gray-200 w-fit">
                Typing...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              disabled={loading}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-xl px-3 py-2 outline-none"
            />

            <button onClick={sendMessage} className="bg-black cursor-pointer text-white px-4 rounded-xl">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot