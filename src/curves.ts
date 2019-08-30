import { dft } from './dft';

export function sin(a: number, f: number = 1) {
  return Math.sin(a * f);
}

export function curve(a: number, f: number = 1) {
  const rad = a * f;

  return Math.tan(rad + Math.sin(rad));
}

export function square(a: number, f: number = Math.PI * 2, n: number = 10000) {
  let acc = 0;

  for (let i = 1; i < n; i += 1) {
    if (i % 2 !== 0) {
      acc += Math.sin(a * f * i) / i;
    }
  }
  return (4 / Math.PI) * acc;
}
