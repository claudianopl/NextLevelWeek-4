import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  const { challengensCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completedChallnegesContainer}>
      <span>Desafios completos</span>
      <span>{challengensCompleted}</span>
    </div>
  )
}