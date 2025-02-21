import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UploadDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    imageUrl: string | null;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAnalyze: () => void;
    selectedImage: File | null;
}

export function UploadDialog({
    isOpen,
    onOpenChange,
    imageUrl,
    onImageUpload,
    onAnalyze,
    selectedImage,
}: UploadDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle>Upload Fruit Image for Analysis</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onImageUpload}
                        className="w-full"
                    />
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
                        onClick={onAnalyze}
                        disabled={!selectedImage}
                        className="w-full"
                    >
                        Start Analysis
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 