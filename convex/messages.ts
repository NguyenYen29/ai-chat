import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalMutation, mutation, query } from "./_generated/server";

import { axiosClient } from "../src/lib/axios";

export const list = query({
    args: { chatId: v.id("chats") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("messages")
            .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
            .collect();
    },
});

export const create = mutation({
    args: {
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
        chatId: v.id("chats"),
    },
    handler: async (ctx, args) => {
        const newMessageId = await ctx.db.insert("messages", {
            role: args.role,
            content: args.content,
            chatId: args.chatId,
        });

        return newMessageId;
    },
});

export const send = internalMutation({
    args: {
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
        chatId: v.id("chats"),
    },
    handler: async (ctx, args) => {
        const newMessageId = await ctx.db.insert("messages", {
            role: args.role,
            content: args.content,
            chatId: args.chatId,
        });

        return newMessageId;
    },
});

export const submit = action({
    args: {
        content: v.string(),
        chatId: v.id("chats"),
    },
    handler: async (ctx, { chatId, content }) => {
        // send user message
        await ctx.runMutation(internal.messages.send, {
            role: "user",
            content,
            chatId,
        });

        const res = await axiosClient.post<{ response: string }>("/", {
            message: content,
        });

        // send bot message
        await ctx.runMutation(internal.messages.send, {
            role: "assistant",
            chatId,
            content: res.data.response,
        });
    },
});
