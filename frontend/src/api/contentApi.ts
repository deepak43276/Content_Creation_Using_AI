// contentApi.ts
// Handles API calls to backend for content generation, feedback, etc.

export async function generateContent(payload: any): Promise<string> {
  const res = await fetch('http://localhost:8000/generate/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to generate content');
  const data = await res.json();
  return data.content;
} 