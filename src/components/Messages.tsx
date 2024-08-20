import { type Message as TMessage } from "ai/react"; 
import Message from "@/components/Message";
import { MessageSquare } from "lucide-react";

interface MessagesProps {
    messages: TMessage[]
};

const Messages = ({ messages }:  MessagesProps)=>{
    return(
    <div className="flex-1 flex-col gap-2 max-h-[calc(100vh-3.5rem-7rem)] overflow-y-auto">
        { messages.length ? messages.map((message, i)=> (
            <Message 
                key={i}
                content={message.content}
                isUserMessage={message.role === "user"}
            />
        )): 
        (
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
                <MessageSquare className="size-8 text-blue-500"/> 
                <h3 className="font-semibold text-xl text-white">You are all set!, ask anything about the website.</h3>
                <p className="text-zinc text-sm">
                    Ask the question to get started
                </p>
            </div>
        )
    }
    </div>
    )
};

export default Messages;