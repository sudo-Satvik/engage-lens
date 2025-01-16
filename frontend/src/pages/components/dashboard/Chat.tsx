
import { useOutletContext } from 'react-router-dom';
import { AiChat } from "@/components/dashboard/ai-chat";

interface DashboardContext {
  isLoading: boolean;
}

export default function Chat() {
  const { isLoading } = useOutletContext<DashboardContext>();

  return (
      <AiChat isLoading={isLoading} />
  );
}

