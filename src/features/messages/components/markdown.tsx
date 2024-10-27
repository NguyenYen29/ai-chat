"use client";

import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Check, Copy } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface Props {
    content: string;
}

export const Markdown = ({ content }: Props) => {
    const { copyToClipboard, isCopied } = useCopyToClipboard();
    // const displayText = useTypeEffect(content, 10);

    // const scrollRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const idTimeout = setTimeout(() => {
    //         scrollToBottom();
    //     }, 5);

    //     return () => clearTimeout(idTimeout);
    // }, [displayText]);

    // const scrollToBottom = () => {
    //     if (scrollRef.current) {
    //         scrollRef.current.scrollIntoView({ behavior: "auto" });
    //     }
    // };

    return (
        <>
            <ReactMarkdown
                components={{
                    code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                            <div className="py-6">
                                <div className="flex w-full justify-end bg-white/5 p-2 rounded-t-md">
                                    <button
                                        onClick={() =>
                                            copyToClipboard(
                                                String(children).replace(
                                                    /\n$/,
                                                    ""
                                                )
                                            )
                                        }
                                        className="flex items-center gap-1 text-sm text-neutral-300"
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check className="size-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="size-4" />
                                                Copy code
                                            </>
                                        )}
                                    </button>
                                </div>
                                <SyntaxHighlighter
                                    language={match[1]}
                                    style={vs2015}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>

            {/* <div ref={scrollRef} /> */}
        </>
    );
};
