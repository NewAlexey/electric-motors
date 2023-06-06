export function getRotateAngleByCountAndIndex(
    elementsCount: number,
    index: number,
): number {
    return (360 / elementsCount) * index;
}
