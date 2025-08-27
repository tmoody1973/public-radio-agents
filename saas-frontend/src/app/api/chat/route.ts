import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getFrameworkParser } from '@/lib/framework-parser';

// Types
interface ChatRequest {
  content: string;
  station?: {
    name: string;
    location: string;
    format: string;
  };
  messages?: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  agentId?: string;
  provider?: 'openai' | 'anthropic';
}

interface CommandResult {
  isCommand: boolean;
  command?: string;
  args?: string[];
  systemMessage?: string;
}

// Command parser
function parseCommand(input: string | undefined): CommandResult {
  if (!input) {
    return { isCommand: false };
  }
  const trimmed = input.trim();
  
  if (!trimmed.startsWith('*')) {
    return { isCommand: false };
  }

  const commandText = trimmed.slice(1); // Remove *
  const parts = commandText.split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  // Handle different commands
  switch (command) {
    case 'help':
      return {
        isCommand: true,
        command,
        systemMessage: `
🎭 **Welcome to Public Radio Agents - Your Management Team!**

**📋 GETTING STARTED (New Users)**
• \`*chat-mode\` - Start with general consultation and questions
• \`*kb-mode\` - Access public radio knowledge base and best practices
• \`*party-mode\` - Get advice from all agents working together

**👥 EXPERT AGENTS (Choose Your Specialist)**

💝 **Development/Fundraising Expert - Sarah Chen**
• \`*agent development-director\` - Membership campaigns, donor relations, grants, major gifts

📢 **Marketing & Audience Expert - Marcus Rodriguez**  
• \`*agent marketing-director\` - Social media, branding, community engagement, digital strategy

🤝 **Corporate Partnership Expert - Diana Kim**
• \`*agent underwriting-director\` - Sponsorships, business partnerships, corporate relations

🎙️ **Programming Expert - Jordan Taylor**
• \`*agent program-director\` - Show development, scheduling, FCC compliance, talent management

**🔄 STRUCTURED WORKFLOWS (Step-by-Step Processes)**
• \`*workflow annual-planning\` - Complete yearly strategic planning
• \`*workflow membership-campaign\` - End-to-end fundraising campaigns
• \`*workflow program-launch\` - New show development process

**🔧 SYSTEM UTILITIES**
• \`*help\` - Show this help menu
• \`*status\` - Check current progress and context
• \`*exit\` - Return to main orchestrator

**💡 QUICK EXAMPLES:**
• "Membership is declining" → Try \`*agent development-director\`
• "Need social media help" → Try \`*agent marketing-director\`  
• "Want more sponsors" → Try \`*agent underwriting-director\`
• "Planning new programming" → Try \`*agent program-director\`
• "Need strategic planning" → Try \`*workflow annual-planning\`
• "General questions" → Try \`*chat-mode\` or \`*kb-mode\`

**🎯 PRO TIP:** All commands start with \`*\` (asterisk). Be specific about your station's situation for best results!

What challenge can we help you tackle today?
        `
      };

    case 'agent':
      if (args.length === 0) {
        return {
          isCommand: true,
          command,
          systemMessage: `
**👥 Available Agents:**

1. **development-director** 💝 - Sarah (Fundraising & Development)
2. **marketing-director** 📢 - Marcus (Marketing & Community)
3. **underwriting-director** 🤝 - Diana (Corporate Partnerships)
4. **program-director** 🎙️ - Jordan (Programming & Content)

Use: \`*agent [name]\` to switch to that agent.
        `
        };
      }
      // Provide detailed agent activation responses
      const agentName = args[0];
      let agentResponse = '';
      
      switch (agentName) {
        case 'development-director':
          agentResponse = `🎭 **Activating Development Director**

💝 **Sarah Chen - Development Director**

Hello! I'm Sarah, your dedicated Development Director. I specialize in:

• **Individual Giving Programs** - Building sustainable donor relationships
• **Major Gifts Strategy** - Securing transformational donations  
• **Membership Campaigns** - Growing your listener support base
• **Grant Writing** - Foundation and government funding
• **Special Events** - Engaging fundraising experiences

What development challenge can I help you tackle today?`;
          break;
          
        case 'marketing-director':
          agentResponse = `🎭 **Activating Marketing Director**

📢 **Marcus Rodriguez - Marketing Director**

¡Hola! I'm Marcus, your Marketing Director. I excel at:

• **Community Engagement** - Building deep listener connections
• **Brand Strategy** - Strengthening your station's identity
• **Digital Marketing** - Social media and online presence
• **Event Promotion** - Driving attendance and awareness
• **Audience Development** - Growing and diversifying listenership

How can we amplify your station's reach today?`;
          break;
          
        case 'underwriting-director':
          agentResponse = `🎭 **Activating Underwriting Director**

🤝 **Diana Kim - Underwriting Director**

Hello! I'm Diana, your Underwriting Director. My expertise includes:

• **Corporate Partnerships** - Building mutually beneficial relationships
• **Sponsorship Packages** - Creating compelling value propositions
• **Business Development** - Identifying new revenue opportunities
• **Contract Negotiation** - Securing favorable terms
• **Client Relations** - Maintaining long-term partnerships

What underwriting opportunity shall we explore?`;
          break;
          
        case 'program-director':
          agentResponse = `🎭 **Activating Program Director**

🎙️ **Jordan Taylor - Program Director**

Hey there! I'm Jordan, your Program Director. I focus on:

• **Content Strategy** - Developing engaging programming
• **Show Development** - Creating new program concepts
• **Talent Management** - Supporting on-air personalities
• **Scheduling** - Optimizing program flow and timing
• **Production Quality** - Ensuring broadcast excellence

What programming vision can we bring to life?`;
          break;
          
        default:
          agentResponse = `🎭 **Agent Activation**

Switching to ${agentName} agent...

Available agents: development-director, marketing-director, underwriting-director, program-director`;
      }
      
      return {
        isCommand: true,
        command,
        args,
        systemMessage: agentResponse
      };

    case 'workflow':
      if (args.length === 0) {
        return {
          isCommand: true,
          command,
          systemMessage: `
**🔄 Available Workflows:**

1. **annual-planning** - Comprehensive strategic planning
2. **membership-campaign** - Plan membership drives  
3. **underwriting-campaign** - Corporate partnership campaigns
4. **program-launch** - New program development
5. **special-event** - Special event planning
6. **crisis-response** - Crisis management planning

Use: \`*workflow [name]\` to start a workflow.
        `
        };
      }
      return {
        isCommand: true,
        command,
        args,
        systemMessage: `🔄 Starting ${args[0]} workflow...`
      };

    case 'status':
      return {
        isCommand: true,
        command,
        systemMessage: `
**📊 Current Status:**
• **Active Agent**: Public Radio Orchestrator 🎭
• **Mode**: Command interface
• **Available**: 4 specialist agents, 6 workflows

Use \`*help\` to see all available commands.
        `
      };

    case 'chat-mode':
      return {
        isCommand: true,
        command,
        systemMessage: `
💬 **Chat Mode Activated**

You're now in general consultation mode. You can:
• Ask questions about public radio management
• Get advice on station operations
• Discuss industry best practices
• Request general guidance

I'm here to help with any questions you have about running your public radio station!
        `
      };

    case 'exit':
      return {
        isCommand: true,
        command,
        systemMessage: `
🎭 **Returned to Orchestrator**

You're now back with the Public Radio Orchestrator. 

Use \`*help\` to see all available commands and agents.
        `
      };

    case 'party-mode':
      return {
        isCommand: true,
        command,
        systemMessage: `
🎉 **Party Mode Activated - All Agents Collaboration**

All four Public Radio Agents are now participating in this conversation:

💝 **Sarah Chen** (Development Director) - Ready for fundraising strategy
📢 **Marcus Rodriguez** (Marketing Director) - Ready for audience development  
🤝 **Diana Kim** (Underwriting Director) - Ready for corporate partnerships
🎙️ **Jordan Taylor** (Program Director) - Ready for programming strategy

**Perfect for:**
• Strategic planning sessions requiring multiple perspectives
• Complex problem-solving that spans departments
• Cross-departmental challenges and initiatives
• Innovation and brainstorming sessions

**How to use:** Ask questions that benefit from multiple expert viewpoints. All agents will contribute their specialized expertise to provide comprehensive solutions.

What multi-departmental challenge can we tackle together?
        `
      };

    case 'kb-mode':
      return {
        isCommand: true,
        command,
        systemMessage: `
📚 **Knowledge Base Mode Activated**

You now have access to comprehensive public radio industry knowledge:

**📊 Industry Knowledge**
• Public radio best practices and trends
• Audience research and demographic insights
• Industry benchmarks and performance metrics
• Successful case studies from stations nationwide

**📜 Regulatory & Compliance**
• FCC regulations and compliance requirements
• Underwriting guidelines and restrictions
• Public media law and policy updates
• Ethics and conflict of interest guidance

**💰 Fundraising & Development**
• Donor behavior research and trends
• Campaign strategies and methodologies
• Grant opportunities and foundation research
• Major gift and planned giving best practices

**📱 Marketing & Engagement**
• Digital marketing trends and strategies
• Social media best practices for public media
• Brand development and messaging guidance
• Community engagement methodologies

**🎙️ Programming & Content**
• Program development and scheduling strategies
• Audience feedback and content optimization
• Local programming and community content
• Talent development and training resources

**Ask me anything about public radio operations, and I'll provide evidence-based answers using industry research and best practices.**

What public radio knowledge can I help you access?
        `
      };

    default:
      return {
        isCommand: true,
        command,
        systemMessage: `❓ Unknown command: \`*${command}\`\n\nUse \`*help\` to see available commands.`
      };
  }
}

// Focused routing for simple requests
function analyzeForRouting(input: string): string | null {
  if (!input || input.trim().length === 0) {
    return null;
  }

  const message = input.toLowerCase().trim();
  
  // Only handle very simple "help me make/do X" requests
  if ((message.includes('help me') && (message.includes('make') || message.includes('create') || message.includes('do'))) ||
      (message.includes('i need') && (message.includes('help') || message.includes('to'))) ||
      (message.includes('how do i') || message.includes('how can i'))) {
    
    // Programming requests
    if (message.includes('podcast') || message.includes('program') || message.includes('show')) {
      return `🎭 **Public Radio Orchestrator**

I can see you're looking for help with **programming and content creation**. This is exactly what our Program Director specializes in!

🎙️ **Next step:** Type \`*agent program-director\` to connect with Jordan Taylor, who can guide you through the entire process from concept to broadcast.

Or try \`*workflow program-launch\` for a structured development process.`;
    }
    
    // Fundraising requests
    if (message.includes('fundrais') || message.includes('donor') || message.includes('member') || message.includes('money')) {
      return `🎭 **Public Radio Orchestrator**

You're asking about **fundraising and development**. This is perfect for our Development Director!

💝 **Next step:** Type \`*agent development-director\` to work with Sarah Chen on your fundraising challenge.

Or try \`*workflow membership-campaign\` for comprehensive campaign planning.`;
    }
    
    // Marketing requests  
    if (message.includes('marketing') || message.includes('social') || message.includes('audience') || message.includes('brand')) {
      return `🎭 **Public Radio Orchestrator**

This is a **marketing and audience development** question - perfect for our Marketing Director!

📢 **Next step:** Type \`*agent marketing-director\` to get expert guidance from Marcus Rodriguez.`;
    }
  }

  // Only handle very general help requests
  if (message.length < 20 && (message.includes('help') || message.includes('start') || message.includes('what'))) {
    return `🎭 **Welcome! I'm your Public Radio Orchestrator**

I'm here to connect you with the right expertise for your public radio needs.

**🚀 New to the system?** Type \`*help\` to see all available commands and agents.

**💬 What's your specific challenge or question?** Just describe what you're working on, and I'll guide you to the right expert.`;
  }

  // Let everything else go to the LLM with the framework
  return null;
}

// Analyze query complexity to determine appropriate framework loading
function analyzeQueryComplexity(content: string): boolean {
  const query = content.toLowerCase();
  const complexityIndicators = [
    // Length indicators
    query.length > 200,
    
    // Multiple question indicators
    (query.match(/\?/g) || []).length > 1,
    
    // Planning/strategy keywords
    query.includes('strategy') || query.includes('planning') || query.includes('approach'),
    query.includes('comprehensive') || query.includes('detailed') || query.includes('step-by-step'),
    
    // Multi-faceted requests
    query.includes('develop') && query.includes('implement'),
    query.includes('budget') || query.includes('timeline') || query.includes('resources'),
    
    // Complex problem indicators
    query.includes('declining') || query.includes('struggling') || query.includes('challenging'),
    query.includes('improve') && (query.includes('significantly') || query.includes('dramatically')),
    
    // Multiple domain keywords
    (query.match(/(fundraising|development|marketing|programming|underwriting|audience|community|digital)/g) || []).length > 2
  ];
  
  // Consider complex if 2 or more indicators are true
  const complexityScore = complexityIndicators.filter(Boolean).length;
  return complexityScore >= 2;
}

// Smart framework loader that adapts content to context
function loadContextualFramework(options: {
  agentId?: string;
  includeWorkflows?: boolean;
  includeDependencies?: boolean;
  isComplexQuery?: boolean;
} = {}): string {
  const parser = getFrameworkParser();
  
  if (!parser.isAvailable()) {
    // Fallback if parser fails to load
    try {
      const frameworkPath = join(process.cwd(), '..', 'publicradio.txt');
      return readFileSync(frameworkPath, 'utf-8');
    } catch (error) {
      console.error('Error loading framework:', error);
      return `
# Public Radio Orchestrator (Demo Mode)

You are the Public Radio Orchestrator, a master agent that coordinates between specialized public radio management experts.

## Available Agents:
- **Development Director** 💝: Fundraising, membership, major gifts
- **Marketing Director** 📢: Community engagement, social media, branding  
- **Underwriting Director** 🤝: Corporate partnerships, sponsorships
- **Program Director** 🎙️: Programming, content, compliance

## Commands:
- *agent [name] - Switch to specialist agent
- *workflow [name] - Start structured workflow  
- *help - Show available options
- *status - Current system status

How can I help your station today?
      `;
    }
  }

  // Determine context-appropriate framework loading
  const { agentId, includeWorkflows = false, includeDependencies = false, isComplexQuery = false } = options;
  
  // For complex queries, include more dependencies
  if (isComplexQuery && agentId) {
    return parser.getContextualFramework({
      agentId,
      includeWorkflows: true,
      includeDependencies: true,
      maxTokens: 25000 // Leave room for conversation
    });
  }

  // For agent activation, include their full capabilities  
  if (agentId) {
    return parser.getContextualFramework({
      agentId,
      includeDependencies: true,
      maxTokens: 20000
    });
  }

  // For general queries, use base framework with enhanced content for complex queries
  if (isComplexQuery) {
    // For complex general queries, include some agent content and workflows
    return parser.getContextualFramework({
      includeWorkflows: true,
      includeDependencies: true,
      maxTokens: 25000
    });
  }
  
  return parser.getContextualFramework({
    includeWorkflows,
    maxTokens: 15000
  });
}

export async function POST(request: NextRequest) {
  try {
    const { content, station, messages, agentId, provider = 'openai' }: ChatRequest = await request.json();
    
    // Check if this is a command
    const commandResult = parseCommand(content);
    if (commandResult.isCommand) {
      // For agent commands, we might want to include a follow-up with enhanced context
      if (commandResult.command === 'agent' && commandResult.args && commandResult.args[0]) {
        const agentId = commandResult.args[0];
        // Return command response but system is now ready for enhanced agent context
        return NextResponse.json({
          type: 'command',
          command: commandResult.command,
          args: commandResult.args,
          message: commandResult.systemMessage,
          agentId: agentId // Pass along for next request
        });
      }
      
      return NextResponse.json({
        type: 'command',
        command: commandResult.command,
        args: commandResult.args,
        message: commandResult.systemMessage
      });
    }

    // Check if this is an activation or simple routing question
    const routingResponse = analyzeForRouting(content);
    if (routingResponse) {
      return NextResponse.json({
        type: 'orchestrator',
        content: routingResponse
      });
    }

    // Prepare contextual system message with smart framework loading
    const isComplexQuery = analyzeQueryComplexity(content);
    console.log(`Query complexity analysis: "${content.substring(0, 100)}..." -> Complex: ${isComplexQuery}`);
    
    const framework = loadContextualFramework({
      agentId,
      includeWorkflows: isComplexQuery,
      includeDependencies: isComplexQuery,
      isComplexQuery
    });
    
    console.log(`Framework loaded: ${framework.length} characters for agentId: ${agentId}, complex: ${isComplexQuery}`);
    const stationContext = station ? 
      `Station Context: ${station.name} in ${station.location} (${station.format} format)` : 
      'Station Context: Not provided';

    const systemMessage = `${framework}

${stationContext}

You are currently acting as the Public Radio Orchestrator. Provide helpful guidance for public radio station management.`;

    const conversationHistory = [
      { role: 'system', content: systemMessage },
      ...(messages || []),
      { role: 'user', content }
    ];

    let response;

    if (provider === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const completion = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: conversationHistory.slice(1) as any, // Remove system message for Anthropic
        system: systemMessage,
      });

      response = (completion.content[0] as any).text;
    } else {
      // Default to OpenAI
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: conversationHistory as any,
        max_tokens: 1000,
      });

      response = completion.choices[0].message.content;
    }

    return NextResponse.json({
      type: 'message',
      content: response,
      agentId: agentId || 'orchestrator',
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}