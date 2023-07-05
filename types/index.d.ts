export type CHAT_GPT_AGENT = "user" | "system";

export interface chatGPTMessage {
  role: CHAT_GPT_AGENT;
  content: string;
}

export interface openaiStreamPayload {
  model: string;
  message: chatGPTMessage[];
  temprature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  maxTokens: number;
  stream: boolean;
  n: number;
}

export type VibeType = "Professional" | "Casual" | "Funny";
