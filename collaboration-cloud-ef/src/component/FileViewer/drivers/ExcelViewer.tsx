import { read, utils } from 'xlsx';
import { useEffect, useState } from'react';

const ExcelViewer = ({ url }: { url: string }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = read(buffer, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        setHtml(utils.sheet_to_html(sheet));
      });
  }, [url]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ExcelViewer;