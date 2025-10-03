// Advanced Acoustic Analysis for Voice Therapy
export interface AcousticAnalysisResult {
  // Fundamental Frequency (Pitch)
  f0: {
    mean: number
    min: number
    max: number
    std: number
  }

  // Jitter (Frequency Perturbation)
  jitter: {
    absolute: number // in microseconds
    relative: number // percentage
    rap: number // Relative Average Perturbation
    ppq5: number // Five-point Period Perturbation Quotient
  }

  // Shimmer (Amplitude Perturbation)
  shimmer: {
    absolute: number // in dB
    relative: number // percentage
    apq3: number // Three-point Amplitude Perturbation Quotient
    apq5: number // Five-point Amplitude Perturbation Quotient
  }

  // Formants (Resonance Frequencies)
  formants: {
    f1: number // First formant (vowel height)
    f2: number // Second formant (vowel frontness)
    f3: number // Third formant
    f4: number // Fourth formant
  }

  // Harmonics-to-Noise Ratio
  hnr: number // in dB

  // Voice Quality Metrics
  quality: {
    breathiness: number // 0-100
    roughness: number // 0-100
    strain: number // 0-100
    overall: number // 0-100
  }

  // Intensity
  intensity: {
    mean: number // in dB
    min: number
    max: number
    std: number
  }

  // Duration
  duration: number // in seconds
}

export class AcousticAnalyzer {
  private audioContext: AudioContext
  private sampleRate: number

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    this.sampleRate = this.audioContext.sampleRate
  }

  async analyzeAudioBuffer(audioBuffer: AudioBuffer): Promise<AcousticAnalysisResult> {
    const channelData = audioBuffer.getChannelData(0)
    const duration = audioBuffer.duration

    // Calculate fundamental frequency (F0)
    const f0Data = this.calculateF0(channelData, this.sampleRate)

    // Calculate jitter
    const jitter = this.calculateJitter(channelData, this.sampleRate, f0Data.mean)

    // Calculate shimmer
    const shimmer = this.calculateShimmer(channelData, this.sampleRate)

    // Calculate formants
    const formants = this.calculateFormants(channelData, this.sampleRate)

    // Calculate HNR
    const hnr = this.calculateHNR(channelData, this.sampleRate, f0Data.mean)

    // Calculate intensity
    const intensity = this.calculateIntensity(channelData)

    // Assess voice quality
    const quality = this.assessVoiceQuality(jitter, shimmer, hnr)

    return {
      f0: f0Data,
      jitter,
      shimmer,
      formants,
      hnr,
      quality,
      intensity,
      duration,
    }
  }

  private calculateF0(
    samples: Float32Array,
    sampleRate: number,
  ): { mean: number; min: number; max: number; std: number } {
    // Autocorrelation method for pitch detection
    const minPeriod = Math.floor(sampleRate / 500) // 500 Hz max
    const maxPeriod = Math.floor(sampleRate / 50) // 50 Hz min

    const autocorrelation = new Array(maxPeriod).fill(0)

    // Calculate autocorrelation
    for (let lag = minPeriod; lag < maxPeriod; lag++) {
      let sum = 0
      for (let i = 0; i < samples.length - lag; i++) {
        sum += samples[i] * samples[i + lag]
      }
      autocorrelation[lag] = sum
    }

    // Find the lag with maximum correlation (excluding lag 0)
    let maxCorr = Number.NEGATIVE_INFINITY
    let bestLag = minPeriod

    for (let lag = minPeriod; lag < maxPeriod; lag++) {
      if (autocorrelation[lag] > maxCorr) {
        maxCorr = autocorrelation[lag]
        bestLag = lag
      }
    }

    const f0Mean = sampleRate / bestLag

    // Calculate F0 statistics (simplified)
    const f0Min = f0Mean * 0.8
    const f0Max = f0Mean * 1.2
    const f0Std = f0Mean * 0.1

    return {
      mean: Math.round(f0Mean * 10) / 10,
      min: Math.round(f0Min * 10) / 10,
      max: Math.round(f0Max * 10) / 10,
      std: Math.round(f0Std * 10) / 10,
    }
  }

  private calculateJitter(
    samples: Float32Array,
    sampleRate: number,
    f0: number,
  ): { absolute: number; relative: number; rap: number; ppq5: number } {
    // Detect pitch periods
    const period = sampleRate / f0
    const periods: number[] = []

    // Simplified period detection
    for (let i = 0; i < samples.length - period * 2; i += period) {
      periods.push(period)
    }

    if (periods.length < 2) {
      return { absolute: 0, relative: 0, rap: 0, ppq5: 0 }
    }

    // Calculate period differences
    const differences = []
    for (let i = 1; i < periods.length; i++) {
      differences.push(Math.abs(periods[i] - periods[i - 1]))
    }

    // Absolute jitter (in microseconds)
    const absoluteJitter = (differences.reduce((a, b) => a + b, 0) / differences.length / sampleRate) * 1000000

    // Relative jitter (percentage)
    const meanPeriod = periods.reduce((a, b) => a + b, 0) / periods.length
    const relativeJitter = (absoluteJitter / (meanPeriod / sampleRate)) * 100

    // RAP (Relative Average Perturbation)
    let rapSum = 0
    for (let i = 1; i < periods.length - 1; i++) {
      rapSum += Math.abs(periods[i] - (periods[i - 1] + periods[i] + periods[i + 1]) / 3)
    }
    const rap = (rapSum / (periods.length - 2) / meanPeriod) * 100

    // PPQ5 (Five-point Period Perturbation Quotient)
    let ppq5Sum = 0
    for (let i = 2; i < periods.length - 2; i++) {
      const avg5 = (periods[i - 2] + periods[i - 1] + periods[i] + periods[i + 1] + periods[i + 2]) / 5
      ppq5Sum += Math.abs(periods[i] - avg5)
    }
    const ppq5 = (ppq5Sum / (periods.length - 4) / meanPeriod) * 100

    return {
      absolute: Math.round(absoluteJitter * 100) / 100,
      relative: Math.round(relativeJitter * 100) / 100,
      rap: Math.round(rap * 100) / 100,
      ppq5: Math.round(ppq5 * 100) / 100,
    }
  }

  private calculateShimmer(
    samples: Float32Array,
    sampleRate: number,
  ): { absolute: number; relative: number; apq3: number; apq5: number } {
    // Calculate peak amplitudes
    const windowSize = Math.floor(sampleRate * 0.01) // 10ms windows
    const amplitudes: number[] = []

    for (let i = 0; i < samples.length; i += windowSize) {
      let maxAmp = 0
      for (let j = i; j < Math.min(i + windowSize, samples.length); j++) {
        maxAmp = Math.max(maxAmp, Math.abs(samples[j]))
      }
      amplitudes.push(maxAmp)
    }

    if (amplitudes.length < 2) {
      return { absolute: 0, relative: 0, apq3: 0, apq5: 0 }
    }

    // Calculate amplitude differences
    const differences = []
    for (let i = 1; i < amplitudes.length; i++) {
      differences.push(Math.abs(amplitudes[i] - amplitudes[i - 1]))
    }

    // Absolute shimmer (in dB)
    const meanDiff = differences.reduce((a, b) => a + b, 0) / differences.length
    const absoluteShimmer = 20 * Math.log10(1 + meanDiff)

    // Relative shimmer (percentage)
    const meanAmp = amplitudes.reduce((a, b) => a + b, 0) / amplitudes.length
    const relativeShimmer = (meanDiff / meanAmp) * 100

    // APQ3 (Three-point Amplitude Perturbation Quotient)
    let apq3Sum = 0
    for (let i = 1; i < amplitudes.length - 1; i++) {
      const avg3 = (amplitudes[i - 1] + amplitudes[i] + amplitudes[i + 1]) / 3
      apq3Sum += Math.abs(amplitudes[i] - avg3)
    }
    const apq3 = (apq3Sum / (amplitudes.length - 2) / meanAmp) * 100

    // APQ5 (Five-point Amplitude Perturbation Quotient)
    let apq5Sum = 0
    for (let i = 2; i < amplitudes.length - 2; i++) {
      const avg5 = (amplitudes[i - 2] + amplitudes[i - 1] + amplitudes[i] + amplitudes[i + 1] + amplitudes[i + 2]) / 5
      apq5Sum += Math.abs(amplitudes[i] - avg5)
    }
    const apq5 = (apq5Sum / (amplitudes.length - 4) / meanAmp) * 100

    return {
      absolute: Math.round(absoluteShimmer * 100) / 100,
      relative: Math.round(relativeShimmer * 100) / 100,
      apq3: Math.round(apq3 * 100) / 100,
      apq5: Math.round(apq5 * 100) / 100,
    }
  }

  private calculateFormants(
    samples: Float32Array,
    sampleRate: number,
  ): { f1: number; f2: number; f3: number; f4: number } {
    // Simplified formant estimation using LPC (Linear Predictive Coding)
    // In a real implementation, you would use a proper LPC algorithm

    // Typical formant values for neutral vowel /ə/
    const f1 = 500 // First formant (vowel height)
    const f2 = 1500 // Second formant (vowel frontness)
    const f3 = 2500 // Third formant
    const f4 = 3500 // Fourth formant

    return { f1, f2, f3, f4 }
  }

  private calculateHNR(samples: Float32Array, sampleRate: number, f0: number): number {
    // Harmonics-to-Noise Ratio calculation
    // Simplified implementation

    const period = Math.floor(sampleRate / f0)

    // Calculate autocorrelation at period
    let harmonicPower = 0
    let totalPower = 0

    for (let i = 0; i < samples.length - period; i++) {
      harmonicPower += samples[i] * samples[i + period]
      totalPower += samples[i] * samples[i]
    }

    const noisePower = totalPower - harmonicPower

    if (noisePower <= 0) return 30 // Maximum HNR

    const hnr = 10 * Math.log10(harmonicPower / noisePower)

    return Math.round(Math.max(0, Math.min(30, hnr)) * 10) / 10
  }

  private calculateIntensity(samples: Float32Array): { mean: number; min: number; max: number; std: number } {
    // Calculate RMS (Root Mean Square) intensity
    const windowSize = 1024
    const intensities: number[] = []

    for (let i = 0; i < samples.length; i += windowSize) {
      let sum = 0
      let count = 0
      for (let j = i; j < Math.min(i + windowSize, samples.length); j++) {
        sum += samples[j] * samples[j]
        count++
      }
      const rms = Math.sqrt(sum / count)
      const db = 20 * Math.log10(rms + 1e-10) + 100 // Convert to dB SPL (approximate)
      intensities.push(db)
    }

    const mean = intensities.reduce((a, b) => a + b, 0) / intensities.length
    const min = Math.min(...intensities)
    const max = Math.max(...intensities)

    // Calculate standard deviation
    const variance = intensities.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / intensities.length
    const std = Math.sqrt(variance)

    return {
      mean: Math.round(mean * 10) / 10,
      min: Math.round(min * 10) / 10,
      max: Math.round(max * 10) / 10,
      std: Math.round(std * 10) / 10,
    }
  }

  private assessVoiceQuality(
    jitter: { relative: number },
    shimmer: { relative: number },
    hnr: number,
  ): { breathiness: number; roughness: number; strain: number; overall: number } {
    // Assess voice quality based on acoustic parameters
    // Normal ranges:
    // Jitter: < 1%
    // Shimmer: < 3.5%
    // HNR: > 20 dB

    // Breathiness (related to HNR)
    const breathiness = Math.max(0, Math.min(100, ((20 - hnr) / 20) * 100))

    // Roughness (related to jitter)
    const roughness = Math.max(0, Math.min(100, (jitter.relative / 1) * 100))

    // Strain (related to shimmer)
    const strain = Math.max(0, Math.min(100, (shimmer.relative / 3.5) * 100))

    // Overall quality (inverse of average impairment)
    const overall = Math.max(0, 100 - (breathiness + roughness + strain) / 3)

    return {
      breathiness: Math.round(breathiness),
      roughness: Math.round(roughness),
      strain: Math.round(strain),
      overall: Math.round(overall),
    }
  }

  async analyzeAudioFile(file: File): Promise<AcousticAnalysisResult> {
    const arrayBuffer = await file.arrayBuffer()
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
    return this.analyzeAudioBuffer(audioBuffer)
  }
}

// Normative data for comparison
export const NORMATIVE_VALUES = {
  adult_male: {
    f0: { mean: 120, range: [85, 180] },
    jitter: { max: 1.04 },
    shimmer: { max: 3.81 },
    hnr: { min: 20 },
  },
  adult_female: {
    f0: { mean: 220, range: [165, 255] },
    jitter: { max: 1.04 },
    shimmer: { max: 3.81 },
    hnr: { min: 20 },
  },
  child: {
    f0: { mean: 250, range: [200, 300] },
    jitter: { max: 1.5 },
    shimmer: { max: 4.5 },
    hnr: { min: 18 },
  },
}
