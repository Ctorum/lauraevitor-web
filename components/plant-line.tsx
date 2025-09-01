import { cn } from "@/lib/utils";

type PlantLineProps = {
    amount?: number;
};

function Batch() {
    return (
        <span className="flex items-center">
            <img
                src="/images/plant-frac-1.png"
                alt="Plant fract 1"
                className="-ml-9 mt-5 z-[3]"
            />
            <img
                src="/images/plant-frac-3.png"
                alt="Plant fract 3"
                className="-ml-12 mb-4 z-[2]"
            />
            <img
                src="/images/plant-frac-1.png"
                alt="Plant fract 1"
                className="-ml-10 mt-4 z-[1] group-[.bg-transparent]:hidden"
            />
        </span>
    );
}

export default function PlantLine({
    amount = 2,
    ...props
}: React.HTMLProps<HTMLDivElement> & PlantLineProps) {
    return (
        <div
            {...props}
            className={cn(
                "h-20 flex items-center overflow-hidden sm:overflow-visible",
                props.className,
            )}
        >
            <div
                className={`w-full h-1 bg-third group-[.bg-transparent]:bg-transparent absolute`}
            />

            {Array(amount)
                .fill(0)
                .map((_, i) => (
                    <Batch key={i} />
                ))}
        </div>
    );
}
