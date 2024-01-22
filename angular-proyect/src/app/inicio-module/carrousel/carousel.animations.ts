
import {
    trigger,
    state,
    style,
    animate,
    transition,
  } from '@angular/animations';
  
  export const slideInOut = trigger('slideInOut', [
    state(
      'in',
      style({
        opacity: 1,
        transform: 'translateX(0)',
      })
    ),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)',
      }),
      animate('300ms ease-in'),
    ]),
    transition('* => void', [
      animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(100%)' })),
    ]),
  ]);
  