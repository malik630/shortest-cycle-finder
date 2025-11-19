import { useEffect, useRef } from "react";

function GraphVisualizer({ graphData, cycle }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!graphData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { vertices, edges } = graphData;

    // Calculer les positions des nœuds en cercle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;

    const nodePositions = {};
    for (let i = 0; i < vertices; i++) {
      const angle = (2 * Math.PI * i) / vertices - Math.PI / 2;
      nodePositions[i] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    }

    // Fonction pour vérifier si une arête fait partie du cycle
    const isCycleEdge = (u, v) => {
      if (cycle.length < 2) return false;
      for (let i = 0; i < cycle.length; i++) {
        const curr = cycle[i];
        const next = cycle[(i + 1) % cycle.length];
        if ((curr === u && next === v) || (curr === v && next === u)) {
          return true;
        }
      }
      return false;
    };

    // Dessiner
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les arêtes
    edges.forEach(([u, v]) => {
      const isInCycle = isCycleEdge(u, v);
      const pos1 = nodePositions[u];
      const pos2 = nodePositions[v];

      ctx.beginPath();
      ctx.moveTo(pos1.x, pos1.y);
      ctx.lineTo(pos2.x, pos2.y);
      ctx.strokeStyle = isInCycle ? "#667eea" : "#ccc";
      ctx.lineWidth = isInCycle ? 4 : 2;
      ctx.stroke();
    });

    // Dessiner les nœuds
    for (let i = 0; i < vertices; i++) {
      const pos = nodePositions[i];
      const isInCycle = cycle.includes(i);

      // Cercle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, isInCycle ? 25 : 20, 0, 2 * Math.PI);
      ctx.fillStyle = isInCycle ? "#667eea" : "#f0f0f0";
      ctx.fill();
      ctx.strokeStyle = isInCycle ? "#764ba2" : "#999";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Label
      ctx.fillStyle = isInCycle ? "white" : "#333";
      ctx.font = `${isInCycle ? "bold " : ""}16px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(i), pos.x, pos.y);
    }
  }, [graphData, cycle]);

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Visualisation du Graphe</h2>
      <div style={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          width={600}
          height={500}
          style={styles.canvas}
        />
      </div>
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendDot, background: "#667eea" }}></div>
          <span>Sommets dans le cycle</span>
        </div>
        <div style={styles.legendItem}>
          <div
            style={{
              ...styles.legendDot,
              background: "#f0f0f0",
              border: "2px solid #999",
            }}
          ></div>
          <span>Autres sommets</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendLine, background: "#667eea" }}></div>
          <span>Arêtes du cycle</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendLine, background: "#ccc" }}></div>
          <span>Autres arêtes</span>
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
    color: "#333",
  },
  canvasContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    marginBottom: "1rem",
    background: "#fafafa",
    overflow: "hidden",
  },
  canvas: {
    display: "block",
    maxWidth: "100%",
    height: "auto",
  },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    padding: "1rem",
    background: "#f8f9fa",
    borderRadius: "8px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    color: "#555",
  },
  legendDot: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
  },
  legendLine: {
    width: "30px",
    height: "4px",
    borderRadius: "2px",
  },
};

export default GraphVisualizer;
