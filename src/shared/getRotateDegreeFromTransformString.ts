export function getRotateDegreeFromTransformString(
    transformString: string,
): number {
    const firstSplit = transformString.split("deg");
    const secondSplit = firstSplit[0].split("(");

    const degree = Number(secondSplit[1]);

    if (Number.isNaN(degree)) {
        throw Error(`Invalid degree in string - ${transformString}`);
    }

    return degree;
}
