"use client";

import { banner, inputs } from "@/styles";
import { useEffect, useRef, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
// import {
//   animate,
//   motion,
//   useMotionTemplate,
//   useMotionValue,
// } from "motion/react";
// import { twMerge } from "tailwind-merge";

import puter from "@heyputer/puter.js";
import { AudioResult } from "./audio-result";
import { MessageContextFunction } from "@/context-api/message-queue";
import { FiLoader } from "react-icons/fi";
import { AIGradientBorder } from "./border";

const SPEECH_OPTIONS = {
  voice: "Joanna",
  engine: "generative",
  language: "en-US",
};

function LoadingScreen({ loadingText }: { loadingText: string }) {
  return (
    <div className={banner.loading_screen}>
      <span className={banner.loader}>
        <FiLoader />
      </span>
      <span className={banner.loading_text}>{loadingText}</span>
    </div>
  );
}

export function FileInput() {
  const [pdf, setPdf] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [audioResult, setAudioResult] = useState<HTMLAudioElement[]>([]);

  const ref = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { addMessage } = MessageContextFunction();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e?.target?.files) return;

    if (e.target.files[0].type != "application/pdf") {
      addMessage({ label: "Only PDF Files are allowed", type: "warning" });
      return;
    }

    setPdf(e.target.files[0].name);
    setTitle(e.target.files[0].name);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    setFormData(formData);
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    if (e.dataTransfer.files[0].type != "application/pdf") {
      addMessage({ label: "Only PDF Files are allowed", type: "warning" });
      return;
    }

    setPdf(e.dataTransfer.files[0].name);

    const formData = new FormData();
    formData.append("file", e.dataTransfer.files[0]);

    setFormData(formData);
  }

  async function transform() {
    if (!formData) {
      addMessage({ label: "No Document detected", type: "warning" });
      return;
    }

    setLoading(true);
    setLoadingText("Extracting Text from File");
    const response = await fetch(`/api/generate-audio`, {
      method: "POST",
      body: formData,
      credentials: "same-origin",
    });

    const parsed_response = await response.json();

    if (!response.ok) {
      // dispatch(addMessage({ label: 'Error try again', type: 'failed' }))
      return;
    }
    setLoadingText("Converting Text to Audio");

    const audio_response = [];

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    for (const chunk of parsed_response.data) {
      for (const chunk_array of chunk.chunks) {
        for (const little_chunk of chunk_array) {
          const audio = await puter.ai.txt2speech(little_chunk, SPEECH_OPTIONS);
          // console.log(audio);

          if (audio.error) {
            setPdf("");
            setLoadingText("");
            setLoading(false);
            return;
          }

          audio_response.push(audio);

          await delay(300);
        }
      }
    }

    // console.log(audio_response);

    setAudioResult(audio_response);

    setPdf("");
    setLoadingText("");
    setLoading(false);
    setFormData(null);
  }

  function cancel() {
    setPdf("");
  }

  useEffect(() => {
    if (!containerRef?.current) return;

    containerRef.current.addEventListener(
      "dragover",
      handleDragEnter as unknown as EventListener,
    );
    containerRef.current.addEventListener(
      "drop",
      handleDrop as unknown as EventListener,
    );
  });

  return (
    <>
      <AIGradientBorder className={banner.input_container}>
        <div className={inputs.bg}>
          {!pdf ? (
            <>
              <span className={banner.input_text}>
                Drag and Drop/Select Files
              </span>
              <span className={banner.input_icon}>
                <IoCloudUpload />
              </span>
              <div className={inputs.file_input_div} ref={containerRef}>
                <input
                  type="file"
                  className={inputs.file_input}
                  ref={ref}
                  value={pdf}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <div className={inputs.file_data}>
              <span> {pdf} </span>
              <div className={inputs.btn_ctn}>
                <button
                  className={inputs.btn}
                  onClick={transform}
                  disabled={loading}
                >
                  Transform
                </button>
                <button
                  className={`${inputs.btn} ${inputs.cancel_btn}`}
                  onClick={cancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </AIGradientBorder>
      {loading && <LoadingScreen loadingText={loadingText} />}
      {audioResult[0] ? (
        <AudioResult title={title} audios={audioResult} />
      ) : (
        <></>
      )}
    </>
  );
}
