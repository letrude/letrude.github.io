import { m as Motion } from "framer-motion";

const SkillsPage = ({ data }) => (
  <div>
    <h3
      style={{
        borderBottom: "2px solid #8b4513",
        paddingBottom: "10px",
        color: "#8b4513",
      }}
    >
      {data.category}
    </h3>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "20px",
      }}
    >
      {data.items.map((skill, i) => (
        <div key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4px",
              fontSize: "0.9rem",
              fontWeight: "bold",
              color: "#4a3b2a",
            }}
          >
            <span>{skill.name}</span>
            <span>{skill.level}%</span>
          </div>
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "rgba(92, 64, 51, 0.2)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <Motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ height: "100%", background: "#8b4513" }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkillsPage;
