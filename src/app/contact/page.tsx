import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Dominick Pescetto — AI Engineer, CTV Platform Architect, and infrastructure builder.",
};

export default function ContactPage() {
  return <ContactClient />;
}
