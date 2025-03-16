"use client";
import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    // Only attempt to play if the modal is open
    if (isOpen && videoRef.current) {
      // Try to play with sound first (will trigger permission dialog in supporting browsers)
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Autoplay with sound worked!
          setAudioEnabled(true);
        }).catch(error => {
          console.log("Autoplay with sound failed:", error);
          // Fall back to muted autoplay
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play();
          }
        });
      }
    }
  }, [isOpen]);

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setAudioEnabled(true);
        }).catch(() => {
          // Some browsers require user gesture before unmuting
          if (videoRef.current) {
            videoRef.current.muted = true;
          }
        });
      }
    }
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-95 z-50">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onEnded={onClose}
          playsInline
          loop={false}
        >
          <source src="/ad.mp4" type="video/mp4" />
          Your browser does not support the video.
        </video>
        
        {!audioEnabled && (
          <button 
            onClick={handleUnmute}
            className="absolute bottom-12 right-2 px-4 py-2 bg-white text-black text-base font-medium rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            style={{ pointerEvents: "auto" }}
          >
            Enable Sound
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer; 