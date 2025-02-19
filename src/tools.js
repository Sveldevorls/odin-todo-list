export const newElement = function(type, ...attributesArr) {
    let thisElement = document.createElement(type);
    if (attributesArr) {
        for (let [attribute, value] of attributesArr) {
            thisElement[attribute] = value;
        }
    }
    return thisElement
}

export const formatDueDateString = (date) => {
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    const dates = date.split("-");
    return `Due ${monthNames[dates[1] - 1]} ${dates[2]}, ${dates[0]}`
}