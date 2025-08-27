# IDE Integration Guide: Cursor, Windsurf & VS Code

Use the Public Radio Agents framework directly within your development environment for enhanced productivity and seamless integration with station management projects.

## Overview

IDEs with AI chat capabilities can load the Public Radio Agents framework, giving you specialized public radio expertise while working on:
- Station websites and digital platforms
- Database and membership management systems
- Content management and scheduling tools
- Analytics and reporting dashboards
- Grant applications and strategic documents

## 🎯 Cursor IDE Integration

### Setup Process

1. **Open Cursor IDE**
   - Download from [cursor.sh](https://cursor.sh)
   - Open your public radio project or create new workspace

2. **Load the Framework**
   - Open Cursor's AI chat panel (Cmd/Ctrl + L)
   - Copy the entire `publicradio.txt` content
   - Paste into the chat and send
   - Wait for "Public Radio Orchestrator activated" confirmation

3. **Start Using Agents**
   ```
   *agent development-director
   I'm building a donor management system. What database fields should I include for effective donor tracking?
   ```

### Cursor-Specific Advantages

**📝 Code + Strategy**: Get technical implementation guidance with public radio expertise
```
*agent marketing-director  
I'm building a social media posting system. What content types and scheduling should I prioritize for public radio?
```

**🗄️ Database Design**: Expert guidance for public radio-specific data structures
```
*agent development-director
Design a member database schema that supports segmentation for targeted fundraising campaigns.
```

**📊 Analytics Integration**: Build reporting that matters to public radio
```  
*agent program-director
What metrics should I track in our programming analytics dashboard?
```

**🔗 API Integrations**: Connect with public radio services
```
*agent underwriting-director  
I'm integrating with our CRM system. What sponsor data points are most important to track for renewals?
```

### Example Cursor Workflow

```
Project: Station Website Redesign

*agent marketing-director  
I'm redesigning our station website. What pages and user flows are most important for public radio audience engagement?

[AI provides detailed UX guidance]

*agent development-director
Now help me design a membership conversion flow for the website.

[Switch agents without leaving development environment]

*agent program-director
What program guide features should I prioritize in the redesign?

[Continue seamlessly with relevant expertise]
```

## 🌊 Windsurf IDE Integration

### Setup Process

1. **Open Windsurf**
   - Launch Windsurf IDE
   - Open your project or create new workspace

2. **Access AI Assistant**
   - Open Windsurf's AI chat interface
   - Load the complete `publicradio.txt` framework
   - Confirm activation message appears

3. **Integrate with Development**
   ```
   *agent underwriting-director
   I'm building a sponsor management system. What are the key compliance requirements I need to code for?
   ```

### Windsurf-Specific Benefits

**🔄 Multi-Agent Development**: Switch between agents as your project needs evolve

**📋 Requirements Gathering**: Get detailed specifications from public radio experts
```
*workflow annual-planning
Help me gather requirements for our new strategic planning software system.
```

**🧪 Testing Scenarios**: Generate realistic test data and scenarios
```
*agent development-director
Generate realistic donor data scenarios for testing our membership database.
```

**📚 Documentation**: Get help with technical documentation that includes public radio context
```
*agent program-director  
Help me write API documentation for our programming schedule system.
```

## 💻 VS Code Integration Options

### Method 1: Using GitHub Copilot Chat

1. **Install GitHub Copilot Chat Extension**
2. **Load Framework in Chat**
   - Open Copilot Chat panel
   - Paste `publicradio.txt` content
   - Begin using agent commands

### Method 2: Using Continue Extension

1. **Install Continue Extension**
2. **Configure with your preferred LLM**
3. **Load the framework through Continue's chat interface**

### Method 3: Using Codeium Chat

1. **Install Codeium Extension**  
2. **Access Codeium Chat**
3. **Load framework and begin agent interactions**

## 🛠️ Development Use Cases

### Database & Backend Development

**Member Management Systems**
```
*agent development-director
I'm designing a donor CRM. What data relationships and fields are essential for effective public radio fundraising?
```

**Program Scheduling Systems**
```
*agent program-director
Help me design a database schema for program scheduling that handles FCC compliance logging.
```

**Analytics Platforms**
```
*agent marketing-director
What KPIs should my analytics dashboard track for public radio social media performance?
```

### Frontend & User Experience

**Membership Portals**
```
*agent development-director
I'm building a member portal. What self-service features do public radio donors value most?
```

**Program Discovery Interfaces**
```
*agent program-director
Design the user experience for a program guide that helps listeners discover new content.
```

**Sponsor Showcase Pages**
```
*agent underwriting-director  
How should I structure sponsor recognition pages to maximize value while maintaining FCC compliance?
```

### Content Management Systems

**Editorial Workflows**
```
*agent program-director
I'm building a content management system for our news team. What editorial workflow features are essential?
```

**Community Content Integration**
```
*agent marketing-director
How should I structure a system for managing community-generated content and events?
```

### Integration Projects

**CRM Integrations**
```  
*agent development-director
I'm connecting our donor management system to MailChimp. What segmentation data should I sync?
```

**Social Media Automation**
```
*agent marketing-director
Help me design automated social media posting that maintains authentic community engagement.
```

**Financial Reporting Systems**
```
*agent development-director
What financial reports are required for CPB compliance, and how should I structure the data export?
```

## 📋 IDE Workflow Templates

### Project Planning Template
```
*workflow annual-planning
I'm planning a technology upgrade project for our station. Help me assess needs and prioritize development.

Follow-up questions to ask each agent:
- Development Director: What donor/member management features are most important?
- Marketing Director: What digital marketing integrations should we prioritize?  
- Program Director: What programming tools and workflows need improvement?
- Underwriting Director: What sponsor management capabilities do we need?
```

### Code Review Template
```
*agent [relevant-specialist]
I'm about to deploy a [specific system]. Can you review my approach from a public radio best practices perspective?

[Paste relevant code or system description]

Questions to consider:
- Does this align with public radio mission and values?
- Are there compliance considerations I should address?
- What edge cases specific to public radio should I test?
```

### Feature Development Template
```
*chat-mode
I want to add [specific feature] to our [system type]. Help me understand the public radio-specific requirements.

Then switch to relevant specialist:
*agent [development-director/marketing-director/program-director/underwriting-director]
[Provide detailed requirements and context]
```

## 🔧 Advanced IDE Integration

### Custom Snippets and Templates

**Create IDE Snippets** for common agent interactions:
```json
{
  "pr-dev-agent": {
    "prefix": "prdev",
    "body": [
      "*agent development-director",
      "$1"
    ],
    "description": "Activate Public Radio Development Director"
  },
  "pr-workflow": {
    "prefix": "prwf", 
    "body": [
      "*workflow $1",
      "$2"
    ],
    "description": "Start Public Radio Workflow"
  }
}
```

### Project-Specific Context Files

Create `.pr-context` files in your projects:
```markdown
# Station Context for Public Radio Agents

## Station Details
- Name: WXYZ Community Radio
- Market: Small college town (25,000 population)
- License: University-licensed, non-commercial
- Staff: 2 full-time, 8 part-time, 20 volunteers
- Budget: $150K annual operating budget
- Audience: Mix of students, faculty, and community members

## Current Challenges
- Declining membership (down 15% this year)  
- Limited social media engagement
- Need better website and digital presence
- Seeking more local business underwriting support

## Technical Environment
- WordPress website
- Salesforce nonprofit cloud for donor management
- StreamLabs for streaming and podcast distribution
- Facebook and Instagram for social media

## Include this context when consulting agents for project-specific guidance
```

### IDE-Specific Configurations

**Cursor Configuration** (`.cursor-rules`):
```
When working on public radio projects:
1. Always consider FCC compliance for underwriting/programming features
2. Prioritize community service mission in feature decisions  
3. Design for diverse user groups (donors, listeners, volunteers, staff)
4. Consider accessibility requirements for public service
5. Integrate with existing public radio industry tools when possible
```

**VS Code Workspace Settings**:
```json
{
  "continue.systemPrompt": "You are working on a public radio station project. Always consider public service mission, community needs, and regulatory compliance when providing technical guidance.",
  "github.copilot.advanced": {
    "inlineSuggestCount": 3,
    "listCount": 10
  }
}
```

## 🚀 Best Practices for IDE Integration

### Context Switching
- Use different agents as your development focus changes
- Marketing Director for frontend/UX decisions
- Development Director for donor/member features
- Program Director for content management systems  
- Underwriting Director for sponsor/business features

### Documentation Integration
- Generate technical specs with public radio expertise
- Create user stories from public radio professional perspectives
- Build testing scenarios that reflect real station operations

### Code Review Enhancement
- Ask agents to review features for public radio appropriateness
- Verify compliance considerations are addressed
- Ensure accessibility and community service alignment

### Project Planning
- Use workflows for major development projects
- Get multi-agent input for complex system design decisions
- Align technical choices with station strategic goals

## 🛡️ Security and Privacy Considerations

### Code Privacy
- Agents work within your IDE environment
- No code is shared externally beyond what you explicitly provide
- Consider using local LLMs for maximum privacy

### Station Data Protection
- Don't paste actual donor/member data into AI chats
- Use anonymized examples when discussing data structures
- Follow your station's data governance policies

### Compliance Integration
- Agents understand FCC and public radio regulations
- Always verify compliance requirements with legal counsel
- Use agents for guidance, not as legal authority

## 📚 IDE Resources and Documentation

### Quick Reference Commands
- `*help` - Show all available agents and workflows
- `*agent [name]` - Switch to specialist agent
- `*workflow [name]` - Start structured development process  
- `*party-mode` - Multi-agent collaboration for complex decisions

### Specialized Development Queries
- Database design and schema questions
- User experience and accessibility considerations  
- Integration requirements and API design
- Performance optimization for public radio use cases
- Compliance and regulatory requirement integration

The IDE integration approach gives technical public radio professionals the power to combine their development skills with deep public radio expertise, creating better systems that truly serve station missions and community needs.