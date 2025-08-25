export type Role = 'system' | 'user' | 'assistant';


export interface ChatMessage {
role: Role;
content: string;
}


export interface ChatRequestBody {
provider: 'openai' | 'xai' | 'gemini';
messages: ChatMessage[];
model?: string; // optional override per request
}


export interface ChatResponseBody {
text: string;
raw?: unknown; // optional raw provider payload for debugging
}