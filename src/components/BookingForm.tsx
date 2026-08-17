import { FormEvent, useState } from 'react';
import {
  BookingFormData,
  BookingFormErrors,
} from '@/types/booking';
import {
  formatName,
  MAX_GUESTS,
  MIN_GUESTS,
  TIME_SLOTS,
  validateBookingForm,
  validateDate,
  validateGuests,
  validateName,
  validatePhone,
  validateTime,
} from '@/utils/validation';
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

function todayISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function BookingForm({ onSubmit, isSubmitting }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>(emptyFormData);
  const [errors, setErrors] = useState<BookingFormErrors>({});

  const validateField = (field: keyof BookingFormData, value: string | number) => {
    let error: string | null = null;
    switch (field) {
      case 'name':
        error = validateName(String(value));
        break;
      case 'phone':
        error = validatePhone(String(value));
        break;
      case 'date':
        error = validateDate(String(value));
        break;
      case 'time':
        error = validateTime(String(value));
        break;
      case 'guests':
        error = validateGuests(Number(value));
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error ?? undefined }));
  };

  const handleChange = (
    field: keyof BookingFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof BookingFormData) => {
    if (field === 'name') {
      const formatted = formatName(formData.name);
      setFormData((prev) => ({ ...prev, name: formatted }));
      validateField('name', formatted);
      return;
    }
    validateField(field, formData[field]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formErrors = validateBookingForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Бронирование столика</h1>
      <p className={styles.subtitle}>
        Заполните форму, и мы забронируем для вас столик
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Имя гостя
          </label>
          <input
            id="name"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            type="text"
            value={formData.name}
            placeholder="Иван Иванов"
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            disabled={isSubmitting}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Номер телефона
          </label>
          <input
            id="phone"
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            type="tel"
            value={formData.phone}
            placeholder="+7XXXXXXXXXX"
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            disabled={isSubmitting}
          />
          {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="date">
              Дата
            </label>
            <input
              id="date"
              className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
              type="date"
              min={todayISODate()}
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              onBlur={() => handleBlur('date')}
              disabled={isSubmitting}
            />
            {errors.date && <p className={styles.errorText}>{errors.date}</p>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="time">
              Время
            </label>
            <select
              id="time"
              className={`${styles.select} ${errors.time ? styles.inputError : ''}`}
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              onBlur={() => handleBlur('time')}
              disabled={isSubmitting}
            >
              <option value="" disabled>
                Выберите время
              </option>
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
          <label className={styles.label} htmlFor="guests">
            Количество гостей
          </label>
          <input
            id="guests"
            className={`${styles.input} ${errors.guests ? styles.inputError : ''}`}
            type="number"
            min={MIN_GUESTS}
            max={MAX_GUESTS}
            value={formData.guests}
            onChange={(e) => handleChange('guests', Number(e.target.value))}
            onBlur={() => handleBlur('guests')}
            disabled={isSubmitting}
          />
          {errors.guests && <p className={styles.errorText}>{errors.guests}</p>}
        </div>

        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
          {isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
          {isSubmitting ? 'Бронирую...' : 'Забронировать столик'}
        </button>
      </form>
    </div>
  );
}
