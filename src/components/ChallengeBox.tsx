import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const hasActiveChallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      { hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 XP</header>

          <main>
            <img src="icons/body.svg" />
            <strong>Novo desafio</strong>
            <p>É agora Claudiano, bora lá meu parça.
            Caminhe por 3 minutos e estique suas pernas
            pra você ficar saudável.</p>
          </main>

          <footer>
            <button
              type='button'
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              type='button'
              className={styles.challengeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeBoxNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level up" />
            Avance de level completando desafios
          </p>
          </div>
        )
      }
    </div>
  )
}