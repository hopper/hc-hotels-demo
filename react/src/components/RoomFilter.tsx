import {
  ActionTypes,
  BookingFilter,
  updateAdults,
  updateCheckin,
  updateCheckout,
  updateRooms,
} from '../state';
import { Dispatch } from 'react';

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export interface Props extends BookingFilter {
  dispatch: Dispatch<ActionTypes>;
  minCheckin: Date;
}

export default function RoomFilter({
  dispatch,
  minCheckin,
  checkin,
  checkout,
  rooms,
  adults,
}: Props) {
  return (
    <form>
      <>
        <label>
          Checkin:
          <input
            type="date"
            name="checkin"
            min={isoDate(minCheckin)}
            value={isoDate(checkin)}
            onChange={(evt) => {
              dispatch(updateCheckin(new Date(evt.target.value)));
            }}
          />
        </label>
        <label htmlFor="checkout">Checkout:</label>
        <input
          type="date"
          id="checkout"
          name="checkout"
          min={isoDate(checkin)}
          value={isoDate(checkout)}
          onChange={(evt) => {
            dispatch(updateCheckout(new Date(evt.target.value)));
          }}
        />

        <br />
        <label htmlFor="rooms">Rooms:</label>
        <input
          type="range"
          name="rooms"
          min="1"
          max="9"
          value={rooms.toString()}
          onChange={(evt) => {
            dispatch(updateRooms(parseInt(evt.target.value)));
          }}
        />
        {rooms}
        <br />

        <label htmlFor="adults">Adults:</label>
        <input
          type="range"
          id="adults"
          name="adults"
          min="1"
          max="36"
          value={adults.toString()}
          onChange={(evt) => {
            dispatch(updateAdults(parseInt(evt.target.value)));
          }}
        />
        {adults}
      </>
    </form>
  );
}
