import { useCallback, useEffect, useReducer, useRef } from 'react';
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

  return (
    <>
      <pf-booking-meta
        currency={'USD'}
        check-in={checkin.toISOString().substring(0, 10)}
        check-out={checkout.toISOString().substring(0, 10)}
        room-count={rooms}
        adult-count={adults}
        child-count="0"
      ></pf-booking-meta>

      {state.loading ? (
        <div className={'Rooms-loading'}>Loading...</div>
      ) : undefined}

      <div ref={roomsEl}>
        {state.hotel?.rooms?.map(
          ({ id, name, beds, details, price, availability, picture, type, merchantId, merchantRoomId, promotion, cancellationCode, rateCategoryId }) => (
            <Room
              key={id}
              id={id}
              name={name}
              picture={picture}
              price={price}
              details={details}
            >
              <button>Reserve</button>
              <pf-room-button
                room-id={id}
                name={name}
                beds={beds}
                price={price.amount}
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
