import { ChatMessage } from '../types';
import { toGeminiContents, concatAsSinglePrompt } from '../utils/mapMessages';


export async function callGemini(messages: ChatMessage[], modelFromReq?: string) {
const model = modelFromReq || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('Missing GEMINI_API_KEY');


const base = 'https://generativelanguage.googleapis.com/v1beta';
const url = `${base}/models/${encodeURIComponent(model)}:generateContent`;


const contents = toGeminiContents(messages);
// Gemini requires at least one user message; fallback to concatenated prompt
const payload = contents.length
? { contents }
: { contents: [{ role: 'user', parts: [{ text: concatAsSinglePrompt(messages) }] }] };


const res = await fetch(url, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'x-goog-api-key': apiKey
},
body: JSON.stringify(payload)
});


if (!res.ok) {
const errTxt = await res.text().catch(() => '');
throw new Error(`Gemini error ${res.status}: ${errTxt}`);
}


const data = await res.json();
const text = data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).join('') || '';
return { text, raw: data };
}