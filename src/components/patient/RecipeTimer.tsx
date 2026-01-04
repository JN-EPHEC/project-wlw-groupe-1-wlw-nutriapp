import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface RecipeTimerProps {
  totalMinutes: number;
  onClose: () => void;
}

export default function RecipeTimer({ totalMinutes, onClose }: RecipeTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(totalMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [initialSeconds] = useState(totalMinutes * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((initialSeconds - secondsRemaining) / initialSeconds) * 100;

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(initialSeconds);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1DBF73] to-[#0F8F55] p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <h3 className="text-h2 text-white mb-2">Chronomètre</h3>
          <p className="text-body-2 text-white/90">Temps de préparation</p>
        </div>

        <div className="p-8">
          {/* Timer Display */}
          <div className="relative mb-8">
            {/* Progress Circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#F8F8F8"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#1DBF73"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 85}`}
                strokeDashoffset={`${2 * Math.PI * 85 * (1 - progress / 100)}`}
                className="transition-all duration-300"
              />
            </svg>

            {/* Time in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-[#1A1A1A] mb-2">
                {formatTime(secondsRemaining)}
              </div>
              <div className="text-body-2 text-[#6C6C6C]">
                {secondsRemaining === 0 ? 'Terminé !' : 'restant'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 h-14 rounded-xl border-[#E5E5E5] hover:bg-[#F8F8F8] shadow-unified"
            >
              <RotateCcw className="w-5 h-5 mr-2" strokeWidth={2} />
              <span className="text-body-1 font-medium">Réinitialiser</span>
            </Button>
            <Button
              onClick={handlePlayPause}
              className="flex-1 h-14 rounded-xl bg-[#1DBF73] hover:bg-[#0F8F55] shadow-unified"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" strokeWidth={2} fill="white" />
                  <span className="text-body-1 font-medium">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" strokeWidth={2} fill="white" />
                  <span className="text-body-1 font-medium">Démarrer</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
