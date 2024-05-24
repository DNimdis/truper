import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { APITruper } from "../../services";
import PokemonCarousel from "../organims/PokemonCarousel";

const PokemonDetail = ({  route }) => {
  const [pokemon, setPokemon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    const { url } = route.params;
    const response = await APITruper.get(url);
    const { data } = response;
    setPokemon(data);
    setLoading(false);
  };

  if (loading) {
    return <Text style={{ color: "black" }}>{"Cargando ..."}</Text>;
  }

  const renderItemMove = (item, index) => {
    const { move } = item;
    return <Text style={styles.text} key={`move-${index}`}>{`${index + 1}.- ${move.name}`}</Text>;
  };

  const handleShowModal = () => {
    setModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 3,
              paddingVertical: 10
            }}
          >
            <Text style={[styles.title, { fontWeight: '500' }]}> {pokemon.id} </Text>
            <Text style={[styles.title, { fontWeight: '500' }]}> {pokemon.name}</Text>
          </View>
          

          <PokemonCarousel pokemon={pokemon} />
          <View style={{ display: "flex", flexDirection: "column", gap: 10, paddingVertical: 30 }}>
            <Text style={styles.text}>{`Peso: ${pokemon.weight}`}</Text>
            <Text style={styles.text}>{`Altura: ${pokemon.height}`}</Text>
          </View>

          <View style={styles.card}>
            <Text style={[styles.title, { textAlign: "center" }]}>
              Movimientos
            </Text>
            {pokemon.moves
              .slice(0, 5)
              .map((item, index) => renderItemMove(item, index))}
            {pokemon.moves.length > 5 && (
              <Button title="Más detalle" onPress={handleShowModal} />
            )}
          </View>
          <View>

          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModal(!modal);
        }}
      >
        <View style={styles.containerModal}>
          <View style={{ alignItems: "flex-end" }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(!modal)}
            >
              <Text style={styles.textHidenModal}>X</Text>
            </Pressable>
          </View>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <View>
              <Image
                src={pokemon?.sprites?.front_default}
                style={{ height: 138, width: 138, objectFit: "cover" }}
              />
              <Image
                src={pokemon?.sprites?.back_default}
                style={{ height: 128, width: 128, objectFit: "contain" }}
              />
            </View>
            <View style={{ display: "flex", gap: 10 }}>
              <ScrollView>
                <Text style={styles.title}> {pokemon.name}</Text>
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 10 }}
                >
                  <Text style={styles.text}>{`Peso: ${pokemon.weight}`}</Text>
                  <Text style={styles.text}>{`Altura: ${pokemon.height}`}</Text>
                </View>
                <Text style={styles.title}> Movimientos</Text>
                {pokemon.moves.map((item, index) =>
                  renderItemMove(item, index)
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 20,
  },
  title: {
    color: "black",
    fontSize: 26,
  },
  card: {
    
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    minHeight: 100,
    marginVertical: 10,
    borderColor: "rgba(0,0,0,0.4)",
  },
  containerModal: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //paddingLeft: 30,
    //paddingRight: 30,
    //backgroundColor: 'rgba(0,0,0,0.8)',
    backgroundColor: "white",
    paddingTop: 50,
    paddingBottom: 50,
  },
  textHidenModal: {
    color: "black",
    fontSize: 20,
    //borderWidth: 1,
    marginRight: 20,
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.4)",
  },
});

export default PokemonDetail;
