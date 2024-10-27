import { Loader } from "lucide-react";
import { ChatItem } from "./chat-item";

import { useChatList } from "@/features/home/api/use-chat-list";

export const ChatList = () => {
    const { data, isPending } = useChatList();

    if (isPending) {
        return (
            <div className="size-full flex items-center justify-center">
                <Loader className="size-6 animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {data?.map((item) => <ChatItem key={item._id} chat={item} />)}
        </div>
    );
};
