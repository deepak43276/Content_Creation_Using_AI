import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ContentTypeSelector({ value, onChange }: Props) {
  return (
    <div>
      <label className="block font-semibold mb-1">Content Type</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="blog">Blog</option>
        <option value="tweet">Tweet</option>
        <option value="ad">Ad</option>
        <option value="caption">Caption</option>
        <option value="newsletter">Newsletter</option>
      </select>
    </div>
  );
} 