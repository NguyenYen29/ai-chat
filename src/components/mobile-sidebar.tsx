"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { MenuIcon, PenSquare } from "lucide-react";

import { useRouter } from "next/navigation";

import { ChatList } from "../features/chats/components/chat-list";

import { useCreateChat } from "@/features/home/api/use-create-chat";

export const MobileSidebar = () => {
    const router = useRouter();

    const { mutate } = useCreateChat();

    const onNewChat = () => {
        mutate(
            {},
            {
                onSuccess(id) {
                    router.push(`/${id}`);
                },
            }
        );
    };

    return (
        <Sheet>
            <SheetTrigger>
                <MenuIcon className="lg:hidden size-6 ml-3 mt-3" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-neutral-900 p-4">
                <VisuallyHidden>
                    <SheetHeader>
                        <SheetTitle>AI chat</SheetTitle>
                        <SheetDescription>Chat history</SheetDescription>
                    </SheetHeader>
                </VisuallyHidden>

                <div className="flex justify-between">
                    <SheetClose asChild>
                        <Button size="icon" variant="ghost">
                            <MenuIcon className="size-4" />
                        </Button>
                    </SheetClose>
                    <Button size="icon" variant="ghost" onClick={onNewChat}>
                        <PenSquare className="size-4" />
                    </Button>
                </div>

                <ScrollArea className="h-full pr-2">
                    <ChatList />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};
