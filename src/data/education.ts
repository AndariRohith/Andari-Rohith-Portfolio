export interface EducationItem {
  id?: string;
  degree: string;
  major?: string;
  institution: string;
  period: string;
  score: string;
}

export const education: EducationItem[] = [
  {
    id: "mca-siet",
    degree: "Master of Computer Applications (MCA)",
    major: "Computer Application",
    institution: "Siddharth Institute of Engineering & Technology, Puttur",
    period: "2024 - 2026",
    score: "CGPA 9.37 / 10",
  },
  {
    id: "bsc-sv-arts",
    degree: "Bachelor of Science (B.Sc)",
    major: "Mathematics, Electronics & Computer Science",
    institution: "SV Arts College, Tirupati",
    period: "2020 - 2023",
    score: "CGPA 6.93 / 10",
  },
  {
    id: "inter-ap-model",
    degree: "Intermediate (MPC)",
    institution: "A.P. Model School & Junior College, KVB Puram",
    period: "2018 - 2020",
    score: "CGPA 9.80 / 10",
  },
  {
    id: "ssc-ap-model",
    degree: "Secondary School (SSC)",
    institution: "A.P. Model School & Junior College, KVB Puram",
    period: "2017 - 2018",
    score: "CGPA 9.20 / 10",
  },
];
