import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Engineering Insights",
  description:
    "Articles about AI infrastructure, CTV platform development, homelab engineering, and production system architecture.",
};

export default function BlogPage() {
  return <BlogClient />;
}
