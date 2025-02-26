
import { motion } from "framer-motion";
import {
    CheckCircle2
} from "lucide-react";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const HowItWorks = () => (
    <section className="mb-24 sm:mb-32">
        <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm sm:text-base">
                A streamlined process for quality assessment
            </p>
        </motion.div>

        <Tabs defaultValue="process" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="process" className="text-sm sm:text-base">
                    Process Flow
                </TabsTrigger>
                <TabsTrigger value="technical" className="text-sm sm:text-base">
                    Technical Details
                </TabsTrigger>
            </TabsList>
            <TabsContent value="process" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-4 sm:space-y-6">
                            {[
                                "Capture high-quality images of fruits and vegetables",
                                "Collect pH sensor data for internal quality assessment",
                                "Process data using cloud-based deep learning models",
                                "Analyze multiple quality factors",
                                "Generate real-time quality reports and alerts",
                            ].map((step, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <span className="text-green-400 text-xs sm:text-sm font-medium">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 mt-1 text-sm sm:text-base">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        className="bg-gray-800/50 p-4 sm:p-6 rounded-2xl border border-gray-700"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="/assets/blockdiagram.png"
                            alt="System Diagram"
                            className="w-full h-auto rounded-lg"
                        />
                    </motion.div>
                </div>
            </TabsContent>
            <TabsContent value="technical">
                <Card className="bg-gray-800/50 border-gray-700 text-gray-100">
                    <CardContent className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            <div>
                                <h4 className="text-base sm:text-lg font-semibold mb-4">
                                    Technologies Used
                                </h4>
                                <ul className="space-y-2 sm:space-y-3">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                                        <span className="text-sm sm:text-base">
                                            Deep Learning Models (TensorFlow/PyTorch)
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                                        <span className="text-sm sm:text-base">
                                            IoT Sensors & Controllers
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                                        <span className="text-sm sm:text-base">
                                            Cloud Computing Infrastructure
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-base sm:text-lg font-semibold mb-4">
                                    Performance Metrics
                                </h4>
                                <ul className="space-y-2 sm:space-y-3">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                                        <span className="text-sm sm:text-base">
                                            99.9% Uptime Guarantee
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                                        <span className="text-sm sm:text-base">
                                            Real-time Processing (100ms)
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                                        <span className="text-sm sm:text-base">
                                            95% Accuracy in Quality Assessment
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </section>
);
