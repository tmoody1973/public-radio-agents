'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { ChatMessage, Agent } from '@/types';

interface MessageListProps {
  messages: ChatMessage[];
  agents: Agent[];
  isLoading?: boolean;
  className?: string;
}

interface MessageProps {
  message: ChatMessage;
  agent?: Agent;
}

function Message({ message, agent }: MessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  const getAgentIcon = (agentId?: Agent['id']) => {
    const icons = {
      'development-director': '💝',
      'marketing-director': '📢',
      'underwriting-director': '🤝', 
      'program-director': '🎙️',
    };
    return agentId ? icons[agentId] || '🤖' : '🤖';
  };

  const getAgentColor = (agentId?: Agent['id']) => {
    const colors = {
      'development-director': 'from-green-500 to-emerald-600',
      'marketing-director': 'from-blue-500 to-cyan-600', 
      'underwriting-director': 'from-purple-500 to-indigo-600',
      'program-director': 'from-orange-500 to-red-600',
    };
    return agentId ? colors[agentId] || 'from-gray-500 to-gray-600' : 'from-gray-500 to-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 p-4 ${
        isUser 
          ? 'bg-gray-50 ml-8' 
          : isSystem 
            ? 'bg-yellow-50 border-l-4 border-yellow-400' 
            : 'bg-white'
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pr-primary-500">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
        ) : (
          <div className={`
            flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${getAgentColor(message.agentId)}
          `}>
            <span className="text-sm">{getAgentIcon(message.agentId)}</span>
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-900">
            {isUser 
              ? 'You' 
              : isSystem 
                ? 'System'
                : agent?.name || 'Assistant'
            }
          </span>
          
          {message.agentId && !isUser && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
              {message.agentId.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </span>
          )}
          
          <span className="text-xs text-gray-500">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>

        {/* Message Text */}
        <div className={`
          text-sm leading-relaxed
          ${isUser 
            ? 'text-gray-900' 
            : isSystem 
              ? 'text-yellow-800' 
              : 'text-gray-700'
          }
        `}>
          {message.content.split('\n').map((line, index) => (
            <p key={index} className={index > 0 ? 'mt-2' : ''}>
              {line}
            </p>
          ))}
        </div>

        {/* Metadata */}
        {message.metadata && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.metadata.command && (
              <span className="inline-flex items-center rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                Command: {message.metadata.command}
              </span>
            )}
            {message.metadata.templateUsed && (
              <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                Template: {message.metadata.templateUsed}
              </span>
            )}
            {message.metadata.deliverable && (
              <span className="inline-flex items-center rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                Deliverable: {message.metadata.deliverable}
              </span>
            )}
          </div>
        )}

        {/* Streaming indicator */}
        {message.isStreaming && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <SparklesIcon className="h-3 w-3 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function LoadingMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 p-4 bg-white"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-500">
        <SparklesIcon className="h-4 w-4 text-white animate-spin" />
      </div>
      
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-900">Assistant</span>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-gray-500">Generating response...</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MessageList({ 
  messages, 
  agents, 
  isLoading = false, 
  className = '' 
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll to bottom when new messages arrive (if user hasn't scrolled up)
  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  // Handle scroll to detect if user has scrolled up
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50;
    setAutoScroll(isAtBottom);
  };

  const getAgentForMessage = (message: ChatMessage): Agent | undefined => {
    return message.agentId ? agents.find(a => a.id === message.agentId) : undefined;
  };

  if (messages.length === 0 && !isLoading) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Welcome to Public Radio Agents
          </h3>
          <p className="text-gray-600 mb-4">
            Start by selecting an agent or typing a message. All commands begin with *.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p><strong>Quick start:</strong></p>
            <p>• <code className="bg-gray-100 px-1 rounded">*help</code> - See all commands</p>
            <p>• <code className="bg-gray-100 px-1 rounded">*agent development-director</code> - Talk to fundraising expert</p>
            <p>• <code className="bg-gray-100 px-1 rounded">*workflow membership-campaign</code> - Start a membership drive</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Messages container */}
      <div 
        className="flex-1 overflow-y-auto scroll-smooth"
        onScroll={handleScroll}
      >
        <div className="divide-y divide-gray-100">
          <AnimatePresence>
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                agent={getAgentForMessage(message)}
              />
            ))}
          </AnimatePresence>
          
          {/* Loading message */}
          {isLoading && <LoadingMessage />}
        </div>
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button (when user has scrolled up) */}
      <AnimatePresence>
        {!autoScroll && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => {
              setAutoScroll(true);
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="absolute bottom-20 right-4 flex items-center gap-2 rounded-full bg-white shadow-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 z-10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Scroll to bottom
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}