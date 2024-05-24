import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { APITruper } from "../../services";

const PokemonItem = ({ url }) => {
  const [pokemon, setPokemon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    const response = await APITruper.get(url);
    const { data } = response;
    setPokemon(data);
    setLoading(false);
  };

  if (loading) {
    return <Text style={{ color: "white" }}>{"Cargando ..."}</Text>;
  }

  return (
    <>
      <View>
        <Image
          src={pokemon?.sprites?.front_default}
          style={{ height: 64, width: 64 }}
        />
      </View>
      <View>
        <Text style={{ color: "white", fontSize: 18 }}>{pokemon.id}</Text>
        <Text style={{ color: "white", fontSize: 18 }}>{pokemon.name}</Text>
      </View>
      <View>
        <Text
          style={{ color: "white", fontSize: 18 }}
        >{` Peso: ${pokemon.weight}`}</Text>
      </View>
    </>
  );
};

export default PokemonItem;
