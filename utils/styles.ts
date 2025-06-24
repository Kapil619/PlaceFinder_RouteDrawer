import { StyleSheet } from "react-native";

export const IndexStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginTop: 20,
    },
    inputSection: {
        padding: 20,
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputField: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        backgroundColor: "#fafafa",
    },
    inputLabel: {
        fontSize: 12,
        color: "#666",
        marginBottom: 5,
        fontWeight: "500",
    },
    inputText: {
        fontSize: 16,
        color: "#333",
    },
    searchButton: {
        backgroundColor: "#007AFF",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        marginTop: 10,
    },
    searchButtonDisabled: {
        backgroundColor: "#ccc",
    },
    searchButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    routeSection: {
        flex: 1,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
    },
    routeTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        color: "#333",
    },
    routeOption: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#fafafa",
    },
    routeOptionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 5,
    },
    routeOptionDetail: {
        fontSize: 14,
        color: "#666",
        marginBottom: 2,
    },
});

export const searchStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    searchContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fafafa",
    },
    loader: {
        marginTop: 10,
    },
    resultItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 5,
    },
    resultAddress: {
        fontSize: 14,
        color: "#666",
    },
    emptyContainer: {
        padding: 20,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
    },
});