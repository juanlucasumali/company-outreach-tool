"use client"

import React, { useState } from 'react';
import { useResults } from '@/hooks/useResults';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const [domain, setDomain] = useState('');
  const [position, setPosition] = useState('');
  const [groqAPIKey, setGroqAPIKey] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [runId, setRunId] = useState<string | null>(null);
  const { results, loading, error } = useResults(runId, supabaseUrl, supabaseKey);
  const { toast } = useToast();
  const [expandedCards, setExpandedCards] = useState<ExpandedCardsType>({});

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
      toast({
        title: "Copied to clipboard",
        description: "The message has been copied to your clipboard.",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  interface ResultsType {
    [key: string]: string | null;
  }
  
  interface ExpandedCardsType {
    [key: string]: boolean;
  }
  
  interface ResultCardProps {
    title: string;
    content: string | null;
    isExpanded: boolean;
    onToggle: () => void;
    onCopy: (text: string) => void;
  }
  
  const ResultCard: React.FC<ResultCardProps> = ({ title, content, isExpanded, onToggle, onCopy }) => (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium capitalize">
          {title.replace(/_/g, ' ')}
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => content && onCopy(content)}
            disabled={!content}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onToggle}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`overflow-auto transition-all duration-200 ease-in-out ${isExpanded ? 'h-96' : 'h-24'}`}>
          <pre className="whitespace-pre-wrap text-sm">{content || "Loading..."}</pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const toggleCardExpansion = (key: string) => {
    setExpandedCards(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Column - Inputs */}
      <div className="lg:w-1/2 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">🏢 Company Outreach Tool</CardTitle>
            <CardDescription className='text-gray-500 mt-2' >Use a multi-agent workflow to generate your messages!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Enter website URL"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Enter position (e.g. CEO, CTO, MD)"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Enter Groq Key"
              value={groqAPIKey}
              onChange={(e) => setGroqAPIKey(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Enter Supabase URL"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Enter Supabase Key"
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
            />
            <Button
              variant="outline"
              className="w-full bg-black text-white"
              onClick={generateMessages}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate your messages →'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Results */}
      <div className="lg:w-1/2 p-6 flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md h-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Generation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {runId ? (
              <ScrollArea className="h-[calc(100vh-200px)] pr-4">
                {Object.entries(results as unknown as ResultsType).map(([key, value]) => (
                  <ResultCard 
                    key={key} 
                    title={key} 
                    content={value} 
                    isExpanded={!!expandedCards[key]}
                    onToggle={() => toggleCardExpansion(key)}
                    onCopy={copyToClipboard}
                  />
                ))}
              </ScrollArea>
            ) : (
              <p className="text-center text-gray-500 italic">No messages generated yet. Fill in the form and click 'Generate' to start.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;