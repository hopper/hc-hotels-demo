import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Hotel, initState, reducer, requestHotelRooms } from '../state';
import Room from './Room';

export interface Props {
  hotel?: Hotel;
  delay?: string;
}

export default function HotelRooms({ hotel, delay }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    { today: new Date(), hotel },
    initState,
  );

  useEffect(
    useCallback(() => {
      if (!hotel) {
        requestHotelRooms(
          dispatch,
          '/api/hotel/example1.json',
          false,
          (delay && parseInt(delay)) || 0,
        );
      }
    }, [dispatch]),
    [hotel, delay],
  );

  const roomsEl = useRef<HTMLDivElement>(null);

  const { checkin, checkout, rooms, adults } = state;
  const moreUri = state.hotel?.nextRooms;
  const onMore = useCallback(() => {
    requestHotelRooms(dispatch, '/api/hotel/' + moreUri, true, 0);
  }, [moreUri]);

  const [currency, setCurrency] = useState('USD');
  const [checkIn, setCheckIn] = useState(
    checkin.toISOString().substring(0, 10),
  );
  const [checkOut, setCheckOut] = useState(
    checkout.toISOString().substring(0, 10),
  );
  const [adultsCount, setAdultsCount] = useState(adults);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomCount, setRoomCount] = useState(rooms);

  const exchangeRateFromUSD: Record<string, number> = {
    USD: 1,
    INR: 82.02,
    CAD: 1.3,
    THB: 37.6,
  };

  const showBookingControls = new URLSearchParams(window.location.search).get(
    'showBookingControls',
  );

  return (
    <>
      {showBookingControls && (
        <>
          <label htmlFor="currency">Currency:</label>
          <select
            name="currency"
            id="currency"
            onChange={(event) => {
              setCurrency(event.target.value);
            }}
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="CAD">CAD</option>
            <option value="THB">THB</option>
          </select>
          Check-In:-
          <input
            type="date"
            id="checkin"
            name="checkin"
            value={checkIn}
            onChange={(event) => {
              setCheckIn(event.target.value);
              console.log('Checkin Date:-', event.target.value);
            }}
          />
          Check-Out:-
          <input
            type="date"
            id="checkout"
            name="checkout"
            value={checkOut}
            onChange={(event) => {
              setCheckOut(event.target.value);
              console.log('Checkout Date:-', event.target.value);
            }}
          />
          <label htmlFor="adults">Adults:</label>
          <select
            name="adults"
            id="adults"
            onChange={(event) => {
              setAdultsCount(parseInt(event.target.value));
            }}
          >
            <option value="2">2</option>
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="0">0</option>
          </select>
          <label htmlFor="children">Children:</label>
          <select
            name="children"
            id="children"
            onChange={(event) => {
              setChildrenCount(parseInt(event.target.value));
            }}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="Room">Room:</label>
          <select
            name="Room"
            id="Room"
            onChange={(event) => {
              setRoomCount(parseInt(event.target.value));
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </>
      )}
      <pf-booking-meta
        currency={currency}
        check-in={checkIn}
        check-out={checkOut}
        room-count={roomCount}
        adult-count={adultsCount}
        child-count={childrenCount.toString()}
      ></pf-booking-meta>

      {state.loading ? (
        <div className={'Rooms-loading'}>Loading...</div>
      ) : undefined}

      <div ref={roomsEl}>
        {state.hotel?.rooms?.map(
          ({
            id,
            name,
            beds,
            details,
            price,
            availability,
            picture,
            type,
            merchantId,
            merchantRoomId,
            promotion,
            cancellationCode,
            rateCategoryId,
          }) => (
            <Room
              key={id}
              id={id}
              name={name}
              picture={picture}
              currency={currency}
              price={Number(price.amount) * exchangeRateFromUSD[currency]}
              details={details}
            >
              <button>Reserve</button>
              <pf-room-button
                room-id={id}
                name={name}
                beds={beds}
                price={(
                  Number(price.amount) * exchangeRateFromUSD[currency]
                ).toString()}
                price-inclusive={
                  price.taxes
                    ? (Number(price.amount) + Number(price.taxes)).toString()
                    : ''
                }
                merchant-id={merchantId}
                image-url={picture}
                availability={availability}
                type={type}
                cancellation-code={cancellationCode}
                merchant-room-id={merchantRoomId}
                promotion-id={promotion?.id ?? ''}
                promotion-expiry={promotion?.expiry ?? ''}
                rate-category-id={rateCategoryId}
              />
            </Room>
          ),
        )}
      </div>

      {state.hotel?.nextRooms ? (
        <button
          className={'Rooms-more'}
          onClick={onMore}
          disabled={state.loading}
        >
          Load More
        </button>
      ) : undefined}
    </>
  );
}
