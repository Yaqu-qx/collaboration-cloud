import { useEffect, useState } from "react";

const TextViewer = ({ url }: { url: string }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => setText(text));
  }, [url]);

  return <pre>{text}</pre>;
};

export default TextViewer;
