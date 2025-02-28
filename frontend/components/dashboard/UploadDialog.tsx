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
            <DialogContent className="bg-gray-800 text-white sm:max-w-2xl w-[95vw] p-6">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-bold text-center">Upload Fruit Image for Analysis</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    {error && (
                        <Alert variant="destructive" className="border-red-500 bg-red-500/10">
                            <AlertDescription className="text-red-200">{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        <Button
                            onClick={() => setImageSource('upload')}
                            variant={imageSource === 'upload' ? "default" : "secondary"}
                            className="flex-1 sm:flex-none min-w-[120px]"
                        >
                            Upload File
                        </Button>
                        <Button
                            onClick={() => setImageSource('url')}
                            variant={imageSource === 'url' ? "default" : "secondary"}
                            className="flex-1 sm:flex-none min-w-[120px]"
                        >
                            Image URL
                        </Button>
                        <Button
                            onClick={() => setImageSource('camera')}
                            variant={imageSource === 'camera' ? "default" : "secondary"}
                            className="flex-1 sm:flex-none min-w-[120px]"
                        >
                            Use Camera
                        </Button>
                    </div>

                    <select
                        className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                        value={selectedFruitType}
                        onChange={(e) => setSelectedFruitType(e.target.value as FruitType)}
                    >
                        <option value="">Select Fruit/Vegetable Type</option>
                        {availableFruits.map(fruit => (
                            <option key={fruit} value={fruit}>{fruit}</option>
                        ))}
                    </select>

                    {imageSource === 'upload' && (
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onImageUpload}
                                className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                            />
                        </div>
                    )}

                    {imageSource === 'url' && (
                        <div className="space-y-3">
                            <input
                                type="url"
                                value={imageUrlInput}
                                onChange={(e) => setImageUrlInput(e.target.value)}
                                placeholder="Enter image URL"
                                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors"
                            />
                            <Button
                                onClick={() => onUrlSubmit(imageUrlInput)}
                                disabled={!imageUrlInput}
                                className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
                            >
                                Load Image
                            </Button>
                        </div>
                    )}

                    {imageSource === 'camera' && (
                        <Button
                            onClick={onCameraCapture}
                            className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
                        >
                            Capture from Raspberry Pi Camera
                        </Button>
                    )}

                    {imageUrl && (
                        <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden border-2 border-gray-600">
                            <img
                                src={imageUrl}
                                alt="Selected fruit"
                                className="w-full h-full object-contain rounded-lg bg-gray-900/50"
                            />
                        </div>
                    )}

                    <Button
                        onClick={handleAnalyzeClick}
                        disabled={!selectedImage || !selectedFruitType}
                        className={`w-full text-lg py-6 ${!selectedImage || !selectedFruitType
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                            } transition-colors`}
                    >
                        Start Analysis
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 