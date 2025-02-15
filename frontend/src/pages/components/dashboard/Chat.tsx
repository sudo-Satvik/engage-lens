
import { useOutletContext } from 'react-router-dom';
import { AiChat } from "@/components/dashboard/ai-chat";

interface DashboardContext {
  isLoading: boolean;
}

export default function Chat() {
  const { isLoading } = useOutletContext<DashboardContext>();

  return (
      <div className='mt-[-1.5rem]'>
        <AiChat isLoading={isLoading} />
      </div>
  );
}

