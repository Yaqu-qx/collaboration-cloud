import { useEffect, useState } from "react";

const TextViewer = ({ url }: { url: string }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => setText(text));
  }, [url]);

  return <pre style={{ padding: '2rem', backgroundColor: "white" }}>{text}</pre>;
};

export default TextViewer;
