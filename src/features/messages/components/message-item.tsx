"use client";

import { Markdown } from "@/features/messages/components/markdown";
import { Doc } from "../../../../convex/_generated/dataModel";

import Image from "next/image";

type Props = {
    message: Doc<"messages">;
};

export const MessageItem = ({ message }: Props) => {
    return (
        <div className="flex relative">
            {message.role === "user" ? (
                <div className="max-w-[50%] px-3 py-2 mb-3 bg-neutral-600 text-white rounded-3xl ml-auto">
                    {message.content}
                </div>
            ) : (
                <div className="flex gap-4 mb-3">
                    <div className="shrink-0 p-1 size-8 flex items-center justify-center border rounded-full border-neutral-600">
                        <Image
                            src="/bot.svg"
                            alt="Bot"
                            width={16}
                            height={16}
                        />
                    </div>
                    <div>
                        <Markdown content={message.content} />
                    </div>
                </div>
            )}
        </div>
    );
};
