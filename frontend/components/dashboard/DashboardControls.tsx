import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface DashboardControlsProps {
    selectedFruit: string;
    selectedTimeRange: string;
    autoUpdateEnabled: boolean;
    onFruitChange: (value: string) => void;
    onTimeRangeChange: (value: string) => void;
    onAutoUpdateChange: (value: boolean) => void;
    fruits: string[];
}

export function DashboardControls({
    selectedFruit,
    selectedTimeRange,
    autoUpdateEnabled,
    onFruitChange,
    onTimeRangeChange,
    onAutoUpdateChange,
    fruits,
}: DashboardControlsProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <Select value={selectedFruit} onValueChange={onFruitChange}>
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select produce" />
                </SelectTrigger>
                <SelectContent>
                    {fruits.map((fruit) => (
                        <SelectItem key={fruit} value={fruit}>
                            {fruit}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Select value={selectedTimeRange} onValueChange={onTimeRangeChange}>
                    <SelectTrigger className="w-full sm:w-[140px] bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Time range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Last 24 Hours</SelectItem>
                        <SelectItem value="week">Last 7 Days</SelectItem>
                        <SelectItem value="month">Last 30 Days</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                    <Switch
                        checked={autoUpdateEnabled}
                        onCheckedChange={onAutoUpdateChange}
                        id="auto-update"
                    />
                    <label htmlFor="auto-update" className="text-sm text-gray-400">
                        Auto Cycle
                    </label>
                </div>
            </div>
        </div>
    );
} 