import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PageHero from "@/components/PageHero";
import { useSEO } from "@/hooks/use-seo";
import { useLanguage } from "@/contexts/LanguageContext";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || "Something went wrong. Please try again.");
    return;
  }

  if (!resp.body) {
    onError("No response received.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") {
        onDone();
        return;
      }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {}
    }
  }
  onDone();
}

const AiAgent = () => {
  const { t } = useLanguage();
  useSEO({
    title: "AI Consultation | Monik International",
    description: "Chat instantly with our advanced AI Agent to get information about loans, rates, and services.",
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    let assistantContent = "";
    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: updateAssistant,
        onDone: () => setLoading(false),
        onError: (msg) => {
          setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
          setLoading(false);
        },
      });
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Short timeout to let state update before sending
    setTimeout(() => {
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        charCode: 13,
        keyCode: 13,
        bubbles: true
      });
      document.getElementById('ai-chat-input')?.dispatchEvent(enterEvent);
    }, 50);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-10 md:pb-20">
      <PageHero
        title="Virtual AI Consultation"
        subtitle="Chat with our intelligent agent instantly for loan eligibility, rates, and detailed guidance without the wait."
        breadcrumbs={[{ label: "AI Agent" }]}
      />

      <div className="container max-w-5xl mt-6 md:mt-12 px-4 md:px-6">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-primary/5 border border-border/60 overflow-hidden flex flex-col md:flex-row h-[calc(100vh-12rem)] min-h-[500px] md:h-[700px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-80 bg-slate-900 text-white p-6 md:p-8 flex-col hidden md:flex">
            <div className="flex items-center gap-3 mb-10 text-accent">
              <Sparkles className="w-8 h-8" />
              <h2 className="font-display font-bold text-2xl text-white">Monik AI</h2>
            </div>
            
            <p className="text-white/80 leading-relaxed mb-8">
              Welcome to our advanced 24/7 consultation center. Ask me anything about:
            </p>

            <ul className="space-y-4 mb-auto">
              <li className="flex items-center gap-3 text-sm text-white/90">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Loan Interest Rates
              </li>
              <li className="flex items-center gap-3 text-sm text-white/90">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Eligibility Criteria
              </li>
              <li className="flex items-center gap-3 text-sm text-white/90">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Required Documents
              </li>
              <li className="flex items-center gap-3 text-sm text-white/90">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Branch Locations
              </li>
            </ul>

            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 mt-8">
              <p className="text-sm text-white/80 font-medium flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                Agent Online
              </p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-slate-50/50 relative h-full">
            
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fade-up py-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                    <Bot className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-2 md:mb-3">How can I assist you?</h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8 px-2">
                    I'm here to provide instant answers to your financial questions. Choose a topic below or type your own question.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2 md:gap-3 w-full">
                    {[
                      "What are your current microfinance loan rates?",
                      "Where is your head office located?",
                      "What documents do I need for a business loan?",
                    ].map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickQuestion(q)}
                        className="text-left px-4 py-3 md:px-5 md:py-3 rounded-xl bg-white border border-border/50 shadow-sm hover:border-primary/40 hover:shadow-md transition-all text-sm text-foreground/80 font-medium group flex items-center justify-between"
                      >
                        <span className="line-clamp-2 md:line-clamp-none pr-2">{q}</span>
                        <MessageSquare className="w-4 h-4 text-primary shrink-0 opacity-[0.8] md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-2.5 md:gap-4 justify-start">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="max-w-[85%] bg-white border border-border/50 shadow-sm text-foreground rounded-2xl rounded-tl-sm px-4 md:px-5 py-3 md:py-4 text-sm md:text-base leading-relaxed">
                      Hello! I am the Monik AI Assistant. How can I help you regarding our financial services today?
                    </div>
                  </div>
                  {messages.map((msg, i) => (
                    <div key={i} className={cn("flex gap-2.5 md:gap-4", msg.role === "user" ? "justify-end" : "justify-start")}>
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                          <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                      )}
                      
                      <div
                        className={cn(
                          "max-w-[85%] md:max-w-[80%] rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base leading-relaxed whitespace-pre-wrap shadow-sm",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-white border border-border/50 text-foreground rounded-tl-sm"
                        )}
                      >
                        {msg.content}
                      </div>

                      {msg.role === "user" && (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                          <User className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {loading && messages[messages.length - 1]?.role !== "assistant" && (
                    <div className="flex gap-2.5 md:gap-4 justify-start">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                      <div className="bg-white border border-border/50 shadow-sm text-foreground rounded-2xl rounded-tl-sm px-4 md:px-5 py-3 md:py-4">
                        <div className="flex gap-1.5 items-center h-full">
                          <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3 md:p-6 bg-white border-t border-border/60">
              <form 
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex gap-2 max-w-4xl mx-auto"
              >
                <input
                  id="ai-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about loans, documents, or branches..."
                  className="flex-1 bg-slate-50 border border-border/80 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-foreground placeholder:text-muted-foreground outline-none transition-all shadow-inner"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || loading}
                  className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-lg transition-transform hover:scale-105 bg-accent hover:bg-accent/90 text-white"
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </form>
              <p className="text-center text-[10px] md:text-xs text-muted-foreground mt-2 md:mt-3 leading-tight hidden md:block">
                AI can make mistakes. For official inquiries, please contact our hotline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAgent;
