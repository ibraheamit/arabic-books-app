export interface GoogleBookVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  previewLink?: string;
  infoLink?: string;
}

export interface GoogleBookSaleInfo {
  saleability: string;
  retailPrice?: {
    amount: number;
    currencyCode: string;
  };
}

export interface GoogleBookItem {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
  saleInfo?: GoogleBookSaleInfo;
}

export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBookItem[];
}

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  price: string;
  previewLink: string;
  infoLink: string;
}
