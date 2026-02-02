import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function ReferralsScreen() {
    const insets = useSafeAreaInsets();
    const PRIMARY_COLOR = '#FF4B63';

    // Gauge configuration: 90% arc, gap at bottom
    // Circumference = 2 * PI * 120 = 240 * PI
    // Arc Length = 90% of Circumference
    // Gap = 10%
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const arcLength = circumference * 0.9;
    // Progress: User requested to fill the gauge completely (100% of the 90% arc)
    const progressLength = arcLength;
    // To center the gap at the bottom (rotation 90 puts 0 at bottom):
    // We want to skip the first 5% and last 5% relative to the bottom.
    // Standard stroke starts at 0. We shift it by -5% (clockwise) to start at the 5% mark.
    const strokeDashoffset = -1 * circumference * 0.05;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style="dark" />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.iconButton}>
                        <MaterialIcons name="nights-stay" size={24} color={PRIMARY_COLOR} />
                    </View>
                    <Text style={styles.headerTitle}>Referrals</Text>
                    <Pressable style={styles.iconButtonGhost}>
                        <MaterialIcons name="more-vert" size={24} color="#333" />
                    </Pressable>
                </View>

                {/* Circular Gauge */}
                <View style={styles.card}>
                    <View style={styles.timerContainer}>
                        <View style={styles.circularTimer}>
                            {/* SVG Circle Progress */}
                            <Svg width={280} height={280} style={styles.svg}>
                                {/* Background Arc (90% = 324 degrees, gap at bottom) */}
                                <Circle
                                    cx="140"
                                    cy="140"
                                    r={radius}
                                    stroke="#F3F4F6"
                                    strokeWidth="24"
                                    fill="none"
                                    strokeDasharray={`${arcLength} ${circumference}`}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    rotation="90"
                                    origin="140, 140"
                                />
                                {/* Active Progress Arc */}
                                <Circle
                                    cx="140"
                                    cy="140"
                                    r={radius}
                                    stroke={PRIMARY_COLOR}
                                    strokeWidth="24"
                                    fill="none"
                                    strokeDasharray={`${progressLength} ${circumference}`}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    rotation="90"
                                    origin="140, 140"
                                />
                            </Svg>

                            {/* Center Content */}
                            <View style={styles.timerCenter}>
                                <Text style={styles.timerSubtitle}>TOTAL REFERRALS</Text>
                                <Text style={styles.timerMain}>12</Text>
                                <Text style={styles.timerStatus}>Keep going</Text>
                                <Text style={styles.timerExtra}>+ 2 this week</Text>

                                <View style={styles.targetBadge}>
                                    <Text style={styles.targetText}>Target: 20</Text>
                                    <MaterialIcons name="edit" size={14} color="#0F172A" />
                                </View>
                            </View>

                            {/* Corner Icons */}
                            <View style={[styles.iconCircle, styles.iconTopLeft, { borderColor: '#FFF' }]}>
                                <MaterialIcons name="local-fire-department" size={20} color="#F97316" />
                            </View>
                            <View style={[styles.iconCircle, styles.iconTopRight, { borderColor: '#FFF' }]}>
                                <MaterialIcons name="local-fire-department" size={20} color="#FB923C" />
                            </View>
                            <View style={[styles.iconCircle, styles.iconBottomLeft, { borderColor: '#FFF' }]}>
                                <MaterialIcons name="water-drop" size={20} color={PRIMARY_COLOR} />
                            </View>
                            <View style={[styles.iconCircle, styles.iconBottomRight, { borderColor: '#FFF' }]}>
                                <MaterialIcons name="bolt" size={20} color="#EAB308" />
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionSection}>
                        <Pressable style={styles.roundButton}>
                            <MaterialIcons name="sentiment-satisfied-alt" size={24} color="#94A3B8" />
                        </Pressable>
                        <Pressable style={[styles.mainButton, { borderColor: PRIMARY_COLOR }]}>
                            <Text style={[styles.mainButtonText, { color: PRIMARY_COLOR }]}>Invite Friends</Text>
                        </Pressable>
                        <Pressable style={styles.roundButton}>
                            <MaterialIcons name="share" size={24} color="#94A3B8" />
                        </Pressable>
                    </View>

                    {/* Footer Stats */}
                    <View style={styles.footerStats}>
                        <View style={styles.statItem}>
                            <View style={styles.statHeader}>
                                <Text style={styles.statTime}>Today, 06:00</Text>
                                <MaterialIcons name="edit" size={14} color="#94A3B8" />
                            </View>
                            <Text style={styles.statLabel}>Start Invite</Text>
                        </View>
                        <View style={[styles.statItem, styles.statBorder]}>
                            <View style={styles.statHeader}>
                                <Text style={styles.statTime}>Today, 22:00</Text>
                            </View>
                            <Text style={styles.statLabel}>End Invite</Text>
                        </View>
                    </View>
                </View>

                {/* Invites Tracker */}
                <View style={styles.card}>
                    <View style={styles.waterHeader}>
                        <Text style={styles.waterTitle}>Invites Available</Text>
                        <MaterialIcons name="arrow-forward" size={24} color="#60A5FA" />
                    </View>

                    <View style={styles.waterContent}>
                        <View style={styles.waterLeft}>
                            <View style={styles.waterAmountRow}>
                                <Text style={styles.waterAmount}>5</Text>
                                <Text style={styles.waterUnit}>left</Text>
                            </View>
                            <Text style={styles.waterSubText}>/ 10 daily limit</Text>
                            <Text style={styles.waterProgress}>50% completed</Text>
                        </View>

                        <View style={styles.waterRight}>
                            {/* SVG Water Drop with Gradient */}
                            <Svg width={60} height={80} viewBox="0 0 100 130">
                                <Defs>
                                    <LinearGradient id="water_grad" x1="50" y1="0" x2="50" y2="120" gradientUnits="userSpaceOnUse">
                                        <Stop offset="0" stopColor="#70BFFF" />
                                        <Stop offset="1" stopColor="#007AFF" />
                                    </LinearGradient>
                                </Defs>
                                <Path
                                    d="M50 0C50 0 10 44.1828 10 80C10 102.091 27.9086 120 50 120C72.0914 120 90 102.091 90 80C90 44.1828 50 0 50 0Z"
                                    fill="url(#water_grad)"
                                />
                            </Svg>

                            <Pressable style={styles.addButton}>
                                <MaterialIcons name="add" size={24} color="#60A5FA" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 75, 99, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButtonGhost: {
        padding: 8,
        borderRadius: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    timerContainer: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 32,
    },
    circularTimer: {
        width: 280,
        height: 280,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    svg: {
        position: 'absolute',
    },
    timerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerSubtitle: {
        fontSize: 10,
        fontWeight: '600',
        color: '#94A3B8',
        letterSpacing: 2,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    timerMain: {
        fontSize: 48,
        fontWeight: '700',
        color: '#0F172A',
        letterSpacing: -1,
        fontVariant: ['tabular-nums'],
    },
    timerStatus: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 4,
    },
    timerExtra: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 2,
    },
    targetBadge: {
        marginTop: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    targetText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#0F172A',
    },
    iconCircle: {
        position: 'absolute',
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 2,
    },
    iconTopLeft: { top: 30, left: 30 },
    iconTopRight: { top: 30, right: 30 },
    iconBottomLeft: { bottom: 30, left: 30 },
    iconBottomRight: { bottom: 30, right: 30 },
    actionSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 32,
    },
    roundButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainButton: {
        flex: 1,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainButtonText: {
        fontSize: 16,
        fontWeight: '700',
    },
    footerStats: {
        flexDirection: 'row',
        borderTopWidth: 0,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statBorder: {
        borderLeftWidth: 1,
        borderLeftColor: '#F1F5F9',
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    statTime: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    statLabel: {
        fontSize: 11,
        color: '#94A3B8',
    },
    waterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    waterTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    waterContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    waterLeft: {
        justifyContent: 'center',
    },
    waterAmountRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    waterAmount: {
        fontSize: 30,
        fontWeight: '700',
        color: '#0F172A',
    },
    waterUnit: {
        fontSize: 14,
        color: '#94A3B8',
    },
    waterSubText: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 4,
    },
    waterProgress: {
        fontSize: 12,
        fontWeight: '600',
        color: '#3B82F6',
        marginTop: 4,
    },
    waterRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#BFDBFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
