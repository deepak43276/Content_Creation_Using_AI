// blog.tsx
// Blog Generator page. Shows BlogGeneratorForm, BlogOutput, and FeedbackLoop.
// NOTE: Make sure to install React and @types/react in your project.
import React, { useState } from 'react';
import BlogGeneratorForm from '../components/BlogGeneratorForm';
import BlogOutput from '../components/BlogOutput';

export default function BlogPage() {
  const [content, setContent] = useState('');

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Blog Generator</h1>
      <BlogGeneratorForm onResult={setContent} />
      <BlogOutput content={content} />
    </div>
  );
} 