import useSWR from "swr";
import { fetcher } from "../utils/api";

export function usePosts() {
  const { data, error, mutate } = useSWR(
    "http://localhost:8008/posts",
    fetcher
  );

  return {
    posts: data,
    postsError: error,
    postsLoading: !error && !data,
    updatePosts: mutate,
  };
}
