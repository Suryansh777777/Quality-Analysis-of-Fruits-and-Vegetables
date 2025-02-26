"use client";
import { motion } from "framer-motion";
import {
    Leaf,
    ThermometerSun,
    AlertTriangle
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";


interface BenefitCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}


const BenefitCard: React.FC<BenefitCardProps> = (props) => {
    return <FeatureCard {...props} className="border-green-500/20" />;
};
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};
export const Benefits = () => (
    <section className="mb-24 sm:mb-32">
        <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Benefits</h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm sm:text-base">
                Transform your quality control process with our innovative
                solution
            </p>
        </motion.div>

        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <BenefitCard
                icon={<Leaf className="h-6 w-6 text-green-400" />}
                title="Reduced Food Waste"
                description="Accurate quality assessment leads to better inventory management and less spoilage"
            />
            <BenefitCard
                icon={<ThermometerSun className="h-6 w-6 text-yellow-400" />}
                title="Improved Quality Control"
                description="Consistent and objective grading across large batches of produce"
            />
            <BenefitCard
                icon={<AlertTriangle className="h-6 w-6 text-red-400" />}
                title="Early Defect Detection"
                description="Identify and address quality issues before they escalate to wastage"
            />
        </motion.div>
    </section>
)