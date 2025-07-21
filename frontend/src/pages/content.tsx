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
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Content Generator</h1>
      <ContentTypeSelector value={contentType} onChange={setContentType} />
      <ContentGeneratorForm onResult={setContent} contentType={contentType} />
      <ContentOutput content={content} />
    </div>
  );
} 