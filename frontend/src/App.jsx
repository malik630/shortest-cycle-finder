import { useState } from "react";
import GraphInput from "./components/GraphInput";
import GraphVisualizer from "./components/GraphVisualizer";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [graphData, setGraphData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFindCycle = async (vertices, edges) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/find-shortest-cycle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vertices,
          edges,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la requête");
      }

      setGraphData({ vertices, edges });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>Détection du Plus Court Cycle</h1>
          <p style={styles.subtitle}>
            Algorithme BFS pour graphes non orientés
          </p>
        </header>

        <div style={styles.grid}>
          <div style={styles.leftColumn}>
            <GraphInput onSubmit={handleFindCycle} loading={loading} />

            {error && (
              <div style={styles.errorBox}>
                <strong>❌ Erreur:</strong> {error}
              </div>
            )}

            {result && <ResultDisplay result={result} />}
          </div>

          <div style={styles.rightColumn}>
            <GraphVisualizer
              graphData={graphData}
              cycle={result?.cycle || []}
            />
          </div>
        </div>

        <footer style={styles.footer}>
          <p>
            <strong>Complexité:</strong> O(|S| × (|S| + |A|)) en temps, O(|S| +
            |A|) en espace
          </p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "2rem",
  },
  content: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
    color: "white",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: 0.9,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "2rem",
    marginBottom: "2rem",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  rightColumn: {
    minHeight: "500px",
  },
  errorBox: {
    background: "#fee",
    border: "2px solid #c33",
    borderRadius: "12px",
    padding: "1rem",
    color: "#c33",
  },
  footer: {
    textAlign: "center",
    color: "white",
    padding: "1.5rem",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  },
};

export default App;
