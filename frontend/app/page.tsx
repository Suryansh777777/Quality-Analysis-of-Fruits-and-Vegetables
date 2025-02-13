"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Apple,
  Camera,
  Droplet,
  Leaf,
  ThermometerSun,
  AlertTriangle,
  BarChart2,
  Cloud,
  Zap,
  DollarSign,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/frontend/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

interface BenefitCardProps extends FeatureCardProps {}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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

const FeatureCard: React.FC<FeatureCardProps> = ({
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

const BenefitCard: React.FC<BenefitCardProps> = (props) => {
  return <FeatureCard {...props} className="border-green-500/20" />;
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      <header className="container mx-auto px-4 py-6 sm:py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
        <motion.div
          className="text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 bg-gray-800 text-gray-100 hover:bg-gray-700">
            New Release v2.0
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
          </div>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-12 text-gray-100">
        <section className="mb-24 sm:mb-16">
          <motion.div
            className="text-center mb-12 sm:mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Key Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              Our comprehensive solution combines cutting-edge technology with
              user-friendly interfaces
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
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

        <section className="mb-24 sm:mb-16">
          <motion.div
            className="text-center mb-12 sm:mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
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

        <section className="mb-24">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Benefits</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
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

        {/* <section className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Revolutionize Your Quality Control?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the future of agriculture and food technology today
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </section> */}
      </main>

      <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            2024 FruitQuality. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
