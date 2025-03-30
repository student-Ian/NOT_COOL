import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { db } from "./firebaseConfig"; // 引入 Firebase 設定
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";

const App = () => {
    // 3 個輸入欄位
    const [UserName, setUserName] = useState("");
    const [TaskName, setTaskName] = useState("");
    const [EndTime, setEndTime] = useState(new Date());

    const [displayText, setDisplayText] = useState("");
    const [Tasks, setTasks] = useState([]); // 儲存 Firebase 資料
    const [showPicker, setShowPicker] = useState(false); // 控制時間選擇器顯示

    // 從 Firestore 讀取資料
    const fetchData = async () => {
        try {
            const getTaskData = await getDocs(collection(db, "Tasks"));
            const TasksData = getTaskData.docs.map(doc => ({
                id: doc.id,
                ...doc.data(), // 取得 Firestore 資料
            }));

            setTasks(TasksData); // 更新狀態
            console.log("✅ Firebase 讀取成功！", TasksData);
        } catch (error) {
            console.error("❌ Firebase 讀取失敗：", error);
        }
    };

    // 提交資料到 Firebase
    const handleSubmit = async () => {
        if (!UserName || !TaskName || !EndTime) {
            alert("請填寫所有欄位！");
            return;
        }

        const data = {
            UserName,
            TaskName,
            EndTime: Timestamp.fromDate(EndTime) // Firestore 需要 Timestamp
        };

        setDisplayText(`名字: ${UserName}，工作名稱: ${TaskName}，死線: ${EndTime}`);

        // 清空輸入框
        setUserName("");
        setTaskName("");

        try {
            await addDoc(collection(db, "Tasks"), data);
            console.log("✅ Firebase 存入成功！", data);
        } catch (error) {
            console.error("❌ Firebase 存入失敗：", error);
        }
    };

    useEffect(() => {
        fetchData(); // 組件載入時讀取一次資料
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>請輸入資料：</Text>

            <TextInput
                style={styles.input}
                placeholder="使用者名字"
                value={UserName}
                onChangeText={setUserName}
            />
            <TextInput
                style={styles.input}
                placeholder="工作名稱"
                value={TaskName}
                onChangeText={setTaskName}
            />

            {/* 時間選擇器 */}
            <Button title="選擇截止時間" onPress={() => setShowPicker(true)} />
            {showPicker && (
                <DateTimePicker
                    value={EndTime}
                    mode="datetime"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowPicker(false);
                        if (selectedDate) {
                            setEndTime(selectedDate);
                        }
                    }}
                />
            )}

            <Button title="送出" onPress={handleSubmit} />

            <Text style={styles.displayText}>{displayText}</Text>

            {/* 顯示 Firebase 讀取的資料 */}
            <Text style={styles.title}>從 Firebase 讀取的資料：</Text>
            {Tasks.map((task, index) => (
                <Text key={index} style={styles.taskText}>
                    {task.UserName} - {task.TaskName} - {task.EndTime?.toDate().toString()}
                </Text>
            ))}
        </View>
    );
};

// 樣式設定
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        width: "80%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    displayText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    taskText: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default App;

registerRootComponent(App); // **Expo 需要這行來註冊 App**