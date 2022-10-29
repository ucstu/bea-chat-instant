export function debounce(fn: (...args: [any]) => void, wait: number) {
  let timeout: NodeJS.Timer;
  return function (...args: [any]) {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
