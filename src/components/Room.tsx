import { ReactNode } from 'react';

export interface Props {
  id: string;
  name: string;
  picture: string;
  details: Array<string>;
  price: number;
  currency: string;
  availability?: number;
  children?: ReactNode;
}

export default function Room({
  id,
  name,
  picture,
  details,
  price,
  children,
  currency,
}: Props) {
  return (
    <article className="Room" id={id}>
      <img className="Room-image" src={picture} alt={name} loading="lazy" />
      <h3 className="Room-name">{name}</h3>
      <ul className="Room-details">
        {details.map((detail) => (
          <li key={`${id}-${detail}`}>✓ {detail}</li>
        ))}
      </ul>
      <div className="Room-pricing">
        <b>
          {currency}
          {price}
        </b>
        <span>{'night'}</span>
      </div>
      <div className="Room-select">{children}</div>
    </article>
  );
}
