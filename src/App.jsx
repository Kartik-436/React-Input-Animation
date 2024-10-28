import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const textAreaRef = useRef(null);
  const [textValue, setTextValue] = useState("");

  const [isSelected, setIsSelected] = useState(false)

  const rotateValue = Math.floor(Math.random() * 201) - 100;

  return (
    <main className="p-5 flex flex-col">
      <textarea
        className="w-0 h-0 opacity-0" // Hide the textarea element
        onChange={(e) => setTextValue(e.target.value)}
        ref={textAreaRef}
      />
      <div
        id="area" tabIndex={0}
        onClick={() => {
            textAreaRef.current.focus()
            setIsSelected(true)
          }
        }
        className="border-2 min-h-60 bg-neutral-800 text-white font-spaceGrotesk whitespace-pre-wrap text-2xl w-3/4 p-10 overflow-x-hidden cursor-text absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl shadow-2xl shadow-slate-300"
      >
        <AnimatePresence>
          {textValue.split("").map((letter, index) => (
            <motion.span
              initial={{ opacity: 0, y: 100, rotate: rotateValue }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{
                opacity: 0,
                y: 100,
                rotate: rotateValue,
                transition: { duration: 0.15 },
              }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              key={index}
              className={letter !== "\n" ? "inline-block mr-0.5" : "inline"}
            >
              {letter}
            </motion.span>
          ))}
        </AnimatePresence>
        {/* Blinking Cursor */}
        <span className={`blinking-cursor ml-1 ${isSelected ? "inline-block" : "hidden"}`}>|</span>
      </div>
    </main>
  );
};

export default App;
