'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex flex-col w-full max-w-150 mx-auto h-full justify-between">
      {messages.map((message) => (
        <motion.div key={message.id}>
          <div>{message.role === 'user' ? 'User: ' : 'AI: '}</div>
          <div>
            {message.parts.map((part, index) => {
              if (part.type === 'text') {
                return <span key={index}>{part.text}</span>;
              }
              return null;
            })}
          </div>
        </motion.div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-white w-full p-4 rounded-md shadow-lg h-50 justify-between items-start">
        <textarea
          className="w-full h-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md border border-slate-200 hover:cursor-pointer">
          Send
        </button>
      </form>
    </div>
  );
}
