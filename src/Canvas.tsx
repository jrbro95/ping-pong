import React, { useRef, useEffect } from 'react';

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';

    let leftPaddleY = 150;
    let rightPaddleY = 150;
    const paddleSpeed = 25;

    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: 5,
      vy: 5,
      radius: 10,
    };

    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          leftPaddleY -= paddleSpeed;
          break;
        case 'ArrowDown':
          leftPaddleY += paddleSpeed;
          break;
        case 'w':
          rightPaddleY -= paddleSpeed;
          break;
        case 's':
          rightPaddleY += paddleSpeed;
          break;
      }
    });

    function checkCollisions() {
      if (
        ball.x - ball.radius <= 50 + 20 &&
        ball.y >= leftPaddleY &&
        ball.y <= leftPaddleY + 100
      ) {
        ball.vx = -ball.vx;
      }

      if (
        ball.x + ball.radius >= canvas.width - 70 &&
        ball.y >= rightPaddleY &&
        ball.y <= rightPaddleY + 100
      ) {
        ball.vx = -ball.vx;
      }
    }

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      ctx.fillRect(50, leftPaddleY, 20, 100);
      ctx.fillRect(canvas.width - 70, rightPaddleY, 20, 100);

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      ctx.fill();

      ball.x += ball.vx;
      ball.y += ball.vy;

      checkCollisions();

      // Check for collisions between the ball and the top/bottom of the canvas
      if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        // Reverse the vertical velocity to bounce the ball back
        ball.vy = -ball.vy;
      }

      // Check if the ball hits the left or right wall
      if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
        // Reset the ball position to the center of the canvas
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;

        // Give the ball a new random velocity
        ball.vx = Math.floor(Math.random() * 5) + 1;
        ball.vy = Math.floor(Math.random() * 5) + 1;

        // Reset the paddle positions to the middle of the canvas
        leftPaddleY = 150;
        rightPaddleY = 150;
      }

      requestAnimationFrame(gameLoop);
    }


    requestAnimationFrame(gameLoop);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};

export default Canvas;
