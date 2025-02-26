'use client';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Update interface to match actual API response
interface AnalysisResult {
    Freshness: string;
    Ripeness?: string;
    "Shelf Life"?: string;
}

export default function Predict() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/api/analyze', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: AnalysisResult = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error analyzing image:', error);
            setError(error instanceof Error ? error.message : 'An error occurred while analyzing the image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Fruit Quality Analysis
                </h1>

                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />

                            {preview && (
                                <div className="mt-4">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="max-w-full h-auto rounded-lg"
                                    />
                                </div>
                            )}

                            <Button
                                onClick={analyzeImage}
                                disabled={!file || loading}
                                className="w-full"
                            >
                                {loading ? 'Analyzing...' : 'Analyze Image'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {results && (
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium">Freshness</h3>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {results.Freshness}
                                    </p>
                                </div>

                                {results.Ripeness && (
                                    <div>
                                        <h3 className="text-lg font-medium">Ripeness</h3>
                                        <p className="text-2xl font-bold text-green-600">
                                            {results.Ripeness}
                                        </p>
                                    </div>
                                )}

                                {results["Shelf Life"] && (
                                    <div>
                                        <h3 className="text-lg font-medium">Shelf Life</h3>
                                        <p className="text-2xl font-bold text-orange-600">
                                            {results["Shelf Life"]}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}