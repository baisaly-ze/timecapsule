
// // import React from "react";
// // import "../styles/AboutSection.css";

// // const AboutSection = () => {
// //   return (
// //     <section className="about-wrapper">

// //       {/* TOP */}

// //       <div className="about-container">

// //         {/* LEFT */}

// //         <div className="about-left">
// //           <div className="texts">

// //             <h6 className="txt">
// //               EST. 2026 · TIMECAPSULE
// //             </h6>

// //             <h2 className="about-heading">
// //               For thoughts
// //               <br />
// //               <span>that deserve</span>
// //               <br />
// //             time.
// //             </h2>

// //             <h6 className="txt1">
// //               A PLACE FOR YOUR THOUGHTS TODAY
// //             </h6>

// //           </div>
// //         </div>

// //         {/* RIGHT */}

// //         <div className="about-right">

// //           <div className="lists">

// //             <ul className="about-details">

// //               <li>
// //                 We believe every thought you have today is a gift to the person
// //                 you'll be tomorrow 
// //                 <br />
// //                 — if you bother to keep it.
// //               </li>

// //               <hr />

// //               <li>
// //                 Most notes apps help you remember tasks. TimeCapsule helps you
// //                 remember yourself.
// //               </li>

// //               <hr />

// //               <li>
// //                 Write it. Seal it. Return to it — when the time is right, not a
// //                 moment sooner.
// //               </li>

// //             </ul>

// //           </div>
// //         </div>
// //       </div>

// //       {/* BOTTOM PANEL */}

// //       <div className="bottom-panel">

// //         <div className="panel-card">
// //           <h2>∞</h2>
// //           <p>ENTRIES, NO LIMIT</p>
// //         </div>

// //         <div className="panel-card">
// //           <h2>
// //             Time-
// //             <br />
// //             locked
// //           </h2>
// //           <p>YOU SET THE UNLOCK DATE</p>
// //         </div>

// //         <div className="panel-card">
// //           <h2>
// //             Yours
// //             <br />
// //             alone
// //           </h2>
// //           <p>PRIVATE. ALWAYS.</p>
// //         </div>

// //       </div>

// //     </section>
// //   );
// // };

// // export default AboutSection;




// import React from "react";
// import "../styles/AboutSection.css";

// const features = [
//   {
//     num: "01",
//     title: "Write freely",
//     desc: "Thoughts, ideas, daily memories. No audience, no performance. Just you and the page — the oldest relationship in the world.",
//   },
//   {
//     num: "02",
//     title: "Seal it in time",
//     desc: "Write to the person you'll become. Choose when it unlocks. You cannot open it early. That's not a bug — that's the whole idea.",
//   },
//   {
//     num: "03",
//     title: "Return & reflect",
//     desc: "Rediscover who you were. Read it honestly. The gap between who you were and who you are — that's your growth, measured.",
//   },
// ];

// export default function AboutSection() {
//   return (
//     <section className="about">
//       <div className="about__top">
//         <div className="about__top-left">
//           <p className="about__kicker">What we built & why</p>
//           <h2 className="about__heading">
//             For thoughts<br />that <em> desrve time.</em>
//           </h2>
//         </div>
//         <div className="about__top-right">
//           <p className="about__sub">
//             Most apps help you remember tasks. TimeCapsule helps you remember
//             yourself — sealed, honest, waiting for the right moment.
//           </p>
//         </div>
//       </div>

//       <div className="about__cards">
//         {features.map((f) => (
//           <div className="about__card" key={f.num}>
//             <div className="about__card-line" />
//             <div className="about__card-num">{f.num}</div>
//             <h3 className="about__card-title">{f.title}</h3>
//             <p className="about__card-desc">{f.desc}</p>
//           </div>
//         ))}
//       </div>

//       <div className="about__bottom">
//         <span className="about__quote">
//           "Write for the future, cherish the present."
//         </span>
//         <span className="about__tag">TimeCapsule · Est. 2026</span>
//       </div>
//     </section>
//   );
// }


import React from "react";
import "../styles/AboutSection.css";

const AboutSection = () => {
  return (
    <section className="about-container">

      {/* top */}

      <div className="about-top">

        <div className="about-left">
          <h6 className="about-tag">
            What we built & why
          </h6>

          <h2 className="about-heading">
            For thoughts
            <br />
            that <em>deserve time.</em>
          </h2>
        </div>

        <div className="about-right">
          <p className="about-sub">
            Most apps help you remember tasks.
            TimeCapsule helps you remember
            yourself — sealed, honest,
            waiting for the right moment.
          </p>
        </div>

      </div>

      {/* cards */}

      <div className="about-cards">

        <div className="card">
          <h1 className="card-num">01</h1>

          <h3 className="card-title">
            Write freely
          </h3>

          <p className="card-text">
            Thoughts, ideas, daily memories.
            No audience, no performance.
            Just you and the page.
          </p>
        </div>

        <div className="card">
          <h1 className="card-num">02</h1>

          <h3 className="card-title">
            Seal it in time
          </h3>

          <p className="card-text">
            Choose when it unlocks.
            Write to the person
            you'll become.
          </p>
        </div>

        <div className="card">
          <h1 className="card-num">03</h1>

          <h3 className="card-title">
            Return & reflect
          </h3>

          <p className="card-text">
            Rediscover who you were.
            Read honestly.
            Growth leaves traces.
          </p>
        </div>

      </div>

      {/* bottom */}

      <div className="about-bottom">
        <span className="quote">
          "Write for the future, cherish the present."
        </span>

        <span className="year">
          TimeCapsule · Est. 2026
        </span>
      </div>

    </section>
  );
};

export default AboutSection;