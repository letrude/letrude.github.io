import { m as Motion } from "framer-motion";
import useStore from "../../store/useStore";

const ProjectPage = ({ data }) => {
  const uiText = useStore((state) => state.uiText);

  return (
    <div
      style={{
        border: "2px dashed #8b4513",
        padding: "20px",
        background: "rgba(255,255,255,0.4)",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "15px",
          marginBottom: "10px",
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            color: "#8b4513",
            fontSize: "1.5rem",
            marginBottom: "5px",
          }}
        >
          {data.title}
        </h2>

        {data.link && (
          <Motion.a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#8b4513",
              color: "#f4e4bc",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              textDecoration: "none",
              color: "#8b4513",
              border: "2px solid #8b4513",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: "bold",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <span>🔗</span> {uiText.viewCode}
          </Motion.a>
        )}
      </div>

      <div
        style={{
          background: "#5c4033",
          color: "#fff",
          display: "inline-block",
          padding: "4px 10px",
          borderRadius: "5px",
          fontSize: "0.8rem",
          marginBottom: "15px",
        }}
      >
        {data.tech}
      </div>
      <p style={{ fontWeight: "bold", fontSize: "1rem", margin: "10px 0" }}>
        {data.desc}
      </p>
      <p style={{ fontStyle: "italic", opacity: 0.9, fontSize: "0.95rem" }}>
        {data.details}
      </p>
    </div>
  );
};

export default ProjectPage;
