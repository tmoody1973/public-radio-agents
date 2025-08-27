#!/usr/bin/env python3
"""
Public Radio Agents Framework Dependency Validator
Validates that all referenced dependencies exist and are properly structured
"""

import os
import yaml
import re
from pathlib import Path
from typing import Dict, List, Set, Tuple

class DependencyValidator:
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.agents_path = self.base_path / "agents"
        self.dependencies_path = self.agents_path / "dependencies"
        self.publicradio_txt = self.base_path / "publicradio.txt"
        
        self.errors = []
        self.warnings = []
        
    def validate_all(self) -> bool:
        """Run all validation checks"""
        print("🔍 Validating Public Radio Agents Framework Dependencies...")
        
        # Check main bundle file exists
        if not self.publicradio_txt.exists():
            self.errors.append(f"Main bundle file not found: {self.publicradio_txt}")
            return False
            
        # Extract agent configurations from bundle
        agents_config = self._extract_agents_from_bundle()
        
        # Validate each agent's dependencies
        for agent_id, config in agents_config.items():
            self._validate_agent_dependencies(agent_id, config)
            
        # Check for orphaned files
        self._check_orphaned_files(agents_config)
        
        # Print results
        self._print_results()
        
        return len(self.errors) == 0
        
    def _extract_agents_from_bundle(self) -> Dict:
        """Extract agent configurations from publicradio.txt"""
        agents = {}
        
        try:
            with open(self.publicradio_txt, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Find agent YAML sections
            agent_pattern = r'==================== START: \.bmad-core/agents/([^=]+)\.md ====================\n(.*?)\n==================== END: \.bmad-core/agents/[^=]+\.md ===================='
            
            for match in re.finditer(agent_pattern, content, re.DOTALL):
                agent_id = match.group(1)
                agent_content = match.group(2)
                
                # Extract YAML from the agent content
                yaml_pattern = r'```yaml\n(.*?)\n```'
                yaml_match = re.search(yaml_pattern, agent_content, re.DOTALL)
                
                if yaml_match:
                    try:
                        yaml_content = yaml.safe_load(yaml_match.group(1))
                        agents[agent_id] = yaml_content
                    except yaml.YAMLError as e:
                        self.errors.append(f"Invalid YAML in agent {agent_id}: {e}")
                        
        except FileNotFoundError:
            self.errors.append("publicradio.txt file not found")
        except Exception as e:
            self.errors.append(f"Error reading publicradio.txt: {e}")
            
        return agents
        
    def _validate_agent_dependencies(self, agent_id: str, config: Dict):
        """Validate all dependencies for a specific agent"""
        if 'dependencies' not in config:
            return
            
        dependencies = config['dependencies']
        agent_deps_path = self.dependencies_path / agent_id
        
        # Check agent dependencies directory exists
        if not agent_deps_path.exists():
            self.errors.append(f"Dependencies directory missing for agent {agent_id}: {agent_deps_path}")
            return
            
        # Validate each dependency type
        for dep_type, dep_list in dependencies.items():
            if not isinstance(dep_list, list):
                continue
                
            dep_dir = agent_deps_path / dep_type
            
            # Check dependency type directory exists
            if not dep_dir.exists():
                self.errors.append(f"Dependency type directory missing: {dep_dir}")
                continue
                
            # Check each dependency file
            for dep_name in dep_list:
                expected_extensions = {
                    'data': '.md',
                    'tasks': '.md', 
                    'templates': '.yaml',
                    'checklists': '.md'
                }
                
                if dep_type in expected_extensions:
                    dep_file = dep_dir / f"{dep_name}{expected_extensions[dep_type]}"
                    if not dep_file.exists():
                        self.errors.append(f"Missing dependency file: {dep_file}")
                    else:
                        self._validate_file_content(dep_file, dep_type)
                        
    def _validate_file_content(self, file_path: Path, dep_type: str):
        """Validate the content of a dependency file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Basic content validation
            if len(content.strip()) == 0:
                self.errors.append(f"Empty file: {file_path}")
                return
                
            if dep_type == 'templates':
                # Validate YAML templates
                try:
                    yaml_content = yaml.safe_load(content)
                    if not isinstance(yaml_content, dict):
                        self.warnings.append(f"Template should be a YAML dictionary: {file_path}")
                    elif 'name' not in yaml_content:
                        self.warnings.append(f"Template missing 'name' field: {file_path}")
                except yaml.YAMLError as e:
                    self.errors.append(f"Invalid YAML in template {file_path}: {e}")
                    
            elif dep_type in ['data', 'tasks', 'checklists']:
                # Validate markdown files have proper headers
                if not content.strip().startswith('#'):
                    self.warnings.append(f"Markdown file should start with header: {file_path}")
                    
                # Check for reasonable content length
                if len(content) < 100:
                    self.warnings.append(f"File seems too short for meaningful content: {file_path}")
                    
        except Exception as e:
            self.errors.append(f"Error reading file {file_path}: {e}")
            
    def _check_orphaned_files(self, agents_config: Dict):
        """Check for dependency files that aren't referenced by any agent"""
        referenced_files = set()
        
        # Collect all referenced files
        for agent_id, config in agents_config.items():
            if 'dependencies' not in config:
                continue
                
            agent_deps_path = self.dependencies_path / agent_id
            
            for dep_type, dep_list in config['dependencies'].items():
                if not isinstance(dep_list, list):
                    continue
                    
                expected_extensions = {
                    'data': '.md',
                    'tasks': '.md', 
                    'templates': '.yaml',
                    'checklists': '.md'
                }
                
                if dep_type in expected_extensions:
                    for dep_name in dep_list:
                        ref_file = agent_deps_path / dep_type / f"{dep_name}{expected_extensions[dep_type]}"
                        referenced_files.add(ref_file)
                        
        # Find orphaned files
        if self.dependencies_path.exists():
            for agent_dir in self.dependencies_path.iterdir():
                if not agent_dir.is_dir():
                    continue
                    
                for dep_type_dir in agent_dir.iterdir():
                    if not dep_type_dir.is_dir():
                        continue
                        
                    for file_path in dep_type_dir.iterdir():
                        if file_path.is_file() and file_path not in referenced_files:
                            self.warnings.append(f"Orphaned file (not referenced by any agent): {file_path}")
                            
    def _print_results(self):
        """Print validation results"""
        print("\n" + "="*60)
        
        if self.errors:
            print(f"❌ ERRORS ({len(self.errors)}):")
            for error in self.errors:
                print(f"  • {error}")
        else:
            print("✅ No errors found!")
            
        if self.warnings:
            print(f"\n⚠️  WARNINGS ({len(self.warnings)}):")
            for warning in self.warnings:
                print(f"  • {warning}")
        else:
            print("✅ No warnings!")
            
        print("\n" + "="*60)
        
        total_files = self._count_dependency_files()
        print(f"📊 Total dependency files validated: {total_files}")
        
        if self.errors:
            print("❌ Validation FAILED - Please fix errors before using framework")
        else:
            print("✅ Validation PASSED - Framework is ready for use!")
            
    def _count_dependency_files(self) -> int:
        """Count total dependency files"""
        count = 0
        if self.dependencies_path.exists():
            for agent_dir in self.dependencies_path.iterdir():
                if agent_dir.is_dir():
                    for dep_type_dir in agent_dir.iterdir():
                        if dep_type_dir.is_dir():
                            count += len([f for f in dep_type_dir.iterdir() if f.is_file()])
        return count

def main():
    """Main validation function"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Validate Public Radio Agents Framework Dependencies')
    parser.add_argument('path', nargs='?', default='.', 
                       help='Path to the public-radio-agents directory (default: current directory)')
    parser.add_argument('--quiet', '-q', action='store_true',
                       help='Only show errors and warnings')
    
    args = parser.parse_args()
    
    if not args.quiet:
        print("Public Radio Agents Framework - Dependency Validator")
        print("=" * 60)
    
    validator = DependencyValidator(args.path)
    success = validator.validate_all()
    
    return 0 if success else 1

if __name__ == '__main__':
    import sys
    sys.exit(main())