import { StyleSheet } from "react-native";

export default StyleSheet.create({
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