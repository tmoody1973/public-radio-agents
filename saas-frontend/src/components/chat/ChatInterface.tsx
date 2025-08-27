'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { ChatMessage, Agent, Station } from '@/types';
import { AgentSwitcher } from '../agents/AgentCard';
import MessageList from './MessageList';
import CommandAutocomplete from './CommandAutocomplete';

interface ChatInterfaceProps {
  station: Station;
  agents: Agent[];
  initialMessages?: ChatMessage[];
  onSendMessage: (content: string, agentId?: Agent['id']) => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export default function ChatInterface({
  station,
  agents,
  initialMessages = [],
  onSendMessage,
  isLoading = false,
  className = ''
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [activeAgent, setActiveAgent] = useState<Agent['id'] | undefined>();
  const [showCommands, setShowCommands] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on agent switch
  useEffect(() => {
    if (activeAgent && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeAgent]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const content = inputValue.trim();
    setInputValue('');
    setIsTyping(false);

    // Check for commands
    if (content.startsWith('*')) {
      await handleCommand(content);
      return;
    }

    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sessionId: 'current',
      role: 'user',
      content,
      agentId: activeAgent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Send to backend API
      await onSendMessage(content, activeAgent);
      
      // Note: In real implementation, the response would come back through WebSocket or API response
      // For now, we'll simulate a response
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sessionId: 'current',
          role: 'assistant',
          content: `This is a simulated response from ${activeAgent || 'the system'}. In the real implementation, this would be the AI agent's response.`,
          agentId: activeAgent,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sessionId: 'current',
        role: 'system',
        content: 'Sorry, there was an error processing your message. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleCommand = async (content: string) => {
    const [command, ...args] = content.slice(1).split(' ');
    
    switch (command) {
      case 'agent':
        const agentId = args[0] as Agent['id'];
        if (agents.find(a => a.id === agentId)) {
          setActiveAgent(agentId);
          const systemMessage: ChatMessage = {
            id: Date.now().toString(),
            sessionId: 'current',
            role: 'system',
            content: `Switched to ${agents.find(a => a.id === agentId)?.name}. How can I help your station today?`,
            agentId: agentId,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, systemMessage]);
        }
        break;
      
      case 'help':
        const helpMessage: ChatMessage = {
          id: Date.now().toString(),
          sessionId: 'current',
          role: 'system',
          content: `Available commands:
• *agent [name] - Switch to a specific agent
• *workflow [name] - Start a workflow
• *help - Show this help message
• *status - Show current session status`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, helpMessage]);
        break;
      
      default:
        const unknownMessage: ChatMessage = {
          id: Date.now().toString(),
          sessionId: 'current',
          role: 'system',
          content: `Unknown command: *${command}. Type *help to see available commands.`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, unknownMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }

    // Show command autocomplete on *
    if (e.key === '*' || (inputValue.startsWith('*') && e.key !== 'Backspace')) {
      setShowCommands(true);
    } else if (e.key === 'Escape') {
      setShowCommands(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Show/hide command autocomplete
    setShowCommands(value.startsWith('*') && value.length > 1);
    
    // Update typing indicator
    setIsTyping(value.length > 0);
  };

  const selectCommand = (command: string) => {
    setInputValue(command + ' ');
    setShowCommands(false);
    inputRef.current?.focus();
  };

  return (
    <div className={`flex h-full flex-col bg-white ${className}`}>
      {/* Header with agent switcher */}
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Chat Session - {station.name}
            </h2>
            <p className="text-sm text-gray-600">
              {station.size} {station.licenseType} station
            </p>
          </div>
          
          <AgentSwitcher
            agents={agents}
            activeAgent={activeAgent}
            onSwitchAgent={setActiveAgent}
          />
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={messages}
          agents={agents}
          isLoading={isLoading}
          className="h-full"
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="relative">
          {/* Command autocomplete */}
          <AnimatePresence>
            {showCommands && (
              <CommandAutocomplete
                inputValue={inputValue}
                agents={agents}
                onSelectCommand={selectCommand}
                onClose={() => setShowCommands(false)}
              />
            )}
          </AnimatePresence>

          {/* Input field */}
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    activeAgent 
                      ? `Ask the ${agents.find(a => a.id === activeAgent)?.name} a question...`
                      : "Type a message or use *help to see commands..."
                  }
                  rows={1}
                  className="block w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-pr-primary-500 focus:ring-pr-primary-500 sm:text-sm"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                
                {/* Command indicator */}
                {inputValue.startsWith('*') && (
                  <div className="absolute right-12 top-3">
                    <CommandLineIcon className="h-5 w-5 text-pr-primary-500" />
                  </div>
                )}
              </div>
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-gray-500"
                >
                  Press Enter to send, Shift+Enter for new line
                </motion.p>
              )}
            </div>

            {/* Send button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={`
                flex h-12 w-12 items-center justify-center rounded-lg transition-all
                ${inputValue.trim() && !isLoading
                  ? 'bg-pr-primary-500 text-white hover:bg-pr-primary-600 shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <PaperAirplaneIcon className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Quick actions */}
        {!activeAgent && (
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700">Quick start:</span>
            {agents.slice(0, 2).map((agent) => (
              <motion.button
                key={agent.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectCommand(`*agent ${agent.id}`)}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
              >
                <span className="mr-1">{getAgentIcon(agent.id)}</span>
                {agent.name.split(' ')[0]}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectCommand('*help')}
              className="inline-flex items-center rounded-full bg-pr-primary-100 px-3 py-1 text-xs font-medium text-pr-primary-700 hover:bg-pr-primary-200"
            >
              Show all commands
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function
function getAgentIcon(agentId: Agent['id']) {
  const icons = {
    'development-director': '💝',
    'marketing-director': '📢',
    'underwriting-director': '🤝', 
    'program-director': '🎙️',
  };
  return icons[agentId] || '🤖';
}