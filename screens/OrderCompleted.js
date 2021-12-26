import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const querySnapshot = getDocs(collection(db, "orders"));

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState();
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    console.log("ORDUSER", querySnapshot.docs)
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 10 }}
          source={require("../assets/animations/check.json")}
          autoPlay
          speed={1}
        />
        <Text>
          Your order at {restaurantName} has been placed for ${totalUSD} 🚀
        </Text>
        <LottieView
          style={{ height: 200, alignSelf: "center" }}
          source={require("../assets/animations/cooking2.json")}
          autoPlay
          speed={0.5}
        />
      </View>
    </SafeAreaView>
  );
}
