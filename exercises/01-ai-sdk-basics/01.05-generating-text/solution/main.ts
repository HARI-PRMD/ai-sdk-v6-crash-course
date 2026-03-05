import { google } from '#shared/provider';
import { generateText } from 'ai';

const model = google('gemini-2.5-flash-lite');

const prompt = 'What is the capital of France?';

const result = await generateText({
  model,
  prompt,
});

console.log(result.text);
