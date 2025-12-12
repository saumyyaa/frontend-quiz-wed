"use client";

import useSound from "use-sound";

export default function SoundButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.4, preload: true });

  const handleClick = () => {
    if (!disabled) {
      onClick();
      playClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`h-10 w-10 rounded-full flex items-center justify-center shadow-md border border-slate-200 cursor-pointer
      ${
        disabled
          ? "bg-gray-200 cursor-not-allowed text-gray-400"
          : "bg-white hover:bg-blue-50 text-slate-700 active:scale-95"
      }`}
    >
      {children}
    </button>
  );
}
