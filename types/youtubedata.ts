export interface YoutubeIdVideoElement {
  kind: string;
  videoId: string;
}

export interface YoutubeVideoElement {
  id: YoutubeIdVideoElement;
}

export interface GetYoutubeSearchResponse {
  items: YoutubeVideoElement[];
}
