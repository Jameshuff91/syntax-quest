# Syntax Quest Architecture Guide

## 🏗️ How Components Connect Together

This guide explains how all the pieces of Syntax Quest work together. Understanding these connections will help you write better tests and add new features.

## 📊 Component Hierarchy

```
App.tsx
├── BrowserRouter (React Router)
├── GameProvider (Context Provider)
│   ├── Header
│   └── Routes
│       ├── HomePage
│       ├── RealmPage (JavaScript/TypeScript/React)
│       ├── NextjsRealmPage
│       └── TestingRealmPage
│           └── ErrorBoundary
│               └── ChallengeCard
│                   ├── Editor (Monaco)
│                   ├── HintModal
│                   └── useCompiler (Hook)
│                       └── Web Worker (Sandbox)
```

## 🔄 Data Flow

### 1. **Context Flow (Global State)**
```javascript
GameProvider (contexts/GameContext.tsx)
    ↓ provides
{
  completedChallenges: string[]
  attempts: { [challengeId]: number }
  addCompletedChallenge: (id) => void
  incrementAttempt: (id) => void
}
    ↓ consumed by
ChallengeCard, RealmPages
```

### 2. **Challenge Data Flow**
```javascript
challenges.ts / testingChallenges.ts
    ↓ imported by
RealmPage / TestingRealmPage
    ↓ filtered by realm & difficulty
    ↓ passed as prop to
ChallengeCard
    ↓ displays
    - title, description
    - difficulty badge
    - starter code in Editor
    - hints in HintModal
```

### 3. **Code Execution Flow**
```javascript
User writes code in Editor
    ↓ onChange
ChallengeCard state (userCode)
    ↓ on submit
useCompiler hook
    ↓ sends to
Web Worker (sandbox)
    ↓ executes safely
    ↓ returns result
ChallengeCard displays result
    ↓ if success
GameContext.addCompletedChallenge()
```

## 🧩 Key Component Interactions

### ChallengeCard ↔ Editor
- **Props Down**: `code`, `onChange`, `editorDidMount`
- **Events Up**: Code changes trigger parent state update
- **Purpose**: Keeps code state in parent for submission

### ChallengeCard ↔ HintModal
- **Props Down**: `hint`, `onClose`, `onAcceptPartialCode`
- **Events Up**: Close modal, accept hint code
- **State**: Modal visibility controlled by parent

### ChallengeCard ↔ useCompiler
- **Hook provides**: `compile()`, `result`, `isLoading`
- **Communication**: Via Web Worker for safe execution
- **Security**: Code runs in isolated sandbox

### RealmPage ↔ GameContext
- **Reads**: `completedChallenges` for progress
- **Writes**: Updates via challenge completion
- **Purpose**: Persistent progress tracking

## 🔐 Security Architecture

```
User Code Input
    ↓
useCompiler Hook
    ↓ creates
Web Worker
    ↓ runs in
Isolated Sandbox
    - No DOM access
    - No network access
    - No file system access
    - Limited globals
    - Timeout protection
    ↓ returns
Safe Results Only
```

## 🧪 Testing Strategy

### Unit Tests
Test individual components in isolation:
```javascript
// Test ChallengeCard alone
<ChallengeCard 
  challenge={mockChallenge}
  onSuccess={mockFn}
  onSelect={mockFn}
/>
```

### Integration Tests
Test connected components:
```javascript
// Test ChallengeCard + Editor + HintModal
<GameProvider>
  <ChallengeCard ... />
</GameProvider>
```

### End-to-End Tests
Test complete user flows:
```javascript
// Test: User completes a challenge
1. Navigate to realm
2. Type solution
3. Submit code
4. Verify success
5. Check progress updated
```

## 🎯 Common Patterns

### 1. **Prop Drilling Prevention**
Use Context for deeply nested data:
```javascript
// Bad: Passing through many levels
<A userData={userData}>
  <B userData={userData}>
    <C userData={userData} />
  </B>
</A>

// Good: Using Context
<UserProvider>
  <A><B><C /></B></A>
</UserProvider>
```

### 2. **State Lifting**
Keep state in the lowest common parent:
```javascript
// Editor doesn't own code state
// ChallengeCard does (parent)
const [userCode, setUserCode] = useState(starterCode);
<Editor code={userCode} onChange={setUserCode} />
```

### 3. **Effect Synchronization**
Reset state when props change:
```javascript
useEffect(() => {
  setUserCode(challenge.starterCode);
  setCurrentHint(0);
}, [challenge.id]); // Reset when challenge changes
```

## 🚀 Adding New Features

### To Add a New Realm:
1. Create `data/newRealmChallenges.ts`
2. Create `pages/NewRealmPage.tsx`
3. Add route in `App.tsx`
4. Add button in `HomePage.tsx`

### To Add a New Challenge Type:
1. Extend `Challenge` interface if needed
2. Update `ChallengeCard` to handle new type
3. Update sandbox worker for special execution
4. Add tests for new functionality

### To Add Progress Features:
1. Extend `GameContext` with new state
2. Update `GameProvider` implementation
3. Use new context values in components
4. Add persistence (localStorage/API)

## 📝 Code Examples

### Creating a Testable Component
```javascript
// Good: Testable component with clear props
export const ScoreDisplay = ({ score, maxScore, onReset }) => {
  const percentage = (score / maxScore) * 100;
  
  return (
    <div>
      <p>Score: {score}/{maxScore} ({percentage}%)</p>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

// Easy to test:
it('displays score correctly', () => {
  render(<ScoreDisplay score={7} maxScore={10} onReset={jest.fn()} />);
  expect(screen.getByText('Score: 7/10 (70%)')).toBeInTheDocument();
});
```

### Using Custom Hooks
```javascript
// Custom hook for challenge logic
export const useChallengeLogic = (challenge) => {
  const [attempts, setAttempts] = useState(0);
  const [hints, setHints] = useState([]);
  
  const attemptChallenge = useCallback(() => {
    setAttempts(a => a + 1);
    if (attempts >= 3) {
      setHints([...hints, challenge.hints[0]]);
    }
  }, [attempts, hints, challenge]);
  
  return { attempts, hints, attemptChallenge };
};
```

## 🐛 Debugging Tips

1. **React DevTools**: Inspect component props and state
2. **Network Tab**: Check worker communication
3. **Console Logs**: Add strategic logging
4. **Breakpoints**: Debug synchronous code
5. **Worker Debugging**: Use Chrome DevTools sources

## 📚 Further Learning

- **React Testing Library**: https://testing-library.com/docs/react-testing-library/intro/
- **Jest Documentation**: https://jestjs.io/docs/getting-started
- **React Patterns**: https://reactpatterns.com/
- **Web Workers**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API