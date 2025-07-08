import React, { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
    const { width, height } = useWindowSize();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [showCard, setShowCard] = useState(false);
    const [fillCard, setFillCard] = useState(false);

    useEffect(() => {
        audioRef.current?.play().catch(() => {});
    }, []);

    return (
        <div style={styles.container}>
            <audio ref={audioRef} src="/party-horn.mp3" preload="auto" />
            <Confetti width={width} height={height} numberOfPieces={200} recycle />

            {/* Заголовок */}
            <svg viewBox="0 0 1000 200" style={styles.svg}>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="birthday-text">
                    С Днём Рождения!
                </text>
            </svg>

            {/* Кнопка */}
            {!showCard && (
                <motion.button
                    style={styles.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCard(true)}
                >
                    Нажми меня
                </motion.button>
            )}

            {/* Карточка с анимацией рисования границы */}
            <AnimatePresence>
                {showCard && (
                    <div style={{marginTop: 40}}>
                        <div style={{position: 'relative', width: 393, height: 500}}>
                            <svg width="393" height="500" viewBox="0 0 393 500"
                                 style={{position: 'absolute', top: 0, left: 0}}>
                                <motion.rect
                                    x="0"
                                    y="0"
                                    width="393"
                                    height="500"
                                    rx="32"
                                    ry="32"
                                    stroke="#fff"
                                    strokeWidth="3"
                                    fill="transparent"
                                    strokeDasharray="1786"
                                    strokeDashoffset="1786"
                                    initial={{strokeDashoffset: 1786}}
                                    animate={{strokeDashoffset: 0}}
                                    transition={{
                                        duration: 2.5,
                                        ease: 'easeInOut',
                                    }}
                                    onAnimationComplete={() => setFillCard(true)}
                                />
                                {fillCard && (
                                    <motion.rect
                                        x="0"
                                        y="0"
                                        width="393"
                                        height="500"
                                        rx="24"
                                        ry="24"
                                        fill="url(#grad)"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{duration: 1.2}}
                                    />
                                )}
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#fff"/>
                                        <stop offset="100%" stopColor="#ffe0eb"/>
                                    </linearGradient>
                                </defs>
                            </svg>

                            {fillCard && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    style={{
                                        position: 'absolute',
                                        inset: 12,
                                        padding: 10,
                                        fontFamily: 'Great Vibes, serif',
                                        fontSize: 24,
                                        color: '#000',
                                        lineHeight: 1.4,
                                        overflowY: 'auto',
                                        textAlign: 'center',
                                    }}
                                >
                                    Солнышко, поздравляю тебя с днем рождения, на самом деле невозможно выразить словами
                                    то насколько
                                    сильно я тебя люблю, я бесконечно рад и счастлив что встретил тебя и надеюсь, что
                                    нас с тобой ждут
                                    очень долгие и счастливые годы вместе. Желаю тебе здоровья, добиться всего чего бы
                                    ты только не
                                    захотела — я всегда буду рядом и буду поддерживать тебя. Я тебя очень люблю!
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Стили SVG текста */}
            <style>
                {`
          .birthday-text {
            font-family: 'Great Vibes', cursive;
            font-size: 60px;
            fill: none;
            stroke: #fff;
            stroke-width: 2;
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 4s ease forwards, fillText 1s ease 4s forwards;
          }

          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes fillText {
            to {
              fill: #fff;
              stroke: none;
            }
          }
        `}
            </style>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        background: 'linear-gradient(to top right, #000, #000)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    svg: {
        width: '90%',
        height: '150px',
        marginBottom: 20,
    },
    button: {
        fontFamily: 'Great Vibes, serif',
        fontSize: 22,
        padding: '12px 24px',
        borderRadius: 18,
        border: '2px solid white',
        background: 'transparent',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
};

export default App;