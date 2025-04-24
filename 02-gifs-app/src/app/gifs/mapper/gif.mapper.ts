import { Gif } from "../interfaces/gif";
import { GiphyItem } from "../interfaces/giphy";

export abstract class GifMapper {
    static mapGiphyItemToGif(item: GiphyItem): Gif {
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url,
        };
    }

    static mapGiphyItemsToGifsArray(items: GiphyItem[]): Gif[] {
        return items.map(this.mapGiphyItemToGif);
    }
}