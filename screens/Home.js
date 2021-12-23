import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView } from "react-native";
import { Divider } from "react-native-elements";

import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import BottomTabs from "../components/home/BottomTabs";
import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems";



const YELP_API_KEY =
  "fnZYccHfkl1b5NBs1MCJ8SAaS4tQ3w6eKB6xtUGjFBEnTXJeYAqR6qlmmzhn5nrEmmLVnNjaHZ6jXdMeWeAAlCqov5m50T8jd02hV9siXbw4x2kKzIiN3DbOGM7CYXYx";

export default function Home() {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("LosAngeles");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  useEffect(() => {
    getRestaurantFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}
