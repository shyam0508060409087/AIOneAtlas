"use client";

import { useState, useCallback, useRef } from "react";

export interface UsePromptOptions {
  onSubmit?: (value: string, planMode: boolean) => void;
}

export function usePrompt({ onSubmit }: UsePromptOptions = {}) {
  const [value, setValue] = useState("");
  const [planMode, setPlanMode] = useState(false);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoGrow = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      autoGrow();
    },
    [autoGrow]
  );

  const handleSubmit = useCallback(() => {
    if (!value.trim()) return;
    onSubmit?.(value.trim(), planMode);
  }, [value, planMode, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const fill = useCallback(
    (text: string) => {
      setValue(text);
      textareaRef.current?.focus();
      setTimeout(autoGrow, 0);
    },
    [autoGrow]
  );

  const clear = useCallback(() => {
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, []);

  return {
    value,
    planMode,
    focused,
    textareaRef,
    setValue,
    setPlanMode,
    setFocused,
    handleChange,
    handleSubmit,
    handleKeyDown,
    fill,
    clear,
    autoGrow,
  };
}
