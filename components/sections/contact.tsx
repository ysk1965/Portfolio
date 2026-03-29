import Image from "next/image";
import { Phone, Mail } from "lucide-react";

import { contactInfo } from "@/data/contact";
import { ContactForm } from "@/components/ui/contact-form";

const logoMap: Record<string, string> = {
  github: "/logo/logo_github.png",
  linkedin: "/logo/logo_linkedin.png",
};

export function ContactSection() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="mb-12 text-center font-heading text-3xl font-bold">
        Contact
      </h2>

      {/* Direct contact info */}
      <div className="mb-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="size-5" />
          <span>{contactInfo.phone}</span>
        </div>

        <a
          href={`mailto:${contactInfo.email}`}
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Mail className="size-5" />
          <span>{contactInfo.email}</span>
        </a>

        {/* Social links */}
        <div className="flex items-center gap-4 pt-2">
          {contactInfo.socials.map((social) => {
            const logo = logoMap[social.icon];
            if (!logo) return null;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Image
                  src={logo}
                  alt={social.platform}
                  width={24}
                  height={24}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* Contact form */}
      <ContactForm />
    </div>
  );
}
