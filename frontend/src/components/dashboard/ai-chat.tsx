import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from 'lucide-react';
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AiChatProps {
  isLoading: boolean;
}

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export function AiChat({ isLoading }: AiChatProps) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'ai', content: 'How can I help you today?' }
  ]);
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatHistory]);

  const handleMessage = async () => {
    if (message.trim() && !isSending) {
      setIsSending(true);
      const newMessage: ChatMessage = { role: 'user', content: message };
      setChatHistory(prevHistory => [...prevHistory, newMessage]);
      setMessage('');

      try {
        const response = await axios.post('http://localhost:8000/api/analytics/chat', {
          message,
          history: chatHistory
        });
        const aiResponse: ChatMessage = { role: "ai", content: response.data.message };
        setChatHistory(prevHistory => [...prevHistory, aiResponse]);
      } catch (error) {
        console.error("Error sending message:", error);
        setChatHistory(prevHistory => [...prevHistory, { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <Card className="flex flex-col h-auto max-w-2xl mx-auto bg-gray-900 text-white border-gray-700">
      <CardHeader className="pb-2 border-b border-gray-700">
        <CardTitle className="text-xl font-bold">AI Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full px-4 custom-scrollbar">
          {isLoading ? (
            <div className="space-y-4 py-4">
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-3/4 bg-gray-800" />
              <Skeleton className="h-12 w-5/6 bg-gray-800" />
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`p-4 rounded-lg ${chat.role === 'ai' ? 'bg-gray-800' : 'bg-blue-600'}`}>
                  {chat.role === 'ai' ? (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        table: ({node, ...props}) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full divide-y divide-gray-600 border border-gray-600" {...props} />
                          </div>
                        ),
                        thead: ({node, ...props}) => <thead className="bg-gray-700" {...props} />,
                        th: ({node, ...props}) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-600" {...props} />,
                        td: ({node, ...props}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-b border-gray-600" {...props} />,
                        code: ({node, inline, className, children, ...props}: any) => {
                          return inline ? (
                            <code className="bg-gray-700 text-yellow-300 rounded px-1 py-0.5" {...props}>
                              {children}
                            </code>
                          ) : (
                            <code className="block bg-gray-700 text-yellow-300 rounded p-2 my-2 overflow-x-auto" {...props}>
                              {children}
                            </code>
                          )
                        },
                        pre: ({node, ...props}) => <pre className="bg-gray-700 rounded p-4 my-4 overflow-x-auto" {...props} />,
                      }}
                      className="prose prose-sm max-w-none prose-invert"
                    >
                      {chat.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-white">{chat.content}</p>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 bg-gray-800 border-t border-gray-700">
        <form onSubmit={(e) => { e.preventDefault(); handleMessage(); }} className="flex w-full gap-2">
          <Input 
            placeholder="Type your message..."
            className="flex-grow bg-gray-700 text-white border-gray-600 focus:border-blue-500 placeholder-gray-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending || isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || isSending} className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

