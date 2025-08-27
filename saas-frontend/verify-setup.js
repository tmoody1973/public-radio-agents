// Quick verification script for Supabase setup
// Run with: node verify-setup.js

require('dotenv').config({ path: '.env.local' });

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY',
  'NEXTAUTH_SECRET'
];

console.log('🔍 Verifying Supabase Setup...\n');

// Check environment variables
console.log('📋 Environment Variables:');
requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  const status = value ? '✅' : '❌';
  const display = value ? `${value.substring(0, 20)}...` : 'Missing';
  console.log(`${status} ${envVar}: ${display}`);
});

// Test Supabase connection
async function testConnection() {
  try {
    const { createClient } = require('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log('\n🔌 Testing Database Connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count(*)')
      .limit(1);

    if (error) {
      console.log('❌ Database Connection Failed:', error.message);
    } else {
      console.log('✅ Database Connection Successful');
    }

    // Check tables exist
    console.log('\n📊 Checking Database Tables...');
    const tables = ['profiles', 'stations', 'chat_sessions', 'chat_messages', 'workflows'];
    
    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select('*').limit(1);
        console.log(`${error ? '❌' : '✅'} ${table}${error ? `: ${error.message}` : ''}`);
      } catch (e) {
        console.log(`❌ ${table}: ${e.message}`);
      }
    }

  } catch (error) {
    console.log('❌ Setup Error:', error.message);
    console.log('\n💡 Make sure to run: npm install @supabase/supabase-js');
  }
}

if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  testConnection();
} else {
  console.log('\n⚠️  Configure .env.local first, then run this script again');
}