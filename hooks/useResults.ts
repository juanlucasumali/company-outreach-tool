import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Results {
  company_summary: string | null;
  pain_point_analysis: string | null;
  solution_mapping: string | null;
  outreach_messages: string | null;
}

export const useResults = (runId: string | null, supabaseUrl: string, supabaseKey: string) => {
  const [results, setResults] = useState<Results>({
    company_summary: null,
    pain_point_analysis: null,
    solution_mapping: null,
    outreach_messages: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!runId || !supabaseUrl || !supabaseKey) return;

    const supabase = createClient(supabaseUrl, supabaseKey);
    setLoading(true);
    setError(null);

    // Set up real-time subscription
    const subscription = supabase
      .channel('company_outreach_changes')
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'company_outreach_tool',
          filter: `current_run=eq.${runId}`
        }, 
        (payload) => {
          console.log('Change received!', payload);
          setResults(prevResults => ({
            ...prevResults,
            ...payload.new,
          }));
          if (payload.new.outreach_messages) {
            setLoading(false);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [runId, supabaseUrl, supabaseKey]);

  return { results, loading, error };
};