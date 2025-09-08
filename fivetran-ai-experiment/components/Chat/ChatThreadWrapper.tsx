'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ToolResult } from '../Tools/ToolResult';
import { ToolUIPart } from 'ai';

export default function ChatThreadWrapper() {
  const [input, setInput] = useState('');
  const { messages, status, sendMessage } = useChat();

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto h-full justify-between">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}>
            <div
              className={`max-w-3xl rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
              <div className="text-sm font-medium mb-1">
                {message.role === 'user' ? 'You' : 'Fivetran AI'}
              </div>

              {message.parts.map((part) => {
                if (part.type === 'text') {
                  return (
                    <div
                      key={`${part.type}-${Math.random()}`}
                      className="whitespace-pre-wrap">
                      {part.text}
                    </div>
                  );
                }
                return null;
              })}

              {/* {message.content && (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )} */}

              {message.parts
                .filter((part): part is ToolUIPart =>
                  part.type.startsWith('tool-')
                )
                .map((tool, index) => (
                  <div
                    key={index}
                    className="mt-3">
                    {tool.state === 'output-available' && tool.output && (
                      <ToolResult
                        result={
                          tool.output as { type: string; [key: string]: any }
                        }
                      />
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        ))}

        {status === 'streaming' && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span className="text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
        className="border-t bg-white p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your Fivetran connections..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === 'streaming' || !input.trim()}
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
