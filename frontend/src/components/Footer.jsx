import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        Some memories fade, some stay — TimeCapsule was built to hold both. ✦
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    width: "100%",
    padding: "10px 20px",
    textAlign: "center",
    background: "#120811",
    borderTop: "1px solid rgba(216,144,37,0.08)",
    backdropFilter: "blur(10px)",
    
  },

  text: {
    margin: 0,
    fontFamily
     : "'Poppins', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.03em",
    color: "#b8aeb5",
    fontWeight: 400,
    opacity: 0.9,
  },
};

export default Footer;