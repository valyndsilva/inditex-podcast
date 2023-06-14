interface PodcastImage {
  label: string;
  attributes: {
    height: string;
  };
}

interface Podcast {
  "im:name": {
    label: string;
  };
  "im:image": PodcastImage[];
  summary: {
    label: string;
  };
  "im:price": {
    label: string;
    attributes: {
      amount: string;
      currency: string;
    };
  };
  "im:contentType": {
    attributes: {
      term: string;
      label: string;
    };
  };
  rights: {
    label: string;
  };
  title: {
    label: string;
  };
  link: {
    attributes: {
      rel: string;
      type: string;
      href: string;
    };
  };
  id: {
    label: string;
    attributes: {
      "im:id": string;
    };
  };
  "im:artist": {
    label: string;
  };
  category: {
    attributes: {
      "im:id": string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  "im:releaseDate": {
    label: string;
    attributes: {
      label: string;
    };
  };
}

interface Episode {
  0: string;
  1: {
    episodeUrl: string;
    trackTimeMillis: number;
    collectionViewUrl: string;
    artworkUrl160: string;
    closedCaptioning: string;
    collectionId: number;
    collectionName: string;
    artistIds: [];
    genres: [
      {
        name: string;
        id: string;
      }
    ];
    episodeGuid: string;
    description: string;
    episodeContentType: string;
    releaseDate: string;
    shortDescription: string;
    episodeFileExtension: string;
    trackId: number;
    trackName: string;
    feedUrl: string;
    artworkUrl600: string;
    country: string;
    artworkUrl60: string;
    previewUrl: string;
    contentAdvisoryRating: string;
    trackViewUrl: string;
    kind: string;
    wrapperType: string;
  };
}
