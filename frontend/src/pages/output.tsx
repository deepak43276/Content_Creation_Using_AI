import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentOutput from '../components/ContentOutput';

export default function OutputPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const content = location.state?.content;

  React.useEffect(() => {
    if (!content) {
      navigate('/');
    }
  }, [content, navigate]);

  if (!content) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="max-w-2xl w-full mx-auto p-6">
        <ContentOutput content={content} />
      </div>
    </div>
  );
} 