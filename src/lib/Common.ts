export const wait = (ms: number) => new Promise((resolve) => {
  const timeout = setTimeout(() => {
    resolve(ms);
    clearTimeout(timeout)
  }, ms)
});
