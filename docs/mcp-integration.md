# MCP Integration Guide

> Supercharge your Public Radio Agents with Model Context Protocol (MCP) for enhanced data access and automation

## What is MCP?

Model Context Protocol (MCP) is a standardized way for AI assistants like Claude to connect with external data sources, tools, and services. Think of it as giving your Public Radio Agents the ability to:

- Access your station's actual data (donor databases, audience metrics, financial reports)
- Connect to external services (social media, email platforms, analytics tools)
- Automate routine tasks (report generation, data analysis, campaign tracking)
- Work with real-time information instead of just general knowledge

## Why MCP Matters for Public Radio

**Without MCP**: Agents provide general advice based on industry knowledge
**With MCP**: Agents analyze your actual data and provide specific, actionable recommendations

### Real-World Impact Examples

**Development Director + MCP**:
- Analyzes your actual donor database to identify lapsed donors
- Connects to your CRM to track campaign performance in real-time
- Generates personalized donor reports with current giving patterns

**Marketing Director + MCP**:
- Pulls real audience data from your website and social media
- Analyzes email campaign performance from your actual platforms
- Creates content calendars based on your historical engagement data

**Underwriting Director + MCP**:
- Accesses your sponsor database to identify renewal opportunities
- Tracks actual sponsorship performance and ROI
- Generates sponsor reports with real metrics

**Program Director + MCP**:
- Analyzes actual listening data and program performance
- Connects to your automation system for scheduling insights
- Reviews real audience feedback and engagement metrics

## MCP Tools Perfect for Public Radio

### 1. Database Connections

**SQLite MCP Server** - For local databases
```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/path/to/your/station.db"]
    }
  }
}
```

**Use Cases**:
- Donor database analysis
- Member retention tracking
- Program performance data
- Volunteer management
- Event attendance records

**Example with Development Director**:
```
*agent development-director

Using our donor database, analyze giving patterns for members who joined in the last 2 years. What retention strategies should we prioritize?

[Agent can now query actual donor data through MCP]
```

### 2. File System Access

**Filesystem MCP Server** - For accessing station documents
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/station/documents"]
    }
  }
}
```

**Use Cases**:
- Analyze past campaign materials
- Review grant applications and outcomes
- Access programming logs and reports
- Review board meeting minutes and strategic plans

**Example with Marketing Director**:
```
*agent marketing-director

Review our last three membership campaign materials in the /campaigns folder. What messaging themes were most effective, and how can we improve for the next campaign?

[Agent can now read and analyze actual campaign files]
```

### 3. Web Scraping and Research

**Brave Search MCP Server** - For real-time research
```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-api-key"
      }
    }
  }
}
```

**Use Cases**:
- Research potential sponsors in your market
- Monitor competitor activities and programming
- Find grant opportunities and deadlines
- Track industry trends and best practices

**Example with Underwriting Director**:
```
*agent underwriting-director

Research businesses in our market area that have sponsored cultural events in the past year. Focus on companies with marketing budgets over $50k annually.

[Agent can now search and analyze real business information]
```

### 4. Google Services Integration

**Google Drive MCP Server** - For accessing shared documents
```json
{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

**Use Cases**:
- Access shared strategic planning documents
- Review board reports and financial statements
- Analyze collaborative campaign planning materials
- Access programming schedules and content plans

### 5. Time and Calendar Integration

**Time MCP Server** - For scheduling and time-based analysis
```json
{
  "mcpServers": {
    "time": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-time"]
    }
  }
}
```

**Use Cases**:
- Schedule campaign timelines
- Plan event coordination
- Analyze seasonal giving patterns
- Coordinate programming schedules

### 6. Memory and Context

**Memory MCP Server** - For persistent conversation memory
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

**Use Cases**:
- Remember ongoing projects and their status
- Track long-term strategic initiatives
- Maintain context across multiple planning sessions
- Build institutional knowledge over time

## Step-by-Step Implementation Guide

### Prerequisites

**What You'll Need**:
- Claude Desktop app (free download from Anthropic)
- Basic computer skills (no programming required)
- Access to your station's data files
- 30 minutes for initial setup

### Step 1: Install Claude Desktop

1. **Download Claude Desktop**:
   - Go to [claude.ai](https://claude.ai)
   - Click "Download" and select your operating system
   - Install the application

2. **Sign In**:
   - Open Claude Desktop
   - Sign in with your Claude account
   - Verify the app is working with a simple question

### Step 2: Locate Configuration File

**On Windows**:
```
%APPDATA%\Claude\claude_desktop_config.json
```

**On Mac**:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**On Linux**:
```
~/.config/Claude/claude_desktop_config.json
```

### Step 3: Basic MCP Setup

1. **Create the configuration file** (if it doesn't exist):
   - Open a text editor (Notepad on Windows, TextEdit on Mac)
   - Create a new file
   - Save it as `claude_desktop_config.json` in the location above

2. **Add basic configuration**:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\path\\to\\your\\station\\files"]
    }
  }
}
```

**Important**: Replace `C:\\path\\to\\your\\station\\files` with the actual path to your station's documents folder.

### Step 4: Test the Connection

1. **Restart Claude Desktop** completely
2. **Start a new conversation**
3. **Test the connection**:
```
Can you list the files in my station documents folder?
```

If successful, Claude will show you the files in your specified folder.

### Step 5: Add Public Radio Agents

1. **Load the Public Radio Agents system**:
   - Copy the contents of `publicradio.txt`
   - Paste into Claude Desktop
   - Activate the system

2. **Test integration**:
```
*agent development-director

Please analyze the donor files in my documents folder and provide insights about our membership trends.
```

## Beginner-Friendly Examples

### Example 1: Donor Database Analysis

**Setup**: Place your donor export (CSV file) in your documents folder

**Usage**:
```
*agent development-director

I have a donor database export called "donors_2024.csv" in my documents folder. Can you analyze it and tell me:
1. What's our average gift size?
2. How many donors gave last year but not this year?
3. What months see the highest giving?
4. Which donors might be ready for major gift asks?
```

### Example 2: Campaign Performance Review

**Setup**: Save past campaign materials in a "campaigns" subfolder

**Usage**:
```
*agent marketing-director

Look at the campaign materials in my campaigns folder from our last three membership drives. Compare the messaging, design, and any performance data you can find. What patterns do you see, and what should we do differently next time?
```

### Example 3: Programming Analysis

**Setup**: Export program logs or listening data to your documents folder

**Usage**:
```
*agent program-director

Review the programming data in "program_performance_2024.csv". Which shows have the strongest audience engagement? What time slots perform best? Are there any programming gaps we should address?
```

### Example 4: Sponsor Research

**Setup**: Enable Brave Search MCP for web research

**Usage**:
```
*agent underwriting-director

Research potential sponsors in [your city] for our upcoming jazz festival. Look for businesses that have sponsored cultural events, have marketing budgets, and align with our audience demographics. Create a prioritized prospect list.
```

## Advanced MCP Configurations

### Multi-Source Setup

For stations with multiple data sources:

```json
{
  "mcpServers": {
    "station-files": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/station/documents"]
    },
    "donor-database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/station/data/donors.db"]
    },
    "web-research": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-api-key"
      }
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

### Secure Configuration

For sensitive data access:

```json
{
  "mcpServers": {
    "secure-files": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/secure/station/data"],
      "env": {
        "FILESYSTEM_ALLOWED_EXTENSIONS": ".csv,.txt,.pdf,.xlsx"
      }
    }
  }
}
```

## Practical Workflows with MCP

### Monthly Development Review

```
*agent development-director

Using our donor database and campaign files:
1. Analyze this month's giving compared to last year
2. Identify donors who need stewardship attention
3. Review campaign performance metrics
4. Generate a monthly development report
5. Recommend actions for next month
```

### Quarterly Strategic Planning

```
*party-mode

Using all available data sources:
1. Review financial performance vs. budget
2. Analyze audience and membership trends
3. Assess programming effectiveness
4. Evaluate marketing campaign results
5. Identify strategic priorities for next quarter
```

### Annual Campaign Planning

```
*workflow membership-campaign

Access our historical campaign data and donor information to:
1. Analyze past campaign performance patterns
2. Segment donors based on giving history
3. Develop data-driven campaign strategy
4. Create personalized messaging approaches
5. Set realistic goals based on historical trends
```

## Troubleshooting Common Issues

### MCP Server Won't Start

**Problem**: "Failed to connect to MCP server"

**Solutions**:
1. Check file paths are correct and accessible
2. Ensure Node.js is installed (download from nodejs.org)
3. Restart Claude Desktop completely
4. Verify JSON configuration syntax

### Permission Errors

**Problem**: "Access denied" when reading files

**Solutions**:
1. Check folder permissions
2. Move files to a more accessible location
3. Run Claude Desktop as administrator (Windows)
4. Ensure file paths use correct format for your OS

### Configuration Not Loading

**Problem**: MCP features not available

**Solutions**:
1. Verify configuration file location
2. Check JSON syntax with online validator
3. Restart Claude Desktop after changes
4. Start with simple filesystem configuration first

## Security Best Practices

### Data Protection

**Recommended Approach**:
- Create a dedicated "claude-data" folder for station information
- Copy only necessary files, not entire systems
- Remove sensitive personal information from data exports
- Use read-only access when possible

**Avoid**:
- Giving access to entire hard drives
- Including personal donor information beyond what's needed
- Storing API keys in plain text
- Sharing configuration files with sensitive information

### Access Control

**Best Practices**:
- Limit MCP access to specific folders
- Use environment variables for API keys
- Regularly review what data is accessible
- Document who has access to MCP-enabled systems

## Getting Help

### Community Resources

- **Public Radio Agents GitHub**: Issues and discussions
- **MCP Documentation**: Official Anthropic documentation
- **Public Radio Forums**: Share configurations and best practices
- **Station Networks**: Collaborate with other stations using MCP

### Professional Support

- **Consultants**: Hire technical help for complex setups
- **Vendors**: Work with existing software providers for integration
- **IT Support**: Leverage existing technical resources
- **Training**: Invest in staff development for data analysis skills

## Future Possibilities

### Emerging Integrations

**Coming Soon**:
- Direct CRM integrations (DonorPerfect, Salesforce)
- Social media platform connections
- Email marketing platform integration
- Financial system connections

**Potential Applications**:
- Real-time campaign optimization
- Automated donor stewardship
- Predictive analytics for giving
- Integrated marketing automation

### Advanced Analytics

**With MCP + AI**:
- Predictive donor modeling
- Automated grant opportunity identification
- Real-time campaign performance optimization
- Integrated strategic planning with live data

---

## Quick Start Checklist

**✅ Basic Setup (30 minutes)**:
- [ ] Install Claude Desktop
- [ ] Create configuration file
- [ ] Add filesystem access to station documents
- [ ] Test with simple file listing
- [ ] Load Public Radio Agents system

**✅ First Analysis (15 minutes)**:
- [ ] Export donor data to CSV
- [ ] Ask Development Director to analyze giving patterns
- [ ] Review recommendations and insights
- [ ] Plan next steps based on findings

**✅ Expand Usage (ongoing)**:
- [ ] Add more data sources as needed
- [ ] Experiment with different agent combinations
- [ ] Develop regular analysis routines
- [ ] Share successful approaches with other stations

---

*MCP transforms the Public Radio Agents from general consultants into data-driven advisors who understand your station's specific situation. Start simple, expand gradually, and always prioritize data security and privacy.*

