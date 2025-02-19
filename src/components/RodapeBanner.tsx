import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : 'ca-app-pub-3650692965421934/4458625960';

export default function RodapeBanner() {
    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true, // Evita rastreamento de usuários na UE
            }}
            onAdFailedToLoad={(error) => console.error("Erro ao carregar anúncio:", error)}
        />
    );

}