# 🏨 Demo
> Hopper Hotel Price Freeze SDK Demo Site 

### Example Sites:
- [Simple Example](https://hotels.hc-demos.com/plain/)
- [React "Isomorphic" Loading](https://hotels.hc-demos.com/isomorphic/)
- [React Client Only Loading](https://hotels.hc-demos.com/client/)

### Simple Integration:

Include following javascript snippet in `<head>`:
```html
<script>
(function(p,l,h,s,d){d=document;s=d.createElement("script");s.src=(h||"https://sdk.hc-demos.com")+"/cloud/hotels/v1/"+p+"/"+(l||"en")+".js";s.type="module";s.async=!0;d.head.appendChild(s)})
("PARTNER", "en")
</script>
```

Set booking data using `<pf-booking-meta>` tag:
```html
<pf-booking-meta
    currency="USD"
    check-in="2022-12-12"
    check-out="2022-12-20"
    room-count="1"
    adult-count="2"
    child-count="1">
</pf-booking-meta>
```

Set Hotel information using `<pf-hotel-meta>` tag:
```html
<pf-hotel-meta
    hotel-id="h123"
    name="Example Hotel"
    star-rating="4.5"
    partner-rating="5.1"
    address-city="Neddick"
    address-line="123 Main Street"
    address-region="Neddick West"
    address-country="US">
</pf-hotel-meta>
```

Display Room Price Freeze Buttons tag `<pf-room-button>`:
```html
<pf-room-button
    room-id="room-123"
    name="Priced Room"
    merchant-id="m890"
    beds="1"
    price="200.00"
    availability="9"
    image-url="/a/i/room/8.jpg">
</pf-room-button>
```

### Debugging:

Non-production versions of the SDK will log validation warnings when invalid attributes are applied to the above elements.

### Event Listening:
```js
document.addEventListener('pf-init', function() {
  console.info("Hopper SDK Initialized");
});

document.addEventListener('pf-offer', function(evt) {
  console.info("Price Freeze Offer", evt.detail);
});

document.addEventListener('pf-opened', function(evt) {
  console.info("Opened Price Freeze", evt.detail);
});

document.addEventListener('pf-closed', function(evt) {
  console.info("Closed Price Freeze", evt.detail);
});

document.addEventListener('pf-button-click', function(evt) {
  console.info("Clicked Price Freeze Button", evt.detail);
});
```


