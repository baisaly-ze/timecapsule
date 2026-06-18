import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

import MemoryCard from "../components/MemoryCard";
import AppSidebar from "../components/AppSidebar";
import { useAuth } from "../context/AuthContext";
import { getEntries } from "../api/entryApi";
import EntryModal from "../components/EntryModal";

const tabs = ["All Entries", "Notes", "Locked Envelopes", "Unlocked"];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All Entries");

  const [selectedEntry, setSelectedEntry] = useState(null);

  const [searchText, setSearchText] = useState("");

  const [memories, setMemories] = useState([]);

  const [loading, setLoading] = useState(true);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const fetchEntries = async () => {
    try {
      const data = await getEntries(currentUser.uid);

      setMemories(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchEntries();

      const interval = setInterval(() => {
        fetchEntries();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentUser]);

  const totalNotes = memories.filter((item) => item.type === "note").length;

  const totalLocked = memories.filter(
    (item) => item.type === "envelope" && item.status === "locked",
  ).length;

  const totalUnlocked = memories.filter(
    (item) =>
      item.type === "envelope" &&
      (item.status === "ready" || item.status === "opened"),
  ).length;

  const filteredMemories = memories.filter((memory) => {
    const matchesTab =
      activeTab === "All Entries" ||
      (activeTab === "Notes" && memory.type === "note") ||
      (activeTab === "Locked Envelopes" &&
        memory.type === "envelope" &&
        memory.status === "locked") ||
      (activeTab === "Unlocked" &&
        memory.type === "envelope" &&
        (memory.status === "ready" || memory.status === "opened"));

    const matchesSearch =
      memory.title.toLowerCase().includes(searchText.toLowerCase()) ||
      memory.content.toLowerCase().includes(searchText.toLowerCase());

    return matchesTab && matchesSearch;
  });

  if (loading) {
    return <div className="dashboard-wrapper">Loading...</div>;
  }

 return (

  <>
    <AppSidebar />

  <div className="dashboard-wrapper">
    <div className="dashboard-container">
      <div className="top-card">
        <div className="dashboard-heading">
          <h3 className="greet-heading">Greetings, Memory Seeker</h3>

          <p className="greet-subtext">
            Your collection of moments, frozen and drifting through time.
          </p>

          <div className="date">
            <h6>{currentDate}</h6>
          </div>
        </div>

        <div className="top-card-action">
          <button
            className="new-moment-btn"
            onClick={() => navigate("/write-desk")}
          >
            ✏️ Pen a New Moment
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div>
            <h2>{memories.length}</h2>
            <p>Total Memories</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div>
            <h2>{totalNotes}</h2>
            <p>Notes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✉️</div>
          <div>
            <h2>{totalLocked}</h2>
            <p>Locked Envelopes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔓</div>
          <div>
            <h2>{totalUnlocked}</h2>
            <p>Unlocked</p>
          </div>
        </div>
      </div>

      <div className="filter-row">
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Filter memories..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredMemories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>

          <h3>
            {searchText
              ? "No memories match your search."
              : "Your time capsule is empty."}
          </h3>

          <p>
            {searchText
              ? "Try searching with another title, word, or memory fragment."
              : "Start by writing your first note or sealing a future envelope."}
          </p>

          {!searchText && (
            <button
              className="empty-action-btn"
              onClick={() => navigate("/write-desk")}
            >
              ✏️ Create Your First Memory
            </button>
          )}
        </div>
      ) : (
        <div className="memory-grid">
          {filteredMemories.map((memory) => (
            <div
              key={memory._id}
              onClick={() => setSelectedEntry(memory)}
              style={{ cursor: "pointer" }}
            >
              <MemoryCard memory={memory} refreshEntries={fetchEntries} />
            </div>
          ))}
        </div>
      )}

      {selectedEntry && (
        <EntryModal
          selectedEntry={selectedEntry}
          closeModal={() => setSelectedEntry(null)}
          refreshEntries={fetchEntries}
        />
      )}
    </div>
  </div>
  </>
);

};

export default Dashboard;