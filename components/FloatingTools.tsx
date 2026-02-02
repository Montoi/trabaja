import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Theme } from '../constants/Theme';

// Using premium rounded outline paths (Lucide-style)
const ICON_SIZE = 86;


// Note: These are STROKE pathways. We must render them with stroke, no fill.
const OUTLINE_PATHS = {
    // 1. Screwdriver (approved alternative)
    hammer: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z M2 8l14-6 M9 4L6 17l-4-5",
    // 2. Wrench (KEEPING - user approved)
    wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
    // 3. Paintbrush (cleaner design)
    brush: "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08 M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z",
    // 4. Pencil (KEEPING - user approved)
    pencil: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z",
    // 5. Home/Building (property services)
    stethoscope: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    // 6. Shopping bag (delivery/shopping)
    // 7. Zap/Lightning (electrical/energy)
    drill: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    // 8. Lightbulb (ideas/electrical)
    sparkles: "M9 18h6 M10 22h4 M15 2a7 7 0 1 1-6 10.8",
    // 9. Camera (KEEPING - user approved)
    camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    // 10. Settings/Cog (KEEPING - user approved)
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
};

const ToolIcon = ({ path, color }: { path: string, color: string }) => (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d={path} />
    </Svg>
);

const AnimatedTool = ({
    path,
    delay,
    color,
    xTarget,
    yPeak
}: {
    path: string,
    delay: number,
    color: string,
    xTarget: number,
    yPeak: number
}) => {
    // Animation Values - Starting from outside viewport
    const translateY = useRef(new Animated.Value(350)).current; // Start way below viewport
    const translateX = useRef(new Animated.Value(0)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Start animation after delay
        setTimeout(() => {
            const singleToss = Animated.sequence([
                // Toss Up
                Animated.parallel([
                    Animated.timing(translateY, {
                        toValue: yPeak, // Use custom peak height
                        duration: 1200,
                        easing: Easing.out(Easing.cubic),
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateX, {
                        toValue: xTarget,
                        duration: 1200,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(rotate, {
                        toValue: 0.5,
                        duration: 1200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    })
                ]),
                // Fall Down (continues immediately, no delay)
                Animated.parallel([
                    Animated.timing(translateY, {
                        toValue: 500,
                        duration: 1200,
                        easing: Easing.in(Easing.cubic),
                        useNativeDriver: true,
                    }),
                    Animated.timing(rotate, {
                        toValue: 1,
                        duration: 1200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    })
                ])
            ]);

            // Loop the animation
            Animated.loop(
                Animated.sequence([
                    singleToss,
                    // Reset to start position instantly
                    Animated.parallel([
                        Animated.timing(translateY, { toValue: 350, duration: 0, useNativeDriver: true }),
                        Animated.timing(translateX, { toValue: 0, duration: 0, useNativeDriver: true }),
                        Animated.timing(rotate, { toValue: 0, duration: 0, useNativeDriver: true }),
                    ])
                ])
            ).start();
        }, delay);
    }, []);

    const rotation = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['-60deg', '60deg']
    });

    return (
        <Animated.View style={[
            styles.toolWrapper,
            {
                opacity,
                transform: [
                    { translateY },
                    { translateX },
                    { rotate: rotation }
                ]
            }
        ]}>
            <ToolIcon path={path} color={color} />
        </Animated.View>
    );
};

export default function FloatingTools() {
    return (
        <View style={styles.container}>
            <AnimatedTool path={OUTLINE_PATHS.wrench} delay={200} color={Theme.colors.iconOrange} xTarget={-100} yPeak={-220} />
            <AnimatedTool path={OUTLINE_PATHS.brush} delay={400} color={Theme.colors.iconBlue} xTarget={80} yPeak={-300} />
            <AnimatedTool path={OUTLINE_PATHS.stethoscope} delay={800} color={Theme.colors.iconRed} xTarget={100} yPeak={-180} />
            <AnimatedTool path={OUTLINE_PATHS.camera} delay={1200} color={Theme.colors.iconGreen} xTarget={-80} yPeak={-240} />
            <AnimatedTool path={OUTLINE_PATHS.settings} delay={1400} color={Theme.colors.iconRed} xTarget={60} yPeak={-100} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 360,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'rgba(0,0,0,0.05)', // Debug
    },
    toolWrapper: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        marginLeft: -ICON_SIZE / 2, // Center the icon strictly
    }
});
