# Understanding and Customizing Agent Dependencies

## 🔧 **What Are Agent Dependencies?**

Agent dependencies are the specialized knowledge, tools, and resources that make each Public Radio Agent an expert in their field. Think of them as the agent's "toolkit" - the specific information, processes, and templates they use to provide expert guidance.

Each agent has four types of dependencies:
- **Data**: Knowledge bases and reference materials
- **Tasks**: Specific processes and workflows they can execute
- **Templates**: Structured formats for creating documents and plans
- **Checklists**: Step-by-step guides for complex procedures

## 🎯 **How Dependencies Work**

When you consult with an agent, they automatically access their dependencies to provide expert guidance. For example, when the Underwriting Director helps with sponsor research, they use:
- Corporate partnership best practices (data)
- Prospect research process (task)
- Sponsorship proposal format (template)
- Compliance review steps (checklist)

## 👀 **Viewing Agent Dependencies**

To see what dependencies an agent has available, you can ask them directly:

```
*agent underwriting-director
What resources and tools do you have available to help with corporate partnerships?
```

The agent will list their available data sources, tasks, templates, and checklists.

---

## 📋 **Example: Underwriting Director Dependencies**

Here's how the Underwriting Director's dependencies are structured:

### **Data Dependencies (Knowledge Sources)**
```yaml
data:
  - public-radio-underwriting-kb.md          # General underwriting knowledge
  - fcc-underwriting-regulations.md          # Legal compliance requirements
  - corporate-partnership-best-practices.md  # Industry best practices
  - sponsorship-valuation-methods.md         # Pricing and value strategies
```

**What this means**: The agent has access to comprehensive knowledge about underwriting regulations, partnership strategies, and valuation methods.

### **Task Dependencies (Processes)**
```yaml
tasks:
  - advanced-elicitation.md              # Gathering detailed requirements
  - analyze-sponsorship-performance.md   # Evaluating campaign success
  - corporate-prospect-research.md       # Researching potential sponsors
  - create-doc.md                        # Document creation process
  - partnership-compliance-review.md     # Ensuring FCC compliance
  - sponsor-satisfaction-survey.md       # Measuring sponsor satisfaction
```

**What this means**: The agent can execute specific processes like researching prospects, analyzing performance, and conducting compliance reviews.

### **Template Dependencies (Document Formats)**
```yaml
templates:
  - client-stewardship-tmpl.yaml         # Sponsor relationship management
  - partnership-agreement-tmpl.yaml     # Contract templates
  - partnership-strategy-tmpl.yaml      # Strategic planning format
  - prospect-research-tmpl.yaml         # Research documentation
  - sales-pipeline-tmpl.yaml            # Sales tracking system
  - sponsor-benefits-tmpl.yaml          # Benefit package design
  - sponsor-event-tmpl.yaml             # Event planning format
  - sponsorship-proposal-tmpl.yaml      # Proposal structure
  - underwriting-guidelines-tmpl.yaml   # Internal guidelines
```

**What this means**: The agent can create professional documents using proven formats for proposals, agreements, and strategic plans.

### **Checklist Dependencies (Step-by-Step Guides)**
```yaml
checklists:
  - partnership-onboarding-checklist.md    # New sponsor setup process
  - proposal-development-checklist.md      # Creating winning proposals
  - sponsor-stewardship-checklist.md       # Maintaining relationships
  - compliance-review-checklist.md         # Ensuring legal compliance
```

**What this means**: The agent can guide you through complex processes step-by-step, ensuring nothing is missed.

---

## 🛠️ **How to Use Dependencies in Practice**

### **Accessing Specific Resources**

You can ask agents to use specific dependencies:

```
*agent underwriting-director
Use the prospect-research template to help me research potential sponsors in the healthcare sector for our health and wellness programming.
```

```
*agent underwriting-director
Walk me through the partnership-onboarding checklist for our new sponsor, Regional Bank.
```

### **Requesting Specific Tasks**

Ask agents to execute their specialized tasks:

```
*agent underwriting-director
Perform a sponsorship performance analysis for our Q3 campaigns using your analysis framework.
```

```
*agent underwriting-director
Help me create a partnership strategy for expanding our corporate support using your strategic planning process.
```

### **Combining Multiple Dependencies**

Agents can use multiple dependencies together:

```
*agent underwriting-director
I need to create a comprehensive sponsorship proposal for a local car dealership. Use your prospect research process, proposal template, and compliance checklist to ensure we cover everything properly.
```

---

## ✏️ **Customizing Agent Dependencies**

### **Adding Your Own Knowledge (Data Dependencies)**

You can enhance agents by providing your own station-specific information:

```
*agent underwriting-director

Before we start, here's additional context about our market:

MARKET KNOWLEDGE:
- Primary coverage area: Rural Montana, 15,000 population
- Key industries: Agriculture, tourism, small manufacturing
- Major employers: County government, school district, regional hospital
- Successful sponsors: Farm equipment dealers, local banks, healthcare providers
- Seasonal patterns: Tourism sponsors May-September, agricultural sponsors year-round

Now help me develop a prospect list for our fall campaign.
```

### **Creating Custom Templates**

You can ask agents to create templates specific to your needs:

```
*agent underwriting-director
Create a customized sponsorship proposal template specifically for agricultural businesses in our market. Include sections for seasonal messaging, farm report sponsorships, and agricultural event partnerships.
```

### **Developing Station-Specific Checklists**

Request customized processes for your station:

```
*agent underwriting-director
Help me create a sponsor stewardship checklist that works for our small staff. We have one part-time development person and need a streamlined process that ensures good relationships without overwhelming our resources.
```

---

## 🎯 **Best Practices for Using Dependencies**

### **Start with Standard Dependencies**
- Use the built-in knowledge and processes first
- Understand how the standard dependencies work
- Identify gaps specific to your station's needs

### **Add Context Gradually**
- Provide station-specific information as you work with agents
- Build up your custom knowledge base over time
- Document successful customizations for future use

### **Combine Dependencies Strategically**
- Use multiple dependencies together for comprehensive solutions
- Ask agents to reference previous work and build on it
- Create workflows that use dependencies in sequence

### **Keep Dependencies Current**
- Update your station information regularly
- Revise custom templates based on experience
- Refine processes as your station's needs evolve

---

## 🔄 **Dependency Workflows**

### **Example: Complete Sponsorship Development Process**

Here's how to use multiple dependencies in a coordinated workflow:

**Step 1: Research Phase**
```
*agent underwriting-director
Use your prospect research process and template to identify 10 potential sponsors for our spring membership campaign. Focus on businesses that align with our community service mission.
```

**Step 2: Proposal Development**
```
*agent underwriting-director
Using your proposal template and the prospect research we just completed, create a customized sponsorship proposal for [specific business]. Include compliance review using your checklist.
```

**Step 3: Relationship Management**
```
*agent underwriting-director
Now that we've secured this sponsor, use your onboarding checklist to ensure proper setup, and create a stewardship plan using your client stewardship template.
```

### **Example: Performance Analysis Workflow**

**Step 1: Data Collection**
```
*agent underwriting-director
Help me gather the right data for analyzing our Q3 sponsorship performance using your analysis framework.
```

**Step 2: Analysis Execution**
```
*agent underwriting-director
Analyze this sponsorship data using your performance analysis process. Identify trends, successes, and areas for improvement.
```

**Step 3: Strategic Planning**
```
*agent underwriting-director
Based on this analysis, use your partnership strategy template to create an improved approach for Q4 campaigns.
```

---

## 💡 **Advanced Dependency Usage**

### **Cross-Agent Dependency Sharing**

Dependencies can be shared across agents for coordinated strategies:

```
*party-mode
I want to develop an integrated sponsorship and membership campaign. Underwriting Director, use your partnership strategy template. Development Director, use your campaign planning template. Marketing Director, coordinate the messaging using your brand strategy template.
```

### **Building Custom Workflows**

Create your own multi-step processes using dependencies:

```
*agent underwriting-director
Let's create a custom workflow for annual sponsor renewals that combines your satisfaction survey process, stewardship checklist, and proposal template for a comprehensive renewal strategy.
```

### **Dependency Documentation**

Keep track of your customizations:

```
*agent underwriting-director
Help me document our customized sponsorship process so we can train new staff and ensure consistency. Include our custom templates, modified checklists, and station-specific knowledge.
```

---

## 🎯 **Troubleshooting Dependencies**

### **If an Agent Can't Find a Dependency**
- Check the spelling of the dependency name
- Ask the agent to list available dependencies
- Verify you're using the correct agent for that dependency type

### **If a Template Doesn't Fit Your Needs**
- Ask the agent to modify the template for your situation
- Provide specific requirements for customization
- Request a completely new template if needed

### **If a Process Seems Too Complex**
- Ask for a simplified version appropriate for your staff size
- Request step-by-step guidance through complex processes
- Break large processes into smaller, manageable steps

---

## 📚 **Learning More About Dependencies**

### **Exploring Agent Capabilities**
```
*agent [agent-name]
What are all your available dependencies? Explain what each one does and when I should use it.
```

### **Understanding Specific Dependencies**
```
*agent underwriting-director
Explain your sponsorship-proposal template in detail. What sections does it include and how should I customize it for different types of sponsors?
```

### **Getting Dependency Recommendations**
```
*agent underwriting-director
Based on our station's situation [provide context], which of your dependencies would be most helpful for improving our corporate partnerships?
```

---

## 🚀 **Quick Reference: Common Dependency Commands**

### **View Available Dependencies**
```
*agent [agent-name]
List all your available data, tasks, templates, and checklists.
```

### **Use Specific Template**
```
*agent [agent-name]
Use your [template-name] template to help me create [specific document].
```

### **Execute Specific Task**
```
*agent [agent-name]
Execute your [task-name] process for [specific situation].
```

### **Follow Checklist**
```
*agent [agent-name]
Walk me through your [checklist-name] checklist for [specific process].
```

### **Combine Multiple Dependencies**
```
*agent [agent-name]
Use your [task-name] process, [template-name] template, and [checklist-name] checklist to help me with [comprehensive project].
```

Dependencies are what make the Public Radio Agents truly expert consultants rather than general AI assistants. By understanding and customizing these dependencies, you can create a management system perfectly tailored to your station's unique needs and challenges.

