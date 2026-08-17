import { useState } from 'react';
import BookingForm from '@/components/BookingForm';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { BookingFormData, BookingStatus } from '@/types/booking';

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
    <main style={{ padding: 40 }}>
      {status === 'success' && booking ? (
        <ConfirmationScreen booking={booking} onReset={handleReset} />
      ) : (
        <BookingForm onSubmit={handleSubmit} isSubmitting={status === 'loading'} />
      )}
    </main>
  );
}
