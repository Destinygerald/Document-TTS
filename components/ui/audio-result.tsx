"use client";

import { results } from "@/styles";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";

export function AudioResult({
  audios,
  title,
}: {
  audios: HTMLAudioElement[];
  title: string;
}) {
  const [audioObject, setAudioObject] = useState<{ url: string }[]>([]);

  async function handleAudio() {
    const result = [];

    // console.log("Running");

    for (const audio of audios) {
      const data = await fetch(audio.src);
      const blob = await data.blob();

      // const text = (await data.text()).toString();

      // console.log(data);
      // console.log(blob);
      // console.log("************************************************");

      const url = URL.createObjectURL(blob);
      // console.log("url ", url);

      // setAudioObject(prev => [...prev, { url, text }]);
      result.push({ url });
    }

    setAudioObject(result);
  }

  useEffect(() => {
    handleAudio();
  }, []);

  return (
    <div className={results.container}>
      <span className={results.title}>{title || "Title"}</span>
      <div className={`${results.list} scroller`}>
        <div className={results.list_inner}>
          {audioObject.map((item, i) => (
            <div key={i} className={results.list_items}>
              <audio src={item.url} controls className={results.audio} />
              <a href={item.url} download={`${title}-page_${i + 1}.mp3`}>
                <FiDownload />
              </a>
              {/* {`${title}-page ${i + 1}`} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
