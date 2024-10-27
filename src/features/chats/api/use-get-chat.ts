import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useGetChat = (chatId: string) => {
    const query = useQuery(convexQuery(api.chats.get, { id: chatId as any }));

    return query;
};