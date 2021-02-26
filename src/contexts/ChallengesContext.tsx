import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengensCompleted: number;
  levelUp: () => void;
  startNewChallenges: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenges: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number;
  currentExperience: number;
  challengensCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps,) {
  const [
    level,
    setLevel
  ] = useState(rest.level ?? 1);
  const [
    currentExperience,
    setCrrentExperience
  ] = useState(rest.currentExperience ?? 0);
  const [
    challengensCompleted,
    setChallengesCompleted
  ] = useState(rest.challengensCompleted ?? 0);
  const [
    activeChallenge,
    setActiveChallenge
  ] = useState(null);
  const [
    isLevelUpModalOpen,
    setIsLevelUpModalOpen
  ] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengensCompleted', String(challengensCompleted));
  }, [level, currentExperience, challengensCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenges() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} XP!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenges() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCrrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengensCompleted + 1);
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      levelUp,
      currentExperience,
      challengensCompleted,
      startNewChallenges,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenges,
      closeLevelUpModal
    }}>
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContext.Provider>
  )
}