// BlogOutput.tsx
// Displays generated blog content.
import React from 'react';

type Props = {
  content: string;
};

export default function BlogOutput({ content }: Props) {
  if (!content) return null;
  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h2 className="font-bold mb-2">Generated Blog</h2>
      <div className="whitespace-pre-line">{content}</div>
    </div>
  );
} 