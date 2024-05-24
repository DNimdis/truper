import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";

const { width: screenWidth } = Dimensions.get("window");

const PokemonCarousel = ({ pokemon }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);
  const maxDots = 15;

  useEffect(() => {
    const sprites = pokemon?.sprites;    
    const imageUrls = extractImageUrls(sprites);
    setData(imageUrls);    

  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  const renderDots = () => {
    const totalImages = data.length;
    const dots = [];

    for (let i = 0; i < Math.min(totalImages, maxDots); i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            activeIndex === i && styles.activeDot,
            activeIndex >= maxDots && i === maxDots - 1 && styles.activeDot // Highlight last dot if index is greater than maxDots
          ]}
        />
      );
    }

    return (
      <View style={styles.dotsContainer}>
        {dots}
        {activeIndex >= maxDots && <View style={styles.activeDot} />}
      </View>
    );
  };

  const extractImageUrls = (sprites) => {
    const urls = [];

    const traverse = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "string" && obj[key].startsWith("http")) {
          urls.push(obj[key]);
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          traverse(obj[key]);
        }
      }
    };

    traverse(sprites);
    return urls;
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.8}
        layout={"default"}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 200,
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#888",
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});

export default PokemonCarousel;
