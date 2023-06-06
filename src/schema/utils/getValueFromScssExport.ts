type PropsType = {
    scssExportString: string;
    cssStyleName: string;
    cssStyleLength: number;
};

const COLON_LENGTH = 1;

export function getValueFromScssExport({
    scssExportString,
    cssStyleName,
    cssStyleLength,
}: PropsType): number {
    const stringWithoutSpaces = scssExportString.split(" ").join("");

    const substringStartIndex = stringWithoutSpaces.indexOf(cssStyleName);

    if (substringStartIndex === -1) {
        throw Error(
            `Check scssExportString - ${stringWithoutSpaces}, cssStyleName - ${cssStyleName}.`,
        );
    }
    const substringEndIndex = substringStartIndex + cssStyleName.length;
    const styleValue = stringWithoutSpaces.slice(
        substringEndIndex + COLON_LENGTH,
        substringEndIndex + COLON_LENGTH + cssStyleLength,
    );

    return Number(styleValue);
}
