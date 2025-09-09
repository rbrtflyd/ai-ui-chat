'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ToolResult } from '../Tools/ToolResult';
import { ToolUIPart } from 'ai';
import { Text } from '../ui/text';
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
} from '../ai-elements/chain-of-thought';
import { SearchIcon, BrainIcon, CheckIcon } from 'lucide-react';

export default function ChatThreadWrapper() {
  const [input, setInput] = useState('');
  const { messages, status, sendMessage } = useChat();

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto justify-between absolute inset-y-4 right-4 bg-white/50 backdrop-blur border overflow-hidden rounded-lg shadow-lg border-gray-10">
      <div className="border-b border-gray-10 px-8 py-4">
        Fivetran Assistant
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden h-full p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex`}>
            <motion.div
              className={` p-4 text-gray-500 ${
                message.role === 'user'
                  ? 'shadow-md border rounded-lg bg-white'
                  : ''
              }`}>
              {/* Show Chain of Thought for assistant reasoning */}
              {message.role === 'assistant' &&
                message.parts.some(
                  (part) => part.type === 'text' && part.text.trim().length > 0
                ) && (
                  <ChainOfThought
                    defaultOpen={true}
                    className="mb-4">
                    <ChainOfThoughtHeader>AI Reasoning</ChainOfThoughtHeader>
                    <ChainOfThoughtContent>
                      <ChainOfThoughtStep
                        icon={SearchIcon}
                        label="Analyzing your request"
                        status="complete"
                      />
                      <ChainOfThoughtStep
                        icon={BrainIcon}
                        label="Processing Fivetran data"
                        status="complete"
                      />
                      <ChainOfThoughtStep
                        icon={CheckIcon}
                        label="Generating response"
                        status="complete"
                      />
                    </ChainOfThoughtContent>
                  </ChainOfThought>
                )}

              {/* Tool Results */}
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

              {/* Text Content */}
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
            </motion.div>
          </motion.div>
        ))}

        {/* Show Chain of Thought during streaming */}
        {status === 'streaming' && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4 min-w-80">
              <ChainOfThought defaultOpen={true}>
                <ChainOfThoughtHeader>AI Processing</ChainOfThoughtHeader>
                <ChainOfThoughtContent>
                  <ChainOfThoughtStep
                    icon={SearchIcon}
                    label="Analyzing your request"
                    status="active"
                  />
                  <ChainOfThoughtStep
                    icon={BrainIcon}
                    label="Processing Fivetran data"
                    status="pending"
                  />
                  <ChainOfThoughtStep
                    icon={CheckIcon}
                    label="Generating response"
                    status="pending"
                  />
                </ChainOfThoughtContent>
              </ChainOfThought>
            </div>
          </div>
        )}

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
          <textarea
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
