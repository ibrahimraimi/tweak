import { CHAT_GPT_AGENT, openaiStreamPayload } from "@/types";
import {
  createParser,
  ParseEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function openaiStream(payload: openaiStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  const readableStream = new ReadableStream({
    async start(controller) {
      // callback
      const onParse = (event: ParseEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          controller.enqueue(encoder.encode(data));
        }
      };

      // optimistic error handling
      if (response.status !== 200) {
        const data = {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        };

        console.error(
          `Error: recieved non-200 status code, ${JSON.stringify(data)}`
        );
        controller.close();
        return;
      }

      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of response.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  let counter = 0;
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const data = decoder.decode(chunk);

      //?  https://platform.openai.com/docs/api-reference/completions/create#completions/create-stream
      if (data === "[DONE]") {
        controller.terminate();
        return;
      }
      try {
        const json = JSON.parse(data);
        const text = json.choices[0].delta?.content || "";
        if (counter < 2 && (text.match(/\n/) || []).length) {
          // this is a prefix character (i.e., "\n\n"), do nothing
          return;
        }

        // stream transformed JSON resposne as SSE
        const payload = { text: text };
        //?  https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
        );
        counter++;
      } catch (err) {
        // maybe parse error
        controller.error(err);
      }
    },
  });

  return readableStream.pipeThrough(transformStream);
}
