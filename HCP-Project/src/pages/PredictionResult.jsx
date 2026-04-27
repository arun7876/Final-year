import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPrediction } from "../api/api";

function PredictionResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { symptoms } = location.state || { symptoms: [] };

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      if (symptoms.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getPrediction(symptoms);
        setPrediction(data);
        setError(null);
      } catch (err) {
        console.error("Failed to get prediction:", err);
        setError("Could not connect to the health prediction server. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [symptoms]);

  const formatSymptom = (id) => {
    return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div style={{
      padding: "40px",
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h2 style={{ color: "#2c3e50", borderBottom: "2px solid #3498db", paddingBottom: "10px" }}>
        Prediction Page
      </h2>

      <div style={{ marginBottom: "30px" }}>
        <h4 style={{ color: "#34495e" }}>Selected Symptoms:</h4>
        {symptoms.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
            {symptoms.map((s) => (
              <span key={s} style={{
                backgroundColor: "#e8f6f3",
                color: "#16a085",
                padding: "5px 15px",
                borderRadius: "15px",
                fontSize: "0.85rem",
                border: "1px solid #d1f2eb"
              }}>
                {formatSymptom(s)}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ color: "#e74c3c" }}>No symptoms selected. Please go back and select symptoms.</p>
        )}
      </div>

      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        borderLeft: "5px solid #3498db"
      }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <div className="spinner"></div>
            <p style={{ color: "#3498db", fontWeight: "bold" }}>AI Model is analyzing your symptoms...</p>
          </div>
        ) : error ? (
          <div style={{ color: "#e74c3c", textAlign: "center" }}>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: "8px 20px", marginTop: "10px", cursor: "pointer" }}
            >
              Retry
            </button>
          </div>
        ) : prediction ? (
          <>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Predicted Condition:</h3>
            <div style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#2980b9",
              margin: "15px 0"
            }}>
              {prediction.disease}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                flex: 1,
                height: "10px",
                backgroundColor: "#ecf0f1",
                borderRadius: "5px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${prediction.confidence * 100}%`,
                  height: "100%",
                  backgroundColor: "#27ae60"
                }}></div>
              </div>
              <span style={{ fontWeight: "bold", color: "#27ae60" }}>
                {Math.round(prediction.confidence * 100)}% Confidence
              </span>
            </div>
            <p style={{ marginTop: "20px", color: "#7f8c8d", fontStyle: "italic" }}>
              Note: This is an AI-generated suggestion. Please consult a professional doctor for final diagnosis.
            </p>
          </>
        ) : (
          <p>Ready to analyze.</p>
        )}
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "15px", justifyContent: "center" }}>
        <button
          onClick={() => navigate("/symptoms")}
          style={{
            padding: "10px 25px",
            backgroundColor: "#ecf0f1",
            color: "#2c3e50",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          ← Re-select Symptoms
        </button>
        <button
          onClick={() => navigate("/doctor")}
          style={{
            padding: "10px 25px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Recommended Doctors →
        </button>
      </div>
    </div>
  );
}

export default PredictionResult;