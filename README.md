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
    checkin="2022-12-12"
    checkout="2022-12-20"
    rooms="1"
    adults="2"
    children="1">
</pf-booking-meta>
```

Set Hotel information using `<pf-hotel-meta>` tag:
```html
<pf-hotel-meta
    hotel-id="h123"
    name="Example Hotel"
    star-rating="4.5"
    city="Neddick"
    country="US">
</pf-hotel-meta>
```

Display Room Price Freeze Buttons tag `<pf-room-button>`:
```html
<pf-room-button
    name="Priced Room"
    merchant-id="m890"
    beds="1"
    price="200.00"
    availability="9"
    image-url="/a/i/room/8.jpg">
</pf-room-button><
```

### Event Listening:
```js
document.addEventListener('pf-init', function() {
  console.warn("Hopper SDK Initialized");
});

document.addEventListener('pf-offer', function(evt) {
  console.warn("Price Freeze Offer", evt.detail);
});

document.addEventListener('pf-opened', function(evt) {
  console.warn("Opened Price Freeze", evt.detail);
});

document.addEventListener('pf-closed', function(evt) {
  console.warn("Closed Price Freeze", evt.detail);
});
```