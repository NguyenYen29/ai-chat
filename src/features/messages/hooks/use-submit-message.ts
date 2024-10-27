import { axiosClient } from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateMessage } from "../api/use-create-message";

type TMessage = {
    chatId: string;
    content: string;
};

export const useSubmitMessage = () => {
    const [isPending, setIsPending] = useState(false);

    const { mutateAsync } = useCreateMessage();

    const sendMessage = async ({ chatId, content }: TMessage) => {
        try {
            setIsPending(true);
            // send user message
            await mutateAsync({
                chatId: chatId as any,
                content,
                role: "user",
            });

            const res = await axiosClient.post<{ response: string }>("/", {
                message: content,
            });
            console.log("🚀 ~ sendMessage ~ res:", res.data.response);

            const msg = res.data.response.split("\n").join(" <br> ")

            console.log("🚀 ~ sendMessage ~ msg:", msg);
            // send bot message
            await mutateAsync({
                role: "assistant",
                chatId: chatId as any,
                content: msg,
            });
        } catch (error) {
            toast.error("Fail to send message");
        } finally {
            setIsPending(false);
        }
    };

    return { sendMessage, isPending };
};
