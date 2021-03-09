function sum(a: number, b: number): number {
  return a + b;
}

document.addEventListener("DOMContentLoaded", () => {
  sum(1, 2);
  let p = Promise.resolve(1);
  console.log(p);
  console.log("hi");
});
