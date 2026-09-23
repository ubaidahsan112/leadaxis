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

const AIChatbot = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm LeadAxis AI. How can I help you today?",
    },
  ]);

  /*
  |--------------------------------------------------------------------------
  | Open / Close Animation
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (isOpen) {
      // Small delay allows the browser to render the initial state
      // before starting the opening animation.
      requestAnimationFrame(() => {
        setIsVisible(true);
      });

      // Focus input on desktop only.
      if (window.innerWidth >= 640) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 300);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  /*
  |--------------------------------------------------------------------------
  | Scroll To Latest Message
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
  | Send Message
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
      const response = await fetch("/api/chat", {
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

      const data = await response.json();

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
  | Submit
  |--------------------------------------------------------------------------
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  /*
  |--------------------------------------------------------------------------
  | Enter Key
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
  | Close Chatbot
  |--------------------------------------------------------------------------
  */
  const closeChatbot = () => {
    setIsVisible(false);

    // Wait for close animation before removing component.
    setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  /*
  |--------------------------------------------------------------------------
  | Quick Questions
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
            bg-black/30
            backdrop-blur-[2px]
            transition-opacity
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

            /* MOBILE */
            inset-x-0
            bottom-0
            flex
            h-[100dvh]
            w-full
            flex-col
            overflow-hidden
            rounded-t-[24px]
            bg-white

            /* Desktop */
            sm:bottom-[88px]
            sm:right-6
            sm:left-auto
            sm:h-[min(620px,calc(100vh-110px))]
            sm:w-[390px]
            sm:rounded-2xl

            border
            border-gray-200

            shadow-[0_20px_70px_rgba(0,0,0,0.20)]

            transform
            transition-all
            duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              isVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-8 scale-[0.97] opacity-0"
            }
          `}
        >
          {/* =====================================================
              MOBILE DRAG / CLOSE HANDLE
          ===================================================== */}

          <div className="absolute left-1/2 top-2 z-20 -translate-x-1/2 sm:hidden">
            <div className="h-1 w-10 rounded-full bg-white/40" />
          </div>

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="relative shrink-0 overflow-hidden bg-[#0a0d0a] px-4 pb-4 pt-5 text-white sm:pt-4">
            {/* Green glow */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-lime-300/20 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* AI Icon */}
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-300 text-[#0a0d0a] shadow-lg shadow-lime-300/10">
                  <Bot size={23} strokeWidth={2.2} />

                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#0a0d0a] bg-lime-400" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-[15px] font-semibold">
                    LeadAxis AI

                    <Sparkles
                      size={13}
                      className="text-lime-300"
                    />
                  </div>

                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                    Online • AI Assistant
                  </div>
                </div>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={closeChatbot}
                aria-label="Close LeadAxis AI"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition-all
                  duration-200
                  hover:bg-white/10
                  hover:text-white
                  active:scale-90
                "
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* =====================================================
              MESSAGES
          ===================================================== */}

          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              overscroll-contain
              bg-[#f7f8f6]
              px-3
              py-5
              sm:px-4
            "
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Welcome */}
            {messages.length === 1 && (
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300 text-[#0a0d0a] shadow-sm">
                  <MessageCircle size={22} />
                </div>

                <p className="text-xs font-medium text-gray-500">
                  How can we help your business?
                </p>
              </div>
            )}

            {/* Messages */}
            {messages.map((message, index) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={index}
                  className={`mb-3.5 flex ${
                    isUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[90%] items-end gap-2 ${
                      isUser ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
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
                        <User size={14} />
                      ) : (
                        <Bot size={14} />
                      )}
                    </div>

                    {/* Message */}
                    <div
                      className={`
                        rounded-2xl
                        px-3.5
                        py-2.5
                        text-[13px]
                        leading-5
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

            {/* Loading */}
            {isLoading && (
              <div className="mb-3.5 flex justify-start">
                <div className="flex items-end gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-300 text-[#0a0d0a]">
                    <Bot size={14} />
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-gray-200 bg-white px-3.5 py-3 shadow-sm">
                    <Loader2
                      size={15}
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

          {/* =====================================================
              QUICK QUESTIONS
          ===================================================== */}

          {messages.length === 1 && (
            <div className="shrink-0 border-t border-gray-100 bg-white px-3 py-3">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
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
                      text-[11px]
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

          {/* =====================================================
              BOOKING CTA
          ===================================================== */}

          <button
            type="button"
            onClick={() => {
              closeChatbot();

              setTimeout(() => {
                navigate("/booking");
              }, 250);
            }}
            className="
              mx-3
              mb-2.5
              flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-lime-300
              px-4
              py-3
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
            "
          >
            <CalendarDays size={15} />
            Book a Consultation
          </button>

          {/* =====================================================
              INPUT
          ===================================================== */}

          <form
            onSubmit={handleSubmit}
            className="
              shrink-0
              border-t
              border-gray-200
              bg-white
              px-3
              pb-[calc(12px+env(safe-area-inset-bottom))]
              pt-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                px-2.5
                py-1.5
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

            <p className="mt-1.5 text-center text-[9px] text-gray-400">
              LeadAxis AI can make mistakes. Verify important information.
            </p>
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
        className="
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
        "
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <Bot size={23} />
        )}

        {/* Online indicator */}
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