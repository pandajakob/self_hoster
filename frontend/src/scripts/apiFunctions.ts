export async function getFiles() {
  try {
    const response = await fetch("/files");
    if (!response.ok && response.status != 400) {
      alert(`Error getting all files: ${response.status}`);
      return;
    }
    if (response.status == 400) {
      return null;
    }
    let data = await response.json();
    if (data) {
        return data
    } 
    return null

  } catch (error) {
    alert(error);
  }
}

export async function getUserInfo() {
  try {
    let response = await fetch("/users/");
    if (!response.ok) {
      return null;
    }
    let data = await response.json();
    if (data) {
        return data
    } 
    return null
  } catch (error) {
    console.log(error);
  }
}