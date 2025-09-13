import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/i18n-context";

type PromoCodeCopyProps = {
  code: string;
  theme?: "yellow" | "blue" | "purple";
  className?: string;
  label?: string;
};

const themeMap = {
  yellow: "bg-yellow-500/40 text-yellow-50 border border-yellow-400/50",
  blue: "bg-blue-500/40 text-blue-50 border border-blue-400/50", 
  purple: "bg-purple-500/40 text-purple-50 border border-purple-400/50",
};

export function PromoCodeCopy({
  code,
  theme = "yellow",
  className = "",
  label,
}: PromoCodeCopyProps) {
  const { t } = useI18n();
  const [copyState, setCopyState] = useState<"idle" | "success" | "manual">("idle");

  const copyWithFallback = async (text: string) => {
    try {
      // Layer 1: 現代瀏覽器 Clipboard API (HTTPS)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopyState("success");
        return;
      }
      
      // Layer 2: 傳統瀏覽器 execCommand fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const result = document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopyState(result ? "success" : "manual");
    } catch (error) {
      // Layer 3: 完全失敗，提示手動複製
      console.warn("Clipboard copy failed:", error);
      setCopyState("manual");
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    copyWithFallback(code);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      copyWithFallback(code);
    }
  };

  useEffect(() => {
    if (copyState !== "idle") {
      const timeout = setTimeout(
        () => setCopyState("idle"),
        copyState === "manual" ? 4000 : 2000
      );
      return () => clearTimeout(timeout);
    }
  }, [copyState]);

  return (
    <div
      className={`rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200 animate-fade-in ${themeMap[theme]} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={label || t("tickets.promoCodeClick")}
    >
      <span className="font-mono font-bold text-lg select-all">{code}</span>
      {copyState === "success" && (
        <span className="text-green-400 ml-2 flex items-center" aria-live="polite">
          <svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {t("tickets.promoCodeCopied")}
        </span>
      )}
      {copyState === "manual" && (
        <span className="text-yellow-300 ml-2 flex items-center" aria-live="polite">
          <svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m-4-5v9" />
          </svg>
          {t("tickets.promoCodeManual")}
        </span>
      )}
      {copyState === "idle" && (
        <span className="ml-2 flex items-center">
          <svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label || t("tickets.promoCodeClick")}
        </span>
      )}
    </div>
  );
}