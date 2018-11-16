import { rwidth } from '@lib/rsize';

export default function endRideAnimation () {
  return {
    easing: 'ease-out',
    0.00: {translateX: rwidth(73.5), translateY: rwidth(-5.00)},
    0.34: {translateX: rwidth(96), translateY: rwidth(16.75)},
    0.35: {translateX: rwidth(96), translateY: rwidth(16.75)},
    0.70: {translateX: rwidth(62), translateY: rwidth(34)},
    1.00: {translateX: rwidth(33), translateY: rwidth(43)}
  };
};
