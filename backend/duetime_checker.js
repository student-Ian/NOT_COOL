import cron from 'node-cron';
import { db } from "./firebaseConfig.js";
import { collection, getDocs } from 'firebase/firestore';

async function getEndTimes(untilDueSec = 3600) {
    const tasksCol = collection(db, 'Task');
    const taskSnapshot = await getDocs(tasksCol);

    const currentTime = Math.floor(Date.now() / 1000);

    const endTimes = taskSnapshot.docs.map(doc => {
        const docData = doc.data();
        const endTimeSeconds = docData.EndTime?.seconds || Math.floor(docData.EndTime / 1000); // Convert to seconds if needed
    
        return {
            ...docData, // Keep original data
            UntilDue: endTimeSeconds - currentTime // Time difference in seconds
        };

    })
    .filter(task => (task.UntilDue < untilDueSec && 0 < task.UntilDue));

    return endTimes;
  }

getEndTimes();

// Run every minute
cron.schedule('* * * * *', async () => {
  console.log('Checking for tasks due within 1 hour...');

  const duingTasks = await getEndTimes();
  console.log(duingTasks);

  for (const task of duingTasks) {
    const token = await getUserTokenByUserID(task.UserID);
    console.log(token);
    console.log(task);
    if (token) {
      sendPushNotification(token, task.TaskName, `Task "${task.TaskName}" is due soon!`);
    }
  }

});

async function sendPushNotification(token, title, body) {
  const message = {
    token,
    notification: {
      title,
      body,
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('✅ Notification sent successfully:', response);
  } catch (error) {
    console.error('❌ Error sending notification:', error);
  }
}
