

export default function ratingAdapter(rating) {
    return Boolean(rating) ? String(Number(rating / 2)).slice(0,3) : 0
}