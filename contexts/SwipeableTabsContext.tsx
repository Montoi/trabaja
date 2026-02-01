import React, { createContext, useContext, useState, useRef } from 'react';
import PagerView from 'react-native-pager-view';

interface SwipeableTabsContextType {
    currentPage: number;
    setPage: (page: number) => void;
    pagerRef: React.RefObject<PagerView>;
}

const SwipeableTabsContext = createContext<SwipeableTabsContextType | undefined>(undefined);

export function SwipeableTabsProvider({ children }: { children: React.ReactNode }) {
    const [currentPage, setCurrentPage] = useState(0);
    const pagerRef = useRef<PagerView>(null);

    const setPage = (page: number) => {
        pagerRef.current?.setPage(page);
        setCurrentPage(page);
    };

    return (
        <SwipeableTabsContext.Provider value={{ currentPage, setPage, pagerRef }}>
            {children}
        </SwipeableTabsContext.Provider>
    );
}

export function useSwipeableTabs() {
    const context = useContext(SwipeableTabsContext);
    if (!context) {
        throw new Error('useSwipeableTabs must be used within SwipeableTabsProvider');
    }
    return context;
}
