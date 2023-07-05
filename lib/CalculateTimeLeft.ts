type timeCounterProps = {
  targetDate: Date;
};
export const calculateTimeLeft = ({ targetDate }: timeCounterProps) => {
  const now = new Date().getTime();
  const targetTime = new Date(targetDate).getTime();
  const timeLeft = targetTime - now;

  if (timeLeft < 0) {
    // If the target date has already passed, return all zeros
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Calculate the remaining days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};
