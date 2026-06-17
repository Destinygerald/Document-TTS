"use client";
import { MessageContextFunction } from "@/context-api/message-queue";
import puter from "@heyputer/puter.js";
import { useEffect } from "react";

export function PuterAuth() {
  const { addMessage } = MessageContextFunction();

  useEffect(() => {
    async function init() {
      if (!puter) {
        addMessage({
          label: "Network Error; apps.puter.com not Found",
          type: "error",
        });
        return;
      }

      try {
        const isSignedIn = puter.auth.isSignedIn();

        if (!isSignedIn) {
          addMessage({
            label: "Signin to apps.puter.com to Continue",
            type: "warning",
          });
          await puter.auth.signIn();
        }
      } catch (err) {
        addMessage({ label: err as string, type: "error" });
        console.error(err);
      }
    }

    init();
  }, [addMessage]);

  return <></>;
}
