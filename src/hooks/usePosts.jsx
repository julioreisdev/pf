import useSWR from "swr";
import { fetcher } from "../utils/api";

export function usePosts() {
  const { data, error, mutate } = useSWR(
    "https://pf-back-gpex.onrender.com/posts",
    fetcher
  );

  return {
    posts: data,
    postsError: error,
    postsLoading: !error && !data,
    updatePosts: mutate,
  };
}
