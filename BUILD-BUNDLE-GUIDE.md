# 🔨 Build Bundle Script Guide

## 📋 **Purpose of `build-bundle.py`**

The `build-bundle.py` script is the **core automation tool** that creates the complete `publicradio.txt` file - the single 21KB bundle that contains the entire Public Radio Agents framework ready for any LLM.

### 🎯 **What It Does**

**Combines Multiple Files Into One**:
- Takes 113+ individual dependency files across 4 agents
- Combines agent configurations, templates, checklists, and knowledge bases
- Creates a single `publicradio.txt` file ready for ChatGPT, Claude, or any LLM

**Creates Production-Ready Bundle**:
- Adds proper headers and navigation instructions for LLMs
- Formats everything with clear START/END markers for easy reference
- Includes orchestrator agent for multi-agent coordination
- Adds 6 pre-built workflows for common public radio tasks

## 🏗️ **How It Works**

### **Input Structure** (What it reads):
```
agents/
├── development_director_agent.md
├── marketing_director_agent.md  
├── underwriting_director_agent.md
├── program_director_agent.md
└── dependencies/
    ├── development-director/
    │   ├── data/ (knowledge bases)
    │   ├── tasks/ (methodologies)
    │   ├── templates/ (YAML templates)
    │   └── checklists/ (quality assurance)
    ├── marketing-director/
    ├── underwriting-director/
    └── program-director/
```

### **Output** (What it creates):
```
publicradio.txt (21KB single file containing):
├── Framework instructions for LLMs
├── Agent team configuration  
├── Master orchestrator agent
├── 4 specialist agents + all their dependencies
├── 6 structured workflows
└── Shared utilities and resources
```

## 🚀 **How Users Should Use It**

### **Basic Usage**
```bash
# Run from the project root directory
python3 scripts/build-bundle.py

# Output: Creates/updates publicradio.txt
```

### **Advanced Usage**
```bash
# Build to custom location
python3 scripts/build-bundle.py --output my-custom-bundle.txt

# Build from different directory
python3 scripts/build-bundle.py /path/to/public-radio-agents
```

### **Typical Workflow**
1. **Modify agent files** - Edit individual agent configurations or dependencies
2. **Build bundle** - Run `python3 scripts/build-bundle.py`
3. **Validate** - Run `python3 scripts/validate-dependencies.py` 
4. **Test** - Use the new `publicradio.txt` with your preferred LLM

## 🎯 **When to Use This Script**

### **Required Scenarios**:
- ✅ **After editing agent configurations** - Any changes to `agents/*.md` files
- ✅ **After modifying templates** - Changes to YAML templates in `dependencies/*/templates/`
- ✅ **After updating knowledge bases** - Changes to markdown files in `dependencies/*/data/`
- ✅ **After adding new dependencies** - New files in any `dependencies/` folder
- ✅ **Before deploying** - Ensure latest changes are in the bundle

### **Not Required For**:
- ❌ Just using the existing `publicradio.txt` - It's ready to use
- ❌ SaaS frontend development - Frontend loads the bundle automatically
- ❌ Basic testing - Use existing bundle unless you've made changes

## 🔍 **What The Script Actually Builds**

### **1. Framework Header**
- Instructions for LLMs on how to use the bundle
- Resource navigation guide with START/END markers
- Version information and generation timestamp

### **2. Agent Team Configuration**
- Defines the 4-agent team structure
- Lists available workflows
- Sets up agent coordination protocols

### **3. Master Orchestrator**
- Central agent that routes between specialists
- Command processing (`*agent`, `*workflow`, `*help`)
- Multi-agent workflow coordination

### **4. Individual Agents + Dependencies**
For each of the 4 agents:
- **Agent Configuration** - Persona, expertise, commands
- **Knowledge Bases** - Domain-specific expertise (data/*.md)
- **Task Methodologies** - Step-by-step processes (tasks/*.md)  
- **Templates** - Professional YAML templates (templates/*.yaml)
- **Quality Checklists** - Verification processes (checklists/*.md)

### **5. Structured Workflows**
- Annual Planning
- Membership Campaign
- Underwriting Campaign  
- Program Launch
- Special Event Planning
- Crisis Response

### **6. Shared Resources**
- Cross-agent utilities
- Common methodologies
- Framework management tools

## 💡 **Example Output Structure**

The generated `publicradio.txt` looks like this:
```
# Public Radio Agent Bundle Instructions
[Framework instructions for LLMs]

==================== START: .bmad-core/agent-teams/team-publicradio.yaml ====================
[Team configuration]
==================== END: .bmad-core/agent-teams/team-publicradio.yaml ====================

==================== START: .bmad-core/agents/bmad-orchestrator.md ====================
[Master orchestrator configuration]
==================== END: .bmad-core/agents/bmad-orchestrator.md ====================

==================== START: .bmad-core/agents/development-director.md ====================
[Development Director agent configuration]
==================== END: .bmad-core/agents/development-director.md ====================

==================== START: .bmad-core/data/donor-psychology.md ====================
[Knowledge base content]
==================== END: .bmad-core/data/donor-psychology.md ====================

[... continues for all 113+ files ...]
```

## 🛠️ **Prerequisites**

### **Required Python Packages**:
```bash
pip install pyyaml
```

### **Required Project Structure**:
- Must run from project root directory
- Requires `agents/` directory with agent files
- Requires `agents/dependencies/` structure

### **File Requirements**:
- Agent files: `agents/development_director_agent.md`, etc.
- Dependency structure: `agents/dependencies/[agent-name]/[type]/`
- Valid YAML syntax in template files
- Valid Markdown formatting in content files

## 🔧 **Script Output & Feedback**

### **Successful Build**:
```bash
🔨 Building Public Radio Agents Framework Bundle...
✅ Bundle successfully built: publicradio.txt  
📏 Bundle size: 875,432 characters

✅ Bundle build completed successfully!
📁 Output: publicradio.txt
📋 Next steps:
  1. Run validation: python scripts/validate-dependencies.py
  2. Test bundle with your preferred LLM
  3. Report any issues or contribute improvements
```

### **Error Scenarios**:
- **Missing agent files** - Warning about missing agent configurations
- **Invalid YAML** - Errors in template files
- **File permissions** - Cannot read/write files
- **Missing directories** - Required dependency folders don't exist

## 🎯 **Best Practices**

### **Development Workflow**:
1. **Make changes** to individual agent or dependency files
2. **Build bundle** with `python3 scripts/build-bundle.py`
3. **Validate** with `python3 scripts/validate-dependencies.py`
4. **Test** the updated bundle with your LLM
5. **Commit** both the source files AND the updated `publicradio.txt`

### **Quality Assurance**:
- Always validate after building
- Test critical functionality after major changes
- Keep source files and bundle in sync
- Use version control for both individual files and bundle

### **Collaboration**:
- Run build script before committing changes
- Include updated `publicradio.txt` in commits
- Document what changed and why
- Test with multiple LLM providers when possible

## 🚨 **Important Notes**

### **Bundle vs Source Files**:
- **Source files** in `agents/` and `dependencies/` are for development
- **Bundle file** `publicradio.txt` is what LLMs actually use
- Changes to source files don't affect LLMs until bundle is rebuilt

### **Size Considerations**:
- Bundle is optimized for LLM context windows
- Currently ~21KB (~875K characters)
- Fits comfortably in most LLM context limits
- Automatically includes only referenced dependencies

### **Framework Integrity**:
- The bundle includes validation and navigation for LLMs
- DO NOT manually edit `publicradio.txt` - use source files
- Always use this script to ensure proper formatting
- Test bundle after any structural changes

## 🎉 **Result**

After running the script, you get:
- ✅ **Complete framework** in a single file
- ✅ **Ready for any LLM** (ChatGPT, Claude, Gemini, etc.)
- ✅ **All 4 agents** with full capabilities
- ✅ **113+ dependency files** properly integrated
- ✅ **Professional workflows** for common tasks
- ✅ **Production-ready** for public radio stations

The `publicradio.txt` file can then be copied and pasted into any chat-based LLM to instantly transform it into a complete public radio management consultant team! 🎯