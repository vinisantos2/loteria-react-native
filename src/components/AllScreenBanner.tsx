import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3650692965421934/7534864377';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

export default function AllScreenBanner() {
    const [loaded, setLoaded] = useState(false);
    const [mostrou, setMostrou] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        let unsubscribeLoaded;
        let unsubscribeOpened;
        let unsubscribeClosed;

        if (isFocused && !mostrou) {
            unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
                setLoaded(true);
            });

            unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
                if (Platform.OS === 'ios') {
                    StatusBar.setHidden(true);
                }
            });

            unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
                if (Platform.OS === 'ios') {
                    StatusBar.setHidden(false);
                }
                setMostrou(false); // Permite que o anúncio seja exibido novamente no futuro
            });

            interstitial.load();
        }

        return () => {
            if (unsubscribeLoaded) unsubscribeLoaded();
            if (unsubscribeOpened) unsubscribeOpened();
            if (unsubscribeClosed) unsubscribeClosed();
        };
    }, [isFocused]);

    useEffect(() => {
        if (loaded && isFocused && !mostrou) {
            interstitial.show();
            setLoaded(false);
            setMostrou(true);
        }
    }, [loaded, isFocused, mostrou]);

    return <View />;
}
