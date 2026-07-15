import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production-grade AI infrastructure, cross-platform CTV apps, and open-source tools. Case studies in AI agent orchestration, MCP integration, and more.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
