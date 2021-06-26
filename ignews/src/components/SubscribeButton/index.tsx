import styles from './styles.module.scss'

interface ISubscribeButtonProps {
  priceId: String;
}

export function SubscribeButton({ priceId }: ISubscribeButtonProps) {
  return (
    <button
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
}
