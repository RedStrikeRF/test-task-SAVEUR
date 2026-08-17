import Head from 'next/head';
import { useState } from 'react';
import BookingForm from '@/components/BookingForm';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { BookingFormData, BookingStatus } from '@/types/booking';
import styles from './index.module.css';

export default function Home() {
  const [status, setStatus] = useState<BookingStatus>('idle');
  const [booking, setBooking] = useState<BookingFormData | null>(null);

  const handleSubmit = (data: BookingFormData) => {
    setStatus('loading');
    setTimeout(() => {
      setBooking(data);
      setStatus('success');
    }, 1500);
  };

  const handleReset = () => {
    setBooking(null);
    setStatus('idle');
  };

  return (
    <>
      <Head>
        <title>SAVEUR — Бронирование столика</title>
        <meta
          name="description"
          content="Онлайн-бронирование столика в ресторане SAVEUR"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.page}>
        {status === 'success' && booking ? (
          <ConfirmationScreen booking={booking} onReset={handleReset} />
        ) : (
          <BookingForm onSubmit={handleSubmit} isSubmitting={status === 'loading'} />
        )}
      </main>
    </>
  );
}
