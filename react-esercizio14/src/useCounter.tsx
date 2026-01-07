import { useState } from "react";

export function useCounter() {
  const [counter, setCounter] = useState(0);

  function handleCounterIncrement() {
    setCounter((c) => c + 1);
  }

  function handleCounterDecrement() {
    setCounter((c) => c - 1);
  }

  function handleCounterReset() {
    setCounter(0);
  }

  return [
    counter,
    {
      onIncrement: handleCounterIncrement,
      onDecrement: handleCounterDecrement,
      onReset: handleCounterReset,
    },
  ] as const;
}
