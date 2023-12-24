import React, {useEffect, useRef, useState} from 'react';

import {Container} from './Background.style';

import Snow from "./Snow";

const SNOW_MAX_SIZE = 24;

const Background = () => {
    const [snows, setSnows] = useState([]);
    const [snowLine, setSnowLine] = useState(0);
    const [snowLineRandom, setSnowLineRandom] = useState(false);
    const snowContainerRef = useRef(null);

    useEffect(() => {
        const snowInterval = setInterval(() => {
            const left = Math.random() * window.innerWidth;
            const size = 12 + Math.random() * 12;
            // const newSnow = { id: Date.now(), left, size }; // 눈의 위치와 크기를 객체로 저장
            let line = snowLine;
            if (snowLineRandom) {
                const randomBoolean = Math.random() > 0.5;
                if (randomBoolean) line += 1;
            }
            // const line = snowLineRandom ? snowLine + 1 : snowLine;
            const newSnow = <Snow key={Date.now()} left={left} size={size} line={line * SNOW_MAX_SIZE / 2} />; // 눈의 위치와 크기를 객체로 저장

            setSnows(prevSnows => [...prevSnows, newSnow]);
        });

        return () => clearInterval(snowInterval);
    }, [snowLine, snowLineRandom]);

    useEffect(() => {
        if (snowContainerRef.current) {
            const snowContainerHeight = snowContainerRef.current.clientHeight;
            const snowContainerWidth = snowContainerRef.current.clientWidth;

            // 특정 위치에 이미지가 채워졌는지 확인
            const totalSnowflakesVertical = Math.floor(snowContainerHeight / SNOW_MAX_SIZE);
            const totalSnowflakesHorizontal = Math.floor(snowContainerWidth / SNOW_MAX_SIZE);

            const totalSnowflakes = totalSnowflakesVertical * totalSnowflakesHorizontal;
            if (totalSnowflakes < snows.length - (totalSnowflakes * snowLine)) {
                setSnowLine(prevSnowLine => prevSnowLine + 1);
            }
            if (totalSnowflakes / 1.5 < snows.length - (totalSnowflakes * snowLine)) setSnowLineRandom(true);
            else setSnowLineRandom(false);

            // console.log('Total snowflakes allowed:', totalSnowflakes);
            // if (totalSnowflakes < snows.length - (totalSnowflakes * snowLine)) {
            //     console.log('Current snowflakes:', snows.length);
            // }
            // console.log('Current snowLine:', snowLine);
        }
    }, [snows]);

    return (
        <Container ref={snowContainerRef}>
            {snows?.map((snow) => snow)}
        </Container>
    );
}

export default Background;
