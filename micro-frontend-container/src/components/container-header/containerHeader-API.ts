// A mock function to mimic making an async request for data
export function getHeader() {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: 'Container Headerrrrr~~' }), 500)
  );
}
