import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
    isAnalyzing: boolean;
    onAnalyze: () => void;
}

export function DashboardHeader({ isAnalyzing, onAnalyze }: DashboardHeaderProps) {
    return (
        <motion.div
            className="flex flex-col sm:flex-row justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-green-200 mb-4 sm:mb-0">
                Fruit Quality Analysis Dashboard
            </h1>
            <Button
                onClick={onAnalyze}
                disabled={isAnalyzing}
                className="bg-black text-white w-full sm:w-auto"
            >
                {isAnalyzing ? (
                    <>
                        Analyzing... <Camera className="ml-2 h-4 w-4 animate-pulse" />
                    </>
                ) : (
                    <>
                        Start New Analysis <Camera className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>
        </motion.div>
    );
} 