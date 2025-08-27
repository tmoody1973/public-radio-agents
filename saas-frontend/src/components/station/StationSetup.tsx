'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClientSupabase } from '@/lib/supabase';
import { RadioIcon } from '@heroicons/react/24/outline';

interface StationSetupProps {
  onComplete: (station: any) => void;
}

export default function StationSetup({ onComplete }: StationSetupProps) {
  const [formData, setFormData] = useState({
    name: '',
    callSign: '',
    location: '',
    format: '',
    frequency: '',
    website: '',
    licensee: '',
    coverage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const supabase = createClientSupabase();

  const formatOptions = [
    'News/Talk',
    'Music/Talk',
    'Classical',
    'Jazz',
    'Folk/Americana',
    'College Radio',
    'Community Radio',
    'Educational',
    'Religious',
    'Other'
  ];

  const coverageOptions = [
    'Local (City/Town)',
    'Regional (County/Metro)',
    'Statewide',
    'Multi-state',
    'National'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('stations')
        .insert({
          ...formData,
          created_by: user!.id
        })
        .select()
        .single();

      if (error) {
        setError(error.message);
      } else {
        onComplete(data);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
            <RadioIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Set up your station
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us about your public radio station to get personalized assistance
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Station Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="KPBS Public Radio"
              />
            </div>

            <div>
              <label htmlFor="callSign" className="block text-sm font-medium text-gray-700">
                Call Sign *
              </label>
              <input
                id="callSign"
                name="callSign"
                type="text"
                required
                value={formData.callSign}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent uppercase"
                placeholder="KPBS"
                style={{ textTransform: 'uppercase' }}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="San Diego, CA"
              />
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                Frequency *
              </label>
              <input
                id="frequency"
                name="frequency"
                type="text"
                required
                value={formData.frequency}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="89.5 FM"
              />
            </div>

            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700">
                Format *
              </label>
              <select
                id="format"
                name="format"
                required
                value={formData.format}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select format</option>
                {formatOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="licensee" className="block text-sm font-medium text-gray-700">
                Licensee *
              </label>
              <input
                id="licensee"
                name="licensee"
                type="text"
                required
                value={formData.licensee}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="San Diego State University"
              />
            </div>

            <div>
              <label htmlFor="coverage" className="block text-sm font-medium text-gray-700">
                Coverage Area *
              </label>
              <select
                id="coverage"
                name="coverage"
                required
                value={formData.coverage}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select coverage area</option>
                {coverageOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="https://kpbs.org"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Setting up...' : 'Complete setup'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">What happens next?</span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Your AI management team will be customized for your station's format and coverage area.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}