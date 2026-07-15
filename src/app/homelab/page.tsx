import { Metadata } from "next";
import HomelabClient from "./HomelabClient";

export const metadata: Metadata = {
  title: "Homelab Infrastructure",
  description: "Production Proxmox cluster with Kubernetes, Docker, Cloudflare tunnel, and automated CI/CD. Multi-node HA setup with AI inference infrastructure.",
};

export default function HomelabPage() {
  return <HomelabClient />;
}
