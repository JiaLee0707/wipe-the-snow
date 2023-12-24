import React, {useEffect, useRef} from 'react';
import snowflake from "../assets/snowflake-solid.svg";
import {SnowWrap} from "./Background.style";

const Snow = ({ left, size, line }) => {
    const snowRef = useRef(null);

    useEffect(() => {
        if (snowRef.current) {
            // 한 절반부터는 첫번째 라인 두번째 라인 랜덤
            // const translateYValue = `calc(100vh - ${size}px * ${snows.length + 1} / ${Math.ceil(window.innerWidth / size)})`;
            // const translateYValue = `calc(100vh - ${line}vh * ${line + 1} / ${Math.ceil(window.innerWidth / line)})`;
            const translateYValue = `calc(100vh - ${line}px )`;
            const snowAnimation = [
                { transform: 'translateY(0) rotate(0deg)' }, // 시작 위치
                { transform: `translateY(${translateYValue}) rotate(360deg)` }, // 종료 위치
                // { transform: `translateY(100vh) rotate(360deg)` }, // 종료 위치
            ];
            snowRef.current.animate(
                snowAnimation,
                {
                    duration: 5000, // 애니메이션 지속 시간 (5초)
                    // iterations: Infinity, // 무한 반복
                    easing: 'linear', // 애니메이션 속도 곡선
                    delay: Math.random() * 3000, // 랜덤한 딜레이 설정
                    // fill: "forwards",
                    fill: 'both', // 애니메이션이 끝난 후 상태 유지
                }
            );
        }
    }, []);

    return (
        <SnowWrap ref={snowRef} $left={left} size={size}>
            <img src={snowflake} alt="Snowflake" />
        </SnowWrap>
    );
};

export default Snow;