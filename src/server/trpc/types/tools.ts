export interface TeenResponse {
  id: string;
  name: string;
  price: string;
  status: string;
  meta: string;
  userId: string;
  distance: string;
  ratingScore: string;
  ratingCount: string;
  ratingAvg: string;
  photoCount: string;
  timestamp: string;
  viewCount: string;
  cover: Cover;
  address: string;
  slug: string;
}

interface Cover {
  baseName: string;
  dimensions: Dimensions;
}

interface Dimensions {
  small: Small;
  original: Small;
}

interface Small {
  file: string;
  width: number;
  height: number;
  url: string;
}
