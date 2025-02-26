import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FruitType } from "@/types/dashboard";
interface UploadDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    imageUrl: string | null;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUrlSubmit: (url: string) => void;
    onCameraCapture: () => void;
    onAnalyze: (selectedFruitType: string) => void;
    selectedImage: File | null;
    availableFruits: string[];
    error?: string | null;
    selectedFruitType: string;
    setSelectedFruitType: (fruit: FruitType) => void;
}

export function UploadDialog({
    isOpen,
    onOpenChange,
    imageUrl,
    onImageUpload,
    onUrlSubmit,
    onCameraCapture,
    onAnalyze,
    selectedImage,
    availableFruits,
    error,
    selectedFruitType,
    setSelectedFruitType,
}: UploadDialogProps) {
    const [imageSource, setImageSource] = useState<'upload' | 'url' | 'camera'>('upload');
    const [imageUrlInput, setImageUrlInput] = useState('');

    const handleAnalyzeClick = () => {
        onAnalyze(selectedFruitType);
        setImageUrlInput('');
        setImageSource('upload');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-800 text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Upload Fruit Image for Analysis</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex space-x-4 mb-4">
                        <Button
                            onClick={() => setImageSource('upload')}
                            variant={imageSource === 'upload' ? "default" : "secondary"}
                        >
                            Upload File
                        </Button>
                        <Button
                            onClick={() => setImageSource('url')}
                            variant={imageSource === 'url' ? "default" : "secondary"}
                        >
                            Image URL
                        </Button>
                        <Button
                            onClick={() => setImageSource('camera')}
                            variant={imageSource === 'camera' ? "default" : "secondary"}
                        >
                            Use Camera
                        </Button>
                    </div>

                    <select
                        className="w-full p-2 bg-gray-700 rounded-md"
                        value={selectedFruitType}
                        onChange={(e) => setSelectedFruitType(e.target.value as FruitType)}
                    >
                        <option value="">Select Fruit/Vegetable Type</option>
                        {availableFruits.map(fruit => (
                            <option key={fruit} value={fruit}>{fruit}</option>
                        ))}
                    </select>

                    {imageSource === 'upload' && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onImageUpload}
                            className="w-full"
                        />
                    )}

                    {imageSource === 'url' && (
                        <div className="space-y-2">
                            <input
                                type="url"
                                value={imageUrlInput}
                                onChange={(e) => setImageUrlInput(e.target.value)}
                                placeholder="Enter image URL"
                                className="w-full p-2 bg-gray-700 rounded-md"
                            />
                            <Button
                                onClick={() => onUrlSubmit(imageUrlInput)}
                                disabled={!imageUrlInput}
                                className="w-full"
                            >
                                Load Image
                            </Button>
                        </div>
                    )}

                    {imageSource === 'camera' && (
                        <Button
                            onClick={onCameraCapture}
                            className="w-full"
                        >
                            Capture from Raspberry Pi Camera
                        </Button>
                    )}

                    {imageUrl && (
                        <div className="relative w-full h-48">
                            <img
                                src={imageUrl}
                                alt="Selected fruit"
                                className="w-full h-full object-contain rounded-lg"
                            />
                        </div>
                    )}

                    <Button
                        onClick={handleAnalyzeClick}
                        disabled={!selectedImage || !selectedFruitType}
                        className="w-full"
                    >
                        Start Analysis
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 