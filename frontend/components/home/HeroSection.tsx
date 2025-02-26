import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export const HeroSection = () => (
    <header className="container mx-auto px-4 py-12 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
        <motion.div
            className="text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Badge className="mb-4 bg-gray-800 text-gray-100 hover:bg-gray-700">
                Final Year Major Project
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold my-6 bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text px-2">
                Revolutionizing Fruit & Vegetable
                <br className="hidden sm:block" />
                Quality Analysis
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-300 max-w-2xl mx-auto px-4">
                Harness the power of IoT and Deep Learning for real-time quality
                assessment with unprecedented accuracy
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
                <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto"
                >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-800 w-full sm:w-auto"
                >
                    View Demo
                </Button>
            </div>
        </motion.div>
    </header>
);
