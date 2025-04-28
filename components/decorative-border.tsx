export function DecorativeBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-pink-50 via-white to-pink-50" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-r from-pink-50 via-white to-pink-50 rotate-180" />
    </div>
  )
}
