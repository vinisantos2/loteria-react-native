import { StyleSheet, View } from "react-native";
import ViewText from "../components/ViewText";
import ItemEstatistica from "../itemsView/ItemEstatistica";
import { STYLES } from "../Style";
import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { axiosBusca, converterString, estatistica, gerarKey, retornarDezenas } from "../utils/ultil";
import { URL_BASE } from "../constants/Constants";
import { Dropdown } from "../components/Dropdown";
import Layout from "../components/Layout";

export default function TelaEstatistica({ }) {

    const [arrayJogos, setArrayJogos] = useState([])
    const [arrayDezenas, setArrayDezenas] = useState([])
    const [arrayEstatistica, setArrayEstatistica] = useState([])
    const focused = useIsFocused();
    const arrayFiltro =
        [
            { label: 'todos', value: '*' },
            { label: '100', value: 100 },
            { label: '50', value: 50 },
            { label: '10', value: 10 },
        ]
    React.useEffect(() => {
        buscarJogos()
    }, [focused])

    async function buscarJogos() {

        const array = await axiosBusca(URL_BASE + "lotofacil");
        const arrayDezenas = await retornarDezenas(array)
        const arrayEs = Array.from({ length: 25 }).map((_, index) => {
            return { dezena: converterString(index, false), contador: 0 }
        })
        setArrayEstatistica(estatistica(arrayDezenas, arrayEs))
        arrayEs.sort(compare)
        arrayEs.reverse()
        setArrayDezenas(arrayDezenas)
        setArrayJogos(array)



        // if (array.length < 1) {
        //     setErroServer(true)
        // } else {
        //     setErroServer(false)
        // }
        // setCarregando(false)
    }

    function compare(a, b) {

        const v1 = a.contador
        const v2 = b.contador
        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
        return 0;
    }

    function filtro() {

    }


    return (
        <Layout style={styles.estatistica}>
            <View>
                <Dropdown valor={"Filtro"} click={() => filtro()} array={arrayFiltro} />
            </View>


            {arrayEstatistica.length > 1 ? arrayEstatistica.map(item => {
                return (
                    <ItemEstatistica key={gerarKey()} obj={item} total={arrayDezenas.length} cor={"#000"} />
                )
            }) : null}
        </Layout>
    )
}

const styles = StyleSheet.create({
    estatistica: {


    }

})