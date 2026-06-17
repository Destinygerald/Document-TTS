"use client";

import { IMessageCard } from "@/context-api/message-queue";
import { useEffect } from "react";
import { MessageContextFunction } from "@/context-api/message-queue";
import { message } from "@/styles";

function MessageCard({ id, label, type }: IMessageCard) {
  const { removeMessage } = MessageContextFunction();

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeMessage(id);
    }, 1200);

    return () => clearTimeout(timeout);
  });

  function typeStyling(): string {
    switch (type) {
      case "error":
        return `${message.error} ${message.loader}`;
      case "success":
        return `${message.success} ${message.loader}`;
      case "warning":
        return `${message.warning} ${message.loader}`;
    }
  }

  return (
    <div className={message.card}>
      <span>{label}</span>
      <div className={typeStyling()}></div>
    </div>
  );
}

export function MessageQueue() {
  const { messages } = MessageContextFunction();

  useEffect(() => {
    // clearMessages();
  });

  return messages[0] ? (
    <div className={message.container}>
      {messages.map((message, i) => (
        <MessageCard {...message} key={i} />
      ))}
    </div>
  ) : (
    <></>
  );
}
