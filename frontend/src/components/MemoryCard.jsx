import React, { useEffect, useState } from "react";
import { openEnvelope } from "../api/entryApi";
import "../styles/MemoryCard.css";


const MemoryCard = ({ memory, refreshEntries }) => {
  const [timeLeft, setTimeLeft] = useState("");

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeLeft = (unlockDate) => {
    const now = new Date();
    const unlock = new Date(unlockDate);

    const diff = unlock - now;

    if (diff <= 0) {
      return "Ready to open";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

 useEffect(() => {
  if (
    memory.type === "envelope" &&
    memory.status === "locked"
  ) {
    const updateCountdown = () => {
      const remaining =
        getTimeLeft(memory.unlockDate);

      setTimeLeft(remaining);

      if (
        remaining === "Ready to open"
      ) {
        refreshEntries();
      }
    };

    updateCountdown();

    const timer =
      setInterval(updateCountdown, 1000);

    return () =>
      clearInterval(timer);
  }
}, [memory, refreshEntries]);

  const handleOpen = async () => {
    try {
      await openEnvelope(memory._id);
      refreshEntries();
    } catch (err) {
      console.log(err);
      alert("Failed to open envelope.");
    }
  };

  if (memory.type === "note") {
    return (
      <div className="memory-entry journal">
        <div className="entry-top">
          <span className="entry-type">Present Journal</span>
          <span className="entry-date">{formatDate(memory.createdAt)}</span>
        </div>

        <h3>{memory.title}</h3>

        <p className="entry-desc">{memory.content}</p>

        <div className="entry-footer">
          <span>📖 Readable always</span>
          <span>Updated {formatDate(memory.updatedAt)}</span>
        </div>
      </div>
    );
  }

  if (memory.type === "envelope" && memory.status === "locked") {
    return (
      <div className="memory-entry locked">
        <div className="entry-top">
          <span className="entry-type">Locked Envelope</span>
          <span className="entry-date">{formatDate(memory.createdAt)}</span>
        </div>

        <h3>{memory.title}</h3>

        <div className="envelope-box">
          <div className="envelope">🔐</div>

          <h4>Unlocks on {formatDate(memory.unlockDate)}</h4>

          <h5 className="countdown-time">{timeLeft}</h5>

          <p>Content hidden until unlock date</p>
        </div>

        <div className="entry-footer">
          <span>🔒 Unlocks {formatDate(memory.unlockDate)}</span>
          <span>Sealed</span>
        </div>
      </div>
    );
  }

  if (memory.type === "envelope" && memory.status === "ready") {
    return (
      <div className="memory-entry archive">
        <div className="entry-top">
          <span className="entry-type">Ready To Open</span>
          <span className="entry-date">{formatDate(memory.unlockDate)}</span>
        </div>

        <h3>{memory.title}</h3>

        <p className="entry-desc">
          This envelope has reached its unlock date.
        </p>

        <div className="entry-footer">
          <span>✨ Ready</span>

          <button className="open-memory-btn" onClick={handleOpen}>
            Open
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-entry archive">
      <div className="entry-top">
        <span className="entry-type">Opened Envelope</span>
        <span className="entry-date">{formatDate(memory.openedAt)}</span>
      </div>

      <h3>{memory.title}</h3>

      <p className="entry-desc">{memory.content}</p>

      <div className="entry-footer">
        <span>📖 Opened</span>
        <span>{formatDate(memory.openedAt)}</span>
      </div>
    </div>
  );
};

export default MemoryCard;