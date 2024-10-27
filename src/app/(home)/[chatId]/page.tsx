import { ScrollArea } from "@/components/ui/scroll-area";
import { UserButton } from "@/components/user-button";

import { ChatInput } from "@/features/chats/components/chat-input";
import { MessagesList } from "@/features/messages/components/messages-list";

export default function ChatPage() {
    return (
        <div className="h-full flex flex-col pr-14 py-3">
            <div className="ml-auto mt-3">
                <UserButton />
            </div>
            <ScrollArea className="flex-1 h-full my-2">
                <MessagesList />
            </ScrollArea>
            <ChatInput />
        </div>
    );
}
