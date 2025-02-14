'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function PredictPage() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>('')
    const [prediction, setPrediction] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            setImageUrl(URL.createObjectURL(file))
            setError('')
            setPrediction(null)
        }
    }

    const analyzeFruit = async () => {
        if (!selectedImage) {
            setError('Please select an image first')
            return
        }

        setLoading(true)
        setError('')

        const formData = new FormData()
        formData.append('file', selectedImage)

        try {
            const response = await fetch('http://localhost:8000/api/analyze-fruit', {
                method: 'POST',
                body: formData,
            })

            const result = await response.json()
            if (result.success) {
                setPrediction(result.data)
            } else {
                setError(result.error || 'Analysis failed')
            }
        } catch (err) {
            setError('Failed to connect to the server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Fruit Quality Analysis</h1>

            <div className="mb-8">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-4"
                />

                {imageUrl && (
                    <div className="mb-4">
                        <Image
                            src={imageUrl}
                            alt="Selected fruit"
                            width={300}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <button
                    onClick={analyzeFruit}
                    disabled={loading || !selectedImage}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                    {loading ? 'Analyzing...' : 'Analyze Fruit'}
                </button>

                {error && (
                    <div className="text-red-500 mt-4">{error}</div>
                )}
            </div>

            {prediction && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
                            <p>Predicted Fruit: {prediction.prediction}</p>
                            <p>Confidence: {(prediction.confidence * 100).toFixed(2)}%</p>
                            <p>Quality Score: {prediction.quality_score.toFixed(2)}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Nutritional Data</h3>
                            {Object.entries(prediction.nutritional_data).map(([key, value]) => (
                                <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {String(value)}</p>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Physical Properties</h3>
                            <p>Weight: {prediction.physical_properties.weight}g</p>
                            <p>Size: {prediction.physical_properties.size.length}cm x {prediction.physical_properties.size.width}cm</p>
                            <p>Firmness: {prediction.physical_properties.firmness}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
