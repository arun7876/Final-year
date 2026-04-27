import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SYMPTOMS_LIST = [
    { id: "blurred_vision", label: "Blurred Vision" },
    { id: "cough", label: "Cough" },
    { id: "diarrhea", label: "Diarrhea" },
    { id: "excessive_thirst", label: "Excessive Thirst" },
    { id: "fatigue", label: "Fatigue" },
    { id: "fever", label: "Fever" },
    { id: "frequent_urination", label: "Frequent Urination" },
    { id: "headache", label: "Headache" },
    { id: "high_fever", label: "High Fever" },
    { id: "joint_pain", label: "Joint Pain" },
    { id: "nausea", label: "Nausea" },
    { id: "rash", label: "Rash" },
    { id: "runny_nose", label: "Runny Nose" },
    { id: "sensitivity_to_light", label: "Sensitivity to Light" },
    { id: "sneezing", label: "Sneezing" },
    { id: "sore_throat", label: "Sore Throat" },
    { id: "stomach_pain", label: "Stomach Pain" },
    { id: "vomiting", label: "Vomiting" },
    { id: "weight_loss", label: "Weight Loss" }
];

function SymptomSelection() {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const navigate = useNavigate();

    const toggleSymptom = (id) => {
        setSelectedSymptoms(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : [...prev, id]
        );
    };

    const handlePredict = () => {
        if (selectedSymptoms.length === 0) {
            alert("Please select at least one symptom.");
            return;
        }
        navigate("/prediction", { state: { symptoms: selectedSymptoms } });
    };

    return (
        <div style={{
            padding: "40px",
            maxWidth: "800px",
            margin: "0 auto",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <h2 style={{ color: "#2c3e50", borderBottom: "2px solid #3498db", paddingBottom: "10px" }}>
                Select Your Symptoms
            </h2>
            <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>
                Please check all the symptoms you are currently experiencing for an accurate prediction.
            </p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "15px",
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
            }}>
                {SYMPTOMS_LIST.map((symptom) => (
                    <label key={symptom.id} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "5px",
                        transition: "background 0.2s"
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ebf5fb"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                        <input
                            type="checkbox"
                            checked={selectedSymptoms.includes(symptom.id)}
                            onChange={() => toggleSymptom(symptom.id)}
                            style={{ width: "18px", height: "18px" }}
                        />
                        <span style={{ fontSize: "0.95rem" }}>{symptom.label}</span>
                    </label>
                ))}
            </div>

            <div style={{ marginTop: "30px", textAlign: "center" }}>
                <button
                    onClick={handlePredict}
                    style={{
                        padding: "12px 30px",
                        fontSize: "1.1rem",
                        backgroundColor: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        cursor: "pointer",
                        boxShadow: "0 4px 6px rgba(52, 152, 219, 0.3)",
                        transition: "transform 0.2s, background 0.2s"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#2980b9";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#3498db";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    Predict Disease Now →
                </button>
            </div>
        </div>
    );
}

export default SymptomSelection;