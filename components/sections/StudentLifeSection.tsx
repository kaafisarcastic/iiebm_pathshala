import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { lifePhotos } from "@/data/life";

export function StudentLifeSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Life on campus"
        title="Two years you actually live, not just attend"
        description="Library, labs, auditorium, hostel, gym and ground — all inside one campus on Wakad–Marunje Road."
      />

      {/*
        Nine photos in a 2×2 hero tile plus eight single tiles. That fills a
        2-column (6 rows) and a 4-column (3 rows) grid exactly, with no holes.
      */}
      <ul className="mt-12 grid auto-rows-[8.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4 sm:gap-4">
        {lifePhotos.map((photo, index) => {
          const isHero = index === 0;
          return (
            <li
              key={photo.src}
              className={`group relative overflow-hidden rounded-brand bg-canvas-alt ${
                isHero ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  isHero
                    ? "(min-width: 640px) 50vw, 100vw"
                    : "(min-width: 640px) 25vw, 50vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
