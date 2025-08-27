'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClientSupabase } from '@/lib/supabase';
import Dashboard from '@/components/dashboard/Dashboard';
import StationSetup from '@/components/station/StationSetup';
import { Agent, Station, ChatMessage } from '@/types';
import { useRouter } from 'next/navigation';

const agents: Agent[] = [
  {
    id: 'development-director',
    name: 'Sarah Chen',
    title: 'Development Director',
    icon: '💝',
    description: 'Fundraising, membership campaigns, major gifts, and donor stewardship',
    expertise: ['Individual Giving', 'Major Gifts', 'Membership Programs', 'Grant Writing', 'Special Events']
  },
  {
    id: 'marketing-director', 
    name: 'Marcus Rodriguez',
    title: 'Marketing Director',
    icon: '📢',
    description: 'Marketing strategy, community engagement, and brand development',
    expertise: ['Social Media', 'Community Engagement', 'Brand Strategy', 'Digital Marketing', 'Public Relations']
  },
  {
    id: 'underwriting-director',
    name: 'Diana Kim',
    title: 'Underwriting Director', 
    icon: '🤝',
    description: 'Corporate partnerships, sponsorships, and business development',
    expertise: ['Corporate Partnerships', 'Sponsorship Sales', 'Business Development', 'Account Management', 'FCC Compliance']
  },
  {
    id: 'program-director',
    name: 'Jordan Taylor',
    title: 'Program Director',
    icon: '🎙️', 
    description: 'Programming strategy, content development, and broadcast operations',
    expertise: ['Program Strategy', 'Content Development', 'Talent Management', 'Audience Research', 'Broadcast Operations']
  }
];

export default function HomePage() {
  const [station, setStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClientSupabase();

  useEffect(() => {
    const loadUserStation = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('stations')
          .select('*')
          .eq('created_by', user.id)
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading station:', error);
        } else if (data) {
          setStation(data);
        }
      } catch (error) {
        console.error('Error loading station:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (!user) {
        router.push('/auth');
      } else {
        loadUserStation();
      }
    }
  }, [user, authLoading, router]);

  const handleStationSetup = (newStation: Station) => {
    setStation(newStation);
  };

  // Show loading spinner
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">📻</span>
          </div>
          <p className="text-gray-600">Loading Public Radio Agents...</p>
        </div>
      </div>
    );
  }

  // Show station setup if no station exists
  if (!station) {
    return <StationSetup onComplete={handleStationSetup} />;
  }

  // Show main dashboard
  return <Dashboard station={station} />;
}