import { FormEvent, useState } from 'react';
import {
  TIME_SLOTS,
  validateDate,
  validateGuests,
  validateName,
  validatePhone,
  validateTime,
} from '@/utils/validation';
import styles from './BookingForm.module.css';

export default function BookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);

  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [guestsError, setGuestsError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nErr = validateName(name);
    const pErr = validatePhone(phone);
    const dErr = validateDate(date);
    const tErr = validateTime(time);
    const gErr = validateGuests(guests);

    setNameError(nErr);
    setPhoneError(pErr);
    setDateError(dErr);
    setTimeError(tErr);
    setGuestsError(gErr);

    if (!nErr && !pErr && !dErr && !tErr && !gErr) {
      console.log({ name, phone, date, time, guests });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameError(validateName(name))}
          placeholder="Имя гостя"
        />
        {nameError && <p className={styles.error}>{nameError}</p>}
      </div>

      <div className={styles.field}>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setPhoneError(validatePhone(phone))}
          placeholder="+7XXXXXXXXXX"
        />
        {phoneError && <p className={styles.error}>{phoneError}</p>}
      </div>

      <div className={styles.field}>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          onBlur={() => setDateError(validateDate(date))}
        />
        {dateError && <p className={styles.error}>{dateError}</p>}
      </div>

      <div className={styles.field}>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onBlur={() => setTimeError(validateTime(time))}
        >
          <option value="">Выберите время</option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        {timeError && <p className={styles.error}>{timeError}</p>}
      </div>

      <div className={styles.field}>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          onBlur={() => setGuestsError(validateGuests(guests))}
        />
        {guestsError && <p className={styles.error}>{guestsError}</p>}
      </div>

      <button type="submit">Забронировать</button>
    </form>
  );
}
