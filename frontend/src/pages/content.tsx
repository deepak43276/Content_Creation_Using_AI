// content.tsx
// Content Generator page. Shows ContentGeneratorForm, ContentOutput, and FeedbackLoop.
// NOTE: Make sure to install React and @types/react in your project.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentTypeSelector from '../components/ContentTypeSelector';
import ContentGeneratorForm from '../components/ContentGeneratorForm';

export default function ContentPage() {
  const [contentType, setContentType] = useState('blog');
  const navigate = useNavigate();

  const handleResult = (content: string) => {
    navigate('/output', { state: { content } });
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center w-full max-w-md mx-auto gap-0">
        <h1 className="text-3xl font-bold text-gray-800 text-center w-full whitespace-nowrap mb-4">Scribo</h1>
        <div className="mb-4 w-full flex justify-center">
          <ContentTypeSelector value={contentType} onChange={setContentType} />
        </div>
        <ContentGeneratorForm onResult={handleResult} contentType={contentType} />
      </div>
    </div>
  );
} 