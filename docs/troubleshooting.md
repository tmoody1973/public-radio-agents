# Troubleshooting Guide

Common issues and solutions when using the Public Radio Agents framework.

## Framework Loading Issues

### ❌ "System not recognizing commands"

**Symptoms**: Commands like `*help` or `*agent development-director` don't work

**Solutions**:
1. **Check file loading**: Ensure you copied the ENTIRE `publicradio.txt` file
2. **Verify activation**: Look for the "Public Radio Orchestrator activated" message
3. **Use asterisk**: All commands must start with `*` (asterisk)
4. **Try reset**: Type `*help` to reset and see available commands

**Example of correct loading**:
```
✅ Correct: Copy entire publicradio.txt content → Paste → Send
❌ Wrong: Copy partial content or forget to send
```

### ❌ "AI seems confused about public radio"

**Symptoms**: AI gives generic business advice instead of public radio-specific guidance

**Solutions**:
1. **Reload framework**: Start fresh chat and reload complete `publicradio.txt`
2. **Specify context**: Mention "I'm using the Public Radio Agents framework"
3. **Use correct commands**: Use `*agent` commands to activate specific experts
4. **Check platform**: Some AI platforms may have content filtering affecting specialized systems

### ❌ "Commands work but responses seem generic"

**Symptoms**: AI acknowledges commands but doesn't provide specialized expertise

**Solutions**:
1. **Provide context**: Include specific details about your station (size, market, challenges)
2. **Be specific**: Instead of "help with fundraising," say "our membership dropped 20%, need retention strategies"
3. **Try different agent**: Make sure you're using the right specialist for your need
4. **Use workflows**: For complex issues, try structured workflows like `*workflow membership-campaign`

## Platform-Specific Issues

### 🤖 **ChatGPT Issues**

**"Response cut off mid-sentence"**
- Solution: Ask "please continue" or "finish your response"
- Prevention: Break complex requests into smaller parts

**"Forgetting earlier conversation"**
- Solution: Start new chat for different projects
- Prevention: Use Custom Instructions to remember your station details

**"Not following commands exactly"**
- Solution: Be very explicit: "Use the *agent command exactly as written"
- Alternative: Try GPT-4 instead of GPT-3.5 for better instruction following

### 🧠 **Claude Issues**

**"Very long responses that are hard to follow"**
- Solution: Ask for "concise, actionable recommendations"
- Tip: Claude is great for detailed analysis but may over-explain

**"Overly cautious about recommendations"**
- Solution: Emphasize "I need practical, implementable strategies"
- Context: Claude tends to be more careful with specific advice

### 🔍 **Google Gemini Issues**

**"Keeps trying to search the web unnecessarily"**
- Solution: Specify "use only the framework knowledge base"
- Context: Gemini may default to web search when internal knowledge is sufficient

**"Inconsistent command recognition"**
- Solution: Be very explicit with asterisk commands
- Alternative: Try other platforms if Gemini struggles with framework commands

### 🏠 **Local Models Issues**

**"System loads but agents don't seem knowledgeable"**
- Solution: Ensure you're using a model with at least 7B parameters
- Recommendation: Try Llama 3.1 or Mistral models for best results

**"Responses are slow or cut off"**
- Solution: Check your computer's memory and processing power
- Alternative: Use cloud-based options for complex analysis

## Usage and Communication Issues

### ❌ "Agent responses don't fit my station size"

**Symptoms**: Recommendations seem too large/small scale for your operation

**Solutions**:
1. **Specify station size**: "We're a small college station with 2 part-time staff"
2. **Clarify resources**: "We have a budget of $X and Y volunteers"
3. **Request scaling**: "Adapt this for a smaller/larger operation"
4. **Use examples**: "Similar to stations like [example station]"

### ❌ "Getting overwhelmed by too many options"

**Symptoms**: AI provides long lists of strategies without prioritization

**Solutions**:
1. **Ask for priorities**: "What are the top 3 most important strategies?"
2. **Request phases**: "Break this into phases - what should we do first?"
3. **Specify constraints**: "We can only implement 1-2 new things this quarter"
4. **Use workflows**: Structured workflows provide step-by-step guidance

### ❌ "Need templates or documents but just getting advice"

**Symptoms**: Getting good advice but need actual documents to implement

**Solutions**:
1. **Request specific deliverables**: "Create a donor survey template for this"
2. **Use template commands**: Try `create-campaign-plan` or similar template commands
3. **Ask for formats**: "Provide this as a checklist/template/action plan"
4. **Specify needs**: "I need something I can use with my board/staff/volunteers"

## Technical and Compliance Issues

### ❌ "Unsure if advice complies with FCC regulations"

**Symptoms**: Concerned about regulatory compliance for underwriting/programming advice

**Solutions**:
1. **Ask specifically**: "Is this compliant with FCC Section 73.503?"
2. **Use compliance commands**: Try `partnership-compliance-review` 
3. **Request verification**: "Check this against public radio regulations"
4. **Consult Program Director**: Use `*agent program-director` for FCC guidance

### ❌ "Recommendations don't fit our license type"

**Symptoms**: Advice assumes different type of public radio license/operation

**Solutions**:
1. **Specify license**: "We're a university-licensed/community/LPFM station"
2. **Clarify structure**: "We're part of a university/independent nonprofit"
3. **Mention constraints**: "We have educational requirements/community obligations"
4. **Ask for adaptation**: "Adapt this for our license type"

## Performance and Efficiency Issues

### ❌ "Responses are too slow"

**Symptoms**: AI takes a long time to respond or times out

**Solutions**:
1. **Simplify requests**: Break complex questions into smaller parts
2. **Try different platform**: Some AI services are faster than others
3. **Use specific agents**: Direct questions to the right specialist instead of general chat
4. **Off-peak usage**: Try using during less busy times

### ❌ "Having to repeat context constantly"

**Symptoms**: AI keeps forgetting your station details

**Solutions**:
1. **Use Custom Instructions** (ChatGPT): Set permanent context about your station
2. **Start sessions with context**: Begin each session with key station details
3. **Keep information document**: Maintain a standard station profile to copy/paste
4. **Use same chat session**: Continue conversations in the same thread when possible

## Best Practices for Success

### 🎯 **Be Specific and Contextual**
- ❌ "Help with fundraising"
- ✅ "Our spring membership drive raised $25K, down from $35K last year. We have 450 members, average gift $75. What retention strategies should we try?"

### 🔄 **Use the Right Tool for the Job**
- **Quick questions**: Direct agent commands (`*agent development-director`)
- **Complex projects**: Workflows (`*workflow annual-planning`)
- **Exploration**: Chat mode (`*chat-mode`)
- **Learning**: Knowledge base mode (`*kb-mode`)

### 📋 **Document and Save Important Outputs**
- Copy important templates, strategies, and action plans to your own files
- The AI doesn't retain information between sessions
- Save successful strategies to reuse or adapt

### 🔍 **Iterate and Refine**
- First response not perfect? Ask for refinements
- "Make this more specific to small markets"
- "Simplify this for volunteer staff"
- "Add more detail to the timeline"

### 👥 **Know When to Use Multiple Agents**
- Use `*party-mode` for complex challenges needing multiple perspectives
- Switch between agents as projects evolve
- Coordinate agents for large initiatives like annual campaigns

### 📞 **When to Get Additional Help**

**Framework Issues**: 
- Check [GitHub Issues](https://github.com/username/public-radio-agents/issues)
- Review [documentation](../docs/) for detailed guides
- Try different AI platforms to isolate problems

**Public Radio Expertise**:
- The agents have comprehensive knowledge bases
- Use `*kb-mode` to access specialized information
- Ask for sources and additional resources

**Technical Implementation**:
- Consult with your station's technical staff
- Check with legal counsel for compliance questions
- Connect with other public radio professionals for implementation guidance

## Emergency Troubleshooting

If nothing else works:

1. **Complete restart**: New chat session, reload entire `publicradio.txt`
2. **Different platform**: Try the framework on a different AI service
3. **Simplified approach**: Start with `*help` and basic commands
4. **Manual activation**: Tell the AI "Please act as the Public Radio Orchestrator from the loaded framework"

## Getting Help

- **Documentation**: [Complete User Guide](user-guide.md)
- **Examples**: [Quick Start Guide](quick-start.md) with real scenarios
- **Technical**: [Framework Improvements](framework-improvements.md) for system details
- **Community**: GitHub Discussions for sharing solutions

Remember: The framework is designed to be robust and helpful. Most issues stem from incomplete loading or unclear communication rather than system problems.