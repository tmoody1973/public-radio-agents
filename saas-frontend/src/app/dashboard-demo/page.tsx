'use client';

import { useState } from 'react';

export default function DashboardDemo() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'system' as const,
      content: `🎭 **Welcome to Public Radio Agents!**

I'm your Public Radio Orchestrator, ready to help with your station management needs.

**Available Commands:**
• \`*help\` - See all available commands and agents
• \`*agent development-director\` - Switch to fundraising expert
• \`*workflow membership-campaign\` - Start a membership workflow

**Try typing a command below!** 🎵`,
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const agents = [
    { id: 'development-director', name: 'Sarah Chen', title: 'Development Director', icon: '💝' },
    { id: 'marketing-director', name: 'Marcus Rodriguez', title: 'Marketing Director', icon: '📢' },
    { id: 'underwriting-director', name: 'Diana Kim', title: 'Underwriting Director', icon: '🤝' },
    { id: 'program-director', name: 'Jordan Taylor', title: 'Program Director', icon: '🎙️' }
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the real API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: input,
          station: {
            name: 'Demo Public Radio',
            callSign: 'WDEMO',
            frequency: '89.1 FM',
            location: 'Demo City',
            format: 'News/Talk',
            coverage: 'Metro Area'
          },
          provider: 'openai'
        }),
      });

      const result = await response.json();
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: result.content || result.message || 'Sorry, I encountered an error.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: 'Sorry, I encountered an error connecting to the AI service.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getResponse = (input: string) => {
    if (input.startsWith('*help')) {
      return `🎭 **Available Commands:**

**👥 Agent Commands**
• \`*agent development-director\` - Fundraising expert (Sarah)
• \`*agent marketing-director\` - Marketing expert (Marcus)
• \`*agent underwriting-director\` - Corporate partnerships (Diana)
• \`*agent program-director\` - Programming expert (Jordan)

**🔄 Workflow Commands**  
• \`*workflow annual-planning\` - Comprehensive planning
• \`*workflow membership-campaign\` - Membership drives
• \`*workflow program-launch\` - New programming

**💬 Utility Commands**
• \`*status\` - Check current progress
• \`*chat-mode\` - General consultation

Type any command to get started!`;
    }
    
    if (input.includes('*agent development-director')) {
      return `🎭 **Transforming to Development Director...**

💝 **Sarah Chen - Development Director**

Hello! I'm Sarah, your Development Director. I specialize in:

• **Individual Giving Programs** - Building sustainable donor relationships
• **Major Gifts Strategy** - Securing transformational donations
• **Membership Campaigns** - Growing your listener support base  
• **Grant Writing** - Foundation and government funding
• **Special Events** - Engaging fundraising experiences

What development challenge can I help you tackle today?`;
    }

    if (input.includes('*workflow')) {
      return `🔄 **Starting Membership Campaign Workflow...**

**Phase 1: Strategic Planning**
1. Audience analysis and segmentation
2. Goal setting and timeline development
3. Message development and creative strategy
4. Channel selection and integration planning

**Phase 2: Campaign Development**
1. Creative asset development
2. Email sequences and direct mail pieces
3. On-air messaging coordination
4. Digital campaign setup

**Phase 3: Implementation**
1. Campaign launch coordination
2. Performance monitoring and optimization
3. Volunteer coordination and training
4. Real-time adjustments and improvements

Would you like to dive into any specific phase?`;
    }

    return `Thank you for your message: "${input}"

This is a **demo version** showing the interface. In the full version with API integration, I would:

• Process your request using the Public Radio framework
• Provide detailed guidance based on your station's needs
• Access specialized knowledge bases and templates
• Coordinate with appropriate specialist agents

**Try these commands:**
• \`*help\` - See all capabilities
• \`*agent development-director\` - Switch to fundraising expert  
• \`*workflow membership-campaign\` - Start a workflow

The full system integrates with OpenAI/Claude for complete AI responses!`;
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
                <h1 className="text-xl font-bold text-gray-900">Demo Public Radio</h1>
                <p className="text-sm text-gray-600">WDEMO • 89.1 FM</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Status:</span> Demo Mode
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Management Team */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Management Team</h2>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => setInput(`*agent ${agent.id}`)}
                    className="w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{agent.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{agent.name}</p>
                        <p className="text-sm text-gray-600 truncate">{agent.title}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'Show Help', command: '*help' },
                  { label: 'Start Workflow', command: '*workflow membership-campaign' },
                  { label: 'Chat with Sarah', command: '*agent development-director' }
                ].map((action) => (
                  <button
                    key={action.command}
                    onClick={() => setInput(action.command)}
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">
                        {message.role === 'user' ? '👤' : '🎭'}
                      </span>
                    </div>
                    <div className={`flex-1 rounded-lg p-4 ${
                      message.role === 'user' 
                        ? 'bg-indigo-50' 
                        : 'bg-gray-50'
                    }`}>
                      <div className="prose prose-sm max-w-none">
                        {message.content.split('\n').map((line, index) => (
                          <p key={index} className="mb-2 last:mb-0">
                            {line.replace(/\*\*(.*?)\*\*/g, '$1')
                                 .replace(/`(.*?)`/g, '$1')
                                 .replace(/• /g, '• ')}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🎭</span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message or command (*help, *agent, *workflow)..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}