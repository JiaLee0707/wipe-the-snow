import { css } from 'styled-components';

export const getTheme = () => {
    const size = {
        small: '576px',
        mobile: '768px',
        tablet: '992px',
        desktop: '1280px',
    };

    const device = {
        small: `@media only screen and (min-width: ${size.small})`,
        mobile: `@media only screen and (min-width: ${size.mobile})`,
        tablet: `@media only screen and (min-width: ${size.tablet})`,
        desktop: `@media only screen and (min-width: ${size.desktop})`,
    };

    const common = {
        container: css`
			width: 100vw;
			height: 100vh;
			margin: auto 0;
			// ${device.mobile} {
			// 	width: calc(100vw - 28.4rem);
			// }
		`,
        flex(direction = 'row', align = 'center', justify = 'center') {
            return css`
				display: flex;
				flex-direction: ${direction};
				align-items: ${align};
				justify-content: ${justify};
			`;
        },
        wh(w = 'auto', h = w) {
            return css`
				width: ${w};
				height: ${h};
			`;
        },
    };

    return {
        device,
        common,
    };
};

export default getTheme;
