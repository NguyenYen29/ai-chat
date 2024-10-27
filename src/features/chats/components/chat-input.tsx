"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { Textarea } from "@/components/ui/textarea";

import { useChatId } from "@/features/home/hooks/use-chat-id";
import { useSubmitMessage } from "@/features/messages/hooks/use-submit-message";
import Image from "next/image";

const MAX_HEIGHT = 200;

export const ChatInput = () => {
    const [msg, setMsg] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const chatId = useChatId();
    const { isPending, sendMessage } = useSubmitMessage();

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const adjustHeight = () => {
            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_HEIGHT)}px`;
        };

        textarea.addEventListener("input", adjustHeight);
        adjustHeight();

        return () => {
            textarea.removeEventListener("input", adjustHeight);
        };
    }, []);

    const onKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();

            setMsg("");
            await sendMessage({ chatId, content: msg });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {isPending && (
                <div className="flex gap-4 mb-3">
                    <div className="shrink-0 p-1 size-8 flex items-center justify-center border rounded-full border-neutral-600">
                        <Image
                            src="/bot.svg"
                            alt="Bot"
                            width={16}
                            height={16}
                        />
                    </div>
                    <div className="loader"></div>
                </div>
            )}
            <Textarea
                disabled={isPending}
                ref={textareaRef}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={isPending ? "AI thinking..." : "Message AI chat"}
                className="w-full p-3 border resize-none overflow-y-auto transition-all duration-200 ease-in-out outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-neutral-700 rounded-xl max-h-[200px] text-base"
                onKeyDown={onKeyDown}
            />
            <p className="ml-auto text-xs text-muted-foreground">
                Ctrl + Enter to new line
            </p>
        </div>
    );
};
