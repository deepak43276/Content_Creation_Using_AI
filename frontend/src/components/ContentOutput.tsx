// ContentOutput.tsx
// Displays generated content.
import React from 'react';

type Props = {
  content: string;
};

export default function ContentOutput({ content }: Props) {
  if (!content) return null;
  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">I 
      <h2 className="font-bold mb-2">Generated Content</h2>
      <div className="whitespace-pre-line">{content}</div>
    </div>
  );
} 