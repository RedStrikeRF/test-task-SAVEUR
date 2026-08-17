import { FormEvent, useState } from 'react';
import styles from './BookingForm.module.css';

export default function BookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ name, phone, date, time, guests });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя гостя"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Телефон"
      />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <input
        type="number"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
      />
      <button type="submit">Забронировать</button>
    </form>
  );
}
