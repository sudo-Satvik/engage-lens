
import { useOutletContext } from 'react-router-dom';
import { AiChat } from "@/components/dashboard/ai-chat";

interface DashboardContext {
  isLoading: boolean;
}

export default function Chat() {
  const { isLoading } = useOutletContext<DashboardContext>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold tracking-tight">AI Chat</h2>
        <h3 className="text-md text-gray-400 tracking-tight">Get insights and answers from our AI assistant</h3>
      </div>
      <AiChat isLoading={isLoading} />
    </div>
  );
}

