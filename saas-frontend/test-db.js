// Simple database connection test without npm dependencies
// This uses a basic HTTP request to test Supabase

const https = require('https');
const fs = require('fs');

// Read environment variables
function loadEnv() {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const env = {};
  
  envContent.split('\n').forEach(line => {
    if (line.includes('=') && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      env[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  return env;
}

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase Database Connection...\n');
  
  try {
    const env = loadEnv();
    
    // Parse Supabase URL
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !anonKey) {
      console.log('❌ Missing Supabase configuration');
      return;
    }
    
    const url = new URL(supabaseUrl);
    console.log(`📡 Connecting to: ${url.hostname}`);
    
    // Test basic connection with a simple query to profiles table
    const apiPath = '/rest/v1/profiles?select=count&limit=1';
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: apiPath,
      method: 'GET',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      console.log(`📊 Response Status: ${res.statusCode}`);
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            console.log('✅ Database Connection: SUCCESS');
            console.log('✅ Profiles table: Accessible');
            
            // Try to parse response
            const result = JSON.parse(data);
            console.log(`📈 Current profiles count: ${Array.isArray(result) ? result.length : 'Unknown'}`);
            
          } else if (res.statusCode === 401) {
            console.log('❌ Authentication failed - check your anon key');
          } else if (res.statusCode === 404) {
            console.log('❌ Profiles table not found - run database migration first');
          } else {
            console.log(`❌ Connection failed with status ${res.statusCode}`);
            console.log(`Response: ${data}`);
          }
          
        } catch (e) {
          console.log('⚠️  Connected but response parsing failed:', e.message);
          console.log('Raw response:', data);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log('❌ Connection Error:', error.message);
    });
    
    req.setTimeout(10000, () => {
      console.log('❌ Connection timeout');
      req.destroy();
    });
    
    req.end();
    
  } catch (error) {
    console.log('❌ Test Error:', error.message);
  }
}

console.log('🎯 Public Radio Agents - Database Connection Test\n');
testSupabaseConnection();