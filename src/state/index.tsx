import { Dispatch } from 'react';

export type ActionTypes =
  | ReturnType<typeof updateCheckin>
  | ReturnType<typeof updateCheckout>
  | ReturnType<typeof updateRooms>
  | ReturnType<typeof updateAdults>
  | ReturnType<typeof loading>
  | ReturnType<typeof fetchedHotelRooms>;

export const updateCheckin = (date: Date) =>
  ({ type: 'checkin', date }) as const;
export const updateCheckout = (date: Date) =>
  ({ type: 'checkout', date }) as const;
export const updateRooms = (count: number) =>
  ({ type: 'rooms', count }) as const;
export const updateAdults = (count: number) =>
  ({ type: 'adults', count }) as const;

export const loading = (loading: boolean) =>
  ({ type: 'loading', loading }) as const;

export const fetchedHotelRooms = (hotel: Hotel, more: boolean) =>
  ({ type: 'fetchedHotelRooms', hotel, more }) as const;

export const requestHotelRooms = (
  dispatch: Dispatch<ActionTypes>,
  url: string,
  more: boolean = false,
  delay: number = 400,
) => {
  dispatch(loading(true));

  // NOTE: hacky way of delaying api call
  const f = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((hotel: Hotel) => {
        dispatch(fetchedHotelRooms(hotel, more));
      })
      .catch((err) => {
        console.error('failed to load rooms', err);
        dispatch(loading(false)); // TODO: display an error
      });
  };
  if (delay) {
    setTimeout(f, delay);
  } else {
    f();
  }
};

interface HotelRoom {
  id: string;
  name: string;
  picture: string;
  price: { amount: string; taxes: string };
  details: Array<string>;
  beds: number;
  availability: number;
  type: string;
  merchantId: string;
  merchantRoomId: string;
  cancellationCode: string;
  rateCategoryId: string;
  promotion?: {
    id: string;
    expiry: string;
  };
}

export interface Hotel {
  rooms?: Array<HotelRoom>;
  name?: string; // TODO: fix!
  nextRooms?: string;
}

export interface BookingFilter {
  checkin: Date;
  checkout: Date;
  rooms: number;
  adults: number;
}

export interface HotelState extends BookingFilter {
  today: Date;
  loading?: boolean;
  delay?: number;
  hotel?: Hotel;
}

export function reducer(state: HotelState, action: ActionTypes): HotelState {
  switch (action.type) {
    case 'checkin':
      return { ...state, checkin: action.date };
    case 'checkout':
      return { ...state, checkout: action.date };
    case 'rooms':
      return { ...state, rooms: action.count };
    case 'adults':
      return { ...state, adults: action.count };
    case 'loading':
      return { ...state, loading: action.loading };
    case 'fetchedHotelRooms':
      let rooms = state.hotel?.rooms || [];
      if (action.more) {
        if (action.hotel.rooms) {
          rooms = rooms!.concat(action.hotel.rooms);
        }
      } else {
        rooms = action.hotel.rooms || [];
      }
      return {
        ...state,
        loading: false,
        hotel: {
          name: action.hotel.name,
          nextRooms: action.hotel?.nextRooms,
          rooms,
        },
      };
    default:
      return state;
  }
}

export interface InitState {
  today: Date;
  hotel?: Hotel;
}

export function initState({ today, hotel }: InitState): HotelState {
  const [checkin, checkout] = [new Date(), new Date()];
  // set check in date to be 14 days after today
  checkin.setDate(today.getDate() + 14);
  // set check out date to be 17 days after today
  checkout.setDate(today.getDate() + 17);
  return {
    today,
    hotel,
    checkin,
    checkout,
    loading: false,
    rooms: 1,
    adults: 2,
  };
}
