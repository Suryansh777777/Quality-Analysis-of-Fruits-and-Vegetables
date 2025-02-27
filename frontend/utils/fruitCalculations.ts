type RipenessLevel = 'underripe' | 'ripe' | 'overripe';

interface PhRange {
    min: number;
    max: number;
}

// pH ranges for different fruits at different ripeness levels
export const FRUIT_PH_RANGES: Record<string, Record<RipenessLevel, PhRange>> = {
    apple: {
        underripe: { min: 3.8, max: 4.0 },
        ripe: { min: 3.3, max: 3.7 },
        overripe: { min: 3.0, max: 3.2 }
    },
    banana: {
        underripe: { min: 5.0, max: 5.5 },
        ripe: { min: 4.5, max: 4.9 },
        overripe: { min: 4.0, max: 4.4 }
    },
    orange: {
        underripe: { min: 3.5, max: 4.0 },
        ripe: { min: 3.0, max: 3.4 },
        overripe: { min: 2.6, max: 2.9 }
    }
};

// Ripeness percentage calculation based on various factors
export function calculateRipenessPercentage(
    fruitType: string,
    ripeness: RipenessLevel,
    phLevel: number,
    qualityScore: number
): number {
    let basePercentage = {
        underripe: 30,
        ripe: 100,
        overripe: 60
    }[ripeness];

    // pH factor calculation
    const phRange = FRUIT_PH_RANGES[fruitType][ripeness];
    const phFactor = calculatePhFactor(phLevel, phRange);

    // Quality score factor
    const qualityFactor = qualityScore / 100;

    // Combine all factors with different weights
    const finalPercentage = (
        basePercentage * 0.5 + // 50% weight to base ripeness
        phFactor * 30 +        // 30% weight to pH factor
        qualityFactor * 20     // 20% weight to quality score
    );

    return Math.min(Math.max(Math.round(finalPercentage), 0), 100);
}

// Calculate how ideal the pH level is within the expected range
function calculatePhFactor(actual: number, range: PhRange): number {
    if (actual < range.min) {
        return 1 - Math.min(Math.abs(actual - range.min) / range.min, 1);
    }
    if (actual > range.max) {
        return 1 - Math.min(Math.abs(actual - range.max) / range.max, 1);
    }
    // pH is within range - calculate how centered it is
    const rangeSize = range.max - range.min;
    const middle = range.min + rangeSize / 2;
    return 1 - Math.abs(actual - middle) / rangeSize;
}

// Calculate pH level based on ripeness and fruit type
export function calculatePhLevel(
    fruitType: string,
    ripeness: RipenessLevel,
    qualityScore: number
): number {
    const phRange = FRUIT_PH_RANGES[fruitType][ripeness];
    
    // Base pH is the middle of the range
    const basePh = (phRange.min + phRange.max) / 2;
    
    // Quality factor affects pH slightly (±0.2 max)
    const qualityFactor = ((qualityScore - 50) / 50) * 0.2;
    
    // Calculate final pH with some randomness for natural variation
    const randomVariation = (Math.random() - 0.5) * 0.1; // ±0.05 random variation
    
    const finalPh = basePh + qualityFactor + randomVariation;
    
    // Ensure pH stays within the valid range for the fruit
    return Math.min(Math.max(finalPh, phRange.min), phRange.max);
}

// Get descriptive status of pH level
export function getPhStatus(actual: number, range: PhRange): {
    status: 'optimal' | 'acceptable' | 'critical';
    message: string;
} {
    const middle = (range.min + range.max) / 2;
    const tolerance = (range.max - range.min) * 0.2; // 20% of range as tolerance

    if (actual >= (middle - tolerance) && actual <= (middle + tolerance)) {
        return {
            status: 'optimal',
            message: 'pH level is in optimal range'
        };
    } else if (actual >= range.min && actual <= range.max) {
        return {
            status: 'acceptable',
            message: 'pH level is acceptable but not optimal'
        };
    } else {
        return {
            status: 'critical',
            message: actual < range.min ? 'pH level is too low' : 'pH level is too high'
        };
    }
} 