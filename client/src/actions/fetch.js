export async function fetchData(url, options) {
  const response = await fetch(url, options);
  
  if(response.status === 401 || response.status === 449) {
    return response
  }

  const data = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return data;
}