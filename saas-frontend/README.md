# 🎵 Public Radio Agents - SaaS Frontend

A complete React/Next.js application providing a web interface for the Public Radio Agents AI framework with Supabase authentication and database integration.

## 🚀 Features

### ✨ **Core Functionality**
- **AI Chat Interface** - Interactive chat with 4 specialized agents
- **Command Processing** - Full command support (`*help`, `*agent`, `*workflow`)
- **Multi-Station Management** - Support multiple radio stations per account
- **Session Persistence** - Chat history saved in database
- **Real-time Streaming** - Live AI responses with typing indicators

### 🔐 **Authentication & Security** 
- **Supabase Auth** - Secure user registration and login
- **Row-Level Security** - Database-level access control
- **Session Management** - Automatic session handling
- **Protected Routes** - Auth-required pages

### 💾 **Database Integration**
- **User Profiles** - Complete user management
- **Station Management** - Multiple station configurations
- **Chat History** - Persistent conversation storage
- **Workflow Tracking** - Campaign and project management

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works on desktop and mobile
- **Tailwind CSS** - Professional styling
- **Framer Motion** - Smooth animations
- **Accessibility** - WCAG compliant interface

## 📋 Prerequisites

- **Node.js 18+** and npm
- **Supabase Account** - For database and authentication
- **OpenAI API Key** - For GPT integration
- **Anthropic API Key** (optional) - For Claude integration

## 🛠️ Setup Instructions

### 1. **Clone and Install**
```bash
cd saas-frontend
npm install
```

### 2. **Environment Configuration**
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your actual keys:
# - OpenAI API key
# - Supabase URL and keys
# - NextAuth secret
```

### 3. **Supabase Database Setup**

#### **Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key

#### **Run Database Migration**
```sql
-- Copy and run the SQL from src/lib/database.sql
-- This creates all necessary tables and security policies
```

### 4. **Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Project Structure

```
saas-frontend/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── page.tsx           # Main dashboard
│   │   ├── auth/              # Authentication pages
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── auth/              # Login/signup forms
│   │   ├── chat/              # Chat interface
│   │   ├── dashboard/         # Main dashboard
│   │   └── station/           # Station management
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication state
│   ├── lib/                   # Utilities
│   │   ├── supabase.ts        # Database client
│   │   └── database.sql       # Database schema
│   └── types/                 # TypeScript types
├── .env.example               # Environment template
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🔧 Configuration

### **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT models | ✅ |
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude | ❌ |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |
| `NEXTAUTH_SECRET` | Random secret for NextAuth | ✅ |
| `NEXTAUTH_URL` | Your app URL | ✅ |

### **Supabase Setup Details**

1. **Create Project** - New Supabase project
2. **Database Schema** - Run `src/lib/database.sql`
3. **Authentication** - Email/password enabled by default
4. **Row Level Security** - Automatic with provided policies

## 🎯 Usage

### **User Flow**
1. **Sign Up/Login** - Create account or sign in
2. **Station Setup** - Configure your radio station details
3. **Chat Interface** - Start chatting with AI agents
4. **Commands** - Use `*help`, `*agent [name]`, `*workflow [name]`
5. **Session History** - Access previous conversations

### **Available Commands**
- `*help` - Show all available commands and agents
- `*agent development-director` - Switch to fundraising expert
- `*agent marketing-director` - Switch to marketing expert  
- `*agent underwriting-director` - Switch to partnerships expert
- `*agent program-director` - Switch to programming expert
- `*workflow annual-planning` - Start strategic planning
- `*workflow membership-campaign` - Plan membership drives
- `*status` - Check current system status

## 🔌 API Integration

### **Chat API** (`/api/chat`)
- Processes user messages and AI agent responses
- Handles command parsing and routing
- Integrates with OpenAI GPT and Anthropic Claude
- Loads Public Radio framework from `../publicradio.txt`

### **Database Tables**
- `profiles` - User accounts and roles
- `stations` - Radio station configurations
- `chat_sessions` - Conversation sessions
- `chat_messages` - Individual messages
- `workflows` - Campaign and project tracking

## 🚀 Deployment

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Point NEXTAUTH_URL to your domain
```

### **Environment Variables for Production**
- Set all `.env.local` variables in Vercel
- Update `NEXTAUTH_URL` to your domain
- Update `NEXT_PUBLIC_SUPABASE_URL` if needed

## 🧪 Development

### **Available Scripts**
```bash
npm run dev         # Development server
npm run build       # Production build
npm run start       # Production server
npm run lint        # ESLint checking
npm run type-check  # TypeScript checking
```

### **Development Features**
- **Hot Reload** - Automatic refresh on changes
- **TypeScript** - Full type safety
- **ESLint** - Code quality checking
- **Tailwind CSS** - Rapid styling

## 🔍 Troubleshooting

### **Common Issues**

#### **"Cannot connect to Supabase"**
- Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Verify Supabase project is active
- Check Row Level Security policies

#### **"OpenAI API Error"**
- Verify `OPENAI_API_KEY` is correct
- Check API key has sufficient credits
- Ensure API key has proper permissions

#### **"Authentication Failed"**
- Check `NEXTAUTH_SECRET` is set
- Verify Supabase auth is enabled
- Check user exists in database

#### **"Database Connection Error"**  
- Run database migration SQL
- Check Supabase connection
- Verify table structure matches schema

### **Debug Mode**
```bash
# Enable verbose logging
DEBUG=* npm run dev

# Check database directly
# Use Supabase dashboard SQL editor
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the Public Radio Agents framework - see the main project LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the main project docs
- **Issues**: Report bugs via GitHub Issues  
- **Community**: Join discussions in GitHub Discussions
- **Examples**: See example configurations in the examples folder

---

**Built with the BMAd-Method™ framework for public radio excellence** 🎵