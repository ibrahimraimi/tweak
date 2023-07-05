import { openaiStream } from "@/lib/openai-stream";
import { openaiStreamPayload } from "@/types";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env variable from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (request: Request) => {
  const { prompt } = (await request.json()) as {
    prompt?: string;
  };

  if (prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: openaiStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await openaiStream(payload);
  // return stream response (SSE)
  return new Response(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
};
