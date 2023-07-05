import React, { useEffect, useState } from "react";

type timeCounterProps = {
  targetDate: Date;
};

export default function TimeCounter({ targetDate }: timeCounterProps) {
  const calculateTimeLeft = () => {
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Update the countdown every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="">
      {timeLeft.minutes == 0 && timeLeft.hours == 0 && timeLeft.seconds == 0 ? (
        <div className="flex flex-col my-3">
          <span className=" w-40">👋🏻</span>
          <span className=" w-40">Gone~</span>
        </div>
      ) : (
        <div className="flex flex-col">
          <span className=" w-40">🚇</span>
          {timeLeft.hours != 0 ? <span>{timeLeft.hours} hours</span> : null}
          <span>{timeLeft.minutes} minutes</span>
          {/* <span>{timeLeft.seconds} seconds</span> */}
        </div>
      )}
    </div>
  );
}
