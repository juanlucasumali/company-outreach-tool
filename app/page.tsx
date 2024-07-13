"use client";

import { useResults } from '@/hooks/useResults';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [domain, setDomain] = useState('');
  const [position, setPosition] = useState('');
  const [groqAPIKey, setGroqAPIKey] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [runId, setRunId] = useState<string | null>(null);

  const { results, loading, error } = useResults(runId, supabaseUrl, supabaseKey);

  const generateMessages = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRunId = uuidv4();
    setRunId(newRunId);

    try {
      const response = await fetch('https://company-outreach-tool-ny6iukcxna-uc.a.run.app/api/generate_messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groqAPIKey, domain, position, runId: newRunId, supabaseUrl, supabaseKey }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data: ", data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // TODO: Replace everything with ShadCN components.
  return (
    <div className='flex max-w-full mx-auto flex-row h-screen'>
      {/* Left Column - Inputs (Fixed) */}
      <div className="w-1/2 p-10 overflow-y-auto fixed left-0 top-10 bottom-30">
        <h1 className="text-4xl font-bold text-left mb-8">Generate outreach messages with AI</h1>
        
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-left font-medium mb-2">1. Input your Groq API key here</p>
            <textarea
              value={groqAPIKey}
              onChange={(e) => setGroqAPIKey(e.target.value)}
              rows={1}
              className="w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 whitespace-nowrap"
              placeholder={'e.g. gsk_WPKs8lknOajJOI3K2LMNapnJ0Sksbv9SU3NSM'}
            />
          </div>

          <div>
            <p className="text-left font-medium mb-2">2. Enter your Supabase URL and key</p>
            <div className="flex space-x-4">
              <textarea
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                rows={1}
                placeholder=" Supabase URL"
                className="w-1/2 resize-none rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2  whitespace-nowrap"
              />
              <textarea
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                rows={1}
                placeholder=" Supabase Key"
                className="w-1/2 resize-none rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2 whitespace-nowrap"
              />
            </div>
          </div>

          <div>
            <p className="text-left font-medium mb-2">3. Enter the URL of the company you&apos;d like to connect with.</p>
            <textarea
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              rows={1}
              className="w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
              placeholder={'e.g. https://www.bsi.uk.com/'}
            />
          </div>

          <div>
            <p className="text-left font-medium mb-2">4. Enter the position at the company you&apos;d like to address.</p>
            <textarea
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              rows={1}
              className="w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
              placeholder={'e.g. CEO, CTO, MD, etc.'}
            />
          </div>
          
          <button
            className={`bg-black rounded-xl text-white font-medium px-4 py-2 mt-4 hover:bg-black/80 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={generateMessages}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate your messages →'}
          </button>
        </div>
      </div>

      {/* Right Column - Results (Scrollable) */}
      <div className="w-1/2 p-8 bg-gray-100 overflow-y-auto ml-[50%]">
        {runId && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-left">Generation Progress:</h2>
            {error && <p className="text-red-500 text-left">{error}</p>}
            {Object.entries(results).map(([key, value]) => (
              <div key={key} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold capitalize text-left">{key.replace(/_/g, ' ')}:</h3>
                  {value && (
                    <button
                      onClick={() => copyToClipboard(value)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Copy
                    </button>
                  )}
                </div>
                {value === null ? (
                  <p className="italic text-gray-500 text-left">Loading...</p>
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-4 text-left overflow-y-auto h-[200px]">
                    <pre className="whitespace-pre-wrap">{value}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;