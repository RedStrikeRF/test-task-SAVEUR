import { BookingFormData } from '@/types/booking';
import styles from './ConfirmationScreen.module.css';

interface ConfirmationScreenProps {
  booking: BookingFormData;
  onReset: () => void;
}

export default function ConfirmationScreen({ booking, onReset }: ConfirmationScreenProps) {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Столик забронирован!</h1>

      <div className={styles.row}>
        <span>Имя</span>
        <span>{booking.name}</span>
      </div>
      <div className={styles.row}>
        <span>Дата</span>
        <span>{booking.date}</span>
      </div>
      <div className={styles.row}>
        <span>Время</span>
        <span>{booking.time}</span>
      </div>
      <div className={styles.row}>
        <span>Гостей</span>
        <span>{booking.guests}</span>
      </div>

      <button className={styles.button} type="button" onClick={onReset}>
        Забронировать ещё
      </button>
    </div>
  );
}
