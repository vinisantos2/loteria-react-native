import { BannerAd, BannerAdSize, TestIds, useForeground } from "react-native-google-mobile-ads";
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-3650692965421934/4458625960';
export default function RodapeBanner() {

    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            onAdFailedToLoad={(error)=>console.log(error)}

        />
    )
}