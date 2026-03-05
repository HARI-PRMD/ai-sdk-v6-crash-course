import { google } from '#shared/provider';
import { streamText } from 'ai';

const model = google('gemini-2.5-flash');

const stream = streamText({
  model,
  prompt:
    'Give me the first paragraph of a story about an imaginary planet.',
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}
