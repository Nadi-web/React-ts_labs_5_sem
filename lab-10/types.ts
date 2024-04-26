export type TEntry = {
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
    imdbID: string;
    Plot?: string;
};

export type TResponse<T> =
    | ({
          Response: 'True';
      } & T)
    | {
          Response: 'False';
          Error: string;
      };

export type TEntryResponse = TResponse<TEntry>;

export type TSearchResponse = TResponse<{
    Search: TEntry[];
}>;

export type TEntryType = '' | 'movie' | 'series' | 'episode';
