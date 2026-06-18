import React, { useState } from "react";
import "../styles/WriteDesk.css";
import toast from "react-hot-toast";
import AppSidebar from "../components/AppSidebar";

import { useAuth } from "../context/AuthContext";
import { createEntry } from "../api/entryApi";

const WriteDesk = () => {
  const { currentUser } = useAuth();

  const [entryType, setEntryType] = useState("note");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  const handleDiscard = () => {
    setTitle("");
    setContent("");
    setUnlockDate("");
    setSendEmail(true);
    setEntryType("note");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please add a title and content.");
      return;
    }

    if (entryType === "envelope" && !currentUser.emailVerified) {
      toast.error("Please verify your email before creating a sealed envelope.");
      return;
    }

    if (entryType === "envelope" && !unlockDate) {
      toast.error("Please choose an unlock date.");
      return;
    }

    if (entryType === "envelope" && new Date(unlockDate) <= new Date()) {
      toast.error("Unlock date must be in the future.");
      return;
    }

    try {
      await createEntry({
        userId: currentUser.uid,
        userEmail: currentUser.email,
        type: entryType,
        title,
        content,
        unlockDate: entryType === "envelope" ? unlockDate : null,
        sendEmail: entryType === "envelope" ? sendEmail : false,
      });

      toast.success(
        entryType === "note"
          ? "Journal saved ✍️"
          : "Envelope sealed for the future 📩"
      );

      setTitle("");
      setContent("");
      setUnlockDate("");
      setSendEmail(true);
      setEntryType("note");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save entry.");
    }
  };

  return (
    <>
      <AppSidebar />

      <div className="write-wrapper">
        <div className="write-container">
          <div className="write-header">
            <p className="write-kicker">Private writing space</p>
            <h1>The Writing Desk</h1>
            <p className="writing-quote">
              Some thoughts belong to today. Some are meant to find you later.
            </p>
          </div>

          <form className="write-card" onSubmit={handleSubmit}>
            <div className="intent-row">
              <span>Compose Intent:</span>

              <div className="intent-tabs">
                <button
                  type="button"
                  className={entryType === "note" ? "active" : ""}
                  onClick={() => setEntryType("note")}
                >
                  Present Journal
                </button>

                <button
                  type="button"
                  className={entryType === "envelope" ? "active" : ""}
                  onClick={() => setEntryType("envelope")}
                >
                  Sealed Envelope
                </button>
              </div>
            </div>

            <div className="write-line"></div>

            <input
              className="title-input"
              type="text"
              placeholder="Give this moment a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="content-input"
              placeholder="Type your thoughts, memories, dreams, or truths..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            {entryType === "envelope" && (
              <div className="envelope-settings">
                <h3>Envelope Configuration</h3>

                {!currentUser.emailVerified && (
                  <p className="verify-warning">
                    Please verify your email before sealing an envelope.
                  </p>
                )}

                <div className="envelope-grid">
                  <div>
                    <label>When should it unlock?</label>

                    <input
                      type="datetime-local"
                      value={unlockDate}
                      min={new Date().toISOString().slice(0, 16)}
                      onChange={(e) => setUnlockDate(e.target.value)}
                    />

                    <p>
                      Choose a future date. Your content will stay hidden until
                      then.
                    </p>
                  </div>

                  <div>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={sendEmail}
                        onChange={(e) => setSendEmail(e.target.checked)}
                      />
                      Send email reminder
                    </label>

                    <p>
                      We will email you when this envelope is ready to open.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="write-bottom">
              <button
                type="button"
                className="discard-btn"
                onClick={handleDiscard}
              >
                Discard Draft
              </button>

              <button type="submit" className="save-btn">
                {entryType === "note" ? "Save Journal" : "Seal Into Archive"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WriteDesk;