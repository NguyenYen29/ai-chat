"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Loader } from "lucide-react";

import { useChatList } from "@/features/home/api/use-chat-list";
import { useCreateChat } from "@/features/home/api/use-create-chat";

export default function HomePage() {
    const { data, isPending, isError } = useChatList();
    const { mutate } = useCreateChat();
    const router = useRouter();

    const chatId = data?.[0]?._id;

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (chatId) {
            router.replace(`/${chatId}`);
        } else {
            mutate({});
        }
    }, [chatId, isPending, router, mutate]);

    if (isPending) {
        return (
            <div className="size-full flex items-center justify-center">
                <Loader className="size-10 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div className="bg-neutral-800 h-full text-neutral-400 text-3xl text-center px-11 pt-11">
            AI Chat
        </div>
    );
}
