import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Send } from 'lucide-react';
import axios from "axios";

interface AiChatProps {
  isLoading: boolean;
}

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export function AiChat({isLoading}: AiChatProps) {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'ai', content: 'How can I help you today?' }
  ])
  const [isSending, setIsSending] = useState(false);

  const handleMessage = async () => {
    if(message.trim() && !isSending){
      setIsSending(true)
      const newMessage: ChatMessage = { role: 'user', content: message }
      setChatHistory([...chatHistory, newMessage])
      setMessage('')

      try {
        const response = await axios.post('/api/analytics/chat', {
          message,
          history: chatHistory
        })
        const aiResponse: ChatMessage = {role: "ai", content: response.data.message}
        setChatHistory(prevHistory => [...prevHistory, aiResponse])
      } catch (error) {
        console.error("Error sending message:", error)
        setChatHistory(prevHistory => [...prevHistory, { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' }])
      } finally {
        setIsSending(false)
      }
    }
  }


  return(
    <Card className="col-span-1 lg:col-span-2 bg-card flex flex-col">
      <CardHeader>
        <CardTitle>AI Chat Section</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto mb-4">
          {isLoading ? (
          <>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-5/6" />
          </>
          ): (
            chatHistory.map((chat, index) => (
              <div key={index} className={`p-3 rounded-lg ${chat.role === 'ai' ? 'bg-muted': 'bg-primary text-primary-foreground'}`}>
                {chat.content}
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <Input 
          placeholder="Type your message..."
          className="flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleMessage()}
          disabled={isSending || isLoading}
          />
          <Button size="icon" onClick={handleMessage} disabled={isLoading || isSending}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

