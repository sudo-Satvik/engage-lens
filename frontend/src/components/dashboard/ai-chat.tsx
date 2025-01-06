import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Send } from 'lucide-react'

interface AiChatProps {
  isLoading: boolean;
}

export function AiChat({ isLoading }: AiChatProps) {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: 'How can I help you today?' }
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { role: 'user', content: message }])
      setMessage('')
      // Here you would typically send the message to your AI service
      // and then add the AI's response to the chat history
    }
  }

  return (
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
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index} className={`p-3 rounded-lg ${chat.role === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
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
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

