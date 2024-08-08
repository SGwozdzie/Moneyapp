export default function generateId(length = 32) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    if (Math.random() < 0.5) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    } else {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
  }
  return result;
}
