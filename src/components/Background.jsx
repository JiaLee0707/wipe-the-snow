import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Container} from './Background.style';

import Snow from "./Snow";

// const SNOW_MAX_SIZE = 24;
const SNOW_MIN_SIZE = 20;
const SNOW_MAX_SIZE = 32;

const Background = () => {
    const [snows, setSnows] = useState([]);
    const [snowLine, setSnowLine] = useState(0);
    const [snowLineRandom, setSnowLineRandom] = useState(false);

    const snowContainerRef = useRef(null);

    useEffect(() => {
        const snowInterval = setInterval(() => {
            const left = Math.random() * window.innerWidth;
            // const size = 12 + Math.random() * 12;
            const size = Math.random() * (SNOW_MAX_SIZE - SNOW_MIN_SIZE) + SNOW_MIN_SIZE;
            let line = snowLine;
            if (snowLineRandom) {
                const randomBoolean = Math.random() > 0.5;
                if (randomBoolean) line += 1;
            }
            // const line = snowLineRandom ? snowLine + 1 : snowLine;
            // const newSnow = (
            //     <Snow
            //         key={Date.now()}
            //         left={left}
            //         size={size}
            //         line={line * SNOW_MAX_SIZE / 2}
            //         isMouseOver={() => {
            //             setDeleteSnows(prevSnows => [...prevSnows, {left, line}]);
            //         }}
            //     />
            // ); // 눈의 위치와 크기를 객체로 저장
            const newSnow = {key: Date.now(), left, size, line: line * SNOW_MAX_SIZE / 2};

            setSnows(prevSnows => [...prevSnows, newSnow]);
        }, 100);

        return () => clearInterval(snowInterval);
    }, [snowLine, snowLineRandom]);

    useEffect(() => {
        if (snowContainerRef.current) {
            const snowContainerHeight = snowContainerRef.current.clientHeight;
            const snowContainerWidth = snowContainerRef.current.clientWidth;

            // 특정 위치에 이미지가 채워졌는지 확인
            const totalSnowflakesVertical = Math.floor(snowContainerHeight / SNOW_MAX_SIZE);
            const totalSnowflakesHorizontal = Math.floor(snowContainerWidth / SNOW_MAX_SIZE);

            const totalSnowflakes = totalSnowflakesVertical * totalSnowflakesHorizontal * 0.33;
            // console.log('totalSnowflakes',totalSnowflakes);
            if (totalSnowflakes < snows.length - (totalSnowflakes * snowLine)) {
                setSnowLine(prevSnowLine => prevSnowLine + 1);
            }
            // else if (totalSnowflakes < snows.length - (totalSnowflakes * (snowLine - 1))) {
            //     setSnowLine(prevSnowLine => prevSnowLine - 1);
            // }
            if (totalSnowflakes / 1.5 < snows.length - (totalSnowflakes * snowLine)) setSnowLineRandom(true);
            else setSnowLineRandom(false);

            // console.log('Total snowflakes allowed:', totalSnowflakes);
            // if (totalSnowflakes < snows.length - (totalSnowflakes * snowLine)) {
            //     console.log('Current snowflakes:', snows.length);
            // }
            // console.log('Current snowLine:', snowLine);
            // console.log('line snows', snows.length);
        }
    }, [snows]);

    return (
        <Container ref={snowContainerRef}>
            {/*{snows?.map((snow) => snow)}*/}
            {snows?.map((snow) => (
                <Snow
                    key={snow?.key}
                    left={snow?.left}
                    size={snow?.size}
                    line={snow?.line}
                    // isMouseOver={() => {
                    //     const left = snow?.left;
                    //     const line = snow?.line;
                    //     // setDeleteSnow(prevSnows => [...prevSnows, { left, line }]);
                    //     setDeleteSnow({ left, line });
                    //     // console.log('del', deleteSnows);
                    // }}
                />
            ))}
        </Container>
    );
}

export default Background;
