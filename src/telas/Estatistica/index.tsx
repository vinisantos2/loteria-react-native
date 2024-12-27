import { Platform, StatusBar, StyleSheet, View } from "react-native";
import TextView from "../../components/TextView";
import ItemEstatistica from "../../itemsView/ItemEstatistica";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { converterString, estatistica, gerarKey } from "../../utils/ultil";
import { Dropdown } from "../../components/Dropdown";
import Layout from "../../components/Layout";
import { COR_LEGENDA } from "../../constants/Cores";
import { Estatistica } from "../../model/Estatistica";
import { JogoSorteado } from '../../model/jogoSorteado';
import LegendaView from "../../components/LegendaView";
import { AdEventType, InterstitialAd, TestIds } from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3650692965421934/7534864377';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

export default function TelaEstatistica({ route }) {

    const { nomeJogo } = route.params ? route.params : "";
    const { dezenas } = route.params ? route.params : "";
    const { cor } = route.params ? route.params : "";
    const { arrayJogosSorteados } = route.params ? route.params : "";
    const [arrayViewEstatistica, setArrayViewEstatistica] = useState([])
    const [total, setTotal] = useState(0)
    const focused = useIsFocused();
    const label = "Últimos "


    const [loaded, setLoaded] = useState(false);
    const arrayFiltro =
        [
            { label: 'todos', value: '*' },
            { label: label + '200', value: 200 },
            { label: label + '100', value: 100 },
            { label: label + '50', value: 50 },
            { label: label + '25', value: 25 },
            { label: label + '10', value: 10 },
            { label: label + '5', value: 5 },
        ]




    React.useEffect(() => {
        buscarJogos()

        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
            if (Platform.OS === 'ios') {
                // Prevent the close button from being unreachable by hiding the status bar on iOS
                StatusBar.setHidden(true)
            }
        });

        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            if (Platform.OS === 'ios') {
                StatusBar.setHidden(false)
            }
        });

        // Start loading the interstitial straight away
        interstitial.load();


        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeOpened();
            unsubscribeClosed();
        };
    }, [focused])

    function mostrarArray(arrayJogosSorteados: Array<JogoSorteado>, arrayEs: Array<Estatistica>, total) {

        const array = estatistica(arrayJogosSorteados, arrayEs)
        array.sort(compare)
        array.reverse()
        setArrayViewEstatistica(array)
        setTotal(total)

    }

    async function buscarJogos() {

        const arrayEs: Array<Estatistica> = Array.from({ length: dezenas }).map((_, index) => {
            return { dezena: converterString(index, false), contador: 0 }
        })

        mostrarArray(arrayJogosSorteados, arrayEs, arrayJogosSorteados.length)
    }

    function compare(a, b) {
        const v1 = a.contador
        const v2 = b.contador
        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
        return 0;
    }

    async function filtro(e) {

        let arrayFiltroJogos = []
        const arrayEs = Array.from({ length: dezenas }).map((_, index) => {
            return { dezena: converterString(index, false), contador: 0 }
        })
        if (e === "*") {
            mostrarArray(arrayJogosSorteados, arrayEs, arrayJogosSorteados.length)
            return
        }

        arrayJogosSorteados.map((item, i) => {
            if (i < e) arrayFiltroJogos.push(item)
        })

        mostrarArray(arrayFiltroJogos, arrayEs, arrayFiltroJogos.length)
    }

    // No advert ready to show yet
    if (loaded) {
        interstitial.show();
        setLoaded(false)
    }


    return (
        <>


            <Layout>

                <View style={styles.content}>
                    <LegendaView cor={cor} nomeJogo={nomeJogo} />
                    <View>
                        <Dropdown click={(e) => filtro(e)} placeHolder={"Selecione quantidade de jogos"} array={arrayFiltro} />
                    </View>

                    <View style={styles.viewLegenda}>
                        <View style={styles.legenda}>
                            <TextView cor="#000" fontSize={20} value={"Dezenas"} />
                        </View>

                        <View style={styles.legenda}>
                            <TextView cor="#000" fontSize={20} value={"Vezes"} />
                        </View>
                        <View style={styles.legenda}>
                            <TextView cor="#000" fontSize={20} value={"%"} />
                        </View>
                        {/* <View style={styles.legenda}>
                        <ViewText fontSize={20} value={total} />
                    </View> */}
                    </View>


                    {arrayViewEstatistica.length > 1 ? arrayViewEstatistica.map(item => {
                        return (
                            <ItemEstatistica key={gerarKey()} obj={item} total={total} />
                        )
                    }) : null}

                </View>

            </Layout>

        </>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "#FFF",

    },
    legenda: {
        backgroundColor: COR_LEGENDA,
        padding: 5,
        width: "33.33%",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"

    },
    titulo: {
        padding: 15,
        alignItems: "center"

    },
    viewLegenda: {
        flexDirection: "row"
    }

})