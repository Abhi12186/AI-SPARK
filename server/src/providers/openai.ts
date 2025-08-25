import { ChatMessage } from '../types';
import { toOpenAIStyle } from '../utils/mapMessages';


const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';


export async function callOpenAI(messages: ChatMessage[], modelFromReq?: string) {
const model = modelFromReq || process.env.OPENAI_MODEL || 'gpt-4o-mini';
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error('Missing OPENAI_API_KEY');


const res = await fetch(OPENAI_URL, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${apiKey}`
},
body: JSON.stringify({
model,
messages: toOpenAIStyle(messages)
})
});


if (!res.ok) {
const errTxt = await res.text().catch(() => '');
throw new Error(`OpenAI error ${res.status}: ${errTxt}`);
}


const data = await res.json();
const text = data?.choices?.[0]?.message?.content ?? '';
return { text, raw: data };
}