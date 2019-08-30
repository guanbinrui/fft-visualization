import { idft as idftJS } from 'fft-js';

export function dft(signals: number[], len: number = signals.length) {
  const X = [];
  const N = signals.length;

  for (let k = 0; k < N; k += 1) {
    let re = 0;
    let im = 0;

    for (let n = 0; n < N; n += 1) {
      const signal = signals[n];
      const phi = (Math.PI * 2 * k * n) / N;

      re += signal * Math.cos(phi);
      im -= signal * Math.sin(phi);
    }
    X[k] = {
      re,
      im,
      frequency: k,
      amplitude: Math.sqrt(re * re + im * im),
      phase: Math.atan2(im, re),
    };
  }
  return X.slice(0, len);
}

export function idft(phasors: [number, number][]): [number, number][] {
  return idftJS(phasors);
}

export function compose(curves: ReturnType<typeof dft>) {
  return (x: number, y: number, a: number) => {
    return {
      x: a,
      y: 
    }
  };
}