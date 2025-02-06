import mammoth from 'mammoth';
import { useEffect, useState } from'react';

const DocxViewer = ({ url }: { url: string }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buffer) => mammoth.convertToHtml({ arrayBuffer: buffer }))
      .then((result) => setHtml(result.value));
  }, [url]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default DocxViewer;