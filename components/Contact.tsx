import { profile } from "@/lib/data";
import { Mail, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Let&apos;s connect
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl leading-relaxed">
            I am currently open to new opportunities. Whether it is a full-time
            role, a contract, or just a conversation — reach out.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-card hover:border-foreground/30 hover:bg-secondary transition-all group"
          >
            <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Email</p>
              <p className="text-sm font-semibold text-foreground">
                {profile.email}
              </p>
            </div>
          </a>

          <a
            href={`tel:${profile.phone}`}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-card hover:border-foreground/30 hover:bg-secondary transition-all group"
          >
            <Phone className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
              <p className="text-sm font-semibold text-foreground">
                {profile.phone}
              </p>
            </div>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-card hover:border-foreground/30 hover:bg-secondary transition-all group"
          >
            <LinkedInIcon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">LinkedIn</p>
              <p className="text-sm font-semibold text-foreground">
                aditya-mishra
              </p>
            </div>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-card hover:border-foreground/30 hover:bg-secondary transition-all group"
          >
            <GitHubIcon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">GitHub</p>
              <p className="text-sm font-semibold text-foreground">adimyth</p>
            </div>
          </a>

          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-border bg-card hover:border-foreground/30 hover:bg-secondary transition-all group"
          >
            <XIcon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">X</p>
              <p className="text-sm font-semibold text-foreground">@adi_myth</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
