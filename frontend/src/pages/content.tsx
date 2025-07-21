// content.tsx
// Content Generator page. Shows ContentGeneratorForm, ContentOutput, and FeedbackLoop.
// NOTE: Make sure to install React and @types/react in your project.
import React, { useState } from 'react';
import ContentTypeSelector from '../components/ContentTypeSelector';
import ContentGeneratorForm from '../components/ContentGeneratorForm';
import ContentOutput from '../components/ContentOutput';

export default function ContentPage() {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('blog');

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center w-full max-w-md mx-auto gap-0">
        <h1 className="text-3xl font-bold text-gray-800 text-center w-full whitespace-nowrap mb-4">Content Generator</h1>
        <div className="mb-4 w-full flex justify-center">
          <ContentTypeSelector value={contentType} onChange={setContentType} />
        </div>
        <ContentGeneratorForm onResult={setContent} contentType={contentType} />
        <ContentOutput content={content} />
      </div>
    </div>
  );
} 