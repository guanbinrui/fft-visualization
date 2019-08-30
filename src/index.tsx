import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { dft, idft } from './dft';
import { fft, ifft } from './fft';
import { square } from './curves';
import { Chart, ChartType } from 'chart.js';

// constants
const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 30;

// sample

/**
 *
 * @param start start angle
 * @param end end angle
 * @param step
 */
function sampleCurve(
  start: number,
  end: number,
  step: number,
  curve: (a: number, f?: number, n?: number) => number
) {
  const points: Point[] = [];

  for (let a = start; a < end; a += step) {
    points.push({
      x: a,
      y: curve(a),
    });
  }

  return points;
}

interface Point {
  x: number;
  y: number;
}

interface CanvasProps {
  type?: ChartType;
  title: string;
  points: Point[];
}

function Canvas({ points, title, type = 'line' }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }
    const chart = new Chart(canvasElement.getContext('2d'), {
      type,
      data: {
        labels: points.map(p => String(p.x)),
        datasets: [
          {
            label: '',
            borderColor: 'rgb(255, 99, 132)',
            data: points.map(p => p.y),
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: title,
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
}

function DTF() {
  const points = sampleCurve(
    0,
    DEFAULT_WIDTH,
    DEFAULT_WIDTH / Math.pow(2, 8),
    square
  );
  const phasors = fft(points.map(p => p.y));

  return (
    <>
      <Canvas title="Original" points={points} />
      <Canvas
        type="bar"
        title="Transformed"
        points={phasors.map(({ frequency, amplitude }) => ({
          x: frequency,
          y: amplitude,
        }))}
      />
      <Canvas
        type="line"
        title="Inverse Transformed"
        points={ifft(phasors.map(({ re, im }) => [re + 1, im])).map((p, i) => ({
          x: points[i].x,
          y: p[0],
        }))}
      />
    </>
  );
}

ReactDOM.render(
  <>
    <DTF />
  </>,
  document.getElementById('root')
);
