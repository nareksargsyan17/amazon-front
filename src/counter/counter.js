export default function counter() {
  try {
    let count = 0
    JSON.parse(localStorage.getItem("products")).forEach(prod => {
      count += prod.count;
    });
    return count;
  } catch (eror) {
    return  0
  }
}