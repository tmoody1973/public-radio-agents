'use client';

import { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
}

export function AgentCard({ agent, isActive = false, onClick, className = '' }: AgentCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
        ${isActive 
          ? 'border-indigo-500 bg-indigo-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
        }
        ${className}
      `}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <span className="text-2xl">{agent.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium truncate ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>
            {agent.name}
          </h3>
          <p className={`text-sm truncate ${isActive ? 'text-indigo-700' : 'text-gray-600'}`}>
            {agent.title}
          </p>
          <p className={`text-xs mt-1 line-clamp-2 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
            {agent.description}
          </p>
        </div>
      </div>
      
      {agent.expertise && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {agent.expertise.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className={`
                  inline-block px-2 py-1 text-xs rounded-full
                  ${isActive 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}
              >
                {skill}
              </span>
            ))}
            {agent.expertise.length > 3 && (
              <span className={`text-xs ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                +{agent.expertise.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </button>
  );
}

interface AgentSwitcherProps {
  agents: Agent[];
  activeAgent?: string;
  onAgentSelect: (agentId: string) => void;
  className?: string;
}

export function AgentSwitcher({ agents, activeAgent, onAgentSelect, className = '' }: AgentSwitcherProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">Management Team</h3>
      <div className="space-y-2">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isActive={activeAgent === agent.id}
            onClick={() => onAgentSelect(agent.id)}
          />
        ))}
      </div>
    </div>
  );
}