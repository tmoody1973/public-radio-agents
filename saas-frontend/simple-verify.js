// Simple verification script that doesn't require npm packages
// Run with: node simple-verify.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Public Radio Agents - Setup Verification\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found');
  console.log('💡 Copy .env.example to .env.local and configure it');
  process.exit(1);
}

// Read environment variables
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  if (line.includes('=') && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

console.log('📋 Environment Variables Check:');

// Check required variables
const checks = [
  {
    name: 'OPENAI_API_KEY',
    required: true,
    check: (val) => val && val.startsWith('sk-'),
    message: 'OpenAI API key configured'
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    required: true,
    check: (val) => val && val.includes('supabase'),
    message: 'Supabase URL configured'
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    required: true,
    check: (val) => val && val.startsWith('eyJ'),
    message: 'Supabase anon key configured'
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    required: true,
    check: (val) => val && val.startsWith('eyJ'),
    message: 'Supabase service role key configured'
  },
  {
    name: 'NEXTAUTH_SECRET',
    required: true,
    check: (val) => val && val.length > 10,
    message: 'NextAuth secret configured'
  },
  {
    name: 'ANTHROPIC_API_KEY',
    required: false,
    check: (val) => val && val.startsWith('sk-ant-'),
    message: 'Anthropic API key configured (optional)'
  }
];

let allGood = true;
let supabaseConfigured = true;

checks.forEach(check => {
  const value = envVars[check.name];
  const isValid = check.check(value);
  const status = isValid ? '✅' : '❌';
  const required = check.required ? ' (required)' : ' (optional)';
  
  console.log(`${status} ${check.name}${required}`);
  
  if (check.required && !isValid) {
    allGood = false;
    if (check.name.includes('SUPABASE')) {
      supabaseConfigured = false;
    }
  }
});

console.log('\n📊 Setup Status:');

if (allGood) {
  console.log('✅ All required environment variables configured');
  console.log('✅ Ready to run development server');
} else {
  console.log('❌ Some required variables missing');
  
  if (!supabaseConfigured) {
    console.log('\n🎯 Next Steps - Supabase Setup:');
    console.log('1. Go to https://supabase.com');
    console.log('2. Create a new project');
    console.log('3. Get your project URL and API keys');
    console.log('4. Update .env.local with your Supabase values');
    console.log('5. Run the database migration SQL');
  }
}

console.log('\n🗃️ Database Schema Ready:');
const schemaPath = path.join(__dirname, 'src/lib/database.sql');
if (fs.existsSync(schemaPath)) {
  console.log('✅ Database schema file found');
  console.log('📁 Location: src/lib/database.sql');
  console.log('📋 Ready to run in Supabase SQL Editor');
} else {
  console.log('❌ Database schema file missing');
}

console.log('\n🚀 Frontend Application:');
const componentPaths = [
  'src/app/page.tsx',
  'src/components/auth/LoginForm.tsx',
  'src/components/dashboard/Dashboard.tsx',
  'src/contexts/AuthContext.tsx'
];

componentPaths.forEach(componentPath => {
  const fullPath = path.join(__dirname, componentPath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${componentPath}`);
});

if (allGood) {
  console.log('\n🎉 Setup Complete! Next steps:');
  console.log('1. Fix npm permissions (if needed)');
  console.log('2. Run: npm install');
  console.log('3. Run: npm run dev'); 
  console.log('4. Visit: http://localhost:3000');
} else {
  console.log('\n⚠️  Complete configuration first, then try again');
}

console.log('\n💡 Current Configuration Status:');
console.log(`• OpenAI API: ${envVars.OPENAI_API_KEY ? 'Configured' : 'Missing'}`);
console.log(`• Supabase: ${supabaseConfigured ? 'Configured' : 'Needs Setup'}`);
console.log(`• Authentication: ${envVars.NEXTAUTH_SECRET ? 'Ready' : 'Missing Secret'}`);