import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors';
import { Player } from '../models/Player'

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(3);
    const [whiteTime, setWhiteTime] = useState(3);

    const [blackLost, setBlackLost] = useState(false);
    const [whiteLost, setWhiteLost] = useState(false);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    useEffect(() => {
        if (blackTime === 0) {
            currentPlayer = null;
            setBlackLost(true);

            if (timer.current) {
                clearInterval(timer.current);
            }
        }
        
        if (whiteTime === 0) {
            currentPlayer = null;
            setWhiteLost(true);

            if (timer.current) {
                clearInterval(timer.current);
            }
        }
    }, [whiteTime, blackTime])

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current);
        }

        const callback = currentPlayer?.color === Colors.WHITE
            ? decrementWhiteTimer
            : decrementBlackTimer;

        if (!blackLost || !whiteLost) {
            timer.current = setInterval(callback, 1000);
        }
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1);
    }

    const handleRestart = () => {
        setWhiteTime(300);
        setBlackTime(300);
        setBlackLost(false);
        setWhiteLost(false);
        restart();
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Перезапустить</button>
            </div>
            <h2 style={{color: blackLost ? 'red' : 'white'}}>Чёрные - {blackTime}</h2>
            <h2 style={{color: whiteLost ? 'red' : 'white'}}>Белые - {whiteTime}</h2>
        </div>
    )
}

export default Timer