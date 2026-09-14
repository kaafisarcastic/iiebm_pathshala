/**
 * Photographs from https://iiebm.com/about-us/infrastructure/
 *
 * Nine tiles: the first is rendered double-size, the remaining eight fill the
 * rest of the four-column mosaic exactly.
 */

export type LifePhoto = {
  src: string;
  alt: string;
};

export const lifePhotos: LifePhoto[] = [
  {
    src: "/life/group-project.webp",
    alt: "IIEBM students working together on a group project around a laptop",
  },
  {
    src: "/life/computer-lab.webp",
    alt: "A full computer lab session at the IIEBM campus",
  },
  {
    src: "/life/auditorium-session.webp",
    alt: "A corporate session underway in the 500-seat IIEBM auditorium",
  },
  {
    src: "/life/finance-lab.webp",
    alt: "Students at work in the IIEBM analytics and finance lab",
  },
  {
    src: "/life/dining-hall.webp",
    alt: "Students at lunch in the campus dining hall",
  },
  {
    src: "/life/table-tennis.webp",
    alt: "A table tennis match in the campus recreation area",
  },
  {
    src: "/life/gym.webp",
    alt: "The on-campus gymnasium at IIEBM",
  },
  {
    src: "/life/hostel-room.webp",
    alt: "A room in the on-campus IIEBM hostel",
  },
  {
    src: "/life/sports-ground.webp",
    alt: "The open sports ground on the IIEBM campus",
  },
];
