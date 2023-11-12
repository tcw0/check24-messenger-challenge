export function displayRating(ratings: number[]) {
  if (ratings.length > 0) {
    const sum = ratings.reduce((a, b) => a + b, 0)
    const avg = sum / ratings.length || 0
    return `${avg.toFixed(2)}`
  } else {
    return "No reviews"
  }
}
