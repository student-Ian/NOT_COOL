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

//新增meeting
export const addMeeting = async ({ TaskID, MeetingName, MeetingDetail, StartTime, Duration }) => {
    const docRef = doc(collection(db, "Meeting"));
    const MeetingID = docRef.id;

    const data = {
        MeetingID,
        TaskID,
        MeetingName,
        MeetingDetail,
        StartTime: Timestamp.fromDate(StartTime),
        Duration,
    };

    try {
        await setDoc(docRef, data);
        return { success: true, id };
    } catch (error) {
        return { success: false, error };
    }
};

//加入group
export const joinGroup = async ({ UserID, TaskID }) => {
    const docRef = doc(collection(db, "GroupRecord"));
    const State = "On";

    const data = {
        UserID,
        TaskID,
        State,
    };

    try {
        await setDoc(docRef, data);
        return { success: true, id };
    } catch (error) {
        return { success: false, error };
    }
};


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
            where("UserID", "==", userID),
            where("State", "==", "On")
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
export const fetchChildSubTask = async (parentID) => {
    try {
        const q = query(
            collection(db, "SubTask"),
            where("ParentID", "==", parentID),
            where("State", "==", "On")
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

//依據UserID獲取Group對應的Task
export const fetchTaskGroup = async (userID) => {
    try {
        // 先查詢所有屬於該 user 的 group
        const groupQuery = query(
            collection(db, "Group"),
            where("UserID", "==", userID),
            where("State", "==", "On")
        );
        const groupSnapshot = await getDocs(groupQuery);

        const groupIDs = groupSnapshot.docs.map(doc => doc.data().TaskID);

        if (groupIDs.length === 0) {
            return [];
        }

        // Task 查詢結果
        const taskResults = [];

        // Firestore 限制 where in 最多 10 個
        const chunkSize = 10;
        for (let i = 0; i < taskIDs.length; i += chunkSize) {
            const chunk = groupIDs.slice(i, i + chunkSize);

            const taskQuery = query(
                collection(db, "Task"),
                where("TaskID", "in", chunk)
            );
            const taskSnapshot = await getDocs(taskQuery);

            const tasks = taskSnapshot.docs.map(doc => {
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

            taskResults.push(...tasks);
        }

        return meetingResults;
    } catch (error) {
        console.error("讀取會議失敗：", error);
        return [];
    }
};

//依據TaskID獲取GroupMember
export const fetchGroupMember = async (taskID) => {
    try {
        // 先查詢所有屬於該 task 的 user
        const userQuery = query(
            collection(db, "GroupRecord"),
            where("TaskID", "==", taskID),
            where("State", "==", "On")
        );
        const userSnapshot = await getDocs(userQuery);

        const userIDs = userSnapshot.docs.map(doc => doc.data().UserID);

        if (userIDs.length === 0) {
            return []; // 沒有任務，就不查 meeting
        }

        // Meeting 查詢結果
        const usernameResults = [];

        // Firestore 限制 where in 最多 10 個
        const chunkSize = 10;
        for (let i = 0; i < userIDs.length; i += chunkSize) {
            const chunk = userIDs.slice(i, i + chunkSize);

            const usernameQuery = query(
                collection(db, "User"),
                where("UserID", "in", chunk)
            );
            const usernameSnapshot = await getDocs(usernameQuery);

            const usernames = usernameSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    UserID: data.UserID,
                    UserName: data.UserName,
                };
            });

            usernameResults.push(...usernames);
        }

        return meetingResults;
    } catch (error) {
        console.error("讀取會議失敗：", error);
        return [];
    }
};



//依據UserID獲取meeting
export const fetchUserMeeting = async (userID) => {
    try {
        // 先查詢所有屬於該 user 的 task
        const taskQuery = query(
            collection(db, "Task"),
            where("UserID", "==", userID)
        );
        const taskSnapshot = await getDocs(taskQuery);

        const taskIDs = taskSnapshot.docs.map(doc => doc.data().TaskID);

        if (taskIDs.length === 0) {
            return []; // 沒有任務，就不查 meeting
        }

        // Meeting 查詢結果
        const meetingResults = [];

        // Firestore 限制 where in 最多 10 個
        const chunkSize = 10;
        for (let i = 0; i < taskIDs.length; i += chunkSize) {
            const chunk = taskIDs.slice(i, i + chunkSize);

            const meetingQuery = query(
                collection(db, "Meeting"),
                where("TaskID", "in", chunk)
            );
            const meetingSnapshot = await getDocs(meetingQuery);

            const meetings = meetingSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    TaskID: data.TaskID,
                    MeetingID: data.MeetingID,
                    MeetingName: data.MeetingName,
                    MeetingDetail: data.MeetingDetail,
                    StartTime: data.StartTime.toDate(),
                    Duration: data.Duration,
                };
            });

            meetingResults.push(...meetings);
        }

        return meetingResults;
    } catch (error) {
        console.error("讀取會議失敗：", error);
        return [];
    }
};