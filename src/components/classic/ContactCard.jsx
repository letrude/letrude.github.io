import { m as Motion } from "framer-motion";

const ContactCard = ({ data, theme }) => (
  <Motion.a
    href={data.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{
      backgroundColor: theme.cardBg,
      borderColor: theme.cardBorder,
      color: theme.text,
    }}
    animate={{
      backgroundColor: theme.cardBg,
      borderColor: theme.cardBorder,
      color: theme.text,
    }}
    whileHover={{
      scale: 1.02,
      backgroundColor: theme.cardHover,
      borderColor: theme.accent,
    }}
    whileTap={{ scale: 0.98 }}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      borderWidth: "1px",
      borderStyle: "solid",
      padding: "20px",
      borderRadius: "12px",
      textDecoration: "none",
      justifyContent: "center",
      textAlign: "center",
      cursor: "pointer",
      boxShadow: theme.shadow,
    }}
  >
    <div style={{ fontSize: "2rem" }}>{data.icon}</div>
    <div>
      <h3
        style={{ margin: "0 0 5px 0", color: theme.text, fontSize: "1.1rem" }}
      >
        {data.title}
      </h3>
      <span style={{ color: theme.accent, fontSize: "0.9rem" }}>
        {data.value}
      </span>
    </div>
  </Motion.a>
);

export default ContactCard;
