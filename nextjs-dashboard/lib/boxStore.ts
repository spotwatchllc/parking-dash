export type Box = {
    box_id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

// variable to hold the latest array of boxes
let latestBoxes: Box[] = []

export function setBoxes(boxes: Box[]) {
    latestBoxes = boxes;
};

export function getBoxes() {
    return latestBoxes;
};