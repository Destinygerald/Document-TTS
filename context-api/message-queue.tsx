"use client";
import { createContext, useContext, useState } from "react";
import { randomBytes } from "crypto";

type MessageType = "error" | "warning" | "success";

export interface IMessageCard {
  id: string;
  label: string;
  type: MessageType;
}

interface IMessageContext {
  messages: IMessageCard[];
  addMessage: (data: Omit<IMessageCard, "id">) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
}

const MessageContext = createContext({} as IMessageContext);

export function MessageContextFunction() {
  return useContext(MessageContext);
}

export function MessageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<IMessageCard[]>([]);

  function addMessage({ label, type }: { label: string; type: MessageType }) {
    const message: IMessageCard = {
      id: randomBytes(18).toString("hex"),
      label,
      type,
    };

    setMessages((prev) => [...prev, message]);
  }

  function removeMessage(id: string) {
    setMessages((prev) => prev.filter((data) => data.id != id));
  }

  function clearMessages() {
    setMessages([]);
  }

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, removeMessage, clearMessages }}
    >
      {children}
    </MessageContext.Provider>
  );
}
