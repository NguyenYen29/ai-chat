import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useMessagesList = (chatId: string) => {
    const query = useQuery(
        convexQuery(api.messages.list, { chatId: chatId as Id<"chats"> })
    );

    return query;
};
