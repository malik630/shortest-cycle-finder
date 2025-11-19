function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Résultats</h2>

      {result.exists ? (
        <div style={styles.content}>
          <div style={styles.resultBox}>
            <div style={styles.badge}>Cycle trouvé ✓</div>
            <div style={styles.metric}>
              <span style={styles.metricLabel}>Longueur:</span>
              <span style={styles.metricValue}>{result.length}</span>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Sommets du cycle:</h3>
            <div style={styles.cycleDisplay}>
              {result.cycle.map((vertex, index) => (
                <span key={index}>
                  <span style={styles.vertex}>{vertex}</span>
                  {index < result.cycle.length - 1 && (
                    <span style={styles.arrow}>→</span>
                  )}
                </span>
              ))}
              {result.cycle.length > 0 && (
                <>
                  <span style={styles.arrow}>→</span>
                  <span style={styles.vertex}>{result.cycle[0]}</span>
                </>
              )}
            </div>
          </div>

          {result.complexity && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Analyse de complexité:</h3>
              <div style={styles.complexity}>
                <div style={styles.complexityItem}>
                  <strong>Temps:</strong> <code>{result.complexity.time}</code>
                </div>
                <div style={styles.complexityItem}>
                  <strong>Espace:</strong>{" "}
                  <code>{result.complexity.space}</code>
                </div>
                <div style={styles.explanation}>
                  {result.complexity.explanation}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={styles.noResult}>
          <div style={styles.noResultIcon}>🚫</div>
          <p style={styles.noResultText}>{result.message}</p>
          <small style={styles.noResultHint}>
            Le graphe est probablement un arbre ou une forêt (sans cycles)
          </small>
        </div>
      )}
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
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  resultBox: {
    background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "2px solid #667eea",
  },
  badge: {
    display: "inline-block",
    background: "#667eea",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  metric: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  metricLabel: {
    fontSize: "1.1rem",
    color: "#555",
  },
  metricValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#667eea",
  },
  section: {
    paddingTop: "1rem",
    borderTop: "1px solid #e0e0e0",
  },
  sectionTitle: {
    fontSize: "1.1rem",
    marginBottom: "1rem",
    color: "#444",
  },
  cycleDisplay: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem",
    background: "#f8f9fa",
    borderRadius: "8px",
  },
  vertex: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "2.5rem",
    height: "2.5rem",
    background: "#667eea",
    color: "white",
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "1.1rem",
    padding: "0.5rem",
  },
  arrow: {
    color: "#667eea",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  complexity: {
    background: "#f8f9fa",
    padding: "1rem",
    borderRadius: "8px",
    fontSize: "0.95rem",
  },
  complexityItem: {
    marginBottom: "0.5rem",
    color: "#555",
  },
  explanation: {
    marginTop: "1rem",
    padding: "0.75rem",
    background: "white",
    borderRadius: "6px",
    color: "#666",
    fontSize: "0.9rem",
    fontStyle: "italic",
  },
  noResult: {
    textAlign: "center",
    padding: "3rem 1rem",
  },
  noResultIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  noResultText: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "0.5rem",
  },
  noResultHint: {
    color: "#999",
    fontSize: "0.9rem",
  },
};

export default ResultDisplay;
