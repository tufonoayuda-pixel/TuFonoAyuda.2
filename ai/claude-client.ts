/**
 * @fileoverview Claude AI client configuration using Vercel AI SDK
 *
 * This file configures Claude models for the speech therapy application.
 */
import { createAnthropic } from "@ai-sdk/anthropic"

export const claude = createAnthropic({
  apiKey: process.env.CLAUDE_API_KEY || "your-claude-api-key-here",
})

/**
 * Available Claude models for different use cases
 */
export const CLAUDE_MODELS = {
  // Most capable model for complex reasoning and analysis
  CLAUDE_3_5_SONNET: "claude-3-5-sonnet-20241022",
  // Balanced model for most tasks
  CLAUDE_3_HAIKU: "claude-3-haiku-20240307",
  // Legacy model for compatibility
  CLAUDE_3_OPUS: "claude-3-opus-20240229",
} as const

export type ClaudeModel = (typeof CLAUDE_MODELS)[keyof typeof CLAUDE_MODELS]

/**
 * Default model for speech therapy applications
 */
export const DEFAULT_CLAUDE_MODEL = CLAUDE_MODELS.CLAUDE_3_5_SONNET
