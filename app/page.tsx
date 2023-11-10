"use client";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [days1, setDays1] = useState(0);
  const [hours1, setHours1] = useState(0);
  const [minutes1, setMinutes1] = useState(0);
  const [seconds1, setSeconds1] = useState(0);

  const [days2, setDays2] = useState(0);
  const [hours2, setHours2] = useState(0);
  const [minutes2, setMinutes2] = useState(0);
  const [seconds2, setSeconds2] = useState(0);

  const deadline1 = new Date("2023-11-12T09:00:00");
  const deadline2 = new Date("2023-11-11T22:00:00");

  const getTime = (
    deadline: Date,
    setDays: Function,
    setHours: Function,
    setMinutes: Function,
    setSeconds: Function
  ) => {
    const time = deadline.getTime() - new Date().getTime();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    getTime(deadline1, setDays1, setHours1, setMinutes1, setSeconds1);
    const interval1 = setInterval(
      () => getTime(deadline1, setDays1, setHours1, setMinutes1, setSeconds1),
      1000
    );

    getTime(deadline2, setDays2, setHours2, setMinutes2, setSeconds2);
    const interval2 = setInterval(
      () => getTime(deadline2, setDays2, setHours2, setMinutes2, setSeconds2),
      1000
    );

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  const formatTime = (value: number) =>
    value < 10 ? "0" + value : value.toString();

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black">
      <h1 className="text-5xl font-extrabold flex-col items-center text-center mb-48">
        tink<p className="hack">HACK</p>
      </h1>

      <section className="flex-col mb-28 overflow-hidden h-60">
        <div className="anime">
          <div className="mr-12">
            <p className="text-2xl text-center m-10">Time until Finish 🧑🏻‍💻</p>
            <p className="text-9xl font-semibold timer">
              {days1 > 0 && `${days1}:`}
              {formatTime(hours1)}:{formatTime(minutes1)}:{formatTime(seconds1)}
            </p>
          </div>
          <div className="flex-col items-center">
            <p className="text-2xl text-center m-10">
              Time until First Checkpoint 🏁
            </p>
            <p className="text-9xl font-semibold timer text-black text-center">
              {days2 > 0 && `${days2}:`}
              {formatTime(hours2)}:{formatTime(minutes2)}:{formatTime(seconds2)}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
