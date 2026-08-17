import { BookingFormData } from '@/types/booking';
import styles from './ConfirmationScreen.module.css';

interface ConfirmationScreenProps {
  booking: BookingFormData;
  onReset: () => void;
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}.${month}.${year}`;
}

export default function ConfirmationScreen({ booking, onReset }: ConfirmationScreenProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        ✓
      </div>
      <h1 className={styles.title}>Столик забронирован!</h1>
      <p className={styles.subtitle}>Мы ждём вас в указанное время</p>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Имя</span>
          <span className={styles.summaryValue}>{booking.name}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Дата</span>
          <span className={styles.summaryValue}>{formatDate(booking.date)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Время</span>
          <span className={styles.summaryValue}>{booking.time}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Количество гостей</span>
          <span className={styles.summaryValue}>{booking.guests}</span>
        </div>
      </div>

      <button className={styles.button} type="button" onClick={onReset}>
        Забронировать ещё
      </button>
    </div>
  );
}
