export interface IHq {
    id: number;
    resourceURI: string;
    characters: {
        available: number;
        collectionURI: string;
        items: {
            name: string;
            resourceURI: string;
        }[];
        returned: number
    };
    collections: object;
    creators: {
        available: number;
        collectionURI: string;
        items: {
            name: string;
            resourceURI: string;
            role: string;
        }[];
        returned: number;
    }
    dates: {
        date: string;
        type: string;
    }[];
    description: string;
    diamondCode: string;
    digitalId: number;
    ean: string;
    events: {
        available: number;
        collectionURI: string;
        items: {
            name: string;
            resourceURI: string;
        }[];
        returned: number;
    }
    format: string;
    images: {
        extension: string;
        path: string;
    }[];
    isbn: string;
    issn: string;
    issueNumber: number;
    modified: string;
    pageCount: number;
    prices: {
        price: number;
        type: string;
    }[];
    series: {
        name: string;
        resourceURI: string
    };
    stories: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
            type: string;
        }[];
        returned: number;
    }
    textObjects: object[];
    thumbnail: {
        extension: string;
        path: string;
    };
    title: string;
    upc: string;
    urls: {
        type: string;
        url: string;
    }[];
    variantDescription: string;
    variants: {
        name: string;
        resourceURI: string;
    }[];
}