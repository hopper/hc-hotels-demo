# 🏨 Demo

> Hopper Hotel Price Freeze SDK Demo Site

<details>
  <summary>Running it locally:</summary>

1. Install [pnpm](https://pnpm.io/)
2. Type <code>pnpm install</code> in the root directory
3. Type <code>pnpm dev</code> in the same directory
4. Open <code>http://localhost:3000/</code> in a web browser
</details>

### Example Sites:

- [Simple Example](https://hotels-demo.cloud.hopper.com/plain/)
- [React "Isomorphic" Loading](https://hotels-demo.cloud.hopper.com/isomorphic/)
- [React Client Only Loading](https://hotels-demo.cloud.hopper.com/client/)

### Simple Integration:

Include following javascript snippet in `<head>`:

```html
<script>
  (function (p, l, h, s, d) {
    d = document;
    s = d.createElement('script');
    s.src =
      (h || 'https://sdk.hc-demos.com') +
      '/cloud/hotels/v1/' +
      p +
      '/' +
      (l || 'en') +
      '.js';
    s.type = 'module';
    s.async = !0;
    d.head.appendChild(s);
  })('PARTNER', 'en');
</script>
```

Set booking data using `<pf-booking-meta>` tag:

```html
<pf-booking-meta
  currency="USD"
  check-in="2023-12-12"
  check-out="2023-12-20"
  room-count="1"
  adult-count="2"
  child-count="1"
>
</pf-booking-meta>
```

Set Hotel information using `<pf-hotel-meta>` tag:

```html
<pf-hotel-meta
    hotel-id="h123"
    name="Example Hotel"
    star-rating="4.5" //optional
    partner-rating="5.1"
    address-city="Neddick"
    address-line="123 Main Street"
    address-country="US"
    check-in-local-time="15:00" //optional
    check-in-time-offset="+02:00">
</pf-hotel-meta>
```

Notes:

- partner-rating: optional attribute

Set user data using `<pf-user-meta>` tag:

```html
<pf-user-meta
  user-id="u567"
  first-name="John"
  last-name="Doe"
  email="name@example.com"
  phone-number="+1 206 555 0100"
>
</pf-user-meta>
```

Notes:

- this tag is optional when user information is unavailable

Display Room Price Freeze Buttons tag `<pf-room-button>`:

```html
<pf-room-button
  room-id="room-123"
  name="Priced Room"
  type="room-type-123"
  beds="1"
  price="200.00"
  availability="9"
  merchant-id="m890"
  merchant-room-id="merchant-room-456"
  cancellation-code="CODE_789"
  rate-category-id="rate-category-123"
  addons="breakfast,other addons"
  promotion-id="promo-abc"
  promotion-expiry="2030-04-20T15:30:30Z"
  image-url="/a/i/room/8.jpg"
  ext-attr-room-offer-id="room-offer-123"
>
</pf-room-button>
```

Notes:

- merchant-room-id: optional attribute
- promotion-expiry and promotion-id: provide both or neither
- arbitrary metadata can be attached to purchased price freezes by including attributes prefixed with `ext-attr-`.
  in the above example, a purchased price freeze will have the following external attributes associated with it:
  `{ "room-offer-id": "room-offer-123" }`

### Debugging:

Non-production versions of the SDK will log validation warnings when invalid attributes are applied to the above elements.

### Event Listening:

The SDK emits events on the document element. Supplemental data is included on events via the `detail` property.

Offers are included in 2 forms:

- `PartialOffer` with reduced information optimized to reduce response latency
- `FullOffer` containing all offer information.

#### Example:

```js
document.addEventListener('pf-offer', function (event) {
  console.info('Price Freeze Offer', event.detail);
});

/*
  Sample event detail containing a partial offer for the pf-offer event:
  {
    "offer": {
      "offer": {
        "hotel_id": "hotel-1",
        "room_id": "room-1",
        "id": "b3a18b7f-8628-4bee-9736-197a3f15e9c8",
        "merchant_id": "merchant-3",
        "merchant_room_id": "merchant-room-456",
        "full_offer_type": "room_deposit_offer",
        "conditions": {
          "currency": "CAD",
          "frozen_price": "150.00",
          "deposit": "30.00",
          "cap": "75.00",
          "offer_expiry": "2022-07-18T18:33:37.890Z",
          "freeze_expiry": "PT72H"
        }
      },
      "signature": "4HF9wjGm8bIY6g2xyWf6V3EQ9umkt79wE8hli7WDyU8",
      "type": "signed_base_offer"
    }
  }
*/
```

#### Events

`pf-init`

- emitted once when the SDK is loaded and initialized in the browser (all elements have been defined).
  - detail: none

`pf-offer`

- emitted each time an offer (available or unavailable) is loaded for a `pf-room-button` element in the page
  - detail: { offer: `PartialOffer` }

`pf-modal-open`

- emitted when the modal is opened
  - detail: { offer: `FullOffer` }

`pf-modal-close`

- emitted when the modal is closed
  - detail: none

`pf-purchase`

- emitted on successful purchase from the modal application
  - detail: { offer: `FullOffer` }
