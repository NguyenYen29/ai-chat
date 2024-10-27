"use client";

import { QUESTIONS } from "@/constants";
import { useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import { MessageItem } from "./message-item";

import { useChatId } from "@/features/home/hooks/use-chat-id";
import { useMessagesList } from "@/features/messages/api/use-messages-list";
import { useSubmitMessage } from "../hooks/use-submit-message";

export const MessagesList = () => {
    const chatId = useChatId();
    const { data, isPending, isError } = useMessagesList(chatId);

    const scrollRef = useRef<HTMLDivElement>(null);
    const { sendMessage } = useSubmitMessage();

    useEffect(() => {
        const idTimeout = setTimeout(() => {
            scrollToBottom();
        }, 10);

        return () => clearTimeout(idTimeout);
    }, [data]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "auto" });
        }
    };

    if (isPending) {
        return (
            <div className="size-full flex items-center justify-center">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    if (isError) {
        return <div>Message not found</div>;
    }

    if (data.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-6">
                <h1 className="text-4xl font-bold">What can I help with?</h1>

                <div className="flex flex-wrap gap-3 justify-center">
                    {QUESTIONS.map((question, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="bg-neutral-700 text-white hover:bg-neutral-700/60 cursor-pointer"
                            onClick={async () => {
                                await sendMessage({
                                    chatId,
                                    content: question,
                                });
                            }}
                        >
                            {question}
                        </Badge>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="pr-2">
            {data.map((item) => (
                <MessageItem key={item._id} message={item} />
            ))}
            <div ref={scrollRef} />
        </div>
    );
};
