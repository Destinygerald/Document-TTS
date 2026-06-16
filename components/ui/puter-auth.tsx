"use client";
import puter from "@heyputer/puter.js";
import { useEffect } from "react";

export function PuterAuth() {
  useEffect(() => {
    async function init() {
      try {
        const isSignedIn = puter.auth.isSignedIn();

        if (!isSignedIn) {
          await puter.auth.signIn();
        }
      } catch (err) {
        console.error(err);
      }
    }

    init();
  }, []);
  return <></>;
}
