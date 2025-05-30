// app/components/TypingHero.tsx or app/ui/TypingHero.tsx
'use client';

import { Typewriter } from 'react-simple-typewriter';
import { useState } from 'react';

export default function TypingHero() {
  const [show, setShow] = useState(true);
  return (
    <h1 className="text-5xl text-white font-bold text-center mt-10">
      <Typewriter
        words={['Welcome to SpotWatch!', 'Find parking in seconds.', 'Real-time updates.']}
        loop={1}
        cursor
        cursorStyle="|"
        typeSpeed={100}
        deleteSpeed={80}
        delaySpeed={1500}
        onLoopDone={() => setShow(false)} // Hide after 1 loop
      />
    </h1>
  );
}
