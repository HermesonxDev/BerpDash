const baseColors = ['#1A73E8', '#e44c4e', '#4e41f0', '#f7931b'];

const getRandomColorFromHexPalette = () => {

    const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
    const baseRGB = parseInt(baseColor.slice(1), 16);

    const variation = () => Math.floor(Math.random() * 100) - 50;

    const r = Math.min(
        255, Math.max(0, (baseRGB >> 16) + variation())
    ).toString(16).padStart(2, '0');

    const g = Math.min(
        255, Math.max(0, ((baseRGB >> 8) & 0xff) + variation())
    ).toString(16).padStart(2, '0');

    const b = Math.min(
        255, Math.max(0, (baseRGB & 0xff) + variation())
    ).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
};

export default getRandomColorFromHexPalette