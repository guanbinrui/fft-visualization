import { fft as fftJS, ifft as ifftJS } from 'fft-js';

export function fft(signals: number[]) {
  return (fftJS(signals) as [number, number][]).map(([re, im], i) => {
    return {
      re,
      im,
      frequency: i,
      amplitude: Math.sqrt(re * re + im * im),
      phase: Math.atan2(im, re),
    };
  });
}

export function ifft(phasors: [number, number][]): [number, number][] {
  return ifftJS(phasors);
}
