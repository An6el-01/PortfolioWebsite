import React, { useRef, useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

// Instructions:
// 1. Create a free account at https://www.emailjs.com/
// 2. Create an email service and template in the EmailJS dashboard.
// 3. Get your Service ID, Template ID, and Public Key from EmailJS.
// 4. Replace the placeholders below with your actual EmailJS values.
// 5. Optionally, add your Contact section to your navigation.

const SERVICE_ID = 'service_8tjr6np'; // Replace with your EmailJS Service ID
const TEMPLATE_ID = 'template_ns4vchc'; // Replace with your EmailJS Template ID
const PUBLIC_KEY = 'JRVbAGtY0m42wxXgI'; // Replace with your EmailJS Public Key

// --- SNAKE GAME COMPONENT ---
const GRID_SIZE = 28;
const INITIAL_SNAKE = [
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 }
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const SPEED = 220; // Slower movement
const COLORS = {
  background: 'rgba(30,30,40,0.85)',
  snake: '#b16cff',
  snakeHead: '#fff',
  food: '#2ecc71',
  grid: 'rgba(177,108,255,0.08)'
};

function getRandomFood(snake) {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    if (!snake.some(seg => seg.x === newFood.x && seg.y === newFood.y)) break;
  }
  return newFood;
}

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [moveQueue, setMoveQueue] = useState([]);
  const gameRef = useRef();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      let newDir;
      if (e.key === 'ArrowUp' && direction.y !== 1) newDir = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' && direction.y !== -1) newDir = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' && direction.x !== 1) newDir = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && direction.x !== -1) newDir = { x: 1, y: 0 };
      if (newDir) setMoveQueue(q => [...q, newDir]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake(prevSnake => {
        let newDir = direction;
        if (moveQueue.length > 0) {
          newDir = moveQueue[0];
          setDirection(newDir);
          setMoveQueue(q => q.slice(1));
        }
        const newHead = {
          x: prevSnake[0].x + newDir.x,
          y: prevSnake[0].y + newDir.y
        };
        // Check collision
        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE ||
          prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setGameOver(true);
          return prevSnake;
        }
        let newSnake;
        if (newHead.x === food.x && newHead.y === food.y) {
          newSnake = [newHead, ...prevSnake];
          setFood(getRandomFood(newSnake));
          setScore(s => s + 1);
        } else {
          newSnake = [newHead, ...prevSnake.slice(0, -1)];
        }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(interval);
  }, [direction, food, gameOver, moveQueue]);

  // Restart game
  const handleRestart = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setMoveQueue([]);
    gameRef.current && gameRef.current.focus();
  }, []);

  // Focus for keyboard
  useEffect(() => {
    if (gameRef.current) gameRef.current.focus();
  }, []);

  return (
    <div className="snake-game-card" tabIndex={0} ref={gameRef} aria-label="Snake game">
      <div className="snake-game-header">
        <span>Snake</span>
        <span className="snake-game-score">Score: {score}</span>
      </div>
      <div className="snake-game-board" style={{
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`
      }}>
        {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => {
          const x = i % GRID_SIZE, y = Math.floor(i / GRID_SIZE);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isSnake = snake.some(seg => seg.x === x && seg.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              className={`snake-cell${isSnake ? ' snake' : ''}${isHead ? ' head' : ''}${isFood ? ' food' : ''}`}
              style={{
                background: isHead ? COLORS.snakeHead : isFood ? COLORS.food : isSnake ? COLORS.snake : 'transparent',
                border: `1px solid ${COLORS.grid}`
              }}
            />
          );
        })}
      </div>
      {gameOver && (
        <div className="snake-game-over">
          <div>Game Over</div>
          <button className="snake-game-restart" onClick={handleRestart}>Restart</button>
        </div>
      )}
      <div className="snake-game-instructions">
        <span>Use arrow keys to play</span>
      </div>
    </div>
  );
};

// --- END SNAKE GAME ---

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const validate = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('All fields are required.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, () => {
        setStatus('error');
      });
  };

  return (
    <section className="contact-section contact-two-col floating-bg" id="contact">
      <div className="contact-two-col-inner">
        <div className="contact-form-col">
          <div className="contact-form-glass-card">
            <h1 className="contact-header contact-header-orange">Contact us</h1>
            <p className="contact-subtitle contact-subtitle-grey">Get in touch and let us know how we can help</p>
            <form ref={form} className="contact-form contact-form-underline" onSubmit={handleSubmit} autoComplete="off">
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="contact-input-underline" />
                </div>
                <div className="contact-form-group">
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="E-mail" className="contact-input-underline" />
                </div>
              </div>
              <div className="contact-form-group">
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Your message" className="contact-input-underline" rows={4} />
              </div>
              {error && <div className="contact-error">{error}</div>}
              <button type="submit" className="contact-submit-btn contact-btn-gradient" disabled={status === 'loading'}>
                <span>Send Message</span>
                <span className="contact-btn-arrow">→</span>
              </button>
              {status === 'success' && <div className="contact-success">Message sent! Thank you.</div>}
              {status === 'error' && <div className="contact-error">Something went wrong. Please try again.</div>}
            </form>
          </div>
        </div>
        <div className="contact-minigame-col contact-minigame-polished">
          <SnakeGame />
        </div>
      </div>
    </section>
  );
};

export default Contact;
