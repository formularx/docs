export async function fetchOptions() {
  await sleep(1000);
  return [
    { label: 'Lion 🐯', value: 'lion' },
    { label: 'Tiger 🦁️', value: 'tiger' },
    { label: 'Wolf 🐺', value: 'wolf' },
    { label: 'Others', value: 'others' },
  ];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
