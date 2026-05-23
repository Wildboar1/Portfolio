import Image from "next/image";
import Link from "next/link";
import { links } from "@/config";
import { socialMedia } from "@/data";

export const Footer = () => {
  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-charcoal px-4 py-20 md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center border-t border-white/10 pt-20">
        <h2 className="mb-8 text-center font-serif text-5xl text-white md:max-w-2xl md:text-7xl lg:text-8xl">
          LET&apos;S <span className="text-gold">CONNECT.</span>
        </h2>

        <p className="mb-12 max-w-xl text-center font-sans font-light leading-relaxed text-neutral-400 md:text-lg">
          Reach out today and let&apos;s discuss how I can help you achieve your goals through premium digital experiences.
        </p>

        <Link
          href={`mailto:${links.ownerEmail}`}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full border border-gold/30 px-10 py-5 font-sans text-sm tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-charcoal"
        >
          START A CONVERSATION
        </Link>
      </div>

      <div className="relative z-10 mx-auto mt-32 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:gap-0">
        <p className="font-sans text-xs uppercase tracking-widest text-neutral-500">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <Link
            href="https://www.linkedin.com/in/preetjoshi012"
            target="_blank"
            rel="noreferrer noopener"
            className="text-gold hover:underline"
          >
            {links.ownerName}
          </Link>
        </p>

        <div className="flex items-center gap-6">
          {socialMedia.map((profile) => (
            <Link
              key={profile.name}
              href={profile.link}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-charcoal-100 transition-colors hover:border-gold/50"
              title={profile.name}
            >
              <Image
                src={profile.img}
                alt={`profile-${profile.name}`}
                width={20}
                height={20}
                className="opacity-70 transition-opacity group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
