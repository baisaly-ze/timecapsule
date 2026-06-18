import React, { useState } from "react";
import {
  updateEntry,
  deleteEntry,
  openEnvelope,
} from "../api/entryApi";

const EntryModal = ({
  selectedEntry,
  closeModal,
  refreshEntries,
}) => {
  if (!selectedEntry) {
    return null;
  }

  const [entryData, setEntryData] = useState(selectedEntry);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(selectedEntry.title);
  const [content, setContent] = useState(selectedEntry.content);

  const isLocked =
    entryData.type === "envelope" &&
    entryData.status === "locked";

  const isReady =
    entryData.type === "envelope" &&
    entryData.status === "ready";

  const isOpened =
    entryData.type === "envelope" &&
    entryData.status === "opened";

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedEntry = await updateEntry(entryData._id, {
        title,
        content,
      });

      setEntryData(updatedEntry);
      setIsEditing(false);
      refreshEntries();
    } catch (err) {
      console.log(err);
      alert("Failed to update entry.");
    }
  };

  const handleOpenEnvelope = async () => {
    try {
      const openedEntry = await openEnvelope(entryData._id);

      setEntryData(openedEntry);
      setTitle(openedEntry.title);
      setContent(openedEntry.content);

      refreshEntries();
    } catch (err) {
      console.log(err);
      alert("Failed to open envelope.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEntry(entryData._id);
      refreshEntries();
      closeModal();
    } catch (err) {
      console.log(err);
      alert("Failed to delete entry.");
    }
  };

  return (
    <div className="entry-modal-overlay">
      <div className="entry-modal">
        <button
          className="modal-close-btn"
          onClick={closeModal}
        >
          ✕
        </button>

        {isEditing ? (
          <>
            <input
              className="modal-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="modal-content-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="discard-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="entry-type">
              {entryData.type === "note"
                ? "Present Journal"
                : isLocked
                ? "Locked Envelope"
                : isReady
                ? "Ready Envelope"
                : isOpened
                ? "Opened Envelope"
                : "Envelope"}
            </span>

            <h2>{entryData.title}</h2>

            {isLocked ? (
              <div className="locked-modal-message">
                <div className="locked-modal-icon">🔐</div>

                <h3>This envelope is still sealed</h3>

                <p>
                  You can open it on{" "}
                  {formatDate(entryData.unlockDate)}.
                </p>

                <p className="locked-note">
                  The content will stay hidden until the unlock date.
                </p>
              </div>
            ) : isReady ? (
              <div className="locked-modal-message">
                <div className="locked-modal-icon">💌</div>

                <h3>This envelope is ready to open</h3>

                <p>
                  Open it now to reveal the memory you sealed for this day.
                </p>
              </div>
            ) : (
              <p className="modal-content">
                {entryData.content}
              </p>
            )}

            <div className="modal-actions">
              {entryData.type === "note" && (
                <button
                  className="discard-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}

              {isReady && (
                <button
                  className="save-btn"
                  onClick={handleOpenEnvelope}
                >
                  Open Envelope
                </button>
              )}

              <button
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EntryModal;