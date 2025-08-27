'use client';

import { Agent } from '@/types';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export default function AgentCard({ 
  agent, 
  isActive, 
  isSelected, 
  onClick, 
  className = '' 
}: AgentCardProps) {
  const getAgentColor = (agentId: Agent['id']) => {
    const colors = {
      'development-director': 'from-green-500 to-emerald-600',
      'marketing-director': 'from-blue-500 to-cyan-600', 
      'underwriting-director': 'from-purple-500 to-indigo-600',
      'program-director': 'from-orange-500 to-red-600',
    };
    return colors[agentId] || 'from-gray-500 to-gray-600';
  };

  const getAgentIcon = (agentId: Agent['id']) => {
    const icons = {
      'development-director': '💝',
      'marketing-director': '📢',
      'underwriting-director': '🤝', 
      'program-director': '🎙️',
    };
    return icons[agentId] || '🤖';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-xl border-2 transition-all duration-200
        ${isSelected 
          ? 'border-pr-primary-500 shadow-lg shadow-pr-primary-500/25' 
          : 'border-gray-200 hover:border-gray-300'
        }
        ${isActive ? 'ring-2 ring-pr-primary-500 ring-offset-2' : ''}
        ${className}
      `}
    >
      {/* Background gradient */}
      <div className={`
        absolute inset-0 rounded-xl bg-gradient-to-br opacity-10
        ${getAgentColor(agent.id)}
      `} />
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 z-10"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pr-primary-500 text-white shadow-lg">
            <CheckIcon className="h-4 w-4" />
          </div>
        </motion.div>
      )}

      <div className="relative p-6">
        {/* Agent icon and name */}
        <div className="mb-4 flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
            <span className="text-2xl">{getAgentIcon(agent.id)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.persona}</p>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-700 line-clamp-2">
          {agent.description}
        </p>

        {/* Expertise areas */}
        <div className="mb-4 flex flex-wrap gap-1">
          {agent.expertise.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
            >
              {skill}
            </span>
          ))}
          {agent.expertise.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
              +{agent.expertise.length - 3} more
            </span>
          )}
        </div>

        {/* Command count */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {agent.commands.length} commands available
          </span>
          
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-1 text-pr-primary-600"
            >
              <CheckIcon className="h-4 w-4" />
              <span className="text-xs font-medium">Selected</span>
            </motion.div>
          )}
        </div>

        {/* Hover state overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-black/5"
        />
      </div>
    </motion.div>
  );
}

// Agent selector grid component
interface AgentSelectorProps {
  agents: Agent[];
  activeAgent?: Agent['id'];
  selectedAgent?: Agent['id'];
  onSelectAgent: (agentId: Agent['id']) => void;
  className?: string;
}

export function AgentSelector({
  agents,
  activeAgent,
  selectedAgent,
  onSelectAgent,
  className = ''
}: AgentSelectorProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          isActive={activeAgent === agent.id}
          isSelected={selectedAgent === agent.id}
          onClick={() => onSelectAgent(agent.id)}
        />
      ))}
    </div>
  );
}

// Compact agent switcher for chat interface
interface AgentSwitcherProps {
  agents: Agent[];
  activeAgent?: Agent['id'];
  onSwitchAgent: (agentId: Agent['id']) => void;
  className?: string;
}

export function AgentSwitcher({
  agents,
  activeAgent,
  onSwitchAgent,
  className = ''
}: AgentSwitcherProps) {
  const activeAgentData = agents.find(a => a.id === activeAgent);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700">Active Agent:</span>
      
      <div className="flex items-center space-x-1">
        {agents.map((agent) => (
          <motion.button
            key={agent.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSwitchAgent(agent.id)}
            className={`
              flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-all
              ${activeAgent === agent.id
                ? 'bg-pr-primary-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            title={`Switch to ${agent.name}`}
          >
            <span className="text-base">{getAgentIcon(agent.id)}</span>
            <span className="font-medium">{agent.name.split(' ')[0]}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Helper function to get agent icon (duplicate from above for module exports)
function getAgentIcon(agentId: Agent['id']) {
  const icons = {
    'development-director': '💝',
    'marketing-director': '📢',
    'underwriting-director': '🤝', 
    'program-director': '🎙️',
  };
  return icons[agentId] || '🤖';
}