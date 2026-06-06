import { useEffect, useRef } from 'react';

function parseColor(color) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return { r, g, b };
}

export default function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'rgb(0, 0, 0)',
  maxOpacity = 0.3,
  text,
  fontSize,
  fontWeight = 'bold',
  textColor,
  className,
  style,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { r, g, b } = parseColor(color);
    const textRGB = textColor ? parseColor(textColor) : null;

    let animationFrameId;
    let gridParams;

    const setupGrid = (width, height) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    };

    const generateTextMask = (width, height, cols, rows) => {
      if (!text) return new Array(cols * rows).fill(false);

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return new Array(cols * rows).fill(false);

      const actualFontSize = fontSize || Math.min(width / text.length, height) * 1.5;
      offCtx.font = `${fontWeight} ${actualFontSize}px sans-serif`;
      offCtx.fillStyle = 'white';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, width / 2, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const mask = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = Math.floor(col * (squareSize + gridGap) + squareSize / 2);
          const y = Math.floor(row * (squareSize + gridGap) + squareSize / 2);
          const index = (y * width + x) * 4;
          mask.push(imageData.data[index] > 128);
        }
      }
      return mask;
    };

    const updateSquares = (squares, deltaTime) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    };

    const drawGrid = (cols, rows, squares, mask) => {
      ctx.clearRect(0, 0, canvas.width / gridParams.dpr, canvas.height / gridParams.dpr);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const squareIndex = i * cols + j;
          const opacity = squares[squareIndex];
          const inMask = mask[squareIndex];
          if (inMask && textRGB) {
            ctx.fillStyle = `rgba(${textRGB.r}, ${textRGB.g}, ${textRGB.b}, ${Math.max(opacity, 0.8)})`;
          } else {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          }
          ctx.fillRect(
            j * (squareSize + gridGap),
            i * (squareSize + gridGap),
            squareSize,
            squareSize
          );
        }
      }
    };

    let lastTime = 0;
    let isVisible = true;
    let textMask = [];

    const animate = (time) => {
      if (!isVisible) return;
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      updateSquares(gridParams.squares, deltaTime);
      drawGrid(gridParams.cols, gridParams.rows, gridParams.squares, textMask);
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = (entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        gridParams = setupGrid(width, height);
        textMask = generateTextMask(width, height, gridParams.cols, gridParams.rows);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const { width: initWidth, height: initHeight } = container.getBoundingClientRect();
    gridParams = setupGrid(initWidth, initHeight);
    textMask = generateTextMask(initWidth, initHeight, gridParams.cols, gridParams.rows);

    const intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    });
    intersectionObserver.observe(canvas);

    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [color, flickerChance, maxOpacity, squareSize, gridGap, text, fontSize, fontWeight, textColor]);

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', ...style }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
