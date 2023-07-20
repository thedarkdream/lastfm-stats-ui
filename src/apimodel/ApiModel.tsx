export type ApiArtistListensObj = {
    name: String;
    listens: Number;
}

export type ApiTopArtists = {
    artists: Array<ApiArtistListensObj>;
}


export type ApiArtistsTimeline = {
    artistTimelines: Array<ApiArtistTimeline>;
}

export type ApiArtistTimeline = {
    artist: String;
    points: Array<ApiTimelinePoint>;
}


export type ApiTimelinePoint = {
    time: String;
    listens: Number;
}
