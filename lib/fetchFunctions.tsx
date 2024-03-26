export async function getPost(postId: string) {
  try {
    const rawRes = await fetch(`http://localhost:3010/posts/${postId}`);
    const res = await rawRes.json();
    if (!res.success) {
      throw new Error("error is fetching post");
    } else {
      return res.post;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getComments(postId: string, commentPage: string) {
  try {
    const rawRes = await fetch(
      `http://localhost:3010/posts/${postId}/comments?page=${commentPage}`,
    );
    const res = await rawRes.json();
    if (!res.success) {
      throw new Error("error is fetching post");
    } else {
      return res;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getUserStateFromServer() {
  const rawData = await fetch(`http://localhost:3010/currentuser`, {
    mode: "cors",
    credentials: "include",
  });
  const data = await rawData.json();
  if (data.success) {
    return data;
  } else {
    throw new Error("user is not logged in");
  }
}
