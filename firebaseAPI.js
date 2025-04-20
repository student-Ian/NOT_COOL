import { db } from "./firebaseConfig";
import { doc, collection, setDoc, getDocs, query, where, Timestamp, serverTimestamp } from "firebase/firestore";


//新增user（暫時用）

export const addUser = async ({ UserName }) => {
    const docRef = doc(collection(db, "User"));
    const UserID = docRef.id;

    const data = {
        UserID,
        UserName,
    };

    try {
        await setDoc(docRef, data);
        return { success: true, id };
    } catch (error) {
        return { success: false, error };
    }
};

//新增task
export const addTask = async ({ UserID, TaskName, TaskDetail, EndTime }) => {
    const docRef = doc(collection(db, "Task"));
    const TaskID = docRef.id;
    const State = "On";

    const data = {
        TaskID,
        UserID,
        TaskName,
        TaskDetail,
        CreatedTime: serverTimestamp(),
        EndTime: Timestamp.fromDate(EndTime),
        State,
    };

    try {
        await setDoc(docRef, data);
        return { success: true, id };
    } catch (error) {
        return { success: false, error };
    }
};


//新增subtask
export const addSubTask = async ({ TopTaskID, ParentID, SubTaskName, SubTaskDetail, CreatedTime, EndTime }) => {
    const docRef = doc(collection(db, "SubTask"));
    const SubTaskID = docRef.id;
    const State = "On";

    const data = {
        SubTaskID,
        TopTaskID,
        ParentID,
        SubTaskName,
        SubTaskDetail,
        CreatedTime: serverTimestamp(),
        EndTime: Timestamp.fromDate(EndTime),
        State,
    };

    try {
        await setDoc(docRef, data);
        return { success: true, id };
    } catch (error) {
        return { success: false, error };
    }
};

//新增會議...


//用username找id
export const fetchUserIDByUserName = async (userName) => {
    try {
        const q = query(
            collection(db, "User"),
            where("UserName", "==", userName)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return { success: false, message: "找不到該使用者" };
        }

        // 假設 UserName 唯一，只取第一筆
        const userData = snapshot.docs[0].data();
        return {
            success: true,
            UserID: userData.UserID,
        };
    } catch (error) {
        console.error("查詢 UserID 失敗：", error);
        return { success: false, error };
    }
};

//依據UserID獲取task
export const fetchUserTask = async (userID) => {
    try {
        const q = query(
            collection(db, "Task"),
            where("UserID", "==", userID)
        );

        const snapshot = await getDocs(q);
        const taskList = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                TaskID: data.TaskID,
                UserID: data.UserID,
                TaskName: data.TaskName,
                TaskDetail: data.TaskDetail,
                CreatedTime: data.CreatedTime.toDate(),
                EndTime: data.EndTime.toDate(),
                State: data.State,
            };
        });
        return taskList;
    } catch (error) {
        console.error("讀取任務失敗：", error);
        return [];
    }
};

//依據TaskID/SubTaskID獲取ChildSubTask
export const fetchChildSubTask = async (taskID) => {
    try {
        const q = query(
            collection(db, "SubTask"),
            where("ParentID", "==", taskID)
        );

        const snapshot = await getDocs(q);
        const taskList = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                SubTaskID: data.SubTaskID,
                ParentID: data.ParentID,
                TopTaskID: data.TopTaskID,
                SubTaskName: data.SubTaskName,
                SubTaskDetail: data.SubTaskDetail,
                CreatedTime: data.CreatedTime.toDate(),
                EndTime: data.EndTime.toDate(),
                State: data.State,
            };
        });
        return taskList;
    } catch (error) {
        console.error("讀取任務失敗：", error);
        return [];
    }
};