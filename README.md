# DOM-Inator.js
A super lightweight DOM manipulation library for those who think jQuery is too much. Weighs in at 4kb minified and only 1kb minified and gzipped.

## Features

    1. *Lightweight* - 4kb minified & 1kb minfied & gzipped
    2. *Chainable* - Link dom manipulations of the same selector together for cleaner code
    3. *Perfect Blend of Vanilla JS and jQuery* - uses some of the great features of jQuery for quick coding but implements more vanilla js method names for a better transition to vanilla js (because really vanilla's the best)

## Installation

   1. Clone from Github
   2. Bower coming soon

## Selecting Elements
All selection is done through css-like query selectors. All selections are treated as a single unit like in jQuery so when you manipulate 1 you manipulate them all (just like in jQuery) (no looping! Hooray!)
```
dom(".query-selector-here");
```

## Traversing the DOM
How to move up and down the DOM tree to get the element you're looking for

### .find(selector)
Find children elements of your selected elements that match a certain query-selector
```
dom(".parent").find('.children'); //Selects all elements with class of children in all elements with class of parent
```

### .closest(selector)
Go up the dom tree from selected elements until element matches selector
```
dom(".grandchild").closest(".great-grandpa") //Moves up through DOM tree until element with class of great-grandpa is found
```

### .first()
Narrows selection down to first matching element
```
dom(".lots-of-me").first(); //Returns only the first element with class of "lots-of-me"
```

### .last()
Narrows selection down to last matching element
```
dom(".lots-of-me").last(); //Returns only the last element with class of "lots-of-me"
```