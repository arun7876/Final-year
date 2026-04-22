import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPrediction } from "../api/api";
import { Brain, AlertCircle, ArrowLeft, ArrowRight, ShieldAlert, Activity, HeartPulse } from "lucide-react";

function PredictionResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { symptoms } = location.state || { symptoms: [] };

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false); // For fade-in animation

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
        // Trigger fade in
        setTimeout(() => setShowResult(true), 100);
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

  const getSeverity = (confidence) => {
    if (confidence > 0.8) return { level: "High", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
    if (confidence > 0.5) return { level: "Medium", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
    return { level: "Low", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
  };

  return (
    <div className="min-h-screen bg-[#090016] text-[#BFAEFF] py-12 px-4 relative flex justify-center font-sans overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center p-3 bg-violet-500/10 rounded-2xl mb-4 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <HeartPulse className="w-8 h-8 text-[#8B5CF6]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Prediction Result</h1>
          <p className="text-[#BFAEFF] opacity-80 mt-2 text-lg">AI-powered health analysis</p>
          <div className="h-1 w-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-5 rounded-full"></div>
        </div>

        {/* Selected Symptoms */}
        <div className="bg-[#13002b]/60 backdrop-blur-md border border-[#2A0A4F] rounded-2xl p-6 shadow-lg">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-400" />
            Analyzed Symptoms
          </h3>
          {symptoms.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {symptoms.map((s) => (
                <span key={s} className="bg-violet-500/10 text-violet-300 border border-violet-500/20 px-4 py-1.5 rounded-full text-sm font-medium shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                  {formatSymptom(s)}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-red-400 italic">No symptoms selected. Please go back.</p>
          )}
        </div>

        {/* Prediction Card & Loading State */}
        {loading ? (
          <div className="bg-[#13002b]/80 backdrop-blur-xl border border-[#2A0A4F] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-pulse">
            <div className="h-4 bg-[#2A0A4F] rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-[#2A0A4F] rounded w-2/3 mb-8"></div>
            <div className="h-6 bg-[#2A0A4F] rounded w-full mb-3"></div>
            <div className="h-6 bg-[#2A0A4F] rounded w-full mb-8"></div>
            <div className="grid grid-cols-2 gap-4">
               <div className="h-24 bg-[#2A0A4F] rounded-2xl"></div>
               <div className="h-24 bg-[#2A0A4F] rounded-2xl"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-400 text-lg mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-red-500/20 text-red-300 font-semibold rounded-full hover:bg-red-500/30 transition-colors">
              Retry Connection
            </button>
          </div>
        ) : prediction ? (
          <div className={`transition-all duration-700 ease-out transform ${showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="bg-[#13002b]/80 backdrop-blur-xl border border-[#2A0A4F] rounded-3xl p-8 shadow-[0_10px_40px_rgba(139,92,246,0.15)] relative overflow-hidden">
              
              {/* Decorative accent */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-fuchsia-500/10 blur-[60px] rounded-full"></div>

              <div className="relative z-10">
                <p className="text-[#BFAEFF] font-medium mb-2 uppercase tracking-wider text-sm">Predicted Condition</p>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 pb-1">
                    {prediction.disease}
                  </h2>
                  <Brain className="w-10 h-10 text-fuchsia-400 animate-pulse" />
                </div>

                {/* Confidence Bar */}
                <div className="mb-10">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-white font-medium flex items-center gap-2">
                       <Activity className="w-4 h-4 text-emerald-400"/>
                       AI Confidence Score
                    </span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                      {Math.round(prediction.confidence * 100)}%
                    </span>
                  </div>
                  <div className="h-4 w-full bg-[#090016] rounded-full overflow-hidden border border-[#2A0A4F]">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                      style={{ width: `${showResult ? prediction.confidence * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Extra Info Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className={`p-5 rounded-2xl border ${getSeverity(prediction.confidence).bg} ${getSeverity(prediction.confidence).border}`}>
                    <p className="text-sm opacity-80 mb-2">Severity Level</p>
                    <p className={`text-2xl font-bold ${getSeverity(prediction.confidence).color}`}>
                      {getSeverity(prediction.confidence).level}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl border bg-blue-500/10 border-blue-500/20">
                    <p className="text-sm text-blue-200/80 mb-2">Recommended Action</p>
                    <p className="text-xl font-bold text-blue-400">Consult Doctor</p>
                  </div>
                </div>

                {/* Warning Note */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5 flex gap-4 items-start shadow-[0_0_15px_rgba(234,179,8,0.05)]">
                  <AlertCircle className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-yellow-300/90 text-sm italic leading-relaxed">
                    <span className="font-semibold not-italic">Disclaimer:</span> This is an AI-generated suggestion based on statistical models, not a definitive medical diagnosis. Please consult a qualified healthcare professional.
                  </p>
                </div>

              </div>
            </div>
          </div>
        ) : null}

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2 mb-8">
          <button
            onClick={() => navigate("/symptoms")}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#1a0033]/50 text-[#BFAEFF] border border-[#2A0A4F] rounded-full hover:bg-[#2A0A4F] hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Re-select Symptoms
          </button>
          
          <button
            onClick={() => navigate("/doctors")}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300"
          >
            Find Doctors Nearby
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default PredictionResult;