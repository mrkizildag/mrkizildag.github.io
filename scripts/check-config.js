#!/usr/bin/env node

/**
 * Setup helper script for Zoa Public Web
 * This script helps validate your configuration
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Zoa Public Web - Configuration Check\n');

// Check if .env exists
const envPath = join(__dirname, '..', '.env');
if (!existsSync(envPath)) {
  console.log('❌ .env file not found');
  console.log('   Run: cp .env.example .env');
  console.log('   Then add your Supabase credentials\n');
  process.exit(1);
}

console.log('✅ .env file found');

// Check if environment variables are set
try {
  const envContent = readFileSync(envPath, 'utf-8');
  
  const hasUrl = envContent.includes('VITE_SUPABASE_URL=') && 
                 !envContent.includes('VITE_SUPABASE_URL=your_supabase_url_here') &&
                 !envContent.includes('VITE_SUPABASE_URL=\n') &&
                 !envContent.includes('VITE_SUPABASE_URL=$');
  
  const hasKey = envContent.includes('VITE_SUPABASE_ANON_KEY=') && 
                 !envContent.includes('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here') &&
                 !envContent.includes('VITE_SUPABASE_ANON_KEY=\n') &&
                 !envContent.includes('VITE_SUPABASE_ANON_KEY=$');
  
  if (hasUrl) {
    console.log('✅ VITE_SUPABASE_URL is configured');
  } else {
    console.log('⚠️  VITE_SUPABASE_URL needs to be set');
  }
  
  if (hasKey) {
    console.log('✅ VITE_SUPABASE_ANON_KEY is configured');
  } else {
    console.log('⚠️  VITE_SUPABASE_ANON_KEY needs to be set');
  }
  
  console.log('');
  
  if (hasUrl && hasKey) {
    console.log('✨ Configuration looks good! You can run:');
    console.log('   npm run dev - to start development server');
    console.log('   npm run build - to build for production');
  } else {
    console.log('📝 Please update your .env file with your Supabase credentials');
    console.log('   Find them at: https://app.supabase.io > Your Project > Settings > API');
  }
} catch (error) {
  console.log('❌ Error reading .env file:', error.message);
}

console.log('');
