"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const img  = "/assets/images/2.0.png";
const i = "/assets/images/original_i_kuthu.png";
const tinkHackBg = "/assets/images/background.svg";
const BubbleImage = "/assets/images/Bubble.svg";
const LandingPageImage3 = "/assets/images/landing_page_3.svg";

const motivationalQuotes = [
  
 "Hackathons aren’t about coding, they’re about creating the future.",
 "Every great innovation starts with a crazy idea and a sleepless night.",
 "Think. Code. Innovate. Repeat.",
 "The only way to do great work is to love what you do. – Steve Jobs",  
 "It’s not about how many times you fail, it’s about how many times you iterate.",
 "Dream big, build fast, break things, and fix them even faster.",
 "Alone we can do so little, together we can do so much. – Helen Keller",  
 "A hackathon isn’t about being the best coder, it’s about solving real problems.",
 "Great things happen when passionate minds come together.",
 "Code like there’s no tomorrow. Because the deadline is real!",
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

const Home: React.FC = () => {
  const [time, setTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, time]);

  // Quote rotation effect
  useEffect(() => {
    let quoteInterval: NodeJS.Timeout;

    if (isRunning && !isPaused && time > 0) {
      // Initial quote change to ensure we start rotating immediately
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
      
      quoteInterval = setInterval(() => {
        setCurrentQuote((prev) => {
          const nextQuote = (prev + 1) % motivationalQuotes.length;
          return nextQuote;
        });
      }, 3000); // This is already 3000ms (3 seconds), but let's make sure it's working
    }

    return () => {
      if (quoteInterval) {
        clearInterval(quoteInterval);
      }
    };
  }, [isRunning, isPaused]); // Remove 'time' from the dependency array to prevent re-renders on every second

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const format = (value: number) => (value < 10 ? `0${value}` : value);
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(10);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-36 bg-black text-white w-screen">
      <img src={tinkHackBg} className="bg-img" alt="Countdown background" />

      <div className="z-10 flex items-center justify-center h-1/4 w-screen ">
        <div className="flex flex-col items-center justify-center gap-0 w-screen relative  ">
          {/* Tink */}
          <div className="filter blur-[0.5px] font-productsansbold font-bold text-center -px-8
            text-[2.2rem] mt-20 
            sm:text-[3rem] sm:mt-20 
            md:text-[4rem] md:-mt-20 
            lg:text-[5rem] lg:-mt-14 
            relative"
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
            nk
          </div>

          {/* 2.0 Image */}
          <div className="absolute filter -blur-[8px] 
            top-[4.7rem] left-[1.6rem] w-[2rem] h-[2.4rem] 
            sm:top-[4.7rem] sm:left-[11.2rem] sm:w-[2.8rem] sm:h-[3rem] 
            md:-top-[3.8rem] md:left-[21.2rem] md:w-[4rem] md:h-[4rem] 
            lg:w-[4.5rem] lg:h-[4.6rem] lg:-top-[3.5rem] lg:left-[29.5rem]"
          >
            <Image 
              src={img} 
              alt="2.0 Image" 
              width={90}
              height={97}
              className="w-full h-full brightness-150" 
              priority
            />
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
      </div>

      {/* <h1 className="text-5xl font-extrabold flex-col items-center text-center mt-14 mb-16 z-10">
        tink<p className="hack">HACK</p>
      </h1> */}

      <section className="flex-col z-50">
        {isRunning && !isPaused && time > 0 && (
          <div className=" text-lg sm:text-2xl font-bold text-center mb-8 text-gray-400 transition-opacity duration-500 ease-in-out">
            {motivationalQuotes[currentQuote]}
          </div>
        )}

        <span className="text-7xl sm:text-9xl font-bold timer text-white text-center block mb-10">
          {formatTime(time)}
        </span>

        <div className="flex gap-6 pt-12 justify-center">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className=" px-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#E283BD] to-[#E2CF6C] bg-[#1E1E1E] rounded-[30px] border-[1px] border-[#E283BD] hover:border-[#E2CF6C] hover:shadow-lg transition-all hover:scale-105"
            >
              Start
            </button>
          ) : (
            <>
              <button
                onClick={handlePauseResume}
                className=" px-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#E283BD] to-[#E2CF6C] bg-[#1E1E1E] rounded-[30px] border-[1px] border-[#E283BD] hover:border-yellow-600 hover:shadow-lg transition-all hover:scale-105"
                >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={handleStop}
                className=" px-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#E283BD] to-[#E2CF6C] bg-[#1E1E1E] rounded-[30px] border-[1px] border-[#E283BD] hover:border-pink-600 hover:shadow-lg transition-all hover:scale-105"
                >
                Stop
              </button>
            </>
          )}
        </div>

        {time === 0 && (
          <p className="text-4xl text-center mt-8">Hackathon has ended! 🎉</p>
        )}

        
      </section>
    </main>
  );
};

export default Home;
