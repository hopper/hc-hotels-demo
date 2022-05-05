import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Rooms from './components/Rooms';
import { Hotel } from './state';

declare global {
  interface Window {
    _MOCK_DATA_: any;
  }
}

const hotel = window['_MOCK_DATA_'] as Hotel | undefined;
const root = document.getElementById('rooms')!;

createRoot(root).render(
  <StrictMode>
    <Rooms hotel={hotel} delay={root.dataset.delay} />
  </StrictMode>,
);
