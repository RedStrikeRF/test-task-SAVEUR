import { FormEvent, useState } from 'react';
import { BookingFormData, BookingFormErrors } from '@/types/booking';
import { TIME_SLOTS, validateBookingForm } from '@/utils/validation';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  isSubmitting: boolean;
}

const emptyFormData: BookingFormData = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
};

export default function BookingForm({ onSubmit, isSubmitting }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>(emptyFormData);
  const [errors, setErrors] = useState<BookingFormErrors>({});

  const handleChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = () => {
    setErrors(validateBookingForm(formData));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateBookingForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Бронирование столика</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label}>Имя гостя</label>
          <input
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Номер телефона</label>
          <input
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            value={formData.phone}
            placeholder="+7XXXXXXXXXX"
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Дата</label>
            <input
              className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {errors.date && <p className={styles.errorText}>{errors.date}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Время</label>
            <select
              className={`${styles.select} ${errors.time ? styles.inputError : ''}`}
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              onBlur={handleBlur}
              disabled={isSubmitting}
            >
              <option value="">Выберите время</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && <p className={styles.errorText}>{errors.time}</p>}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Количество гостей</label>
          <input
            className={`${styles.input} ${errors.guests ? styles.inputError : ''}`}
            type="number"
            min={1}
            max={12}
            value={formData.guests}
            onChange={(e) => handleChange('guests', Number(e.target.value))}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {errors.guests && <p className={styles.errorText}>{errors.guests}</p>}
        </div>

        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Бронирую...' : 'Забронировать столик'}
        </button>
      </form>
    </div>
  );
}
