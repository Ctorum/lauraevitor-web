import Image from "next/image"

interface BranchIconProps {
  className?: string
}

export function BranchIcon({ className = "" }: BranchIconProps) {
  return (
    <div className={className}>
      <Image src="/branch-icon.png" alt="Decorative branch" width={60} height={60} className="w-full h-auto" />
    </div>
  )
}
