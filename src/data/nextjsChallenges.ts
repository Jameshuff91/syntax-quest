export const nextjsChallenges = [
  {
    id: "nextjs-intro",
    title: "Introduction to Next.js",
    description: "Welcome to the Next.js module! In this challenge, you will learn the basics of Next.js.",
    difficulty: 'easy' as const,
    category: "Next.js",
    problem: "Welcome to Next.js! Display Hello Next.js! on the screen.",
    solutionCode: "export default function Home() {\\n  return <div>Hello Next.js!</div>;\\n}",
    starterCode: "export default function Home() {\\n  return <div>{/* Your code here */}</div>;\\n}",
    tests: [
      {
        description: "Renders 'Hello Next.js!'",
        input: null,
        expected: true, // Placeholder, needs refinement for UI tests
      }
    ],
    hints: [],
    module: "nextjs",
    scope: "basic",
    type: "code",
    realm: "nextjs",
    currentAttempts: 0,
    showSolution: false,
  },
];