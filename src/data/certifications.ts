export interface CertificationItem {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  type: "certification" | "training" | "achievement";
}

export const certifications: CertificationItem[] = [
  {
    id: "cert-inventateq",
    title: "Data Science Training",
    issuer: "Inventateq, Bengaluru",
    date: "May 2026 - Present",
    type: "training"
  },
  {
    id: "cert-forage-deloitte",
    title: "Deloitte Australia Data Analytics Job Simulation",
    issuer: "Forage",
    date: "Mar 2026",
    credentialId: "H7SXPQ6NxQG3RjiP",
    url: "TODO",
    type: "certification"
  },
  {
    id: "cert-hackerrank-sql",
    title: "SQL (Certified)",
    issuer: "HackerRank",
    date: "Apr 2026 - May 2026",
    url: "TODO",
    type: "certification"
  },
  {
    id: "cert-hackerrank-python",
    title: "Python (Certified)",
    issuer: "HackerRank",
    date: "Apr 2026 - May 2026",
    url: "TODO",
    type: "certification"
  },
  {
    id: "cert-simplilearn-python",
    title: "Python",
    issuer: "Simplilearn",
    date: "Nov 2024 - Dec 2024",
    url: "TODO",
    type: "certification"
  },
  {
    id: "achieve-aarohan",
    title: "Research Paper Presentation: Robotics, IoT and AI",
    issuer: "AAROHAN 3.0",
    date: "Aug 2025",
    type: "achievement"
  },
  {
    id: "achieve-hackfest",
    title: "Participant, Siddharth Hackfest 2K26",
    issuer: "Siddharth Institute",
    date: "2026",
    type: "achievement"
  },
  {
    id: "achieve-quest",
    title: "Participant, Siddharth Quest 2K25 & 2K26",
    issuer: "Siddharth Institute",
    date: "2025 - 2026",
    type: "achievement"
  },
  {
    id: "achieve-workshop-etl",
    title: "Workshop on Data Warehousing and ETL Tools",
    issuer: "Workshop attendee",
    date: "",
    type: "achievement"
  },
];
