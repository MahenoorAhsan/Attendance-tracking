export const getImageUrl = (image: string) => {
    return new URL(`../../assets/${image}`, import.meta.url).href;
};