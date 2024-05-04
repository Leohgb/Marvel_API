export interface IComic {
    id: number;
    title?: string;
    description?: string;
    resourceURI?: string;
    events?: {
        avaible: number;
        collectionURI: string;
        items: {
            name: string;
            resourceURI: string;
            type: string;
        }[];
        returned: number;
    };
    modified: string;
    series: {
        available: number;
        collectionURI: string;
        items: {
            name: string;
            resourceURI: string;
            type: string;
        }[];
        returned: number;
    };
    stories: {
        avaible: number;
        collectionURI: string;
        items: {
            name: string;
            resourceURI: string;
            type: string;
        }[];
    };
    thumbnail: {
        extension: string;
        path: string;
    };
    urls: {
        type: string;
        url: string;
    }
}