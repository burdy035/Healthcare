export function randomColor() {
    let colors = [
        "#FDC600",
        "#3295EC",
        "#E81E63",
        "#7CC576",
        "#FFA01E",
        "#605CA8",
        "#4497D5"
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}
