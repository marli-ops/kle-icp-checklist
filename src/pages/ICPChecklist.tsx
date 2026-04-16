import { useState } from "react";
import logoSvg from "@assets/logo.svg";

interface CheckItem {
  id: string;
  label: string;
  description: string;
  note?: string;
}

interface Section {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  items: CheckItem[];
  isRedFlag?: boolean;
  headerStyle: "black" | "red" | "taupe" | "charcoal";
}

const sections: Section[] = [
  {
    id: "org-financial",
    number: "1",
    title: "Organizational & Financial Profile",
    subtitle: "Size, industry, and structural fit",
    headerStyle: "black",
    items: [
      {
        id: "revenue",
        label: "Annual Revenue",
        description: "Ideally between $50M and $100M.",
        note: "Can scale down to small businesses or up to divisions of $300M+ enterprises",
      },
      {
        id: "leadership-size",
        label: "Leadership Team Size",
        description: "A core executive group of 4–8 members.",
      },
      {
        id: "staffing",
        label: "Total Staffing",
        description: "Total company size between 10 and 500 employees.",
      },
      {
        id: "industry",
        label: "Industry Alignment",
        description:
          "High affinity for Financial Services, Manufacturing, Health/Wellness, and Construction.",
      },
      {
        id: "transition",
        label: "Critical Transition",
        description: 'The company is facing a "Crisis/Crisis-Lite"',
        note: "e.g., losing money, generational shift, CIO retirement, or preparing for an exit",
      },
    ],
  },
  {
    id: "ceo-persona",
    number: "2",
    title: '"CEO Persona" Qualifiers',
    subtitle: "Mindset and personal readiness",
    headerStyle: "red",
    items: [
      {
        id: "bottleneck",
        label: "The Bottleneck Effect",
        description:
          'The leader currently operates under a "CEO does everything" model and needs to transition from "managing" to "leading".',
      },
      {
        id: "psych-readiness",
        label: "Psychological Readiness",
        description:
          'Admits to feelings of being "stuck," overwhelmed, or experiencing "Imposter Syndrome".',
      },
      {
        id: "motivation",
        label: "Core Motivation",
        description:
          "Driven by personal growth and service rather than just ego or tax efficiency.",
      },
      {
        id: "candor",
        label: "Radical Candor Fit",
        description:
          'Willing to receive "hard conversations" and constructive criticism that may lead to "red faces and tears" but ultimately better results.',
      },
    ],
  },
  {
    id: "operational",
    number: "3",
    title: "Operational Pain Points",
    subtitle: 'The "Why Now?" urgency signals',
    headerStyle: "taupe",
    items: [
      {
        id: "weeds",
        label: "In the Weeds",
        description:
          'Spending too much time on "Red" (non-energizing) tasks and failing to prioritize strategic "Green" work.',
      },
      {
        id: "friction",
        label: "Team Friction",
        description:
          'Leadership is "out of sync" with mixed messages, misunderstood priorities, or passive-aggressive behavior.',
      },
      {
        id: "ceiling",
        label: "Performance Ceilings",
        description:
          `The leader's own temperament or "Jekyll and Hyde" persona is placing an invisible ceiling on company growth.`,
      },
      {
        id: "blind-spots",
        label: "Disengagement Blind Spots",
        description:
          'Currently "working" on comfort tasks (like clearing emails) instead of acting as a catalyst.',
      },
    ],
  },
  {
    id: "investment",
    number: "4",
    title: "Investment Mindset",
    subtitle: "Commitment to ROI-driven transformation",
    headerStyle: "charcoal",
    items: [
      {
        id: "roi",
        label: "ROI vs. Cost",
        description:
          'Views coaching as a believable investment in enterprise value rather than a "cheap" consulting expense.',
      },
      {
        id: "action-bias",
        label: "Action Bias",
        description:
          'Frustrated with "slide-deck advice" and specifically looking for a firm that will "roll up their sleeves" and execute work alongside the team.',
      },
      {
        id: "systems",
        label: "Systems Thinking",
        description:
          'Ready to move beyond "transactional fixes" and implement a multi-dimensional framework (9Lens™) to solve problems.',
      },
    ],
  },
  {
    id: "red-flags",
    number: "5",
    title: "Red Flags",
    subtitle: 'Signals of a "Non-Ideal" client',
    isRedFlag: true,
    headerStyle: "red",
    items: [
      {
        id: "hobbyist",
        label: 'The "Hobbyist Leader"',
        description:
          "Reads many books but executes on nothing; seeks entertainment over transformation.",
      },
      {
        id: "closed-loop",
        label: "Closed Feedback Loop",
        description:
          "Unwilling to have their team give daily feedback on their level of engagement.",
      },
      {
        id: "safety",
        label: "Safety Deniers",
        description:
          "Refuses to create a psychologically safe environment, which is the prerequisite for the 9Lens™ framework to function.",
      },
    ],
  },
];

const COLORS = {
  red: "#c4162f",
  black: "#000000",
  white: "#ffffff",
  taupe: "#716558",
  charcoal: "#1f222c",
};

const headerStyles: Record<Section["headerStyle"], { bg: string; text: string }> = {
  black: { bg: COLORS.black, text: COLORS.white },
  red: { bg: COLORS.red, text: COLORS.white },
  taupe: { bg: COLORS.taupe, text: COLORS.white },
  charcoal: { bg: COLORS.charcoal, text: COLORS.white },
};

const totalPositive = sections
  .filter((s) => !s.isRedFlag)
  .reduce((acc, s) => acc + s.items.length, 0);

const totalRedFlags = sections
  .filter((s) => s.isRedFlag)
  .reduce((acc, s) => acc + s.items.length, 0);

const discoveryFields = [
  {
    id: "context",
    label: "Context",
    question: 'Who referred them? What was the "Personal Anchor" Amit used?',
  },
  {
    id: "reframe",
    label: "The Reframe Insight",
    question:
      `Based on their industry, what is one "Bleeding Neck" problem they likely don't realize they have?`,
  },
  {
    id: "northstar",
    label: 'The "North Star"',
    question: "What are their likely 3-year goals based on their company size?",
  },
];

export default function ICPChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const reset = () => {
    setChecked({});
    setNotes({});
  };

  const positiveChecked = sections
    .filter((s) => !s.isRedFlag)
    .flatMap((s) => s.items)
    .filter((item) => checked[item.id]).length;

  const redFlagChecked = sections
    .filter((s) => s.isRedFlag)
    .flatMap((s) => s.items)
    .filter((item) => checked[item.id]).length;

  const fitScore = Math.round((positiveChecked / totalPositive) * 100);

  const getFitResult = (): { label: string; color: string } => {
    if (redFlagChecked >= 2) return { label: "Not a Fit", color: COLORS.red };
    if (fitScore >= 80) return { label: "Perfect Fit", color: COLORS.black };
    if (fitScore >= 60) return { label: "Strong Candidate", color: COLORS.charcoal };
    if (fitScore >= 40) return { label: "Potential Fit", color: COLORS.taupe };
    return { label: "Needs Review", color: COLORS.taupe };
  };

  const fitResult = getFitResult();

  return (
    <div className="min-h-screen" style={{ background: "#f2f1ef" }}>
      <header className="sticky top-0 z-20" style={{ background: COLORS.black }}>
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <img
            src={logoSvg}
            alt="Kothari Leadership"
            className="h-7 w-auto brightness-0 invert"
          />
          <button
            onClick={reset}
            className="text-xs font-bold px-3 py-1.5 rounded transition-opacity hover:opacity-80"
            style={{ background: COLORS.red, color: COLORS.white }}
          >
            Reset All
          </button>
        </div>
      </header>

      <div style={{ background: COLORS.black }}>
        <div className="max-w-3xl mx-auto px-6 py-10 pb-12">
          <h1
            className="text-3xl font-extrabold tracking-tight mb-2 whitespace-nowrap text-center"
            style={{ color: COLORS.white }}
          >
            Ideal Client Profile &amp; Discovery Checklist
          </h1>
        </div>
      </div>

      <div style={{ background: COLORS.taupe, height: "4px" }} />

      <div className="max-w-3xl mx-auto px-6 py-6">
        <div
          className="rounded-xl border p-5 flex flex-col sm:flex-row sm:items-center gap-5"
          style={{ background: COLORS.white, borderColor: "#e0ddd9" }}
        >
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl font-black" style={{ color: fitResult.color }}>
                {fitScore}%
              </span>
              <span
                className="text-sm font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: fitResult.color === COLORS.red ? "#fce8eb" : "#ece9e6",
                  color: fitResult.color,
                }}
              >
                {fitResult.label}
              </span>
            </div>
            <div className="w-full rounded-full h-2.5" style={{ background: "#ece9e6" }}>
              <div
                className="h-2.5 rounded-full transition-all duration-700"
                style={{
                  width: `${fitScore}%`,
                  background: fitResult.color,
                }}
              />
            </div>
          </div>
          <div className="flex gap-3 sm:flex-col sm:gap-3">
            <div className="flex-1 sm:flex-none text-center px-5 py-3 rounded-lg" style={{ background: "#f5f3f1" }}>
              <div className="text-2xl font-extrabold" style={{ color: COLORS.black }}>
                {positiveChecked}
                <span className="text-base font-normal" style={{ color: COLORS.taupe }}>
                  /{totalPositive}
                </span>
              </div>
              <div className="text-xs font-medium mt-0.5" style={{ color: COLORS.taupe }}>
                Criteria Met
              </div>
            </div>
            <div
              className="flex-1 sm:flex-none text-center px-5 py-3 rounded-lg"
              style={{
                background: redFlagChecked > 0 ? "#fce8eb" : "#f5f3f1",
              }}
            >
              <div
                className="text-2xl font-extrabold"
                style={{ color: redFlagChecked > 0 ? COLORS.red : COLORS.black }}
              >
                {redFlagChecked}
                <span className="text-base font-normal" style={{ color: COLORS.taupe }}>
                  /{totalRedFlags}
                </span>
              </div>
              <div
                className="text-xs font-medium mt-0.5"
                style={{ color: redFlagChecked > 0 ? COLORS.red : COLORS.taupe }}
              >
                Red Flags
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-2">
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #e0ddd9", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
        >
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: COLORS.charcoal }}>
            <span
              className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-extrabold flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.18)", color: COLORS.white }}
            >
              ✦
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-sm leading-tight" style={{ color: COLORS.white }}>
                Discovery Context
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                Open-ended qualifiers to complete before the call
              </p>
            </div>
          </div>
          <ul style={{ background: COLORS.white }}>
            {discoveryFields.map((field, idx) => (
              <li
                key={field.id}
                style={{ borderTop: idx === 0 ? "none" : "1px solid #f0ede9" }}
                className="px-5 py-4"
              >
                <label className="block mb-1.5">
                  <span
                    className="text-xs font-bold uppercase tracking-wide"
                    style={{ color: COLORS.red }}
                  >
                    {field.label}
                  </span>
                  <span className="block text-sm mt-0.5 mb-2" style={{ color: COLORS.black }}>
                    {field.question}
                  </span>
                  <textarea
                    rows={2}
                    placeholder="Add your notes here…"
                    value={notes[field.id] ?? ""}
                    onChange={(e) => setNotes((prev) => ({ ...prev, [field.id]: e.target.value }))}
                    className="w-full rounded-lg px-3 py-2 text-sm resize-none outline-none transition-colors"
                    style={{
                      background: "#f5f3f1",
                      border: "1px solid #e0ddd9",
                      color: COLORS.black,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.taupe)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e0ddd9")}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-12 space-y-5 pt-5">
        {sections.map((section) => {
          const hStyle = headerStyles[section.headerStyle];
          const sectionChecked = section.items.filter((i) => checked[i.id]).length;
          const sectionTotal = section.items.length;

          return (
            <div
              key={section.id}
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid #e0ddd9",
                boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
              }}
            >
              <div className="px-5 py-4 flex items-center gap-3" style={{ background: hStyle.bg }}>
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-extrabold flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    color: hStyle.text,
                  }}
                >
                  {section.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-sm leading-tight" style={{ color: hStyle.text }}>
                    {section.title}
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {section.subtitle}
                  </p>
                </div>
                <span
                  className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    color: hStyle.text,
                  }}
                >
                  {sectionChecked}/{sectionTotal}
                </span>
              </div>

              <ul style={{ background: COLORS.white }}>
                {section.items.map((item, idx) => {
                  const isChecked = !!checked[item.id];
                  return (
                    <li
                      key={item.id}
                      style={{
                        borderTop: idx === 0 ? "none" : "1px solid #f0ede9",
                      }}
                    >
                      <label
                        className="flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors"
                        style={{
                          background: isChecked
                            ? section.isRedFlag
                              ? "#fce8eb"
                              : "#f0ede9"
                            : COLORS.white,
                        }}
                        onMouseEnter={(e) => {
                          if (!isChecked) (e.currentTarget as HTMLElement).style.background = "#f9f8f7";
                        }}
                        onMouseLeave={(e) => {
                          if (!isChecked) (e.currentTarget as HTMLElement).style.background = COLORS.white;
                        }}
                      >
                        <span className="mt-0.5 flex-shrink-0">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={() => toggle(item.id)}
                          />
                          <span
                            className="flex items-center justify-center w-5 h-5 rounded transition-all"
                            style={{
                              border: isChecked
                                ? `2px solid ${section.isRedFlag ? COLORS.red : COLORS.black}`
                                : "2px solid #ccc",
                              background: isChecked
                                ? section.isRedFlag
                                  ? COLORS.red
                                  : COLORS.black
                                : COLORS.white,
                            }}
                          >
                            {isChecked && (
                              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                <path
                                  d="M2 6l3 3 5-5"
                                  stroke={COLORS.white}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                        </span>
                        <span className="flex-1 min-w-0">
                          <span
                            className="block text-xs font-bold uppercase tracking-wide mb-0.5"
                            style={{ color: section.isRedFlag ? COLORS.red : COLORS.taupe }}
                          >
                            {item.label}
                          </span>
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: isChecked ? COLORS.taupe : COLORS.black }}
                          >
                            {item.description}
                          </span>
                          {item.note && (
                            <span className="block text-xs mt-0.5 italic" style={{ color: COLORS.taupe }}>
                              {item.note}
                            </span>
                          )}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <div className="pt-6 text-center">
          <p className="text-xs" style={{ color: COLORS.taupe }}>
            Kothari Leadership Enterprises · EQ+Execution™ Methodology ·{" "}
            <a
              href="https://www.kotharileadership.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: COLORS.red }}
            >
              kotharileadership.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
