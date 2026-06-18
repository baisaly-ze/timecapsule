import React, { useState, useEffect } from "react";
import "../styles/HeroSection.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());


  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleStartJourney =() =>{
    if (currentUser){
        navigate("/dashboard");
    }else{
        navigate("/login");
    }
  }

  const handleStartWriting = () => {
    if (currentUser) {
      navigate("/write-desk");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="hero-container">
        {/* // Left side of the hero section */}
        <div className="hero-left">
          <h6>A place for your thoughts today · Treasures tomorrow </h6>
          <h1 className="hero-sub">
            Where Notes
            <br />
            Meet Memories
          </h1>
          <p>
           Some thoughts are for today. Some are meant to find you later.
          </p>

          <button className="hero-btn" onClick={handleStartJourney}>
            Start your journey
          </button>
          <button className="hs-btn-ghost">
            EXPLORE MORE →
          </button>
        </div>

        {/* Right side of the hero section */}
        <div className="hero-right">
          {/* clock block */}
          <div className="clock-block">
            <span className="clock-label">CURRENT TIME</span>

            <h2 className="live-clock">{formattedTime}</h2>

            <p className="live-date">{formattedDate}</p>
          </div>

          {/* Paper Note */}
          <div className="note-card">
            <div className="pin"></div>

            <span className="note-label">NOTES</span>

            <p className="note-text">
              Remember this for the rainy days feeling. Live it, it means
              something...
            </p>

            <span className="note-date">Oct 12</span>
          </div>

          {/* Future Letter */}
          <div className="capsule-card">
            <div className="capsule-header">
              <span>FUTURE LETTER</span>
              <div className="lock-circle">🔒</div>
            </div>

            <p className="capsule-text">
              To my future self —
              <br />
              Should be proud of how far you've come
            </p>

            <span className="unlock-date">Unlock: Jan 01, 2/27</span>
          </div>

          {/* Big Prompt Card */}
          <div className="memory-card">
            <span className="quote-mark">"  "</span>
            <h3>
              
              What deserves remembering today?
            </h3>

            <p>Capture the feeling. Present is what matters.</p>

            <button
              className="start-writing"
               onClick={handleStartWriting}
            >
              START WRITING →
            </button>

            <div className="memory-footer">
              → Write for the future, cherish the present.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
