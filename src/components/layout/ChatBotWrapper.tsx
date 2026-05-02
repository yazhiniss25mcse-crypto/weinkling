"use client";

import { usePathname } from "next/navigation";
import ChatBot from "./ChatBot";

const HIDDEN_ROUTES: string[] = []; // no pages hidden

export default function ChatBotWrapper() {
  const pathname = usePathname();
  if (HIDDEN_ROUTES.includes(pathname)) return null;
  return <ChatBot />;
}
