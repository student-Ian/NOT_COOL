import { registerRootComponent } from "expo";
import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { db, addDoc, collection } from "./firebaseConfig"; // 引入 Firestore 相關函式

const App = () => {
  const addDataToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "testCollection"), {
        name: "Test User",
        timestamp: new Date().toISOString()
      });
      console.log("✅ 文件已寫入 ID: ", docRef.id);
    } catch (error) {
      console.error("❌ 寫入失敗：", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Firebase 連接成功！</Text>
      <Button title="新增資料到 Firestore" onPress={addDataToFirestore} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default App;
registerRootComponent(App); // **Expo 需要這行來註冊 App**
