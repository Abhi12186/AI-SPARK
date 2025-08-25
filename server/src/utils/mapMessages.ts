import { ChatMessage } from '../types';


/**
* Utility: join all messages into a single user prompt (fallback)
*/
export function concatAsSinglePrompt(messages: ChatMessage[]) {
return messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
}


/**
* Utility: map to OpenAI/xAI style messages
*/
export function toOpenAIStyle(messages: ChatMessage[]) {
return messages.map(m => ({ role: m.role, content: m.content }));
}


/**
* Utility: map to Gemini "contents" structure with roles
*/
export function toGeminiContents(messages: ChatMessage[]) {
return messages.map(m => ({
role: m.role === 'assistant' ? 'model' : 'user',
parts: [{ text: m.content }]
}));
}