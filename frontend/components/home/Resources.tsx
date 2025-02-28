import { motion } from "framer-motion";
import {
    ArrowRight, ChevronRight,
    FileText,
    Github
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent, CardHeader,
    CardTitle
} from "@/components/ui/card";

export const Resources = () => {
    return <section className="mb-24 sm:mb-32">
        <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Project Resources
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm sm:text-base">
                Access additional information and documentation
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-800/50 border-gray-700 text-gray-100">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Documentation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="/assets/Quality Analysis of Fruits and Vegetables report.pdf"
                                download="Project_Report.pdf"
                                className="text-blue-400 hover:underline flex items-center gap-2"
                            >
                                <ChevronRight className="h-4 w-4" />
                                Project Report (PDF)
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-blue-400 hover:underline flex items-center gap-2"
                            >
                                <ChevronRight className="h-4 w-4" />
                                User Manual
                            </a>
                        </li>
                        {/* <li>
                            <a
                                href="#"
                                className="text-blue-400 hover:underline flex items-center gap-2"
                            >
                                <ChevronRight className="h-4 w-4" />
                                API Documentation
                            </a>
                        </li> */}
                    </ul>
                </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700 text-gray-100">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Github className="h-5 w-5" />
                        Source Code
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        Explore our project's source code on GitHub:
                    </p>
                    <a href="https://github.com/Suryansh777777/Quality-Analysis-of-Fruits-and-Vegetables">
                        <Button className="w-full text-black" variant="outline">
                            View on GitHub
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                </CardContent>
            </Card>
        </div>
    </section>;
};  