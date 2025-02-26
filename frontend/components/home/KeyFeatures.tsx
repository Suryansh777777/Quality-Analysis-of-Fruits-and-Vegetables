import {
    Camera,
    Droplet, BarChart2,
    Cloud,
    Zap,
    DollarSign
} from "lucide-react";
import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};
export const KeyFeatures = () => (
    <section className="mb-24 sm:mb-32">
        <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Key Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm sm:text-base">
                Our comprehensive solution combines cutting-edge technology with
                user-friendly interfaces
            </p>
        </motion.div>

        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <FeatureCard
                icon={<Camera className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />}
                title="Image Processing"
                description="Advanced computer vision for visual quality assessment"
            />
            <FeatureCard
                icon={
                    <Droplet className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                }
                title="pH Sensing"
                description="Real-time chemical analysis for internal quality checks"
            />
            <FeatureCard
                icon={<Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />}
                title="Cloud Integration"
                description="Scalable data processing and storage solutions"
            />
            <FeatureCard
                icon={
                    <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                }
                title="Real-time Analytics"
                description="Instant quality grading and defect detection"
            />
            <FeatureCard
                icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />}
                title="IoT Enabled"
                description="Seamless connectivity for continuous monitoring"
            />
            <FeatureCard
                icon={
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                }
                title="Cost-Effective"
                description="Affordable solution for businesses of all sizes"
            />
        </motion.div>
    </section>
);
