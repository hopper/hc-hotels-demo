declare namespace JSX {
  interface IntrinsicElements {
    'pf-hotel-meta': {
      'hotel-id': string;
      name: string;
      'star-rating'?: number;
      city?: string;
      region?: string;
      country: string;
    };
    'pf-booking-meta': {
      currency?: string;
      checkin: string | Date;
      checkout: string | Date;
      rooms: number;
      adults: number;
      children?: number;
    };
    'pf-room-button': {
      name: string;
      price: string;
      'merchant-id': string;
      beds?: number;
      availability?: number;
      'price-url'?: string;
    };
  }
}
