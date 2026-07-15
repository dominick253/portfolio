import { Metadata } from "next";
import AIClient from "./AIClient";

export const metadata: Metadata = {
  title: "AI Engineering",
  description:
    "AI agent orchestration frameworks, knowledge graphs, MCP servers, and production LLM inference on custom GPU hardware. Real AI engineering, not just wrappers.",
};

export default function AIPage() {
  return <AIClient />;
}
