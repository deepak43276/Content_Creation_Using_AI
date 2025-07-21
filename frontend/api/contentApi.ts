// contentApi.ts
// Handles API calls to backend for content generation, feedback, etc.

export async function generateBlog({ seo_topic, tone, target_audience }: {
  seo_topic: string;
  tone: string;
  target_audience: string;
}): Promise<string> {
  const res = await fetch('http://localhost:8000/generate/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seo_topic, tone, target_audience })
  });
  if (!res.ok) throw new Error('Failed to generate blog');
  const data = await res.json();
  return data.content;
} 