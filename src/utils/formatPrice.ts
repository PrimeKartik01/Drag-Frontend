export function formatPrice(price: string | null): string {
    if (!price) return "-";

    const value = Number(price);

    if (value >= 10000000) {
        return `${(value / 10000000).toFixed(2)} Cr*`;
    }

    if (value >= 100000) {
        return `${(value / 100000).toFixed(2)} Lakh*`;
    }

    if (value >= 1000) {
        return `${(value / 1000).toFixed(2)} Thousand*`;
    }

    return `${value}`;
}