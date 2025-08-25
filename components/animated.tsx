import { motion, MotionProps } from "framer-motion";

type Direction = "top" | "right" | "bottom" | "left";

export default function Animated({
    from = "top",
    to = "bottom",
    ...props
}: { from?: Direction; to?: Direction } & React.HTMLAttributes<HTMLDivElement> &
    MotionProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: from === "top" ? -20 : from === "bottom" ? 20 : 0,
                x: from === "right" ? 20 : from === "left" ? -20 : 0,
            }}
            animate={{
                opacity: 1,
                y: to === "top" ? -20 : to === "bottom" ? 20 : 0,
                x: to === "right" ? 20 : to === "left" ? -20 : 0,
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                type: "spring",
                stiffness: 100,
                damping: 10,
                mass: 0.1,
            }}
            {...props}
        />
    );
}
