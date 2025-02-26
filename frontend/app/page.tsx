"use client";

import { Footer } from "@/components/home/Footer";
import { Benefits } from "@/components/home/Benefits";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HeroSection } from "@/components/home/HeroSection";
import { Resources } from "@/components/home/Resources";
import { Navbar } from "@/components/home/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <HeroSection />
      <main className="container mx-auto px-4 py-12 sm:py-20 text-gray-100">
        <KeyFeatures />
        <HowItWorks />
        <Benefits />
        <Resources />
      </main>
      <Footer />
    </div>
  );
}



{/* <section className="mb-24 sm:mb-32">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Project Gallery
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              Explore our project through visual demonstrations
            </p>
          </motion.div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="flex aspect-video items-center justify-center p-6">
                        <img
                          src={`/placeholder.svg?height=400&width=600&text=Project+Image+${
                            index + 1
                          }`}
                          alt={`Project Image ${index + 1}`}
                          className="w-full h-auto rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section> */}


