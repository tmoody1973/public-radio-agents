# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **Public Radio Agents** project - a specialized AI framework that transforms Large Language Models into expert consultants for public radio station management. The project consists of two main components:

1. **Core Framework** - A BMAd-Method™ adaptation that creates 4 specialized agents for public radio management
2. **SaaS Frontend** - A React/Tailwind web application for hosted access to the framework

## Key Architecture

### Core Framework Structure
- **Main Bundle**: `publicradio.txt` (21KB) - Complete framework ready for any LLM
- **Individual Agents**: 4 specialized directors in `agents/` directory
- **Dependencies**: 113+ knowledge bases, templates, and checklists in `agents/dependencies/`
- **Scripts**: Python tools for validation and bundle building

### SaaS Frontend Structure
- **Framework**: Next.js 14 with TypeScript and Tailwind CSS
- **Components**: React components for agent interaction, chat interface, and station management
- **Target Deployment**: Vercel with Supabase database integration

## Essential Commands

### Framework Development Commands
```bash
# Validate framework integrity and dependencies
python3 scripts/validate-dependencies.py

# Build complete framework bundle from components
python3 scripts/build-bundle.py

# Build custom bundle to specific location
python3 scripts/build-bundle.py --output custom-bundle.txt
```

### SaaS Frontend Commands
```bash
# Development server (from saas-frontend directory)
cd saas-frontend && npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## Project Architecture

### Public Radio Framework Architecture
The framework operates on a command-driven interface where all commands start with `*`:

- **Orchestrator Agent** (`bmad-orchestrator`) - Routes requests and manages multi-agent workflows
- **Development Director** - Fundraising, membership campaigns, donor relations
- **Marketing Director** - Audience development, digital marketing, community engagement
- **Underwriting Director** - Corporate partnerships, sponsorship sales, business development  
- **Program Director** - Programming strategy, content development, FCC compliance

### Agent Dependencies Structure
Each agent has 4 dependency types:
- **`data/`** - Domain knowledge bases (.md files)
- **`tasks/`** - Specific methodologies (.md files)
- **`templates/`** - YAML document templates (.yaml files)
- **`checklists/`** - Quality assurance checklists (.md files)

### SaaS Frontend Architecture
```
src/
├── components/
│   ├── agents/          # Agent selection and switching UI
│   ├── chat/            # Chat interface and message handling
│   └── station/         # Station profile management
├── types/               # TypeScript type definitions
└── lib/                 # Utilities and integrations
```

### Key TypeScript Types
The SaaS frontend uses comprehensive TypeScript interfaces:
- **`Station`** - Public radio station profiles with size, license type, budget, challenges
- **`Agent`** - Agent definitions with personas, expertise, and available commands
- **`ChatMessage`** - Chat system with role-based messaging and metadata
- **`Workflow`** - Multi-phase structured processes with deliverables

## Framework Usage Patterns

### Command Structure
All framework interactions use `*` prefix commands:
- `*agent [name]` - Switch to specific agent (e.g., `*agent development-director`)
- `*workflow [name]` - Start structured workflow (e.g., `*workflow membership-campaign`)
- `*help` - Show available commands and agents
- `*chat-mode` - Begin conversational assistance
- `*kb-mode` - Access knowledge base

### Agent Specializations
- **Development Director** (`development-director`) - Expertise in fundraising strategies, donor psychology, grant writing, membership campaigns
- **Marketing Director** (`marketing-director`) - Specializes in audience research, digital marketing, community engagement, brand management
- **Underwriting Director** (`underwriting-director`) - Focuses on corporate partnerships, FCC compliance for underwriting, sponsorship packages
- **Program Director** (`program-director`) - Handles programming strategy, content development, talent management, regulatory compliance

### Validation and Quality Assurance
The framework includes automated validation:
- **Dependency Validation** - Ensures all referenced files exist and are properly structured
- **YAML Validation** - Verifies template syntax and required fields
- **Content Quality** - Checks for appropriate length and markdown formatting
- **Orphaned File Detection** - Identifies unreferenced dependency files

## Development Best Practices

### Working with Framework Components
- Always run `validate-dependencies.py` before committing changes to ensure framework integrity
- Use `build-bundle.py` to regenerate `publicradio.txt` after modifying individual agent components
- Follow existing YAML template patterns when creating new templates
- Maintain consistent markdown formatting in knowledge base files

### SaaS Frontend Development
- Follow existing component patterns in `components/agents/` and `components/chat/`
- Use the comprehensive TypeScript types defined in `src/types/index.ts`
- Implement proper error boundaries and loading states for chat interactions
- Maintain responsive design principles with Tailwind CSS classes

### File Organization
- Individual agent configurations are in `agents/[agent-name]_agent.md`
- All dependencies are organized by agent in `agents/dependencies/[agent-name]/[type]/`
- Documentation follows a structured approach in the `docs/` directory
- The main bundle `publicradio.txt` is generated automatically - do not edit manually

## Testing and Validation

### Framework Testing
The framework includes comprehensive validation scripts that check:
- YAML syntax in agent configurations and templates
- Markdown formatting in knowledge bases and tasks
- File existence for all dependencies referenced in agent configurations
- Content quality (minimum length, proper headers)

### Common Issues
- Missing dependency files result in validation errors
- Incorrect YAML formatting breaks agent loading
- Orphaned files indicate unused dependencies that should be removed or referenced

## Integration Points

### LLM Integration
The framework is designed to work with any chat-based LLM:
- Load entire `publicradio.txt` as system context
- Parse commands starting with `*` for agent switching and workflows
- Maintain station context throughout conversations

### SaaS Platform Integration
- Chat interface parses framework commands and routes to appropriate agents
- Station profiles provide context for personalized responses
- Export functionality allows saving conversations and generated documents
- Analytics track usage patterns across agents and workflows

## Documentation Structure

Key documentation files:
- `docs/quick-start.md` - Getting started guide for new users
- `docs/user-guide.md` - Comprehensive usage documentation
- `docs/saas-frontend-guide.md` - Complete SaaS implementation guide
- `docs/ide-integration.md` - Integration with development environments
- `docs/case-study.md` - Real-world usage example

This repository represents a complete ecosystem for public radio station management using AI, from the core framework to a production-ready SaaS application.