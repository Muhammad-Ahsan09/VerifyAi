"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  UploadCloud, 
  ShieldCheck, 
  ChevronDown,
  RefreshCw,
  Video,
  ScanFace,
  FileAudio
} from "lucide-react";
import { Card } from "@/components/ui/card";
import DeepfakeResultCard from "@/components/scanner/DeepfakeResultCard";

const sampleDeepfakes = [
  { id: "politician", label: "Fake Politician Video" },
  { id: "scam-call", label: "AI Voice Clone Scam Call" },
  { id: "ai-image", label: "AI Generated Image" }
];

export default function DeepfakeAnalyzer() {
  const [fileState, setFileState] = useState(null); // { name, type }
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [sampleId, setSampleId] = useState(null);

  const fileInputRef = useRef(null);

  const loadSample = (sample) => {
    setSampleId(sample.id);
    let type = "video/mp4";
    let ext = ".mp4";
    if (sample.id === "scam-call") { type = "audio/mp3"; ext = ".mp3"; }
    else if (sample.id === "ai-image") { type = "image/jpeg"; ext = ".jpg"; }
    
    setFileState({ name: `sample_${sample.id}${ext}`, type });
    setDropdownOpen(false);
    setScanResult(null);
    toast.success(`Loaded sample: ${sample.label}`);
  };

  const handleClear = () => {
    setFileState(null);
    setSampleId(null);
    setScanResult(null);
    toast.info("Cleared media");
  };

  const handleAnalyze = async () => {
    if (!fileState) {
      toast.error("Please provide a media file to analyze.");
      return;
    }
    
    setIsScanning(true);
    setScanResult(null);
    
    try {
      const res = await fetch("/api/deepfake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fileType: fileState.type, 
          sampleId: sampleId 
        })
      });
      
      if (!res.ok) {
        throw new Error("Failed to analyze media");
      }
      
      const data = await res.json();
      setScanResult(data);
      
      if (data.threatLevel === "Critical" || data.threatLevel === "High Risk") {
        toast.error(`${data.threatLevel} threat detected!`);
      } else if (data.threatLevel === "Suspicious") {
        toast.warning("Suspicious content detected.");
      } else {
        toast.success("Media appears authentic.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during analysis.");
    } finally {
      setIsScanning(false);
    }
  };

  // Drag and Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileState({ name: file.name, type: file.type });
      setSampleId(null);
      toast.success("Media loaded for analysis");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            Deepfake Analysis <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">Beta</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Detect AI-generated video and synthetic voice cloning using advanced biometric analysis.
          </p>
        </div>
        
        {/* Sample Dropdown */}
        <div className="relative z-10">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            Load Sample <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 bg-card border border-border shadow-xl rounded-xl overflow-hidden py-1"
              >
                {sampleDeepfakes.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => loadSample(sample)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-foreground flex items-center gap-2"
                  >
                    {sample.id === 'scam-call' ? <FileAudio className="h-4 w-4" /> : sample.id === 'ai-image' ? <ScanFace className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                    {sample.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Card className="glass-card overflow-hidden border-white/10 bg-white/[0.01]">
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!isScanning && !scanResult ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div 
                  className={`relative w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    dragActive ? "border-primary bg-primary/5" : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="video/*,audio/*,image/*"
                    ref={fileInputRef} 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setFileState({ name: file.name, type: file.type });
                        setSampleId(null);
                        toast.success("Media loaded");
                      }
                    }} 
                  />
                  
                  {fileState ? (
                    <div className="flex flex-col items-center">
                      <div className="p-4 rounded-full bg-primary/20 mb-4">
                        {fileState.type.includes('audio') ? (
                          <FileAudio className="h-8 w-8 text-primary" />
                        ) : fileState.type.includes('image') ? (
                          <ScanFace className="h-8 w-8 text-primary" />
                        ) : (
                          <Video className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      <p className="text-sm font-bold text-foreground">
                        {fileState.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Ready for analysis</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <UploadCloud className={`h-10 w-10 mb-4 ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
                      <p className="text-sm font-medium text-foreground">
                        Drag and drop video, audio, or image file here
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Supports MP4, MOV, WAV, MP3, JPG, PNG</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button 
                    onClick={handleClear}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                  >
                    Clear Input
                  </button>
                  <button 
                    onClick={handleAnalyze}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-2"
                  >
                    <ScanFace className="h-4 w-4" /> Analyze Media
                  </button>
                </div>
              </motion.div>
            ) : isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64 space-y-6"
              >
                <div className="relative w-24 h-24">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-t-2 border-primary"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ScanFace className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                  {/* Subtle pulsing glow */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">Processing biometric data...</h3>
                  <div className="flex gap-1 justify-center items-center h-4 overflow-hidden text-sm text-muted-foreground">
                    <motion.div
                      animate={{ y: ["0%", "-100%", "-200%", "-300%"] }}
                      transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
                      className="flex flex-col"
                    >
                      <span>Extracting frame-by-frame metadata</span>
                      <span>Analyzing facial landmarks for GAN artifacts</span>
                      <span>Processing audio waveform frequencies</span>
                      <span>Running deep spectral synthesis</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <DeepfakeResultCard 
                key="result" 
                result={scanResult} 
                onReset={() => setScanResult(null)} 
              />
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
