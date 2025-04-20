import { StyleSheet } from "react-native";

export default StyleSheet.create({
    dashboard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
        paddingTop: 80,
    },
    dashboardHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    dashboardBlock: {
        backgroundColor: "#F0EFF6",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    dashboardBlockHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    dashboardTaskPreview: {
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    dashboardTaskPreviewTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    dashboardTaskPreviewProgress: {
        fontSize: 14,
    },
});