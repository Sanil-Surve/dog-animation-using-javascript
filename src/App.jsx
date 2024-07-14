import React, { useRef, useEffect, useCallback, useState } from "react";
import "./App.css";
import dog from "/shadow_dog.png";

const App = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const [speed, setSpeed] = useState(5); 
  const [isAnimating, setIsAnimating] = useState(true);

  const draw = useCallback(
    (ctx, frameX, frameY, spriteWidth, spriteHeight, playerImage) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(
        playerImage,
        frameX * spriteWidth,
        frameY * spriteHeight,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
      );
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 600;

    const playerImage = new Image();
    playerImage.src = dog;
    const spriteWidth = 575;
    const spriteHeight = 523;

    let frameX = 1;
    let frameY = 3;

    let gameFrame = 0;

    const animate = () => {
      if (!isAnimating) return;

      draw(ctx, frameX, frameY, spriteWidth, spriteHeight, playerImage);
      if (gameFrame % speed === 0) {
        frameX = frameX < 7 ? frameX + 1 : 0;
      }
      gameFrame++;
      requestRef.current = requestAnimationFrame(animate);
    };

    playerImage.onload = () => {
      animate();
    };

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [draw, speed, isAnimating]);

  const handleRunSlow = () => {
    setIsAnimating(true);
    setSpeed(15);
  };

  const handleRun = () => {
    setIsAnimating(true);
    setSpeed(5);
  };

  const handleRunFast = () => {
    setIsAnimating(true);
    setSpeed(1);
  };

  return (
    <>
      <header>DogSprite Animator</header>
      <canvas id="canvas1" ref={canvasRef}></canvas>
      <div className="controls">
        <button onClick={handleRunSlow}>Run Slow</button>
        <button onClick={handleRun}>Run</button>
        <button onClick={handleRunFast}>Run Fast</button>
      </div>
    </>
  );
};

export default App;
