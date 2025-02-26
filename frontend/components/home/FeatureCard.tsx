
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
    className,
}) => {
    return (
        <motion.div variants={itemVariants}>
            <Card
                className={cn(
                    "bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-colors duration-300 text-gray-100",
                    className
                )}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl sm:text-lg">
                        <div className="p-2 rounded-lg bg-gray-700/50">{icon}</div>
                        <span className="text-base sm:text-sm md:text-base">{title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-gray-300 text-base sm:text-sm md:text-base">
                        {description}
                    </CardDescription>
                </CardContent>
            </Card>
        </motion.div>
    );
};