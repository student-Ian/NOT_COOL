import React, { useState, useEffect } from "react"
import { View, Text, Button } from "react-native"
import { fetchUserTask, fetchUserIDByUserName } from "@/firebaseAPI";


import styles from "./Records.styles"

const Records = ({ navigation }) => {
    const [Tasks, setTasks] = useState([])

    // 從 Firestore 讀取資料
    const fetchData = async () => {
        try {
            const userID = "MI51nEam3GgPqbV7WQeP";

            const TasksData = await fetchUserTask(userID); // 使用你定義的 API

            setTasks(TasksData); // 更新畫面用的 state
            console.log("✅ 使用者任務讀取成功！", TasksData);
        } catch (error) {
            console.error("❌ 任務讀取失敗：", error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>從 Firebase 讀取的資料：</Text>
            {
                Tasks.map((task, index) => (
                    <Text key={index} style={styles.taskText}>
                        {task.UserName} - {task.TaskName} - {task.EndTime?.toString()}
                    </Text>
                ))
            }
        </View>
    )
}

export default Records