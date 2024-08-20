import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface MessageProps {
    content: string;
    isUserMessage: boolean;
}

const Message = ({ content, isUserMessage }: MessageProps )=>{
    return(
        <div className={cn({
            "bg-zinc-700": isUserMessage,
            "bg-zinc-900/25": !isUserMessage
        })}>
            <div className="p-6">
                <div className="max-w-3xl mx-auth flex items-start gap-2.5">
                    <div className={cn("size-10 srink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center", {
                        "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage
                    })}>
                        { isUserMessage ? <User 
                        className="size-5"
                        /> : 
                            <Bot 
                            className="size-5 text-white"
                            />
                        }
                    </div>
                        <div className="flex flex-col ml-6 w-full">
                            <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-grey-900 
                                    dark:text-white
                                    ">{
                                        isUserMessage ? "You": "WebSite"
                                    }
                                    </span>
                            </div>
                            <p className="font-sm font-normal py-2.5 text-grey-900 dark:text-white">{content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Message;
