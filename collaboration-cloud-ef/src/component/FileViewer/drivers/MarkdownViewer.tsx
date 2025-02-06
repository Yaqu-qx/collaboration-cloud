import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

const MarkdownViewer = ({ url }: { url: string }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, [url]);

  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default MarkdownViewer;