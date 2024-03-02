import { SearchResponse, SearchSignature } from "../../types/Search";
import searchForMangakakalotOrManganato from "../utils/searchForMangakakalotOrManganato";

const search: SearchSignature = async(name: string): Promise<SearchResponse> => {
  return await searchForMangakakalotOrManganato(name, 'manganato')
}

export default search
