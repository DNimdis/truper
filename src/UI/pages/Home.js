import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { APITruper } from "../../services";
import PokemonItem from "../organims/PokemonItem";

const Home = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    loading: false,
    data: [],
    error: null,
    text: "",
  });

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await APITruper.get("/pokemon");
      setState((prev) => ({
        ...prev,
        loading: false,
        data: response.data.results,
      }));
    } catch (error) {
      console.log("🚀 ~ fetchPokemon ~ error:", error);
    }
  };

  const handleSearch = (text) => {
    setState((prev) => ({ ...prev, text: text }));
  };

  const handleDetail = (url) => {
    navigation.navigate("Pokemon", { url });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 30,
            }}
          >
            <TextInput
              style={{
                color: "black",
                backgroundColor: "white",
                width: "100%",
                height: 40,
              }}
              onChangeText={handleSearch}
            />
            {state.loading && (
              <Text style={{ color: "white" }}>{"Cargando ..."}</Text>
            )}
            {!state.loading && (
              <View style={{ paddingTop: 30, width: '100%' }}>
                <FlatList
                  data={state.data.filter((item) => {
                    const itemData = item.name.toUpperCase();
                    const textData = state.text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                  })}
                  keyExtractor={(item) => item.name}
                  ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleDetail(item.url)} key={item.id}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          borderWidth: 2,
                          borderColor: "white",
                          width: '100%',
                          padding: 5,
                          borderRadius: 10,
                                                    
                        }}
                      >
                        <PokemonItem url={item.url} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default Home;
