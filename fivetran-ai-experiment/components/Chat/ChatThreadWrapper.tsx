'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ToolResult } from '../Tools/ToolResult';
import { ToolUIPart } from 'ai';
import { Text } from '../ui/text';

export default function ChatThreadWrapper() {
  const [input, setInput] = useState('');
  const { messages, status, sendMessage } = useChat();

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-full justify-between absolute inset-y-0 right-0 bg-white border-l border-gray-10">
      <div className="border-b border-gray-10 px-8 py-4">
        Fivetran Assistant
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex`}>
            <div
              className={` p-4 text-gray-500 ${
                message.role === 'user'
                  ? 'shadow-md border rounded-lg bg-white'
                  : ''
              }`}>
              {message.parts.map((part) => {
                if (part.type === 'text') {
                  return (
                    <motion.div
                      key={`${part.type}-${Math.random()}`}
                      className="whitespace-pre-wrap">
                      {part.text}
                    </motion.div>
                  );
                }
                return null;
              })}

              {message.parts
                .filter((part): part is ToolUIPart =>
                  part.type.startsWith('tool-')
                )
                .map((tool, index) => {
                  // Add safety check for tool.output
                  if (!tool.output) {
                    return null;
                  }

                  return (
                    <motion.div
                      key={index}
                      className="mt-3">
                      <ToolResult
                        result={
                          tool.output as { type: string; [key: string]: any }
                        }
                      />
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        ))}

        {status === 'streaming' && messages.length === 0 && (
          <Text variant="shine">Thinking...</Text>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
        className=" bg-white p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Fivetran Assistant..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status === 'streaming' || !input.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
