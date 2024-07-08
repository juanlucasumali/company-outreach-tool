"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [domain, setDomain] = useState('');
  const [position, setPosition] = useState('');
  const [groqAPIKey, setGroqAPIKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedMessages, setGeneratedMessages] = useState('');

  const generateMessages = async (e: any) => {
    e.preventDefault();
    setGeneratedMessages('');
    setLoading(true);
    console.log('Domain, position:', domain, position);

    try {
      const response = await fetch('/api/generate_messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groqAPIKey, domain, position }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedMessages(data.messages);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedMessages('An error occurred while generating messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setGroqAPIKey(localStorage.getItem('groqAPIKey') || '');
  }), [];

  return (
    <div className='flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen'>
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 pt-10 pb-10">
        {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Get started by editing&nbsp;
            <Link href="/api/python">
              <code className="font-mono font-bold">api/index.py</code>
            </Link>
          </p>
        </div> */}

        <div className="relative flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center mb-8">Generate outreach messages with AI</h1>
          <div className="w-full max-w-xl">
            <div className="flex mt-10 items-center space-x-3">
              <p className="text-left font-medium">1. Input your Groq API key here</p>
            </div>
            <textarea
              value={groqAPIKey}
              onChange={(e) => setGroqAPIKey(e.target.value)}
              rows={1}
              className="w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 p-2"
              placeholder={'e.g. gsk_WPKs8lknOajJOI3K2LMNapnJ0Sksbv9SU3NSM'}
            />

            <div className="flex mt-2 items-center space-x-3">
              <p className="text-left font-medium">2. Enter the URL of the company you&apos;d like to connect with.</p>
            </div>
            <textarea
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              rows={1}
              className="w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 p-2"
              placeholder={'e.g. https://www.bsi.uk.com/'}
            />
            
            <div className="flex mt-2 items-center space-x-3">
              <p className="text-left font-medium">3. Enter the position at the company you&apos;d like to address.</p>
            </div>
            <textarea
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              rows={1}
              className="w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 p-2"
              placeholder={'e.g. CEO, CTO, MD, etc.'}
            />
            
            <button
              className={`bg-black rounded-xl text-white font-medium px-4 py-2 mt-8 hover:bg-black/80 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={generateMessages}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate your messages →'}
            </button>
          </div>
          
          {/* TODO: Handle edge case where generatedMessages is a werid symbol dump */}
          {generatedMessages && (
            <div className="mt-8 w-full max-w-xl">
              <h2 className="text-2xl font-bold mb-4">Your generated messages:</h2>
              <div className="bg-white rounded-xl shadow-md p-4 whitespace-pre-wrap">
                {generatedMessages}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;