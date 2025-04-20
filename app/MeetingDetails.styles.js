import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mDetails: {
        backgroundColor: "#F0EFF6",
        padding: 20,
        paddingTop: 60,
    },
    mDetailsCancel: {
        alignSelf: "flex-end",
        backgroundColor: "transparent",
        padding: 10,
    },
    mDetailsCancelText: {
        color: "#007AFF",
    },
    mDetailsHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    mDetailsSectionName: {
        fontSize: 12,
        color: "#888",
        marginBottom: 10,
    },
    mDetailsSection: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 20,
        marginBottom: 40,
    },
    horizontalLine: {
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
        marginVertical: 15,
    },
    mDetailsSectionInput: {
        marginVertical: -10,
    },
    mDetailsTime: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    mDetailsTimeBtn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    mDetailsDecreaseBtn: {
        backgroundColor: "#E5E5E5",
        fontWeight: "bold",
        fontSize: 20,
        color: "#000",
        paddingVertical: 3,
        paddingHorizontal: 15,
        paddingLeft: 17,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightWidth: 1,
        marginVertical: -3,
    },
    mDetailsIncreaseBtn: {
        backgroundColor: "#E5E5E5",
        fontWeight: "bold",
        fontSize: 20,
        color: "#000",
        paddingVertical: 3,
        paddingHorizontal: 14,
        paddingRight: 13,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginVertical: -3,
    },
    mDetailsDropdown: {
        color: "#888",
        borderRadius: 8,
        padding: 10,
    },
    mDetailsSave: {
        backgroundColor: "#007AFF",
        color: "#FFFFFF",
        padding: 10,
        textAlign: "center",
        borderRadius: 8,
        fontSize: 18,
    },
})