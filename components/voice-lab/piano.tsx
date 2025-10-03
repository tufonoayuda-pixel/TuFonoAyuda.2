import { cn } from "@/lib/utils"

interface PianoProps {
  activeNoteIndex: number
}

export function Piano({ activeNoteIndex }: PianoProps) {
  const whiteKeys = [0, 2, 4, 5, 7, 9, 11] // C, D, E, F, G, A, B
  const blackKeys = [1, 3, 6, 8, 10] // C#, D#, F#, G#, A#
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

  return (
    <div className="relative flex justify-center p-4">
      <div className="relative">
        {/* White keys container */}
        <div className="flex shadow-lg rounded-lg overflow-hidden">
          {whiteKeys.map((noteIndex, i) => {
            const isActive = activeNoteIndex % 12 === noteIndex
            return (
              <div
                key={`white-${noteIndex}`}
                className={cn(
                  "w-12 h-20 border-r border-gray-200 last:border-r-0 transition-all duration-200 ease-in-out",
                  "bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-gray-100",
                  "flex items-end justify-center pb-2 text-xs font-medium text-gray-600",
                  "cursor-pointer select-none",
                  isActive && "bg-gradient-to-b from-primary/20 to-primary/30 text-primary-foreground shadow-inner",
                  isActive && "transform scale-95",
                )}
              >
                <span className={cn("opacity-60", isActive && "opacity-100 font-bold")}>{noteNames[noteIndex]}</span>
              </div>
            )
          })}
        </div>

        {/* Black keys container */}
        <div className="absolute top-0 flex">
          {[0, 1, 3, 4, 5].map((position, i) => {
            const noteIndex = blackKeys[i]
            const isActive = activeNoteIndex % 12 === noteIndex

            // Calculate precise positioning for black keys
            const leftPositions = {
              0: "2rem", // C# - between C and D
              1: "5rem", // D# - between D and E
              2: "10rem", // F# - between F and G
              3: "13rem", // G# - between G and A
              4: "16rem", // A# - between A and B
            }

            return (
              <div
                key={`black-${noteIndex}`}
                className={cn(
                  "absolute w-8 h-12 transition-all duration-200 ease-in-out",
                  "bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800",
                  "rounded-b-md shadow-lg cursor-pointer select-none",
                  "flex items-end justify-center pb-1 text-xs font-medium text-white/80",
                  "border border-gray-700",
                  isActive && "bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-inner",
                  isActive && "transform scale-95 shadow-xl",
                )}
                style={{
                  left: leftPositions[position as keyof typeof leftPositions],
                  zIndex: 10,
                }}
              >
                <span className={cn("opacity-70", isActive && "opacity-100 font-bold text-xs")}>
                  {noteNames[noteIndex]}
                </span>
              </div>
            )
          })}
        </div>

        {/* Active note indicator */}
        {activeNoteIndex >= 0 && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              {noteNames[activeNoteIndex % 12]}
            </div>
          </div>
        )}
      </div>

      {/* Piano base */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-sm h-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full shadow-md opacity-60" />
    </div>
  )
}
