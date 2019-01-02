const styles = {
    quickStatistic: {
        // borderStyle: "solid",
        // borderWidth: 0.5,
        padding: 0,
        margin: 0,
        marginTop: 15,
        width: "100%"
    },
    statisticColumn: {
        // borderStyle: "solid",
        // borderWidth: 0.5,
        display: "flex",
        flexDirection: "row",
        margin: 0,
        padding: 0,
        justifyContent: "space-between"
    },
    statisticContainer: {
        backgroundColor: "#fff",
        width: "50%"
    },
    statisticBlock: {
        display: "flex",
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20
    },
    statisticLeft: {
        width: "50%",
        borderRightStyle: "solid",
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    statisticRight: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    statisticIcon: {
        width: 50,
        height: 50
    },
    noticeCircle: {
        display: "block",
        position: "absolute",
        top: 6,
        left: "-6px",
        width: 10,
        height: 10,
        borderRadius: 6,
        borderStyle: `solid`,
        borderWidth: 2,
        background: "#fff"
    }
};

export default styles;
