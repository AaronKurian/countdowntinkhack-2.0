"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";
// import { Cursor } from "react-text-cursor";

const img  = "/assets/images/2.0.png";
const i = "/assets/images/original_i_kuthu.png";
const tinkHackBg = "/assets/images/background.svg";
// const BubbleImage = "/assets/images/Bubble.svg";
// const LandingPageImage3 = "/assets/images/landing_page_3.svg";

const motivationalQuotes = [
  
 "Hackathons aren't about coding, they're about creating the future.",
 "Every great innovation starts with a crazy idea and a sleepless night.",
 "Think. Code. Innovate. Repeat.",
 "The only way to do great work is to love what you do. – Steve Jobs",  
 "It's not about how many times you fail, it's about how many times you iterate.",
 "Dream big, build fast, break things, and fix them even faster.",
 "Alone we can do so little, together we can do so much. – Helen Keller",  
 "A hackathon isn't about being the best coder, it's about solving real problems.",
 "Great things happen when passionate minds come together.",
 "Code like there's no tomorrow. Because the deadline is real!",
 "Sleep is optional. Innovation is not.",
 "Success is built in the hours when others are resting.",
  // "You can do it! 💪",
  // "Keep coding, keep building! 🚀",
  // "All the best! ⭐",
  // "Innovation starts here! 💡",
  // "Turn coffee into code! ☕",
  // "Debug like a pro! 🔍",
  // "Create something awesome! 🌟",
  // "Think. Code. Innovate. 🎯",
];

const formatNumber = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

const Home: React.FC = () => {
  // Initialize all states with client-side check
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showVideo, setShowVideo] = useState(false);
  const [lastVideoTime, setLastVideoTime] = useState(Date.now());
  const [isPaused, setIsPaused] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Add this effect to handle client-side initialization
  useEffect(() => {
    setIsClient(true);
    
    // Load saved states from localStorage
    if (typeof window !== 'undefined') {
      const savedTimer = localStorage.getItem('timerState');
      const savedIsStarted = localStorage.getItem('isStarted') === 'true';
      const savedIsPaused = localStorage.getItem('isPaused') === 'true';
      
      if (savedTimer && savedIsStarted) {
        setTimeLeft(JSON.parse(savedTimer));
        setIsStarted(savedIsStarted);
        setIsPaused(savedIsPaused);
      }
    }
  }, []);

  // Timer effect
  useEffect(() => {
    const targetDate = new Date('2025-03-23T10:00:00Z');
    
    let timer: NodeJS.Timeout;
    if (!isPaused && isStarted) {
      const updateTimer = () => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();
        
        if (difference < 0) {
          clearInterval(timer);
          const resetState = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          setTimeLeft(resetState);
          setIsStarted(false);
          if (typeof window !== 'undefined') {
            localStorage.setItem('timerState', JSON.stringify(resetState));
            localStorage.setItem('isStarted', 'false');
          }
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const newTimeLeft = { days, hours, minutes, seconds };
        setTimeLeft(newTimeLeft);
        if (typeof window !== 'undefined') {
          localStorage.setItem('timerState', JSON.stringify(newTimeLeft));
        }
      };

      // Initial update
      updateTimer();
      // Set up interval
      timer = setInterval(updateTimer, 1000);
    }

    return () => clearInterval(timer);
  }, [isPaused, isStarted]);

  useEffect(() => {
    // Initial quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setCurrentQuote(motivationalQuotes[randomIndex]);

    // Quote rotation
    const quoteTimer = setInterval(() => {
      const newIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[newIndex]);
    }, 5000);

    return () => clearInterval(quoteTimer);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setIsPaused(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isStarted', 'true');
      localStorage.setItem('isPaused', 'false');
    }
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsPaused(true);
    setIsStarted(false);
    const resetState = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    setTimeLeft(resetState);
    // Clear localStorage only on client side
    if (typeof window !== 'undefined') {
      localStorage.removeItem('timerState');
      localStorage.removeItem('isPaused');
      localStorage.removeItem('isStarted');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-36 bg-black text-white w-screen font-satoshi relative">
      <img src={tinkHackBg} className="bg-img absolute inset-0 w-full h-full object-cover" alt="Countdown background" />

      <div className="z-10 flex flex-col items-center justify-center w-full max-w-4xl">
        {/* Title Section */}
        <div className="flex flex-col items-center justify-center mb-16">
          {/* Tink */}
          <div className="filter blur-[0.5px] font-productsansbold font-bold text-center relative
            text-[2.2rem] mt-20 
            sm:text-[3rem] sm:mt-20 
            md:text-[4rem] md:-mt-20 
            lg:text-[5rem] lg:-mt-14"
          >
            T
            <span className="relative inline-block">
              i
              <Image
                src={i}
                alt="Dot Image"
                width={38}
                height={30}
                className="absolute filter -blur-[8px] 
                top-[0.6rem] left-[0.1px] w-[1rem] h-[10px] 
                sm:top-[0.8rem] sm:left-[0.1px] sm:w-[12px] sm:h-[14px] 
                md:w-[24px] md:h-[22px] md:top-[1rem] md:left-[0.0rem] 
                lg:top-[1.5rem] lg:-left-[1.3px] lg:w-[28px] lg:h-[24px] lg:pl-0.5 
                rounded-3xl"
              />
            </span>
            n
            {/* 2.0 Image - Positioned above 'n' */}
            <div className="absolute filter -blur-[8px] -top-4 right-5
              max-lg:right-2 max-lg:-top-6
              max-md:right-4 max-md:-top-1
              max-sm:-top-1 max-sm:right-3">
              <Image
                src={img}
                alt="2.0 Image"
                width={96}
                height={96}
                className="w-24 h-24 brightness-150 max-md:w-12 max-md:h-12 max-sm:w-9 max-sm:h-9"
                priority
              />
            </div>
            k
          </div>

          {/* HACK */}
          <div className="relative">
            <h1 className="relative z-10 blur-[0.1px] sm:blur-[0.2px] font-khuja font-medium text-center 
              text-[1.6rem] -mt-3 -pl-1 mb-16    
              sm:text-[2rem] sm:-mt-4 sm:pl-2 
              md:text-[2.7rem] md:-mt-5 md:pl-2 md:opacity-90
              lg:text-[3.3rem] leading-none scale-y-[1.2] lg:-mt-6 lg:pl-4 
              bg-gradient-to-br from-[#f3f302] via-[#e23be6] to-[#0000ff] text-transparent bg-clip-text"
            >
              <span className="relative inline-block">
                <span className="absolute -z-10 text-transparent bg-clip-text bg-gradient-to-br from-[#f3f302] via-[#e23be6] to-[#0000ff] 
                  text-[1.6rem] -top-[1px] -left-0.5
                  sm:text-[2rem] sm:-top-0.4 sm:-left-0.5
                  md:text-[2.7rem] md:-top-0.5 md:-left-0.5
                  lg:text-[3.3rem] lg:-left-1 blur-[0.6px] md:blur-[1px] lg:-top-0.5" 
                  style={{
                    transform: 'translateX(3px) translateY(1px) scale(0.999)',
                  }}
                >
                  HACK
                </span>
                <span className="relative">HACK</span>
              </span>
            </h1>
          </div>
        </div>

        {/* Timer Section */}
        {isClient && (
          <div className="flex flex-col items-center justify-center w-full">
            {/* Quote Section - Fixed Height */}
            <div className="flex items-center justify-center mb-6 -mt-16">
              {currentQuote && (
                <p className="text-xl font-medium text-gray-300 italic text-center px-4">
                  "{currentQuote}"
                </p>
              )}
            </div>

            {/* Timer Display - Fixed Height */}
            <div className="flex flex-col items-center justify-center h-40">
              <div className="flex items-center text-9xl font-bold">
                <span>{formatNumber(timeLeft.days)}</span>
                <span className="mx-4">:</span>
                <span>{formatNumber(timeLeft.hours)}</span>
                <span className="mx-4">:</span>
                <span>{formatNumber(timeLeft.minutes)}</span>
                <span className="mx-4">:</span>
                <span>{formatNumber(timeLeft.seconds)}</span>
              </div>
            </div>

            {/* Buttons Section - Fixed Height */}
            <div className="h-20 flex items-center justify-center mt-8">
              {!isStarted ? (
                <button
                  onClick={handleStart}
                className={` px-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#E283BD] to-[#E2CF6C] bg-[#1E1E1E] rounded-[30px] border-[1px] border-[#E283BD] hover:border-[#E2CF6C] hover:shadow-lg transition-all hover:scale-105`}
                >
                  Start
                </button>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={handlePauseResume}
                  className={`px-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#E283BD] to-[#E2CF6C] bg-[#1E1E1E] rounded-[30px] border-[1px] border-[#E283BD] hover:border-[#E2CF6C] hover:shadow-lg transition-all hover:scale-105`}
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={handleStop}
                  className={`px-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#E283BD] to-[#E2CF6C] bg-[#1E1E1E] rounded-[30px] border-[1px] border-[#E283BD] hover:border-[#E2CF6C] hover:shadow-lg transition-all hover:scale-105`}
                  >
                    Stop
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <VideoPlayer 
          isOpen={showVideo} 
          onClose={handleCloseVideo}
        />
      </div>
    </main>
  );
};

export default Home;
