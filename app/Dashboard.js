import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { fetchUserTask } from "../firebaseAPI";

import styles from "./Dashboard.styles"

const Dashboard = ({ navigation }) => {
    const [Tasks, setTasks] = useState([])

    // 從 Firestore 讀取資料
    const fetchData = async () => {
        try {
            const userID = "MI51nEam3GgPqbV7WQeP";

            const TasksData = await fetchUserTask(userID); // 使用你定義的 API

            setTasks(TasksData); // 更新畫面用的 state
            console.log("Data fetched successfully", TasksData);
        } catch (error) {
            console.error("Failed to fetch data: ", error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.dashboard}>
            <Text style={styles.dashboardHeader}>儀表板</Text>
            <View style={styles.dashboardBlock}>
                <Text style={styles.dashboardBlockHeader}>進度概要</Text>
                {
                    Tasks.map((task, index) => (
                        <View key={index} style={styles.dashboardTaskPreview}>
                            <Text style={styles.dashboardTaskPreviewTitle}>{task.TaskName} - {task.EndTime?.toString()}</Text>
                            <Text style={styles.dashboardTaskPreviewProgress}>進度</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default Dashboard