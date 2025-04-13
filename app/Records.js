import React, { useState, useEffect } from "react"
import { View, Text, Button } from "react-native"
import { db } from "@/firebaseConfig"
import { collection, getDocs } from "firebase/firestore"

import styles from "./Records.styles"

const Records = ({ navigation }) => {
    const [Tasks, setTasks] = useState([])

    const fetchData = async () => {
        try {
            const getTaskData = await getDocs(collection(db, "Tasks"))
            const TasksData = getTaskData.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))

            setTasks(TasksData)
            console.log("Firebase 讀取成功！", TasksData)
        } catch (error) {
            console.error("Firebase 讀取失敗：", error)
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
                        {task.UserName} - {task.TaskName} - {task.EndTime?.toDate().toString()}
                    </Text>
                ))
            }
            <Button title="回到首頁" onPress={() => navigation.navigate("Home")} />
        </View>
    )
}

export default Records