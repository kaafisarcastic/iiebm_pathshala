import Image from "next/image";

type Logo = { name: string; file: string };

type LogoMarqueeProps = {
  logos: Logo[];
  /** Directory under /public holding the logo files. */
  dir: string;
  ext: "webp" | "png";
  /** Seconds for one full pass; longer reads calmer. */
  durationSeconds?: number;
};

/**
 * A single row of logos scrolling continuously. The list is rendered twice so
 * the track can translate by exactly -50% and loop without a visible seam.
 */
export function LogoMarquee({
  logos,
  dir,
  ext,
  durationSeconds = 45,
}: LogoMarqueeProps) {
  return (
    <div
      className="marquee-viewport relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)]"
      style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {logos.map((logo) => (
              <li
                key={`${copy}-${logo.file}`}
                className="flex h-24 w-44 shrink-0 items-center justify-center px-4 sm:w-52"
              >
                <Image
                  src={`/${dir}/${logo.file}.${ext}`}
                  alt={copy === 0 ? logo.name : ""}
                  width={208}
                  height={88}
                  className="h-auto max-h-16 w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
