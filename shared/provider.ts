// Uses AI_GATEWAY_API_KEY or falls back to individual provider keys
import { gateway } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Lazy-initialized provider instances (only created when needed)
let openaiInstance: ReturnType<typeof createOpenAI> | null = null;
let anthropicInstance: ReturnType<typeof createAnthropic> | null = null;
let googleInstance: ReturnType<typeof createGoogleGenerativeAI> | null = null;

// Helper to get or create OpenAI instance
function getOpenAIInstance() {
  if (!openaiInstance) {
    openaiInstance = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiInstance;
}

// Helper to get or create Anthropic instance
function getAnthropicInstance() {
  if (!anthropicInstance) {
    anthropicInstance = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return anthropicInstance;
}

// Helper to get or create Google instance
function getGoogleInstance() {
  if (!googleInstance) {
    googleInstance = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
  }
  return googleInstance;
}

// Export provider functions that work with either Gateway or direct providers
export const openai = (model: string) => {
  // Check at runtime (not at module load time)
  if (process.env.AI_GATEWAY_API_KEY) {
    // Use AI Gateway with model string format: openai/model-name
    return gateway(`openai/${model}`);
  }
  // Fallback to direct OpenAI provider
  return getOpenAIInstance()(model);
};

export const google = (model: string) => {
  // Check at runtime (not at module load time)
  if (process.env.AI_GATEWAY_API_KEY) {
    // Use AI Gateway with model string format: google/model-name
    return gateway(`google/${model}`);
  }
  // Fallback to direct Google provider
  return getGoogleInstance()(model);
};

export const anthropic = (model: string) => {
  // Check at runtime (not at module load time)
  if (process.env.AI_GATEWAY_API_KEY) {
    // Use AI Gateway with model string format: anthropic/model-name
    return gateway(`anthropic/${model}`);
  }
  // Fallback to direct Anthropic provider
  return getAnthropicInstance()(model);
};

// Export individual model helpers for convenience
export const gpt4o = () => openai('gpt-4o');
export const gpt4oMini = () => openai('gpt-4o-mini');
export const claude35Sonnet = () => anthropic('claude-3-5-sonnet-20241022');
export const gemini25Flash = () => google('gemini-2.5-flash');
export const gemini20Flash = () => google('gemini-2.0-flash-exp');
