// use axios instead to avoid test this logic
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
 
  clearTimeout(id);
  return response;
}

export default fetchWithTimeout;
