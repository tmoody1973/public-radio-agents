'use client';

import { useState, useEffect } from 'react';
import { Agent } from '@/types';

interface CommandAutocompleteProps {
  value: string;
  agents: Agent[];
  onSelect: (suggestion: string) => void;
  className?: string;
}

const commands = [
  { command: '*help', description: 'Show all available commands and agents' },
  { command: '*status', description: 'Check current system status' },
  { command: '*workflow', description: 'Start a structured workflow' },
  { command: '*chat-mode', description: 'Begin conversational assistance' },
  { command: '*kb-mode', description: 'Access knowledge base' },
  { command: '*exit', description: 'Return to orchestrator' }
];

export default function CommandAutocomplete({ 
  value, 
  agents, 
  onSelect, 
  className = '' 
}: CommandAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Array<{ command: string; description: string }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (value.startsWith('*') && value.length > 1) {
      const searchTerm = value.toLowerCase();
      
      // Command suggestions
      const commandSuggestions = commands.filter(({ command }) =>
        command.toLowerCase().includes(searchTerm)
      );

      // Agent command suggestions
      const agentSuggestions = agents
        .filter(agent => `*agent ${agent.id}`.toLowerCase().includes(searchTerm))
        .map(agent => ({
          command: `*agent ${agent.id}`,
          description: `Switch to ${agent.name} (${agent.title})`
        }));

      // Workflow suggestions
      const workflowSuggestions = [
        { command: '*workflow annual-planning', description: 'Comprehensive strategic planning' },
        { command: '*workflow membership-campaign', description: 'Plan membership drives' },
        { command: '*workflow underwriting-campaign', description: 'Corporate partnership campaigns' },
        { command: '*workflow program-launch', description: 'New program development' }
      ].filter(({ command }) => command.toLowerCase().includes(searchTerm));

      const allSuggestions = [
        ...commandSuggestions,
        ...agentSuggestions,
        ...workflowSuggestions
      ].slice(0, 6); // Limit to 6 suggestions

      setSuggestions(allSuggestions);
      setIsVisible(allSuggestions.length > 0);
    } else {
      setIsVisible(false);
    }
  }, [value, agents]);

  if (!isVisible) return null;

  return (
    <div className={`absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg ${className}`}>
      <div className="py-2">
        {suggestions.map(({ command, description }, index) => (
          <button
            key={command}
            onClick={() => onSelect(command)}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
          >
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-indigo-600">{command}</code>
              <span className="text-xs text-gray-500 ml-2 truncate">{description}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-100">
        <span>💡 Commands start with * • Press Tab or click to select</span>
      </div>
    </div>
  );
}