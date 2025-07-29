// Fun and motivational messages for different scenarios

const successMessages = [
  "🎉 Incredible! You're a coding wizard!",
  "💪 Nailed it! Your skills are leveling up!",
  "🌟 Outstanding work! You make it look easy!",
  "🚀 Blast off! You're reaching new heights!",
  "🎯 Bullseye! Perfect execution!",
  "⚡ Lightning fast! You're on fire!",
  "🏆 Champion performance! Keep crushing it!",
  "✨ Magical! Your code sparkles with brilliance!",
  "🎨 Beautiful solution! You're a code artist!",
  "🧠 Genius at work! Your logic is impeccable!",
  "💎 Flawless! You're a gem of a developer!",
  "🌈 Spectacular! You're painting with code!",
  "🔥 You're on fire! Nothing can stop you now!",
  "👑 Royalty! You rule the code kingdom!",
  "🌟 Superstar! You're shining bright!",
];

const perfectSolveMessages = [
  "⚡ PERFECT! First try victory!",
  "💯 FLAWLESS VICTORY! No hints needed!",
  "🎯 ONE SHOT, ONE SOLVE! Incredible!",
  "🏅 GOLD MEDAL PERFORMANCE! First attempt mastery!",
  "🌟 LEGENDARY! You solved it instantly!",
  "🚀 SPEED DEMON! Lightning-fast perfection!",
  "👁️ EAGLE EYE! You saw the solution immediately!",
  "🧙‍♂️ PURE WIZARDRY! First-try magic!",
  "💎 DIAMOND PRECISION! Flawless execution!",
  "🎪 SHOWSTOPPER! What a performance!",
];

const encouragementMessages = [
  "💪 Don't give up! You're closer than you think!",
  "🌱 Every mistake is a step towards mastery!",
  "🔍 Take a closer look - the answer is within reach!",
  "💡 Sometimes the simplest solution is the best!",
  "🧩 You've got this! One piece at a time!",
  "📚 Learning is a journey, not a race!",
  "🌟 Believe in yourself - you can solve this!",
  "🎯 Focus on the problem, the solution will come!",
  "🚀 Failure is just fuel for success!",
  "💭 Think different - try a new approach!",
  "🔑 The key to success is persistence!",
  "🌈 After every storm comes a rainbow!",
  "🏔️ Mountains are climbed one step at a time!",
  "🎪 The show must go on - keep trying!",
  "🦋 Transform your thinking and fly!",
];

const motivationalQuotes = [
  "\"The only way to do great work is to love what you do.\" - Steve Jobs",
  "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
  "\"First, solve the problem. Then, write the code.\" - John Johnson",
  "\"Programming isn't about what you know; it's about what you can figure out.\" - Chris Pine",
  "\"The best error message is the one that never shows up.\" - Thomas Fuchs",
  "\"Simplicity is the soul of efficiency.\" - Austin Freeman",
  "\"Make it work, make it right, make it fast.\" - Kent Beck",
  "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" - Martin Fowler",
  "\"Experience is the name everyone gives to their mistakes.\" - Oscar Wilde",
  "\"The most damaging phrase in the language is: 'We've always done it this way.'\" - Grace Hopper",
  "\"Learning to code is learning to create and innovate.\" - Enda Kenny",
  "\"The computer was born to solve problems that did not exist before.\" - Bill Gates",
  "\"Coding is today's language of creativity.\" - Maria Klawe",
  "\"The best way to predict the future is to invent it.\" - Alan Kay",
  "\"Don't worry if it doesn't work right. If everything did, you'd be out of a job.\" - Mosher's Law",
];

const streakMessages = [
  "🔥 2 in a row! You're heating up!",
  "🔥🔥 3 streak! You're on fire!",
  "🔥🔥🔥 4 streak! Unstoppable force!",
  "🔥🔥🔥🔥 5 streak! LEGENDARY!",
  "🌟💫✨ 6+ STREAK! YOU'RE A SUPERNOVA!",
  "🏆🏆🏆 EPIC STREAK! Bow to the champion!",
  "🚀🚀🚀 ASTRONOMICAL STREAK! To infinity and beyond!",
  "⚡⚡⚡ GODLIKE STREAK! Thunder and lightning!",
  "👑👑👑 ROYAL STREAK! All hail the code monarch!",
  "🌈🌈🌈 RAINBOW STREAK! Taste the rainbow of success!",
];

const levelUpMessages = [
  "🎉 LEVEL UP! Welcome to level {{level}}!",
  "⬆️ ASCENDING! You've reached level {{level}}!",
  "🌟 NEW HEIGHTS! Level {{level}} unlocked!",
  "🚀 BLAST OFF to level {{level}}!",
  "💫 EVOLUTION! You've grown to level {{level}}!",
  "🏆 PROMOTION! Welcome to level {{level}}, champion!",
  "✨ TRANSFORMATION! Level {{level}} achieved!",
  "🎯 MILESTONE! You've hit level {{level}}!",
  "🌈 SPECTACULAR! Level {{level}} is yours!",
  "👑 MAJESTIC! You reign at level {{level}}!",
];

export function getSuccessMessage(isPerfectSolve: boolean = false): string {
  if (isPerfectSolve) {
    return perfectSolveMessages[Math.floor(Math.random() * perfectSolveMessages.length)];
  }
  return successMessages[Math.floor(Math.random() * successMessages.length)];
}

export function getEncouragementMessage(): string {
  return encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
}

export function getMotivationalQuote(): string {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

export function getStreakMessage(streak: number): string {
  if (streak < 2) return "";
  if (streak > 10) streak = 10; // Cap at 10 for array safety
  
  const index = Math.min(streak - 2, streakMessages.length - 1);
  return streakMessages[index];
}

export function getLevelUpMessage(level: number): string {
  const message = levelUpMessages[Math.floor(Math.random() * levelUpMessages.length)];
  return message.replace('{{level}}', level.toString());
}

export function getChallengeCompletionMessage(
  isPerfectSolve: boolean,
  streak: number,
  attempts: number
): { main: string; extra?: string; quote?: string } {
  const main = getSuccessMessage(isPerfectSolve);
  
  const extras: string[] = [];
  
  if (streak >= 2) {
    extras.push(getStreakMessage(streak));
  }
  
  if (attempts > 5) {
    extras.push("🏅 Persistence pays off! Never give up!");
  }
  
  // Add a motivational quote occasionally (30% chance)
  const quote = Math.random() < 0.3 ? getMotivationalQuote() : undefined;
  
  return {
    main,
    extra: extras.length > 0 ? extras.join(' ') : undefined,
    quote
  };
}