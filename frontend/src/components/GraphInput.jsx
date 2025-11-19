import { useState } from "react";

function GraphInput({ onSubmit, loading }) {
  const [vertices, setVertices] = useState(6);
  const [edgesText, setEdgesText] = useState("0-1\n1-2\n2-3\n3-4\n4-1\n0-5");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parser les arêtes
    const edgeLines = edgesText.trim().split("\n");
    const edges = [];

    for (const line of edgeLines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const parts = trimmed.split(/[-,\s]+/);
      if (parts.length === 2) {
        const u = parseInt(parts[0]);
        const v = parseInt(parts[1]);
        if (!isNaN(u) && !isNaN(v)) {
          edges.push([u, v]);
        }
      }
    }

    onSubmit(vertices, edges);
  };

  const loadExample = (example) => {
    switch (example) {
      case 1:
        setVertices(6);
        setEdgesText("0-1\n1-2\n2-3\n3-4\n4-1\n0-5");
        break;
      case 2:
        setVertices(5);
        setEdgesText("0-1\n1-2\n2-0\n2-3\n3-4");
        break;
      case 3:
        setVertices(7);
        setEdgesText("0-1\n1-2\n2-3\n3-0\n1-4\n4-5\n5-6\n6-4");
        break;
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Configuration du Graphe</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre de sommets:</label>
          <input
            type="number"
            min="2"
            max="100"
            value={vertices}
            onChange={(e) => setVertices(parseInt(e.target.value))}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Arêtes (format: u-v, une par ligne):
          </label>
          <textarea
            value={edgesText}
            onChange={(e) => setEdgesText(e.target.value)}
            style={styles.textarea}
            placeholder="0-1&#10;1-2&#10;2-0"
            rows="8"
            required
          />
          <small style={styles.hint}>
            Les sommets sont numérotés de 0 à {vertices - 1}
          </small>
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
          disabled={loading}
        >
          {loading ? "⏳ Calcul en cours..." : "Trouver le cycle"}
        </button>
      </form>

      <div style={styles.examples}>
        <p style={styles.examplesTitle}>Exemples rapides:</p>
        <div style={styles.exampleButtons}>
          <button
            onClick={() => loadExample(1)}
            style={styles.exampleButton}
            type="button"
          >
            Exemple 1
          </button>
          <button
            onClick={() => loadExample(2)}
            style={styles.exampleButton}
            type="button"
          >
            Exemple 2
          </button>
          <button
            onClick={() => loadExample(3)}
            style={styles.exampleButton}
            type="button"
          >
            Exemple 3
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontWeight: "600",
    color: "#555",
    fontSize: "0.95rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    transition: "border-color 0.2s",
    outline: "none",
  },
  textarea: {
    padding: "0.75rem",
    fontSize: "0.95rem",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontFamily: "monospace",
    resize: "vertical",
    transition: "border-color 0.2s",
    outline: "none",
  },
  hint: {
    color: "#888",
    fontSize: "0.85rem",
  },
  button: {
    padding: "1rem",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "white",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  examples: {
    marginTop: "1.5rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #e0e0e0",
  },
  examplesTitle: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "0.75rem",
  },
  exampleButtons: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  exampleButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    background: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

export default GraphInput;
