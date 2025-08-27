#!/usr/bin/env python3
"""
Public Radio Agents Framework Bundle Builder
Automatically builds the complete publicradio.txt bundle from agent dependencies
"""

import os
import yaml
from pathlib import Path
from typing import Dict, List
from datetime import datetime

class BundleBuilder:
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.agents_path = self.base_path / "agents"
        self.dependencies_path = self.agents_path / "dependencies"
        self.output_file = self.base_path / "publicradio.txt"
        
    def build_bundle(self) -> bool:
        """Build the complete bundle from individual components"""
        print("🔨 Building Public Radio Agents Framework Bundle...")
        
        try:
            bundle_content = []
            
            # Add header
            bundle_content.append(self._generate_header())
            
            # Add main agent team configuration
            bundle_content.append(self._add_agent_team_config())
            
            # Add orchestrator agent
            bundle_content.append(self._add_orchestrator_agent())
            
            # Add individual agents with their dependencies
            agent_order = ['development-director', 'marketing-director', 'underwriting-director', 'program-director']
            for agent_id in agent_order:
                agent_content = self._build_agent_section(agent_id)
                if agent_content:
                    bundle_content.append(agent_content)
            
            # Add workflows
            bundle_content.append(self._add_workflows())
            
            # Add shared resources
            bundle_content.append(self._add_shared_resources())
            
            # Write bundle to file
            final_content = '\n\n'.join(bundle_content)
            
            with open(self.output_file, 'w', encoding='utf-8') as f:
                f.write(final_content)
                
            print(f"✅ Bundle successfully built: {self.output_file}")
            print(f"📏 Bundle size: {len(final_content):,} characters")
            
            return True
            
        except Exception as e:
            print(f"❌ Error building bundle: {e}")
            return False
            
    def _generate_header(self) -> str:
        """Generate the bundle header with instructions"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")
        
        return f"""# Public Radio Agent Bundle Instructions

You are now operating as a specialized AI agent from the Public Radio BMAd-Method framework. This is a bundled web-compatible version containing all necessary resources for your role in public radio station management.

## Important Instructions

1. **Follow all startup commands**: Your agent configuration includes startup instructions that define your behavior, personality, and approach. These MUST be followed exactly.

2. **Resource Navigation**: This bundle contains all resources you need. Resources are marked with tags like:

- `==================== START: .bmad-core/folder/filename.md ====================`
- `==================== END: .bmad-core/folder/filename.md ====================`

When you need to reference a resource mentioned in your instructions:

- Look for the corresponding START/END tags
- The format is always the full path with dot prefix (e.g., `.bmad-core/personas/development-director.md`, `.bmad-core/tasks/create-campaign-plan.md`)
- If a section is specified (e.g., `{{root}}/tasks/create-campaign-plan.md#section-name`), navigate to that section within the file

**Understanding YAML References**: In the agent configuration, resources are referenced in the dependencies section. For example:

```yaml
dependencies:
  utils:
    - donor-psychology
  tasks:
    - create-campaign-plan
```

These references map directly to bundle sections:

- `utils: donor-psychology` → Look for `==================== START: .bmad-core/utils/donor-psychology.md ====================`
- `tasks: create-campaign-plan` → Look for `==================== START: .bmad-core/tasks/create-campaign-plan.md ====================`

3. **Execution Context**: You are operating in a public radio environment. All your capabilities and knowledge are contained within this bundle. Work within these constraints to provide the best possible assistance for public radio station management.

4. **Primary Directive**: Your primary goal is defined in your agent configuration below. Focus on fulfilling your designated role according to the Public Radio BMAd-Method framework.

---

Generated on: {timestamp}
Framework Version: 2.0.0 Enhanced"""
        
    def _add_agent_team_config(self) -> str:
        """Add the main agent team configuration"""
        team_config = """==================== START: .bmad-core/agent-teams/team-publicradio.yaml ====================
# <!-- Powered by Public Radio BMAD™ Core -->
bundle:
  name: Team Public Radio
  icon: 📻
  description: Team capable of comprehensive public radio station management including development, marketing, underwriting, and programming.
agents:
  - bmad-orchestrator
  - development-director
  - marketing-director
  - underwriting-director
  - program-director
workflows:
  - annual-planning.yaml
  - membership-campaign.yaml
  - underwriting-campaign.yaml
  - program-launch.yaml
  - special-event.yaml
  - crisis-response.yaml
==================== END: .bmad-core/agent-teams/team-publicradio.yaml ===================="""
        
        return team_config
        
    def _add_orchestrator_agent(self) -> str:
        """Add the orchestrator agent configuration"""
        # Read the orchestrator from existing publicradio.txt if it exists
        try:
            with open(self.output_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Extract orchestrator section
            start_marker = "==================== START: .bmad-core/agents/bmad-orchestrator.md ===================="
            end_marker = "==================== END: .bmad-core/agents/bmad-orchestrator.md ===================="
            
            start_idx = content.find(start_marker)
            end_idx = content.find(end_marker)
            
            if start_idx != -1 and end_idx != -1:
                return content[start_idx:end_idx + len(end_marker)]
                
        except FileNotFoundError:
            pass
            
        # Default orchestrator configuration
        return """==================== START: .bmad-core/agents/bmad-orchestrator.md ====================
# bmad-orchestrator

CRITICAL: Read the full YAML, start activation to alter your state of being, follow startup section instructions, stay in this being until told to exit this mode:

```yaml
activation-instructions:
  - ONLY load dependency files when user selects them for execution via command or request of a task
  - The agent.customization field ALWAYS takes precedence over any conflicting instructions
  - When listing tasks/templates or presenting options during conversations, always show as numbered options list, allowing the user to type a number to select or execute
  - STAY IN CHARACTER!
  - Assess user goal against available agents and workflows in this bundle
  - If clear match to an agent's expertise, suggest transformation with *agent command
  - If project-oriented, suggest *workflow-guidance to explore options
agent:
  name: Public Radio Orchestrator
  id: bmad-orchestrator
  title: Public Radio Master Orchestrator
  icon: 🎭
  whenToUse: Use for workflow coordination, multi-agent tasks, role switching guidance, and when unsure which specialist to consult
persona:
  role: Master Orchestrator & Public Radio Method Expert
  style: Knowledgeable, guiding, adaptable, efficient, encouraging, technically brilliant yet approachable. Helps customize and use Public Radio Method while orchestrating agents
  identity: Unified interface to all Public Radio BMAd-Method capabilities, dynamically transforms into any specialized agent
  focus: Orchestrating the right agent/capability for each need, loading resources only when needed
  core_principles:
    - Become any agent on demand, loading files only when needed
    - Never pre-load resources - discover and load at runtime
    - Assess needs and recommend best approach/agent/workflow
    - Track current state and guide to next logical steps
    - When embodied, specialized persona's principles take precedence
    - Be explicit about active persona and current task
    - Always use numbered lists for choices
    - Process commands starting with * immediately
    - Always remind users that commands require * prefix
    - Understand public radio's unique mission and operational challenges
commands:
  help: Show this guide with available agents and workflows
  agent: Transform into a specialized agent (list if name not specified)
  chat-mode: Start conversational mode for detailed assistance
  checklist: Execute a checklist (list if name not specified)
  doc-out: Output full document
  kb-mode: Load full Public Radio knowledge base
  party-mode: Group chat with all agents
  status: Show current context, active agent, and progress
  task: Run a specific task (list if name not specified)
  yolo: Toggle skip confirmations mode
  exit: Return to Public Radio or exit session
  workflow: Start specific workflow (list if name not specified)
  workflow-guidance: Get personalized help selecting the right workflow
  plan: Create detailed workflow plan before starting
  plan-status: Show current workflow plan progress
  plan-update: Update workflow plan status
```
==================== END: .bmad-core/agents/bmad-orchestrator.md ===================="""
        
    def _build_agent_section(self, agent_id: str) -> str:
        """Build complete agent section with all dependencies"""
        agent_file = self.agents_path / f"{agent_id}_agent.md"
        agent_deps_path = self.dependencies_path / agent_id
        
        if not agent_file.exists():
            print(f"⚠️  Agent file not found: {agent_file}")
            return ""
            
        # Read agent configuration
        try:
            with open(agent_file, 'r', encoding='utf-8') as f:
                agent_config = f.read()
        except Exception as e:
            print(f"❌ Error reading agent file {agent_file}: {e}")
            return ""
            
        sections = []
        
        # Add agent configuration
        sections.append(f"==================== START: .bmad-core/agents/{agent_id}.md ====================")
        sections.append(agent_config.strip())
        sections.append(f"==================== END: .bmad-core/agents/{agent_id}.md ====================")
        
        # Add agent dependencies
        if agent_deps_path.exists():
            dependency_content = self._build_agent_dependencies(agent_id, agent_deps_path)
            if dependency_content:
                sections.append(dependency_content)
                
        return '\n'.join(sections)
        
    def _build_agent_dependencies(self, agent_id: str, deps_path: Path) -> str:
        """Build all dependencies for an agent"""
        sections = []
        
        # Define dependency types and their file extensions
        dep_types = {
            'data': '.md',
            'tasks': '.md',
            'templates': '.yaml',
            'checklists': '.md'
        }
        
        for dep_type, extension in dep_types.items():
            dep_dir = deps_path / dep_type
            
            if dep_dir.exists() and dep_dir.is_dir():
                # Process files in alphabetical order
                dep_files = sorted([f for f in dep_dir.iterdir() if f.is_file() and f.suffix == extension])
                
                for dep_file in dep_files:
                    dep_name = dep_file.stem
                    
                    try:
                        with open(dep_file, 'r', encoding='utf-8') as f:
                            content = f.read().strip()
                            
                        sections.append(f"==================== START: .bmad-core/{dep_type}/{dep_name}{extension} ====================")
                        sections.append(content)
                        sections.append(f"==================== END: .bmad-core/{dep_type}/{dep_name}{extension} ====================")
                        
                    except Exception as e:
                        print(f"❌ Error reading dependency {dep_file}: {e}")
                        
        return '\n\n'.join(sections) if sections else ""
        
    def _add_workflows(self) -> str:
        """Add workflow configurations"""
        workflows = [
            ("annual-planning", "Annual Strategic Planning", "Comprehensive annual planning across all departments"),
            ("membership-campaign", "Membership Drive Campaign", "Plan and execute listener membership campaigns"), 
            ("underwriting-campaign", "Underwriting Sales Campaign", "Develop and implement corporate partnership campaigns"),
            ("program-launch", "New Program Launch", "Launch new programming with integrated support"),
            ("special-event", "Special Event Planning", "Plan fundraising and community events"),
            ("crisis-response", "Crisis Response Planning", "Respond to funding, operational, or community crises")
        ]
        
        sections = []
        
        for workflow_id, name, description in workflows:
            workflow_content = f"""==================== START: .bmad-core/workflows/{workflow_id}.yaml ====================
name: {name}
description: {description}
icon: {"📅" if "annual" in workflow_id else "💝" if "membership" in workflow_id else "🤝" if "underwriting" in workflow_id else "🎙️" if "program" in workflow_id else "🎉" if "event" in workflow_id else "🚨"}
phases:
  - name: Planning Phase
    description: Initial assessment and strategy development
    agents: [bmad-orchestrator, development-director, marketing-director, underwriting-director, program-director]
    deliverables:
      - Situation analysis and needs assessment
      - Strategic goals and objectives
      - Resource requirements and timeline
  - name: Implementation Phase  
    description: Execute planned activities and monitor progress
    agents: [development-director, marketing-director, underwriting-director, program-director]
    deliverables:
      - Campaign execution and coordination
      - Performance monitoring and optimization
      - Community engagement and feedback
  - name: Evaluation Phase
    description: Assess results and plan improvements
    agents: [bmad-orchestrator]
    deliverables:
      - Performance analysis and reporting
      - Lessons learned documentation
      - Future recommendations and planning
==================== END: .bmad-core/workflows/{workflow_id}.yaml ===================="""
            
            sections.append(workflow_content)
            
        return '\n\n'.join(sections)
        
    def _add_shared_resources(self) -> str:
        """Add shared resources and utilities"""
        shared_content = """==================== START: .bmad-core/data/elicitation-methods.md ====================
# Advanced Elicitation Methods for Public Radio

## Overview
Advanced elicitation techniques help gather deeper insights into community needs, audience preferences, and organizational challenges to inform strategic decision-making.

## Primary Techniques

### 1. Structured Interviews
- Systematic questioning approach
- Open-ended and probing questions
- Community stakeholder perspectives
- Staff and volunteer insights

### 2. Focus Groups
- Facilitated group discussions
- Diverse community representation
- Program and service feedback
- Future needs exploration

### 3. Community Surveys
- Scientific sampling methods
- Multiple distribution channels
- Statistical analysis capabilities
- Trend identification and tracking

### 4. Stakeholder Mapping
- Identify key community influencers
- Understand relationship networks
- Assess partnership opportunities
- Map communication channels

### 5. Scenario Planning
- Explore "what if" situations
- Test strategy resilience
- Identify risk factors
- Plan contingency responses

## Application in Public Radio Context
- Community needs assessment
- Program development research
- Audience development strategies
- Partnership opportunity identification
- Crisis preparation and response planning
==================== END: .bmad-core/data/elicitation-methods.md ====================

==================== START: .bmad-core/tasks/kb-mode-interaction.md ====================
# Knowledge Base Mode Interaction Guide

## Purpose
Provide structured access to comprehensive public radio knowledge and best practices.

## Interaction Process
1. **Topic Selection**: Present available knowledge areas
2. **Focused Exploration**: Deep dive into specific topics
3. **Practical Application**: Connect knowledge to current challenges
4. **Resource Integration**: Link to relevant templates and tools

## Knowledge Areas
- Public radio mission and values
- Regulatory compliance and requirements
- Fundraising and development strategies
- Marketing and community engagement
- Programming and content development
- Corporate partnerships and underwriting
- Financial management and sustainability
- Technology and digital transformation

## Best Practices
- Start with community context
- Focus on actionable insights
- Provide specific examples
- Connect to templates and checklists
- Encourage follow-up questions
==================== END: .bmad-core/tasks/kb-mode-interaction.md ====================

==================== START: .bmad-core/utils/workflow-management.md ====================
# Workflow Management Utilities

## Workflow Selection Guidance
Help users choose appropriate workflows based on:
- Current organizational challenges
- Available resources and timeline
- Community needs and priorities
- Strategic objectives and goals

## Workflow Coordination
- Multi-agent collaboration protocols
- Resource sharing and allocation
- Timeline management and milestones
- Progress tracking and reporting

## Workflow Customization
- Adapt standard workflows to station needs
- Scale workflows for different organization sizes
- Integrate local community considerations
- Modify based on available resources

## Success Metrics
- Define measurable outcomes
- Establish tracking mechanisms
- Regular progress evaluation
- Continuous improvement processes
==================== END: .bmad-core/utils/workflow-management.md ===================="""
        
        return shared_content

def main():
    """Main bundle building function"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Build Public Radio Agents Framework Bundle')
    parser.add_argument('path', nargs='?', default='.', 
                       help='Path to the public-radio-agents directory (default: current directory)')
    parser.add_argument('--output', '-o', 
                       help='Output file path (default: publicradio.txt)')
    
    args = parser.parse_args()
    
    print("Public Radio Agents Framework - Bundle Builder")
    print("=" * 60)
    
    builder = BundleBuilder(args.path)
    
    if args.output:
        builder.output_file = Path(args.output)
    
    success = builder.build_bundle()
    
    if success:
        print("\n✅ Bundle build completed successfully!")
        print(f"📁 Output: {builder.output_file}")
        print("\n📋 Next steps:")
        print("  1. Run validation: python scripts/validate-dependencies.py")  
        print("  2. Test bundle with your preferred LLM")
        print("  3. Report any issues or contribute improvements")
    else:
        print("\n❌ Bundle build failed!")
        return 1
        
    return 0

if __name__ == '__main__':
    import sys
    sys.exit(main())