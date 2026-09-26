import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  X,
  Sparkles,
  User,
  Loader2,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AIChatbot = () => {
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm LeadAxis AI. How can I help you today?",
    },
  ]);

  /*
  |--------------------------------------------------------------------------
  | MOBILE KEYBOARD DETECTION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!window.visualViewport) return;

    const viewport = window.visualViewport;

    const handleViewportResize = () => {
      const keyboardHeight =
        window.innerHeight - viewport.height;

      setKeyboardOpen(keyboardHeight > 120);
    };

    viewport.addEventListener("resize", handleViewportResize);

    return () => {
      viewport.removeEventListener(
        "resize",
        handleViewportResize
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | OPEN / CLOSE ANIMATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });

      if (window.innerWidth >= 640) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 350);
      }
    } else {
      setIsVisible(false);
      setKeyboardOpen(false);
    }
  }, [isOpen]);

  /*
  |--------------------------------------------------------------------------
  | AUTO SCROLL
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [messages, isLoading, isOpen]);

  /*
  |--------------------------------------------------------------------------
  | SEND MESSAGE
  |--------------------------------------------------------------------------
  */

  const sendMessage = async (customMessage = null) => {
    const message = (customMessage ?? input).trim();

    if (!message || isLoading) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!API_URL) {
        throw new Error("VITE_API_URL is not configured.");
      }

      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message,
          history: messages.slice(-10),
        }),
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error(
          "AI API returned non-JSON response:",
          responseText
        );

        throw new Error(
          `AI API returned invalid response. Status: ${response.status}`
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to get AI response."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error("AI CHAT ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  /*
  |--------------------------------------------------------------------------
  | ENTER KEY
  |--------------------------------------------------------------------------
  */

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | CLOSE
  |--------------------------------------------------------------------------
  */

  const closeChatbot = () => {
    setIsVisible(false);

    setTimeout(() => {
      setIsOpen(false);
    }, 280);
  };

  /*
  |--------------------------------------------------------------------------
  | QUICK QUESTIONS
  |--------------------------------------------------------------------------
  */

  const quickActions = [
    "What does LeadAxis do?",
    "I need qualified leads",
    "How does pay-per-call work?",
  ];

  return (
    <>
      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {isOpen && (
        <div
          onClick={closeChatbot}
          className={`
            fixed
            inset-0
            z-[998]
            bg-black/40
            backdrop-blur-[3px]
            transition-all
            duration-300
            sm:hidden
            ${
              isVisible
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
        />
      )}

      {/* =====================================================
          CHAT WINDOW
      ===================================================== */}

      {isOpen && (
        <div
          className={`
            fixed
            z-[999]
            overflow-hidden
            bg-white

            /* ================= MOBILE ================= */

            inset-x-0
            bottom-0
            flex
            h-[min(88dvh,760px)]
            w-full
            flex-col
            rounded-t-[26px]

            /* ================= DESKTOP ================= */

            sm:bottom-[88px]
            sm:right-6
            sm:left-auto
            sm:h-[min(620px,calc(100vh-110px))]
            sm:w-[390px]
            sm:rounded-2xl

            border
            border-gray-200

            shadow-[0_20px_70px_rgba(0,0,0,0.20)]

            /* ================= POP ANIMATION ================= */

            origin-bottom-right
            transform
            transition-all
            duration-[320ms]
            ease-[cubic-bezier(0.16,1,0.3,1)]

            ${
              isVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-8 scale-[0.88] opacity-0"
            }
          `}
          style={{
            /*
             * When keyboard opens, visual viewport becomes smaller.
             * Moving the chat window above the keyboard keeps the
             * input completely visible.
             */
            bottom:
              keyboardOpen && window.visualViewport
                ? `${Math.max(
                    0,
                    window.innerHeight -
                      window.visualViewport.height
                  )}px`
                : undefined,
          }}
        >
          {/* =================================================
              MOBILE HANDLE
          ================================================= */}

          <div className="absolute left-1/2 top-2 z-30 -translate-x-1/2 sm:hidden">
            <div className="h-1 w-10 rounded-full bg-white/40" />
          </div>

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="relative shrink-0 overflow-hidden bg-[#0a0d0a] px-4 pb-4 pt-5 text-white sm:pt-4">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-lime-300/20 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300 text-[#0a0d0a] shadow-lg shadow-lime-300/10 sm:h-11 sm:w-11">
                  <Bot
                    size={21}
                    strokeWidth={2.2}
                  />

                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#0a0d0a] bg-lime-400" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[14px] font-semibold sm:text-[15px]">
                    LeadAxis AI

                    <Sparkles
                      size={13}
                      className="shrink-0 text-lime-300"
                    />
                  </div>

                  <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-gray-400 sm:text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                    Online • AI Assistant
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeChatbot}
                aria-label="Close LeadAxis AI"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition-all
                  duration-200
                  hover:bg-white/10
                  hover:text-white
                  active:scale-90
                  sm:h-10
                  sm:w-10
                "
              >
                <X size={19} />
              </button>
            </div>
          </div>

          {/* =================================================
              MESSAGES
          ================================================= */}

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              overscroll-contain
              bg-[#f7f8f6]
              px-3
              py-4
              sm:px-4
              sm:py-5
            "
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {messages.length === 1 && (
              <div className="mb-5 pt-1 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-300 text-[#0a0d0a] shadow-sm">
                  <MessageCircle size={21} />
                </div>

                <p className="text-xs font-medium text-gray-500">
                  How can we help your business?
                </p>
              </div>
            )}

            {messages.map((message, index) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={index}
                  className={`mb-3 flex ${
                    isUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      flex
                      max-w-[88%]
                      items-end
                      gap-2
                      sm:max-w-[90%]
                      ${isUser ? "flex-row-reverse" : ""}
                    `}
                  >
                    {/* AVATAR */}

                    <div
                      className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        ${
                          isUser
                            ? "bg-[#0a0d0a] text-lime-300"
                            : "bg-lime-300 text-[#0a0d0a]"
                        }
                      `}
                    >
                      {isUser ? (
                        <User size={13} />
                      ) : (
                        <Bot size={13} />
                      )}
                    </div>

                    {/* MESSAGE */}

                    <div
                      className={`
                        break-words
                        rounded-2xl
                        px-3.5
                        py-2.5
                        text-[13px]
                        leading-[1.45]
                        shadow-sm
                        ${
                          isUser
                            ? "rounded-br-md bg-[#0a0d0a] text-white"
                            : "rounded-bl-md border border-gray-200 bg-white text-gray-700"
                        }
                      `}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* =================================================
                LOADING
            ================================================= */}

            {isLoading && (
              <div className="mb-3 flex justify-start">
                <div className="flex items-end gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-300 text-[#0a0d0a]">
                    <Bot size={13} />
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-gray-200 bg-white px-3.5 py-3 shadow-sm">
                    <Loader2
                      size={14}
                      className="animate-spin text-gray-500"
                    />

                    <span className="text-xs text-gray-400">
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* =================================================
              QUICK QUESTIONS
              Hide when keyboard is open on mobile.
          ================================================= */}

          {messages.length === 1 && !keyboardOpen && (
            <div className="shrink-0 border-t border-gray-100 bg-white px-3 py-2.5 sm:px-3 sm:py-3">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Quick questions
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {quickActions.map((question) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() => sendMessage(question)}
                    disabled={isLoading}
                    className="
                      shrink-0
                      rounded-full
                      border
                      border-gray-200
                      bg-gray-50
                      px-3
                      py-2
                      text-[10px]
                      font-medium
                      text-gray-600
                      transition
                      active:scale-95
                      hover:border-lime-300
                      hover:bg-lime-50
                      hover:text-gray-900
                      disabled:opacity-50
                    "
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              BOOKING CTA

              Hide while keyboard is open on mobile.
          ================================================= */}

          {!keyboardOpen && (
            <button
              type="button"
              onClick={() => {
                closeChatbot();

                setTimeout(() => {
                  navigate("/booking");
                }, 280);
              }}
              className="
                mx-3
                mb-2
                flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-lime-300
                px-4
                py-2.5
                text-xs
                font-bold
                text-[#0a0d0a]
                shadow-sm
                transition-all
                duration-200
                active:scale-[0.98]
                hover:bg-lime-400
                hover:shadow-md
                sm:mx-4
                sm:mb-2.5
                sm:py-3
              "
            >
              <CalendarDays size={14} />
              Book a Consultation
            </button>
          )}

          {/* =================================================
              INPUT
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="
              shrink-0
              border-t
              border-gray-200
              bg-white
              px-3
              pt-2.5
              pb-[calc(9px+env(safe-area-inset-bottom))]
              sm:pt-3
              sm:pb-[calc(12px+env(safe-area-inset-bottom))]
            "
          >
            <div
              className="
                flex
                min-h-[46px]
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-2
                py-1
                transition
                focus-within:border-lime-400
                focus-within:bg-white
                focus-within:ring-2
                focus-within:ring-lime-300/20
              "
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask LeadAxis AI..."
                disabled={isLoading}
                autoComplete="off"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-1
                  py-2.5
                  text-[13px]
                  text-gray-800
                  outline-none
                  placeholder:text-gray-400
                  sm:text-sm
                "
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#0a0d0a]
                  text-lime-300
                  transition-all
                  duration-200
                  active:scale-90
                  hover:bg-gray-800
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                <Send size={15} />
              </button>
            </div>

            {!keyboardOpen && (
              <p className="mt-1.5 text-center text-[9px] text-gray-400">
                LeadAxis AI can make mistakes. Verify important information.
              </p>
            )}
          </form>
        </div>
      )}

      {/* =====================================================
          FLOATING AI BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() => {
          if (isOpen) {
            closeChatbot();
          } else {
            setIsOpen(true);
          }
        }}
        aria-label={
          isOpen
            ? "Close LeadAxis AI"
            : "Open LeadAxis AI"
        }
        className={`
          fixed
          bottom-5
          right-4
          z-[1000]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#0a0d0a]
          text-lime-300
          shadow-[0_8px_30px_rgba(0,0,0,0.22)]
          ring-1
          ring-white/10
          transition-all
          duration-300
          ease-out
          active:scale-90
          hover:scale-105
          hover:bg-gray-900
          hover:shadow-[0_12px_35px_rgba(0,0,0,0.28)]
          sm:bottom-6
          sm:right-6
        `}
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <Bot size={23} />
        )}

        {!isOpen && (
          <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-60" />

            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#0a0d0a] bg-lime-400" />
          </span>
        )}
      </button>
    </>
  );
};

export default AIChatbot;
