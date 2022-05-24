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
      'check-in': string | Date;
      'check-out': string | Date;
      'room-count': number;
      'adult-count': number;
      'child-count'?: string;
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
