![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![GitHub stars](https://img.shields.io/github/stars/tmoody1973/public-radio-agents)
![GitHub forks](https://img.shields.io/github/forks/tmoody1973/public-radio-agents)

# Public Radio Agents 📻

> AI-powered management consultants for public radio stations

A specialized adaptation of the [BMAd-Method™](https://github.com/bmad-code-org/BMAD-METHOD/tree/main) framework designed specifically for public radio station management. This system provides four expert AI agents that can assist with development, marketing, underwriting, and programming decisions.

## 🎯 What This System Does

Transform any Large Language Model (ChatGPT, Claude, Gemini, etc.) into a team of specialized public radio consultants:

- **Development Director** 💝 - Fundraising strategy, donor relations, membership campaigns
- **Marketing Director** 📢 - Audience development, brand management, digital marketing  
- **Underwriting Director** 🤝 - Corporate partnerships, sponsorship sales, business development
- **Program Director** 🎙️ - Programming strategy, content development, talent management

## ⚡ Enhanced with MCP Integration

**Take it to the next level**: Connect your agents to real station data using Model Context Protocol (MCP)

**Basic Mode**: General advice based on public radio best practices
**MCP Mode**: Data-driven recommendations using your actual station information

### What MCP Enables
- **Real Data Analysis**: Connect to donor databases, financial reports, audience metrics
- **Document Access**: Analyze past campaigns, grant applications, strategic plans
- **Live Research**: Real-time sponsor research and competitive analysis
- **Automated Insights**: Generate reports using your actual performance data

### Example Transformation
**Without MCP**: *"Based on industry standards, focus on donor retention"*
**With MCP**: *"Your database shows 127 lapsed donors from 2023 who gave $50+. Here's a specific re-engagement strategy for each segment."*

[**→ Complete MCP Setup Guide**](docs/mcp-integration.md) - Connect your station's data in 30 minutes

## 🚀 Quick Start (5 Minutes)

1. **Get the framework**: Download and copy `publicradio.txt` (21KB file)
2. **Choose your AI**: Works with ChatGPT, Claude, Gemini, or any chat-based AI
3. **Activate**: Paste the entire file content into a new chat and send
4. **Start consulting**: Use commands like `*agent development-director`

### Instant Examples

**💰 "Membership declining?"** → `*agent development-director`  
**📱 "Need social media help?"** → `*agent marketing-director`  
**🤝 "Want more sponsors?"** → `*agent underwriting-director`  
**🎙️ "Planning new programming?"** → `*agent program-director`

**🔄 All commands start with `*` (asterisk)**

## ✨ Framework Enhancements (v2.0.0)

### Complete Professional System
This framework has been comprehensively enhanced from the original prototype:

- **113 dependency files** created (was 89 missing)
- **All 4 agents fully operational** (was only 1 working)
- **Comprehensive knowledge bases** for all public radio domains
- **Professional templates and checklists** for immediate use
- **Automated validation and build tools** for quality assurance

### Advanced Development Tools
- **Dependency Validation**: `python3 scripts/validate-dependencies.py`
- **Bundle Building**: `python3 scripts/build-bundle.py`
- **Quality Assurance**: Automated content validation and error checking

### Enhanced Agent Capabilities
Each agent now includes:
- Complete domain-specific knowledge bases
- Professional task methodologies
- Industry-standard templates
- Quality assurance checklists
- Regulatory compliance tools

## 📋 What's Included

- **Complete Agent System** (`publicradio.txt`) - Ready-to-use bundle with all agents
- **Individual Agent Files** - Separate configurations for each director role
- **Comprehensive Dependencies** - 113 professional templates, tasks, and knowledge bases
- **Workflow Templates** - Pre-built processes for common public radio initiatives
- **Implementation Guide** - Step-by-step instructions for getting started
- **Case Study** - Real-world example showing the system in action
- **Development Tools** - Scripts for validation, building, and quality assurance
- **Best Practices** - Tips for maximizing effectiveness

## 🎓 Case Study: WXYZ Public Radio's Membership Crisis

See how WXYZ Public Radio used this system to recover from a 30% drop in membership revenue. [Read the full case study →](docs/case-study.md)

**The Challenge**: Declining membership, aging donor base, ineffective digital outreach

**The Solution**: Used the Public Radio BMAd system to develop an integrated strategy

**The Results**: 
- 45% increase in new member acquisition
- 25% improvement in donor retention
- Successful launch of monthly giving program
- Coordinated digital strategy across all platforms

## 🛠️ Works with Any AI Platform

### Popular Options

#### 💬 **Web-Based AI Platforms**
- **🤖 ChatGPT** ([chat.openai.com](https://chat.openai.com)) - Most user-friendly, great for planning
- **🧠 Claude** ([claude.ai](https://claude.ai)) - Excellent for detailed analysis and long conversations  
- **🔍 Google Gemini** ([gemini.google.com](https://gemini.google.com)) - Good for research and integration

#### 💻 **Development IDEs** (For technical users)
- **⚡ Cursor** ([cursor.sh](https://cursor.sh)) - AI-powered code editor with chat integration
- **🌊 Windsurf** - AI development environment with framework support
- **📝 VS Code** - Use with GitHub Copilot, Continue, or Codeium extensions

#### 🏠 **Privacy-Focused Options**
- **Local Models** - Ollama, LM Studio for complete privacy

### How It Works
1. **Copy** the `publicradio.txt` file content (21KB)
2. **Choose platform**: Web AI, IDE, or local model
3. **Paste and activate**: Load into chat interface and send
4. **Start consulting**: Use commands like `*agent development-director`

**No setup, no installation, no API keys needed!**

### 🔧 For Developers
Use in **Cursor**, **Windsurf**, or **VS Code** to get public radio expertise while coding:
```
*agent development-director  
I'm building a donor management system. What database fields should I include?

*agent program-director
Help me design an API for our program scheduling system with FCC compliance.
```
[**→ Complete IDE Integration Guide**](docs/ide-integration.md)

## 💡 How Public Radio Professionals Use It

### Real Station Scenarios

#### 📊 **WXYZ Community Radio** (Small Market)
**Challenge**: Membership declined 20%, need recovery strategy
**Solution**: 
```
*agent development-director
Our membership dropped from 500 to 400 members. Average gift $65. 
We use direct mail and on-air appeals. What specific steps should we take?
```
**Result**: AI provides member retention analysis, monthly giving setup, and digital integration strategy with timeline and expected outcomes.

#### 📢 **Metro Public Radio** (Medium Market)
**Challenge**: Social media engagement is low, want to reach younger demographics
**Solution**:
```
*agent marketing-director  
We have 1,200 Facebook followers but only 15 likes per post. 
Our audience is 45+ but we want to reach 25-40 age group.
```
**Result**: AI delivers platform-specific content strategies, demographic targeting plans, and engagement improvement roadmap.

#### 🎙️ **Valley Public Radio** (University Station)  
**Challenge**: Planning new community interview show with compliance concerns
**Solution**:
```
*agent program-director
We want to launch a weekly local business owner interview show. 
What FCC compliance and production considerations do we need?
```
**Result**: AI provides FCC compliance checklist, production workflow, and community partnership strategies.

### Multi-Agent Collaboration Example

**Large Initiative**: Annual fundraising campaign planning
```
*workflow membership-campaign
Planning our fall drive. Last year: $75K raised, 1,200 members. 
Goal: $95K with better digital integration and volunteer coordination.
```

**AI coordinates multiple specialists**:
- **Development Director**: Creates campaign strategy and donor segmentation
- **Marketing Director**: Develops digital marketing and social media plan  
- **Program Director**: Plans on-air elements and schedule integration
- **Underwriting Director**: Coordinates sponsor appreciation opportunities

**Output**: Complete campaign plan with timelines, responsibilities, and measurement framework.

### Command Quick Reference

**🎯 Direct to Expert**
- `*agent development-director` → Fundraising, membership, grants
- `*agent marketing-director` → Social media, community outreach, branding
- `*agent underwriting-director` → Corporate sponsors, business partnerships
- `*agent program-director` → Content planning, FCC compliance, talent

**📋 Structured Projects**  
- `*workflow annual-planning` → Comprehensive yearly strategy
- `*workflow membership-campaign` → Fundraising drive planning
- `*workflow program-launch` → New show development

**💬 Exploration & Learning**
- `*chat-mode` → Open discussion about challenges
- `*kb-mode` → Access public radio knowledge base
- `*help` → See all available options

## 📖 Documentation

### 🚀 **Getting Started**
- [**Quick Start Guide**](docs/quick-start.md) - Get up and running in 5 minutes
- [**Troubleshooting Guide**](docs/troubleshooting.md) - Common issues and solutions
- [Case Study](docs/case-study.md) - Real-world implementation example

### 📚 **Comprehensive Guides**  
- [Complete User Guide](docs/user-guide.md) - Full documentation and features
- [Agent Reference](docs/agent-reference.md) - Detailed agent capabilities
- [Workflow Guide](docs/workflows.md) - Pre-built processes and templates

### ⚙️ **Advanced Usage**
- [**IDE Integration Guide**](docs/ide-integration.md) - Use with Cursor, Windsurf, VS Code for development
- [Framework Improvements](docs/framework-improvements.md) - Technical enhancement details
- [Customization Guide](docs/customization.md) - Adapt the system to your needs
- [MCP Integration Guide](docs/mcp-integration.md) - Connect your station's data for enhanced insights

## 🔧 Development and Validation

### Quality Assurance Tools
```bash
# Validate all dependencies
python3 scripts/validate-dependencies.py

# Build complete bundle
python3 scripts/build-bundle.py

# Generate custom bundle
python3 scripts/build-bundle.py --output custom-bundle.txt
```

### Framework Statistics
- **Total Files**: 113 dependency files + core framework
- **Knowledge Base**: 15,000+ lines of expert content
- **Templates**: 40+ professional YAML templates
- **Coverage**: Complete public radio management domains
- **Validation**: Automated quality assurance and error checking

## 🤝 Contributing

This is an open-source project for the public media community. We welcome:

- Bug reports and feature requests
- New agent capabilities and workflows
- Case studies and success stories
- Documentation improvements
- Community feedback and suggestions

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Built on the BMAd-Method™ framework
- Inspired by the public radio community's collaborative spirit
- Special thanks to Radio Milwaukee for organizational insights
- Developed for public media professionals everywhere

## 🆘 Support

- **Documentation**: Check the [docs](docs/) folder for comprehensive guides
- **Issues**: Report bugs or request features via GitHub Issues
- **Community**: Join discussions in GitHub Discussions
- **Contact**: Reach out via GitHub for questions or collaboration

---

**Ready to transform your station's management approach?** [Get started with the Quick Start Guide →](docs/quick-start.md)