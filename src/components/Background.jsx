import React, {useEffect, useRef, useState} from 'react';

import {Container, Snow} from './Background.style';

import snowflake from '../assets/snowflake-solid.svg';

const Background = () => {
    const [snows, setSnows] = useState([]);

    useEffect(() => {
        const snowInterval = setInterval(() => {
            const left = Math.random() * window.innerWidth;
            const size = 12 + Math.random() * 12;
            // const newSnow = { id: Date.now(), left, size }; // 눈의 위치와 크기를 객체로 저장
            setSnows(prevSnows => [...prevSnows, newSnow]);

            const snowRef = React.createRef();
            const translateYValue = `calc(100vh - ${size}px * ${snows.length + 1} / ${Math.ceil(window.innerWidth / size)})`;

            // 눈 애니메이션을 만들기 위한 keyframes를 정의합니다.
            const snowAnimation = [
                { transform: 'translateY(0) rotate(0deg)' }, // 시작 위치
                { transform: `translateY(${translateYValue})  rotate(360deg)` }, // 종료 위치
            ];

            // 눈 요소에 애니메이션을 적용합니다.
            snowRef.current?.animate(snowAnimation, {
                duration: 5000, // 애니메이션 지속 시간 (5초)
                iterations: Infinity, // 무한 반복
                easing: 'linear', // 애니메이션 속도 곡선
                delay: Math.random() * 3000, // 랜덤한 딜레이 설정
                fill: 'both', // 애니메이션이 끝난 후 상태 유지
            });

            const newSnow = { id: Date.now(), left, size, snowRef }; // 눈의 위치, 크기 및 ref를 객체로 저장
            setSnows(prevSnows => [...prevSnows, newSnow]);
            // snowRefs.current.push(snowRef);

            // setTimeout(() => {
            //     setSnows(prevSnows => prevSnows.filter(s => s.id !== newSnow.id)); // 해당 눈 요소 제거
            // }, 5000);
        }, 100);

        return () => clearInterval(snowInterval);
    }, []);

    return (
        <Container>
            {snows?.map((snow, index) => (
                <Snow key={index} ref={snow.snowRef} $left={snow.left} size={snow.size} $count={snows.length}>
                    <img src={snowflake} alt="Snowflake" />
                </Snow>
            ))}
        </Container>
    );
}

export default Background;
