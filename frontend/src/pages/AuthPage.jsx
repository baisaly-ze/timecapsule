import React from "react";
import "../styles/AuthPage.css";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

import { useNavigate, useLocation } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(from);
    } catch (err) {
      alert(err.message);
    }
  };

  const bgPara = `I remember the exact shade of the afternoon when everything still felt possible. The kind of light that made you believe nothing bad could ever find you there. We were so certain that the feeling would last, the way you are always certain about the things that don't. I have turned that day over in my hands so many times it has gone smooth like sea glass. And still I keep it. I keep all of it. The way you laughed at something small. The song that was playing from somewhere down the street. The version of me that did not yet know how the story ended. She was so hopeful. I want to go back and tell her — hold on to this. Write it down. Seal it somewhere safe before it slips between your fingers like every good thing eventually does. There are moments that deserve to be permanent and we never know which ones they are until they are already gone. So I am writing this down now. I am writing it while I still remember the colour of the light and the sound of your name in the air and the particular way that evening smelled like something about to begin. Maybe it was. Maybe everything was beginning and we were just too busy living inside it to notice. I have learned that joy does not announce itself. It arrives quietly and sits beside you and only later, much later, do you turn to look and find the space beside you empty. That is when you understand what you had. I understood too late and then I understood forever. Some things you carry not because they are heavy but because putting them down would mean admitting they are over. I am not ready for that. I am not sure I will ever be. So I write. I seal it. I send it forward into a future I cannot see, for a version of myself I have not yet become, hoping she will remember what this felt like and be grateful she once had it at all. `;

  return (
    <div className="auth-page">

      <div className="auth-bg-text">
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i}>{bgPara}</p>
        ))}
      </div>

      <div className="auth-shell">

        <div className="auth-mark">⌛</div>

        <p className="auth-kicker">TIMECAPSULE</p>

        <h1>
          Your memories are
          <br />
          waiting in time.
        </h1>

        <p className="auth-text">
          Sign in with Google to write notes, seal future letters,
          and receive unlock reminders when the moment arrives.
        </p>

        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <span>G</span>
          Continue with Google
        </button>

        <p className="auth-small">
          We'll use your Google email only for your account and capsule reminders.
        </p>

      </div>
    </div>
  );
}