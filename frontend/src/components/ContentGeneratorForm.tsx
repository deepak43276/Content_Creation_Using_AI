// ContentGeneratorForm.tsx
import React, { useState } from 'react';
import { generateContent } from '../api/contentApi';

type Props = {
  onResult: (content: string) => void;
  contentType: string;
};

export default function ContentGeneratorForm({ onResult, contentType }: Props) {
  // Common fields
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  // Tweet fields
  const [hookStyle, setHookStyle] = useState('');
  const [threadDepth, setThreadDepth] = useState('');
  // Ad fields
  const [usp, setUsp] = useState('');
  const [platform, setPlatform] = useState('');
  const [cta, setCta] = useState('');
  // Caption fields
  const [mood, setMood] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [demographic, setDemographic] = useState('');
  // Newsletter fields
  const [sections, setSections] = useState('');
  const [personalization, setPersonalization] = useState('');
  const [goal, setGoal] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Build payload based on contentType
      let payload: any = { content_type: contentType };
      if (contentType === 'blog') {
        payload = { ...payload, seo_topic: topic, tone, target_audience: targetAudience };
      } else if (contentType === 'tweet') {
        payload = { ...payload, topic, hook_style: hookStyle, thread_depth: threadDepth };
      } else if (contentType === 'ad') {
        payload = { ...payload, usp, platform, cta };
      } else if (contentType === 'caption') {
        payload = { ...payload, mood, hashtags, demographic };
      } else if (contentType === 'newsletter') {
        payload = { ...payload, sections, personalization, goal };
      }
      const content = await generateContent(payload);
      onResult(content);
    } catch (err) {
      setError('Failed to generate content.');
    } finally {
      setLoading(false);
    }
  };

  // Add isDisabled logic for each content type
  let isDisabled = loading;
  if (contentType === 'blog') {
    isDisabled = isDisabled || !topic || !tone || !targetAudience;
  } else if (contentType === 'tweet') {
    isDisabled = isDisabled || !topic || !hookStyle || !threadDepth;
  } else if (contentType === 'ad') {
    isDisabled = isDisabled || !usp || !platform || !cta;
  } else if (contentType === 'caption') {
    isDisabled = isDisabled || !mood || !hashtags || !demographic;
  } else if (contentType === 'newsletter') {
    isDisabled = isDisabled || !sections || !personalization || !goal;
  }

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-30 blur-2xl" />
      {/* Glassmorphism card */}
      <form 
        onSubmit={handleSubmit} 
        className="relative z-10 p-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 flex flex-col items-center gap-6 max-w-md w-full mx-auto"
      >
        {/* Animated heading */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 animate-fade-in capitalize tracking-tight">{contentType} Generator</h2>
        <p className="text-gray-600 mb-4 animate-fade-in delay-100">Fill in the details to generate content</p>

        {contentType === 'blog' && (
          <>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">SEO Topic</label>
              <input 
                value={topic} 
                onChange={e => setTopic(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Enter SEO topic"
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Tone</label>
              <input 
                value={tone} 
                onChange={e => setTone(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Professional, Casual, etc."
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Target Audience</label>
              <input 
                value={targetAudience} 
                onChange={e => setTargetAudience(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Who is your audience?"
                required 
              />
            </div>
          </>
        )}

        {contentType === 'tweet' && (
          <>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Topic</label>
              <input 
                value={topic} 
                onChange={e => setTopic(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="What's the tweet about?"
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Hook Style</label>
              <input 
                value={hookStyle} 
                onChange={e => setHookStyle(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Question, Surprising fact, etc."
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Thread Depth</label>
              <input 
                value={threadDepth} 
                onChange={e => setThreadDepth(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Number of tweets in thread"
                required 
              />
            </div>
          </>
        )}

        {contentType === 'ad' && (
          <>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">USP</label>
              <input 
                value={usp} 
                onChange={e => setUsp(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Unique selling proposition"
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Platform</label>
              <input 
                value={platform} 
                onChange={e => setPlatform(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Facebook, Instagram, etc."
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">CTA</label>
              <input 
                value={cta} 
                onChange={e => setCta(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Call to action"
                required 
              />
            </div>
          </>
        )}

        {contentType === 'caption' && (
          <>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Mood</label>
              <input 
                value={mood} 
                onChange={e => setMood(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Fun, Inspirational, etc."
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Hashtags</label>
              <input 
                value={hashtags} 
                onChange={e => setHashtags(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="#example #hashtags"
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Target Demographic</label>
              <input 
                value={demographic} 
                onChange={e => setDemographic(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Age, interests, etc."
                required 
              />
            </div>
          </>
        )}

        {contentType === 'newsletter' && (
          <>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Sections</label>
              <input 
                value={sections} 
                onChange={e => setSections(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Main sections to include"
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Personalization</label>
              <input 
                value={personalization} 
                onChange={e => setPersonalization(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="How to personalize content"
                required 
              />
            </div>
            <div className="space-y-2 flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700">Goal</label>
              <input 
                value={goal} 
                onChange={e => setGoal(e.target.value)} 
                className="w-72 px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:scale-105 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                placeholder="Newsletter objective"
                required 
              />
            </div>
          </>
        )}

        {/* Animated button */}
        <button 
          type="submit"
          className={`py-2 px-8 rounded-lg font-bold opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 shadow-lg text-lg tracking-wide mt-2
            ${isDisabled
              ? 'bg-gray-400 text-white pointer-events-none cursor-not-allowed'
              : ' bg-gray-400 text-white hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-pink-600'}
          animate-fade-in delay-200`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : `Generate ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}
        </button>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-200 animate-fade-in delay-300">
            {error}
          </div>
        )}
      </form>
      {/* Animations */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}