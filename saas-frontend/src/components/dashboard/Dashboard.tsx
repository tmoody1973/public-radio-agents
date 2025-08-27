'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClientSupabase } from '@/lib/supabase';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Agent, Station, ChatMessage } from '@/types';
import {
  PlusIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const agents: Agent[] = [
  {
    id: 'development-director',
    name: 'Sarah Chen',
    title: 'Development Director',
    icon: '💝',
    description: 'Fundraising, membership campaigns, major gifts, and donor stewardship',
    expertise: ['Individual Giving', 'Major Gifts', 'Membership Programs', 'Grant Writing', 'Special Events']
  },
  {
    id: 'marketing-director', 
    name: 'Marcus Rodriguez',
    title: 'Marketing Director',
    icon: '📢',
    description: 'Marketing strategy, community engagement, and brand development',
    expertise: ['Social Media', 'Community Engagement', 'Brand Strategy', 'Digital Marketing', 'Public Relations']
  },
  {
    id: 'underwriting-director',
    name: 'Diana Kim',
    title: 'Underwriting Director', 
    icon: '🤝',
    description: 'Corporate partnerships, sponsorships, and business development',
    expertise: ['Corporate Partnerships', 'Sponsorship Sales', 'Business Development', 'Account Management', 'FCC Compliance']
  },
  {
    id: 'program-director',
    name: 'Jordan Taylor',
    title: 'Program Director',
    icon: '🎙️', 
    description: 'Programming strategy, content development, and broadcast operations',
    expertise: ['Program Strategy', 'Content Development', 'Talent Management', 'Audience Research', 'Broadcast Operations']
  }
];

interface DashboardProps {
  station: Station;
}

export default function Dashboard({ station }: DashboardProps) {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const supabase = createClientSupabase();

  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]);

  useEffect(() => {
    if (activeSession) {
      loadMessages(activeSession);
    } else {
      // Load welcome messages
      setMessages([
        {
          id: '1',
          role: 'system',
          content: `🎭 **Welcome to Public Radio Agents, ${station.name}!**

I'm your Public Radio Orchestrator, ready to help manage your ${station.format} station serving ${station.coverage}.

**Station Details:**
• **Call Sign**: ${station.callSign}
• **Frequency**: ${station.frequency}
• **Location**: ${station.location}
• **Licensee**: ${station.licensee}

**Available Commands:**
• \`*help\` - See all available commands and agents
• \`*agent [name]\` - Switch to a specialist agent
• \`*workflow [name]\` - Start a structured workflow

**Quick Start:**
• Type \`*help\` to explore all capabilities
• Ask general questions about public radio management
• Use commands (starting with *) for specialized assistance

How can I help your station today? 🎵`,
          timestamp: new Date(),
          agentId: 'orchestrator'
        }
      ]);
    }
  }, [activeSession, station]);

  const loadSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('station_id', station.id)
        .eq('user_id', user!.id)
        .order('updated_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error loading sessions:', error);
      } else {
        setSessions(data || []);
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
      } else {
        const formattedMessages: ChatMessage[] = data?.map(msg => ({
          id: msg.id,
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content,
          timestamp: new Date(msg.created_at),
          agentId: msg.agent_id || 'orchestrator'
        })) || [];
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const createNewSession = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          station_id: station.id,
          user_id: user!.id,
          title: `Session ${new Date().toLocaleString()}`
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating session:', error);
      } else {
        setSessions(prev => [data, ...prev]);
        setActiveSession(data.id);
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const handleSendMessage = async (content: string, agentId?: string) => {
    let currentSessionId = activeSession;

    // Create new session if none exists
    if (!currentSessionId) {
      try {
        const { data, error } = await supabase
          .from('chat_sessions')
          .insert({
            station_id: station.id,
            user_id: user!.id,
            title: content.length > 50 ? content.substring(0, 50) + '...' : content
          })
          .select()
          .single();

        if (error) throw error;
        
        currentSessionId = data.id;
        setActiveSession(currentSessionId);
        setSessions(prev => [data, ...prev]);
      } catch (error) {
        console.error('Error creating session:', error);
        return;
      }
    }

    // Add user message to UI immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      agentId
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Save user message to database
      await supabase
        .from('chat_messages')
        .insert({
          session_id: currentSessionId,
          role: 'user',
          content,
          agent_id: agentId
        });

      // Get AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          station,
          messages: messages,
          agentId,
          provider: 'openai'
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.message || result.content,
        timestamp: new Date(),
        agentId: result.agentId || agentId || 'orchestrator'
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save assistant message to database
      await supabase
        .from('chat_messages')
        .insert({
          session_id: currentSessionId,
          role: 'assistant',
          content: assistantMessage.content,
          agent_id: assistantMessage.agentId
        });

      // Update session timestamp
      await supabase
        .from('chat_sessions')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentSessionId);

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: `❌ **Error**: Failed to get response. ${error instanceof Error ? error.message : 'Please try again.'}`,
        timestamp: new Date(),
        agentId: 'system'
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const formatSessionTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📻</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{station.name}</h1>
                <p className="text-sm text-gray-600">{station.callSign} • {station.frequency}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <ChartBarIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Cog6ToothIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Chat Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Recent Chats</h3>
                  <button
                    onClick={createNewSession}
                    className="p-1 text-indigo-600 hover:text-indigo-800"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setActiveSession(null)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    !activeSession 
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    <span className="text-sm">New Chat</span>
                  </div>
                </button>
                
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setActiveSession(session.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeSession === session.id 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.title}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {formatSessionTime(session.updated_at)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Management Team */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Management Team</h2>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => handleSendMessage(`*agent ${agent.id}`, agent.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{agent.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{agent.name}</p>
                        <p className="text-sm text-gray-600 truncate">{agent.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'Show Help', command: '*help' },
                  { label: 'Check Status', command: '*status' },
                  { label: 'Start Workflow', command: '*workflow' }
                ].map((action) => (
                  <button
                    key={action.command}
                    onClick={() => handleSendMessage(action.command)}
                    className="w-full text-left px-3 py-2 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <ChatInterface
              station={station}
              agents={agents}
              initialMessages={messages}
              onSendMessage={handleSendMessage}
              className="h-[calc(100vh-200px)]"
            />
          </div>
        </div>
      </main>
    </div>
  );
}