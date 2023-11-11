"use client";
import React, { useEffect, useState } from "react";

const tinkHackBg = "/assets/images/countdown-bg.png";

const Home: React.FC = () => {
  const [days1, setDays1] = useState(0);
  const [hours1, setHours1] = useState(0);
  const [minutes1, setMinutes1] = useState(0);
  const [seconds1, setSeconds1] = useState(0);

  const deadline1 = new Date("2023-11-12T09:00:00");

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

    return () => {
      clearInterval(interval1);
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
    <main className="flex min-h-screen flex-col items-center p-36 bg-black text-white">
      <img src={tinkHackBg} className="bg-img" />
      <h1 className="text-5xl font-extrabold flex-col items-center text-center mt-14 mb-16 z-10">
        tink<p className="hack">HACK</p>
      </h1>

      <section className="flex-col z-50">
        <p className="text-3xl text-center m-10">Time until Finish 🧑🏻‍💻</p>
        <span className="text-9xl font-bold timer text-white text-center ">
          {formatTime(hours1)}:{formatTime(minutes1)}:{formatTime(seconds1)}
        </span>
      </section>
    </main>
  );
};

export default Home;
