import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import ChatWrapper from "@/components/ChatWrapper";
import { cookies } from "next/headers";

interface PageProps{
    params: {
        url: string | string[] | undefined
    };
};

const reconstructUrl = ({ url }: { url: string[] })=>{
    const decodedComponents = url.map((component)=> decodeURIComponent(component));
    return decodedComponents.join("/");
};


const Page = async({ params }: PageProps)=>{
    const sessionCookie = cookies().get("sessionId")?.value;

    const reconstructedUrl = reconstructUrl( {url: params.url as string[] } );

    const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "")

    const initialMessages = await ragChat.history.getMessages({
        amount: 10, sessionId
    });

    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);


    console.log(params);

    if (!isAlreadyIndexed){
        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: { chunkOverlap: 50, chunkSize: 200},
        });
        await redis.sadd("indexed-urls", reconstructedUrl)
    };
   
    return(
        <ChatWrapper 
            sessionId={sessionId}
            initialMessages={initialMessages}
        />
    );
};

export default Page;