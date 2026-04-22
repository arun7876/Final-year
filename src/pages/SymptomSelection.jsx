import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Check, ArrowRight, Loader2, Sparkles } from "lucide-react";

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
    const [isPredicting, setIsPredicting] = useState(false);
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
        setIsPredicting(true);
        setTimeout(() => {
            navigate("/prediction", { state: { symptoms: selectedSymptoms } });
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#090016] text-[#BFAEFF] py-12 px-4 relative overflow-hidden flex items-center justify-center">
            {/* Background Gradients - Violet glow to match #8B5CF6 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-violet-600/20 blur-[140px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 w-full max-w-4xl">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-violet-500/10 rounded-2xl mb-4 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        <Activity className="w-8 h-8 text-[#8B5CF6]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        AI Symptom <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Analyzer</span>
                    </h2>
                    <p className="text-[#BFAEFF] opacity-80 text-lg max-w-2xl mx-auto">
                        Select the symptoms you are currently experiencing. Our advanced AI model will process the data to predict potential conditions in seconds.
                    </p>
                </div>

                {/* Main Card Container - deep purple frosted box */}
                <div className="bg-[#13002b]/60 backdrop-blur-xl border border-[#2A0A4F] rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {SYMPTOMS_LIST.map((symptom) => {
                            const isSelected = selectedSymptoms.includes(symptom.id);
                            return (
                                <button
                                    key={symptom.id}
                                    onClick={() => toggleSymptom(symptom.id)}
                                    className={`relative group flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300 ease-out border
                                    ${isSelected 
                                        ? "bg-violet-600/20 border-[#8B5CF6]/50 shadow-[0_0_20px_rgba(139,92,246,0.25)] text-white" 
                                        : "bg-[#1a0033]/40 border-[#2A0A4F] text-[#BFAEFF] hover:bg-[#2A0A4F]/50 hover:border-[#8B5CF6]/30 hover:scale-[1.02]"}
                                    `}
                                >
                                    <div className={`flex shrink-0 items-center justify-center w-6 h-6 rounded-full border transition-colors duration-300
                                        ${isSelected ? "bg-[#8B5CF6] border-[#8B5CF6]" : "bg-[#090016]/50 border-violet-900 group-hover:border-[#8B5CF6]/50"}
                                    `}>
                                        {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                    </div>
                                    <span className="font-medium text-sm md:text-base leading-tight">
                                        {symptom.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-10 flex flex-col items-center justify-center border-t border-[#2A0A4F] pt-8">
                        <p className="text-sm text-[#BFAEFF] opacity-70 mb-6 font-medium">
                            Selected {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 && 's'}
                        </p>
                        <button
                            onClick={handlePredict}
                            disabled={isPredicting || selectedSymptoms.length === 0}
                            className={`group relative flex items-center justify-center gap-3 px-8 py-4 w-full md:w-auto min-w-[280px] rounded-full text-white font-semibold text-lg transition-all duration-300 ease-out
                            ${selectedSymptoms.length === 0 
                                ? "bg-[#1a0033] text-[#BFAEFF]/50 cursor-not-allowed border border-[#2A0A4F]" 
                                : "bg-gradient-to-r from-violet-600 to-purple-600 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_45px_rgba(139,92,246,0.6)] hover:scale-105 hover:-translate-y-1 border border-white/10"}
                            `}
                        >
                            {isPredicting ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Analyzing Data...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 text-violet-200" />
                                    Predict Disease Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SymptomSelection;