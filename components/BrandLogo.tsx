import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { ViewStyle } from 'react-native';
import { Theme } from '../constants/Theme';

interface BrandLogoProps {
    width?: number;
    height?: number;
    color?: string;
    style?: ViewStyle;
}

export default function BrandLogo({
    width = 64,
    height = 64,
    color = '#FFFFFF',
    style
}: BrandLogoProps) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 64 64"
            fill="none"
            style={style}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 8C9.79086 8 8 9.79086 8 12V52C8 54.2091 9.79086 56 12 56C14.2091 56 16 54.2091 16 52V34H34V52C34 54.2091 35.7909 56 38 56C40.2091 56 42 54.2091 42 52V30C42 17.8497 32.1503 8 20 8H12ZM16 26V16H20C27.732 16 34 22.268 34 30V26H16Z"
                fill={color}
            />
            <Circle
                cx="48"
                cy="18"
                r="6"
                fill={color}
                opacity="0.9"
            />
        </Svg>
    );
}
