import { ChatMessage } from '../types';
import { toOpenAIStyle } from '../utils/mapMessages';


const XAI_URL = 'https://api.x.ai/v1/chat/completions';


export async function callXAI(messages: ChatMessage[], modelFromReq?: string) {
const model = modelFromReq || process.env.XAI_MODEL || 'grok-4';
const apiKey = process.env.XAI_API_KEY;
if (!apiKey) throw new Error('Missing XAI_API_KEY');


const res = await fetch(XAI_URL, {
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
throw new Error(`xAI error ${res.status}: ${errTxt}`);
}


const data = await res.json();
const text = data?.choices?.[0]?.message?.content ?? '';
return { text, raw: data };
}