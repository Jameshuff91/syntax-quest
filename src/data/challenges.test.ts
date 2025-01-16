import { challenges } from './challenges';

describe('challenges data structure', () => {
  it('should have at least one challenge', () => {
    expect(challenges.length).toBeGreaterThan(0);
  });

  it('each challenge should have required fields', () => {
    challenges.forEach(challenge => {
      expect(challenge).toHaveProperty('id');
      expect(challenge).toHaveProperty('title');
      expect(challenge).toHaveProperty('description');
      expect(challenge).toHaveProperty('starterCode');
      expect(challenge).toHaveProperty('solutionCode');
      expect(challenge).toHaveProperty('hints');
      expect(challenge).toHaveProperty('tests');
      expect(challenge).toHaveProperty('realm');
    });
  });

  it('each challenge should have at least one test case', () => {
    challenges.forEach(challenge => {
      expect(challenge.tests.length).toBeGreaterThan(0);
    });
  });

  it('each test case should have required fields', () => {
    challenges.forEach(challenge => {
      challenge.tests.forEach(test => {
        expect(test).toHaveProperty('description');
        expect(test).toHaveProperty('input');
        expect(test).toHaveProperty('expected');
      });
    });
  });

  it('each hint should have required fields', () => {
    challenges.forEach(challenge => {
      challenge.hints.forEach(hint => {
        expect(hint).toHaveProperty('message');
      });
    });
  });
});
