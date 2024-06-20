import { SearchType } from "@/types/types";
import { AppSearchBar } from "../app-search-bar";

export default function SearchPage() {
  const typeArr = [
    SearchType.album,
    SearchType.artist,
    SearchType.audiobook,
    SearchType.episode,
    SearchType.playlist,
    SearchType.show,
    SearchType.track,
  ];
  return (
    <>
      <AppSearchBar />
    </>
  );
}
