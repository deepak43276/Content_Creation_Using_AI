// ContentGeneratorForm.tsx
// Form for entering content generation parameters (topic, tone, audience, etc.).
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded max-w-md mx-auto">
      {contentType === 'blog' && (
        <>
          <div>
            <label className="block font-semibold">SEO Topic</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Tone</label>
            <input value={tone} onChange={e => setTone(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Target Audience</label>
            <input value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
        </>
      )}
      {contentType === 'tweet' && (
        <>
          <div>
            <label className="block font-semibold">Topic</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Hook Style</label>
            <input value={hookStyle} onChange={e => setHookStyle(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Thread Depth</label>
            <input value={threadDepth} onChange={e => setThreadDepth(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
        </>
      )}
      {contentType === 'ad' && (
        <>
          <div>
            <label className="block font-semibold">USP</label>
            <input value={usp} onChange={e => setUsp(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Platform</label>
            <input value={platform} onChange={e => setPlatform(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">CTA</label>
            <input value={cta} onChange={e => setCta(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
        </>
      )}
      {contentType === 'caption' && (
        <>
          <div>
            <label className="block font-semibold">Mood</label>
            <input value={mood} onChange={e => setMood(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Hashtags</label>
            <input value={hashtags} onChange={e => setHashtags(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Target Demographic</label>
            <input value={demographic} onChange={e => setDemographic(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
        </>
      )}
      {contentType === 'newsletter' && (
        <>
          <div>
            <label className="block font-semibold">Sections</label>
            <input value={sections} onChange={e => setSections(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Personalization</label>
            <input value={personalization} onChange={e => setPersonalization(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-semibold">Goal</label>
            <input value={goal} onChange={e => setGoal(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
        </>
      )}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Content'}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
} 