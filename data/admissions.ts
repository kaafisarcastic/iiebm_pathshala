/**
 * Sources:
 *   https://iiebm.com/admission-calendar/
 *   https://iiebm.com/admission-process/
 *   https://iiebm.com/admission-faq/
 */

export type EligibilityPoint = { title: string; detail: string };

/** Admission FAQ Q.4 and Q.29. */
export const eligibility: EligibilityPoint[] = [
  {
    title: "Graduation",
    detail:
      "Graduation with 60% in aggregate (45% for reserved category). Final-year students can also apply.",
  },
  {
    title: "Entrance exam",
    detail:
      "Any one of CAT, MAT, CMAT, MH-CET, ATMA, XAT or GMAT. Any test score is sufficient to apply.",
  },
  {
    title: "Selection",
    detail:
      "Equal weight is given to the GD/PI assessment and the aptitude test score — admission is on overall score, not cut-off percentile alone.",
  },
];

export type ProcessStep = { step: string; title: string; detail: string };

/** Admission FAQ Q.5. */
export const admissionSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Enquire",
    detail:
      "Share your details and a counsellor calls you back to check eligibility and shortlist your specialisation.",
  },
  {
    step: "02",
    title: "Apply",
    detail:
      "Fill the application form and pay the application fee of Rs. 1200.",
  },
  {
    step: "03",
    title: "Submit documents",
    detail:
      "Submit photocopies of the mandatory documents before the interview — 10th, 12th, semester-wise graduation mark-sheets, entrance scorecard and government ID.",
  },
  {
    step: "04",
    title: "GD / PI",
    detail:
      "Appear for the group discussion and personal interview. It may be conducted online over video call.",
  },
  {
    step: "05",
    title: "Offer & enrolment",
    detail:
      "Receive the admission letter and prospectus, which are also used to process an education loan.",
  },
];

export type CalendarRow = { label: string; value: string };

/** Verbatim from the Admission Calendar page. */
export const admissionCalendar: CalendarRow[] = [
  { label: "Application forms open", value: "14th September 2026" },
  { label: "Application fee", value: "Rs. 1200" },
  { label: "Programme commencement", value: "June 2027" },
];

/** AICTE cut-off note, Admission FAQ Q.21. */
export const CUTOFF_NOTE =
  "As per AICTE norms, 30th June is the cut-off date. In general, IIEBM seats are not available until the last date, so applying early matters.";

export type Faq = { question: string; answer: string };

/**
 * A subset of https://iiebm.com/admission-faq/ — the questions an ad visitor
 * actually asks before enquiring. Answers are the institute's own.
 */
export const faqs: Faq[] = [
  {
    question: "What is the difference between PGDM and MBA?",
    answer:
      "PGDM is a two-year full-time Post Graduate Diploma Program in Management offered by B-schools recognised by AICTE, the Government of India's nodal body for technical education. An MBA is a degree course offered by universities and their affiliated colleges. In Maharashtra, MBA admission is governed by DTE, while PGDM admission is made at the institute's own level as per AICTE guidelines. Both are full-time management programs.",
  },
  {
    question: "Who can apply for the PGDM at IIEBM?",
    answer:
      "There are two eligibility criteria for an AICTE approved PGDM program. You must have completed graduation with 60% in aggregate (45% for reserved category), and you must have appeared for an entrance test specified by AICTE — CAT, MAT, CMAT, MH-CET, ATMA or XAT. Any one test score is sufficient to apply. Students appearing for their final year of graduation can also go through the admission process.",
  },
  {
    question: "How do I get admission to the PGDM at IIEBM?",
    answer:
      "Appear for any one all-India entrance exam (CAT, MAT, CMAT, MH-CET, ATMA or XAT), fill the application form, and submit the mandatory documents in photocopy before the interview. After the form, you appear for a GD and PI, which may be conducted online through a video call.",
  },
  {
    question: "What is the entrance exam cut-off percentile?",
    answer:
      "IIEBM uses a comprehensive selection process and gives equal importance to the GD/PI assessment and the aptitude test — CAT, MAT, ATMA, CMAT and others. Admission is not given on cut-off percentile alone but on overall score.",
  },
  {
    question: "What is the SAP-ERP specialisation?",
    answer:
      "IIEBM offers an SAP ERP specialisation with German certification in four modules: SAP-HR, SAP-Finance, SAP-Supply Chain Management, and SAP-Sales and Distribution. Students choose one module and must pass the SAP Germany certification in the fourth semester. Regular practice sessions build the functional and domain knowledge that opens up IT sector opportunities.",
  },
  {
    question: "What certifications do students receive?",
    answer:
      "Certifications come from international agencies and MNCs including Harvard Business School Online, CISI (UK), CRISIL, Safeducate, SAP (Germany) Power User, MIT USA, IBM, Microsoft, Google and Six Sigma from IIT Kharagpur.",
  },
  {
    question: "Does IIEBM provide placement support?",
    answer:
      "IIEBM guarantees 100% job assistance. On average, 250+ companies visit for campus placement. Under the multi-placement policy, students may appear for multiple placement processes, and if selected in more than one, they may choose between the offers — surrendering one so that other students can also avail the opportunity.",
  },
  {
    question: "What is the Summer Internship Project?",
    answer:
      "Companies visit campus for SIP projects and students appear for a selection process to get one. The SIP gives students 16 weeks of real-world experience in an organisation, helping them apply theory to business situations and build an understanding of the industry.",
  },
  {
    question: "Is there an education loan or scholarship facility?",
    answer:
      "IIEBM has a tie-up for education loans and assists you in applying to the bank — the admission team provides the admission letter and prospectus needed to process the loan. IIEBM also provides scholarships; contact the admission department for details. Fees are the same for all students.",
  },
  {
    question: "Does the college provide a hostel?",
    answer:
      "IIEBM provides separate hostel facilities for boys and girls, under 24-hour electronic surveillance and overseen by resident wardens and security guards. Hostels are equipped with Wi-Fi, round-the-clock hot and cold water supply, and common rooms with TV and recreational facilities. Hostel fees are additional to the course fees.",
  },
  {
    question: "Can a final-year student apply?",
    answer:
      "Yes. A final-year student who has completed all examination formalities before 30th July of that academic year must submit proof of minimum eligibility criteria before 30th November of that academic year to be eligible.",
  },
  {
    question: "How strong is the alumni network?",
    answer:
      "IIEBM has an alumni network that spans India and abroad, with alumni who actively mentor students, share industry insights and guide careers. They frequently visit campus and play a vital role in recruitment and placements.",
  },
];
