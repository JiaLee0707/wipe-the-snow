import React, {useEffect, useRef, useState} from 'react';
import snowflake from "../assets/snowflake-solid.svg";
import {SnowWrap} from "./Background.style";

const Snow = ({ left, size, line }) => {
    const [$left, setLeft] = useState(left);
    const snowRef = useRef(null);
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        if (snowRef.current) {
            const translateYValue = `calc(100vh - ${line}px)`;
            const snowAnimation = [
                { transform: `translateY(${currentLine}) rotate(0deg)` }, // 시작 위치
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
            setCurrentLine(translateYValue);
        }
    }, [line]);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const mouseX = Math.abs(event.clientX);
            const mouseY = Math.abs(event.clientY);

            if (snowRef.current) {
                const snowRect = snowRef.current.getBoundingClientRect();


                const absSnowX = Math.abs(snowRect.x);
                const absSnowY = Math.abs(snowRect.y);
                const tolerance = 10;
                if (Math.abs(mouseX - absSnowX) <= tolerance) {
                    console.log('adsfasdf');
                    // if ()
                    let newLeft = 0;
                    if (mouseX > absSnowX) {
                        newLeft = `${absSnowX - 10}px`
                    } else {
                        newLeft = `${absSnowX + 10}px`;
                    }
                    const snowAnimation = [
                        // {transform: `translateX(${absSnowX}px`},
                        { left: newLeft },
                    ];

                    snowRef.current.animate(
                        snowAnimation,
                        {
                            duration: 500, // 애니메이션 지속 시간 (5초)
                            iterations: 1, // 한 번만 실행
                            fill: 'both', // 애니메이션이 끝난 후 상태를 유지합니다.
                            // 애니메이션이 끝난 후 실행할 콜백 함수
                            // onfinish: function() {
                            //     // 애니메이션이 끝난 후에 처리할 작업을 여기에 작성하세요
                            //     console.log('애니메이션이 종료되었습니다.');
                            //     snowRef.current.style.left = `${absSnowX}px`;
                            //     // 예시: 다른 동작 실행하기
                            //     // someFunction();
                            // }
                        }
                    )
                    // return new Promise((resolve) => {
                    //
                    //     snowRef.current.animate(
                    //         snowAnimation,
                    //         {
                    //             duration: 100, // 애니메이션 지속 시간 (5초)
                    //             iterations: 1, // 한 번만 실행
                    //             fill: 'both', // 애니메이션이 끝난 후 상태를 유지합니다.
                    //             // 애니메이션이 끝난 후 실행할 콜백 함수
                    //             // onfinish: function() {
                    //             //     // 애니메이션이 끝난 후에 처리할 작업을 여기에 작성하세요
                    //             //     console.log('애니메이션이 종료되었습니다.');
                    //             //     snowRef.current.style.left = `${absSnowX}px`;
                    //             //     // 예시: 다른 동작 실행하기
                    //             //     // someFunction();
                    //             // }
                    //         }
                    //     ).addEventListener('finish', () => {
                    //         // 애니메이션이 끝나면 resolve를 호출하여 Promise를 완료합니다.
                    //         console.log('애니메이션이 종료되었습니다.');
                    //         snowRef.current.style.left = `${absSnowX}px`;
                    //         resolve();
                    //     });
                    // });
                }
                // snowRef.current.style.transform = `translate(${snowRef.current.x}px, ${snowRef.current.y}px)`;

                // requestAnimationFrame(animateSnow);
                // const snowRect = snowRef.current.getBoundingClientRect();
                // console.log('snowRect', snowRect);
                // const absSnowX = Math.abs(snowRect.x);
                // const absSnowY = Math.abs(snowRect.y);
                // const tolerance = 1;
                // const withinRangeX = mouseX >= absSnowX - tolerance || mouseX <= absSnowX + tolerance;
                // const withinRangeY = mouseY >= absSnowY - tolerance || mouseY <= absSnowY + tolerance;
                // if (withinRangeX || withinRangeY) {
                //     const snowAnimation = [
                //         // { transform: `translate(${moveX}px, ${moveY}px)` },
                //     ];
                //     snowRef.current.animate(
                //         snowAnimation,
                //         {
                //             duration: 1000, // 애니메이션 지속 시간 (5초)
                //             // iterations: Infinity, // 무한 반복
                //             easing: 'linear', // 애니메이션 속도 곡선
                //             delay: Math.random() * 3000, // 랜덤한 딜레이 설정
                //             // fill: "forwards",
                //             // fill: 'both', // 애니메이션이 끝난 후 상태 유지
                //         }
                //     );
                // }



                // const snowX = snowRect.left + snowRect.width / 2;
                // const snowY = snowRect.top + snowRect.height / 2;
                //
                // const deltaX = mouseX - snowX;
                // const deltaY = mouseY - snowY;
                // const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                //
                // const maxDistance = 100; // 마우스와 눈송이 간의 최대 거리 (조절 가능)
                // const moveFactor = 5; // 눈송이의 이동 속도 (조절 가능)
                //
                // if (distance < maxDistance) {
                //     const moveX = moveFactor * (deltaX / distance);
                //     const moveY = moveFactor * (deltaY / distance);
                //
                //
                //     const snowAnimation = [
                //         { transform: `translate(${moveX}px, ${moveY}px)` }
                //         // { transform: `translateY(100vh) rotate(360deg)` }, // 종료 위치
                //     ];
                //     snowRef.current.animate(
                //         snowAnimation,
                //         {
                //             duration: 5000, // 애니메이션 지속 시간 (5초)
                //             // iterations: Infinity, // 무한 반복
                //             easing: 'linear', // 애니메이션 속도 곡선
                //             delay: Math.random() * 3000, // 랜덤한 딜레이 설정
                //             // fill: "forwards",
                //             fill: 'both', // 애니메이션이 끝난 후 상태 유지
                //         }
                //     );
                //     // snowRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
                // }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <SnowWrap ref={snowRef} $left={$left} size={size}>
            <img src={snowflake} alt="Snowflake" />
        </SnowWrap>
    );
};

export default Snow;
