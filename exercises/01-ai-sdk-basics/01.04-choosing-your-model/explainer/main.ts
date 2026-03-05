import { openai, google, anthropic } from '#shared/provider';

const model = openai('gpt-4o-mini');

console.dir(model, { depth: null });
