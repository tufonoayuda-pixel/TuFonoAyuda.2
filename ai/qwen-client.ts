/**
 * @fileoverview Qwen AI client configuration using Vercel AI SDK
 *
 * This file configures Qwen models for the speech therapy application.
 * It replaces the previous Genkit/Google AI integration.
 */
import { createOpenAI } from "@ai-sdk/openai"

// Configure Qwen client using OpenAI-compatible API
export const qwen = createOpenAI({
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: process.env.QWEN_API_KEY || "your-qwen-api-key-here",
})

/**
 * Available Qwen models for different use cases
 */
export const QWEN_MODELS = {
  // Main model for complex reasoning and analysis
  QWEN_TURBO: "qwen-turbo",
  // Faster model for simple tasks
  QWEN_PLUS: "qwen-plus",
  // Most capable model for complex tasks
  QWEN_MAX: "qwen-max",
} as const

export type QwenModel = (typeof QWEN_MODELS)[keyof typeof QWEN_MODELS]
