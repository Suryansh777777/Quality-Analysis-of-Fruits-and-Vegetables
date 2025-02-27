export const IDEAL_CONDITIONS: Record<string, {
    temperature: { min: number; max: number; unit: string; description: string; };
    humidity: { min: number; max: number; unit: string; description: string; };
    shelfLife: { value: number; unit: string; description: string; };
    weight: { min: number; max: number; unit: string; description: string; };
    tips: string[];
}> = {
    apple: {
        temperature: {
            min: 0,
            max: 4,
            unit: "°C",
            description: "Cold storage helps prevent ripening and maintains crispness"
        },
        humidity: {
            min: 90,
            max: 95,
            unit: "%",
            description: "High humidity prevents moisture loss and maintains fruit firmness"
        },
        shelfLife: {
            value: 180,
            unit: "days",
            description: "Under optimal conditions in controlled atmosphere storage"
        },
        weight: {
            min: 150,
            max: 250,
            unit: "g",
            description: "Medium to large sized apples are ideal for commercial grade"
        },
        tips: [
            "Store away from ethylene-sensitive produce",
            "Check regularly for any signs of decay",
            "Maintain good air circulation in storage"
        ]
    },
    banana: {
        temperature: {
            min: 13,
            max: 16,
            unit: "°C",
            description: "Warmer temperatures allow controlled ripening"
        },
        humidity: {
            min: 85,
            max: 90,
            unit: "%",
            description: "Moderate humidity prevents premature ripening and skin damage"
        },
        shelfLife: {
            value: 14,
            unit: "days",
            description: "Varies significantly based on ripeness stage at harvest"
        },
        weight: {
            min: 120,
            max: 180,
            unit: "g",
            description: "Standard commercial size for Cavendish variety"
        },
        tips: [
            "Keep separated from other fruits to control ripening",
            "Store at room temperature until ripe",
            "Refrigerate only when fully ripe"
        ]
    },
    orange: {
        temperature: {
            min: 3,
            max: 8,
            unit: "°C",
            description: "Cool temperatures prevent mold growth and maintain freshness"
        },
        humidity: {
            min: 85,
            max: 90,
            unit: "%",
            description: "Balanced humidity prevents skin drying and internal moisture loss"
        },
        shelfLife: {
            value: 60,
            unit: "days",
            description: "Extended shelf life possible with proper cold chain management"
        },
        weight: {
            min: 140,
            max: 200,
            unit: "g",
            description: "Premium grade size range for most commercial varieties"
        },
        tips: [
            "Avoid storing with apples and bananas",
            "Monitor for signs of mold development",
            "Keep dry to prevent rind damage"
        ]
    }
};

