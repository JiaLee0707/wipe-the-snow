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
    // const [deleteSnows, setDeleteSnows] = useState([]);
    const [deleteSnow, setDeleteSnow] = useState(null);

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

    // const handleMouseMove = useCallback(() => {
    //     console.log('deleteSnows', deleteSnows);
    //     for (let del of deleteSnows) {
    //         console.log('del', del);
    //         const absLeft = Math.abs(del.left);
    //         const tolerance = 1;
    //         const updatedComponents = snows.map((snow) => {
    //             console.log('snow.left', snow.props.left);
    //             const absNumber = Math.abs(snow.props.left);
    //             const withinRange = absLeft >= absNumber - tolerance && absLeft <= absNumber + tolerance;;
    //             if (withinRange && snow.props.line > del.line) {
    //                 console.log('if', {
    //                     ...snow,
    //                     props: {
    //                         ...snow.props,
    //                         line: snow.line - 1 * SNOW_MAX_SIZE / 2
    //                     }
    //                 })
    //                 return {
    //                     ...snow,
    //                     props: {
    //                         ...snow.props,
    //                         line: snow.line - 1 * SNOW_MAX_SIZE / 2
    //                     }
    //                 };
    //             }
    //             console.log('snow', snow);
    //             return snow;
    //         });
    //         console.log('updatedComponents', updatedComponents);
    //     }
    // }, [deleteSnows]);

    useEffect(() => {
        // handleMouseMove 함수 정의
        const handleMouseMove = () => {
            // console.log('deleteSnows', deleteSnows);
            // for (let del of deleteSnows) {
            //     // console.log('del', del);
            //     const absLeft = Math.abs(del.left);
            //     const tolerance = 1;
            //     setSnows(prevSnows => prevSnows.map((snow) => {
            //         // console.log('snow.left', snow.left);
            //         const absNumber = Math.abs(snow.left);
            //         const withinRange = absLeft >= absNumber - tolerance && absLeft <= absNumber + tolerance;;
            //         if (withinRange && snow.line > del.line) {
            //             // console.log('if', {
            //             //     ...snow,
            //             //     line: snow.line - 1 * SNOW_MAX_SIZE / 2
            //             // })
            //             return {
            //                 ...snow,
            //                 line: snow.line - 1 * SNOW_MAX_SIZE / 2
            //             };
            //         }
            //         // console.log('snow', snow);
            //         return snow;
            //     }));
            // }

            // setDeleteSnows(prevSnows => {
            //     const updatedSnows = [];
            //     // console.log('aa', prevSnows);
            //     prevSnows.forEach((del) => {
            //         const absLeft = Math.abs(del.left);
            //         const tolerance = 1;
            //         // const updatedComponents = snows.map((snow) => {
            //         //     const absNumber = Math.abs(snow.left);
            //         //     console.log('absLeft', absLeft);
            //         //     console.log('absNumber', absNumber);
            //         //     const withinRange = absLeft >= absNumber - tolerance || absLeft <= absNumber + tolerance;
            //         //     if (withinRange && snow.line > del.line) {
            //         //         console.log('if');
            //         //         return {
            //         //             ...snow,
            //         //             line: snow.line - 1 * SNOW_MAX_SIZE / 2
            //         //         };
            //         //     }
            //         //     return snow;
            //         // });
            //         // for (let snow of snows) {
            //         snows.forEach((snow, index) => {
            //             const tempSnows = [...snows];
            //             const absNumber = Math.abs(snow.left);
            //             console.log('absLeft', absLeft);
            //             console.log('absNumber', absNumber);
            //             const withinRange = absLeft >= absNumber - tolerance || absLeft <= absNumber + tolerance;
            //             if (withinRange && snow.line > del.line) {
            //                 console.log('if');
            //                 tempSnows[index] = {
            //                     ...snow,
            //                     line: snow.line - 1 * SNOW_MAX_SIZE / 2
            //                 };
            //                 setSnows(tempSnows);
            //             }
            //         });
            //         // console.log('updatedComponents.length', updatedComponents.length);
            //         // console.log('snows.legnth11', snows.length);
            //         // setSnows(updatedComponents);
            //         // console.log('snows.legnth22', snows.length);
            //
            //         // 여기서 필요한 로직을 수행하고 updatedComponents로 업데이트된 상태를 사용하여 return 하거나
            //         // 필요에 따라 상태를 직접 업데이트할 수 있습니다.
            //         // 예시: updatedSnows.push({ ...del, line: updatedLine });
            //     });
            //     // 업데이트가 필요한 경우 상태를 직접 변경하거나 리턴합니다.
            //     return updatedSnows; // 상태를 직접 변경할 때는 필요에 따라 리턴
            // });


            // console.log('del', deleteSnow);

            const absLeft = Math.abs(deleteSnow?.left);
            const tolerance = 0.5;
            setSnows(prevSnows => prevSnows?.map((snow) => {
                // console.log('snow', snow.key);
                // console.log('deleteSnow', deleteSnow);
                // console.log('deleteSnow.left', deleteSnow?.left);
                if (snow?.left === deleteSnow?.left && snow?.line === deleteSnow?.line) return;
                const absNumber = Math.abs(snow?.left);
                const withinRange = absLeft >= absNumber - tolerance || absLeft <= absNumber + tolerance;
                if (withinRange && snow?.line > deleteSnow?.line) {
                    console.log('if', {
                        ...snow,
                        line: snow?.line - 1 * SNOW_MAX_SIZE / 2
                    })
                    const newLine = snow?.line - 1 * SNOW_MAX_SIZE / 2;
                    setSnowLine(prevSnowLine => prevSnowLine - 1);
                    return {
                        ...snow,
                        line: newLine
                    };
                }
                // console.log('snow', snow);
                return snow;
            }));

        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [deleteSnow]); // deleteSnows가 업데이트될 때마다 useEffect 재실행



    return (
        <Container ref={snowContainerRef}>
            {/*{snows?.map((snow) => snow)}*/}
            {snows?.map((snow) => (
                <Snow
                    key={snow?.key}
                    left={snow?.left}
                    size={snow?.size}
                    line={snow?.line}
                    isMouseOver={() => {
                        const left = snow?.left;
                        const line = snow?.line;
                        // setDeleteSnow(prevSnows => [...prevSnows, { left, line }]);
                        setDeleteSnow({ left, line });
                        // console.log('del', deleteSnows);
                    }}
                />
            ))}
        </Container>
    );
}

export default Background;
