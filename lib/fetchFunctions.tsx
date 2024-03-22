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

export async function getComments(postId: string) {
  try {
    const rawRes = await fetch(
      `http://localhost:3010/posts/${postId}/comments`,
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