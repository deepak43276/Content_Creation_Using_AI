// BlogGeneratorForm.tsx
// Form for entering blog generation parameters (SEO topic, tone, audience).
import React, { useState } from 'react';
import { generateBlog } from '../api/contentApi';

type Props = {
  onResult: (content: string) => void;
};

export default function BlogGeneratorForm({ onResult }: Props) {
  const [seoTopic, setSeoTopic] = useState('');
  const [tone, setTone] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const content = await generateBlog({
        seo_topic: seoTopic,
        tone,
        target_audience: targetAudience
      });
      onResult(content);
    } catch (err) {
      setError('Failed to generate blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded max-w-md mx-auto">
      <div>
        <label className="block font-semibold">SEO Topic</label>
        <input value={seoTopic} onChange={e => setSeoTopic(e.target.value)} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block font-semibold">Tone</label>
        <input value={tone} onChange={e => setTone(e.target.value)} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block font-semibold">Target Audience</label>
        <input value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="w-full border p-2 rounded" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Blog'}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
} 