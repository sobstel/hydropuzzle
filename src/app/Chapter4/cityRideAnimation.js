import { rwidth } from '@lib/rsize';

export default function cityRideAnimation () {
  return {
    easing: 'linear',
    0.00: {translateX: rwidth(25.00), translateY: rwidth(-5.00)},
    0.20: {translateX: rwidth(47.00), translateY: rwidth(36.00)},
    0.23: {translateX: rwidth(41.07), translateY: rwidth(37.79)},
    0.29: {translateX: rwidth(30.67), translateY: rwidth(39.33)},
    0.38: {translateX: rwidth(31.47), translateY: rwidth(58.67)},
    0.45: {translateX: rwidth(45.33), translateY: rwidth(55.47)},
    0.52: {translateX: rwidth(55.47), translateY: rwidth(51.20)},
    0.61: {translateX: rwidth(64.53), translateY: rwidth(66.13)},
    0.75: {translateX: rwidth(38.93), translateY: rwidth(78.93)},
    0.78: {translateX: rwidth(32.27), translateY: rwidth(78.40)},
    0.98: {translateX: rwidth(27.47), translateY: rwidth(121.33)},
    1.00: {translateX: rwidth(24.80), translateY: rwidth(123.20)}
  };
};
