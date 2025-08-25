# Quick Start Guide

> Get up and running with the Public Radio BMAd system in 5 minutes

## Step 1: Choose Your LLM

The Public Radio BMAd system works with any chat-based Large Language Model. Here are the most popular options:

### ChatGPT (Recommended)
- **Best for**: Most users, comprehensive features
- **Access**: [chat.openai.com](https://chat.openai.com)
- **Requirements**: Free account (GPT-3.5) or Plus subscription (GPT-4)
- **Advantages**: Excellent at following complex instructions, good memory

### Claude
- **Best for**: Detailed analysis, long conversations
- **Access**: [claude.ai](https://claude.ai)
- **Requirements**: Free account or Pro subscription
- **Advantages**: Great for nuanced understanding, ethical reasoning

### Google Gemini
- **Best for**: Integration with Google services, real-time information
- **Access**: [gemini.google.com](https://gemini.google.com)
- **Requirements**: Google account
- **Advantages**: Can access current information, integrates with Google Workspace

### Local/Enterprise Options
- **Ollama**: Run models locally on your computer
- **Azure OpenAI**: Enterprise ChatGPT with data privacy
- **AWS Bedrock**: Enterprise AI with multiple model options

## Step 2: Load the System

### Method 1: Copy and Paste (Recommended)
1. Download [`publicradio.txt`](../publicradio.txt) from this repository
2. Open the file and copy all contents (Ctrl+A, Ctrl+C)
3. Open your chosen LLM in a new chat session
4. Paste the entire contents (Ctrl+V)
5. Press Enter to activate the system

### Method 2: Upload File (if supported)
Some LLMs allow file uploads:
1. Download [`publicradio.txt`](../publicradio.txt)
2. Use the file upload feature in your LLM
3. Ask the LLM to "load and activate this Public Radio BMAd system"

## Step 3: Verify Activation

After loading, you should see something like:

```
=== Public Radio Orchestrator Activated ===
Welcome! I'm your Public Radio Master Orchestrator. 
I can transform into any of our specialized director agents or guide you through structured workflows.

Available Commands (all start with *):
*help - Show all commands and agents
*agent [name] - Transform into a specialist
*workflow [name] - Start a structured process
*chat-mode - Begin conversational assistance

How can I help your station today?
```

If you see this message, the system is ready to use!

## Step 4: Start Using the System

### For First-Time Users
Type: `*help`

This shows all available commands and agents.

### For Specific Needs
Choose the appropriate agent:

- **Fundraising help**: `*agent development-director`
- **Marketing questions**: `*agent marketing-director`
- **Sponsorship issues**: `*agent underwriting-director`
- **Programming decisions**: `*agent program-director`

### For Major Projects
Use structured workflows:

- **Annual planning**: `*workflow annual-planning`
- **Membership campaign**: `*workflow membership-campaign`
- **New program launch**: `*workflow program-launch`
- **Special events**: `*workflow special-event`

### For General Consultation
Type: `*chat-mode`

This starts a conversational session where you can discuss your challenges and get recommendations.

## Example: Your First Session

Here's a typical first session:

**You**: *help

**System**: 
```
=== Public Radio Orchestrator Commands ===
All commands must start with * (asterisk)

Available Specialist Agents:
*agent development-director: Fundraising strategy, donor relations, campaigns
*agent marketing-director: Audience development, brand management, digital marketing
*agent underwriting-director: Corporate partnerships, sponsorship sales
*agent program-director: Programming strategy, content development

Available Workflows:
*workflow annual-planning: Comprehensive annual planning
*workflow membership-campaign: Plan and execute membership drives
...
```

**You**: I need help with our declining membership. What should I do?

**System**: 
```
Declining membership is a common challenge. I recommend starting with our Development Director agent who specializes in fundraising and donor relations.

Type: *agent development-director

This will activate Sarah, who can analyze your situation and recommend specific strategies for membership recovery.

Alternatively, if this is part of a broader organizational challenge, you might want to start with:
*workflow annual-planning

Which approach would you prefer?
```

**You**: *agent development-director

**System**: 
```
Hi! I'm Sarah, your Development Director. I specialize in fundraising strategy and donor relations for public radio stations.

I understand you're facing declining membership. This is unfortunately common, but very solvable with the right approach.

To help you effectively, I need to understand your current situation:

1. What's your current membership level and how much has it declined?
2. What's your average gift size and retention rate?
3. What fundraising methods are you currently using?
4. Do you have any data on why members are lapsing?

Once I understand your situation, I can recommend specific strategies and even create detailed campaign plans for you.

What can you tell me about your current membership situation?
```

From here, you have a conversation with the Development Director agent, who will analyze your situation and provide specific recommendations.

## Platform-Specific Tips

### ChatGPT Tips
- Use GPT-4 if available for better performance
- Start new chats for different projects to maintain context
- Use the "Custom Instructions" feature to remember your station details

### Claude Tips
- Claude handles very long conversations well
- Great for detailed analysis and planning documents
- Can process large amounts of information at once

### Gemini Tips
- Can access current information if needed
- Good for research and fact-checking
- Integrates well with Google Docs for document creation

## Troubleshooting

### Commands Not Working
- Make sure you're using the asterisk (*) prefix
- Check that you loaded the complete `publicradio.txt` file
- Try typing `*help` to reset and see available options

### System Not Responding as Expected
- Verify the entire system file was loaded
- Start a new chat session and reload the system
- Make sure you're using a supported LLM

### Need Different Expertise
- Use `*agent` to see all available specialists
- Try `*workflow-guidance` for help choosing the right approach
- Use `*exit` to return to the main orchestrator

### Want to Start Over
- Type `*exit` to return to the main menu
- Start a new chat session for a fresh start
- Use `*status` to see where you are in any process

## Next Steps

Once you're comfortable with the basics:

1. **Read the [Complete User Guide](user-guide.md)** for advanced features
2. **Study the [Case Study](case-study.md)** to see the system in action
3. **Explore [Workflows](workflows.md)** for structured processes
4. **Check [Agent Reference](agent-reference.md)** for detailed capabilities
5. **Review [Customization Guide](customization.md)** to adapt the system

## Getting Help

- **Documentation**: Check the [docs](.) folder for comprehensive guides
- **Issues**: Report problems via GitHub Issues
- **Community**: Join discussions in GitHub Discussions
- **Examples**: See the [examples](../examples/) folder for sample sessions

**Ready to dive deeper?** Check out our [detailed case study](case-study.md) showing the system in action at a real public radio station.


