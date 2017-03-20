'use strict';
/**
 * Matches Polyfill
 */
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.msMatchesSelector;
}

/**
 * Animation Support
 */
document.write("<style>.animated-out{  display:none; }.fade-animating-out{ opacity:0; } </style>");

/**
 * Dom Instantiator
 * @param elem_or_selector
 * @returns {DOM}
 */
function dom(elem_or_selector){
    return new DOM(elem_or_selector);
}

/**
 * DDM constructor
 * @param elem_or_selector
 * @constructor
 */
function DOM(elem_or_selector){
    /*
     Properties
     * elem
     * initial_display
     */

    if(typeof elem_or_selector === "string"){
        this.elem = this.querySelectorAllToArray(elem_or_selector);
    } else if( Array.isArray(elem_or_selector) ){
        this.elem = elem_or_selector;
    }else{
        this.elem =  [elem_or_selector]
    }
}

/**
 * Loops through each element and applies callback
 * @param callback
 * @returns {DOM}
 */
DOM.prototype.each = function(callback){
    this.elem.forEach(function(value){
        callback.call(value);
    });
    return this;
};

/**
 * Prepend an Child Element
 * @param elem
 * @returns {DOM}
 */
DOM.prototype.prependChild = function(elemToPrepend){
    dom(this.elem).each(function(){
        var parent = this;
        if( Array.isArray(elemToPrepend) ){
            dom(elemToPrepend).each(function(){
                parent.insertBefore( this.cloneNode(true),  parent.firstChild );
            });
        }else{
            parent.insertBefore( elemToPrepend.cloneNode(true),  this.firstChild );
        }

    });
    return this;
};

/**
 * Append a Child Element
 * @param elemToAppend
 * @returns {DOM}
 */
DOM.prototype.appendChild = function(elemToAppend){
    dom(this.elem).each(function(){
        var parent = this;
        if( Array.isArray(elemToAppend) ){
            dom(elemToAppend).each(function(){
                parent.appendChild(this.cloneNode(true));
            });
        }else{
            parent.appendChild(this.cloneNode(true));
        }
    });
    return this;
};

/**
 * Find all elements in another element
 * @param selector
 * @returns {DOM}
 */
DOM.prototype.find = function(selector){
    var all_children = [];
    dom(this.elem).each(function(el){
        dom(el.querySelectorAll(selector)).each(function(){
            all_children.push(this);
        });
    });
    this.elem = all_children;
    return this;
};

/**
 * Find the closest element going up the DOM that matches the selector
 * @param selector
 * @returns {DOM}
 */
DOM.prototype.closest = function (selector){
    var all_closest= [];
    dom(this.elem).each(function(){
        var el=this;
        for ( ; el && el !== document; el = el.parentNode ) {
            if ( el.matches( selector ) ) all_closest.push(el);
        }
    });
    this.elem = all_closest;
    return this;
};

/**
 * Get and Set style
 * @param attr
 * @param value
 * @returns {*}
 */
DOM.prototype.style = function(attr, value){
    if( !this.undefined(value) ){
        dom(this.elem).each(function(){
            this.style[attr] = value;
        });
        return this;
    }
    return  window.getComputedStyle(this.elem[0]).getPropertyValue(attr);
};

/**
 * Get an array from a selector instead of a node list
 * @param selector
 * @returns {Array.<T>}
 */
DOM.prototype.querySelectorAllToArray = function(selector){
    return [].slice.call(document.querySelectorAll(selector))
};

/**
 * Get matching element
 * @returns {DOM}
 */
DOM.prototype.first = function(){
    return dom(this.elem[0]);
};

/**
 * Get Last Matching element
 * @returns {DOM}
 */
DOM.prototype.last = function(){
    return dom(this.elem[this.elem.length - 1]);
};

/**
 * Add a class or an attribute
 * @param type (add, remove, or toggle)
 * @param value
 * @returns {DOM}
 */
DOM.prototype.classList = function(action, value){
    var contains = true;
    dom(this.elem).each(function(){
        if(action === 'contains'){
            if(!this.classList.contains(value)){
                contains = false;
            }
        }else if(action === 'add'){
            this.classList.add(value);
        }else if(action === 'remove'){
            this.classList.remove(value);
        }else if(action === 'toggle'){
            if(this.classList.contains(value)){
                this.classList.remove(value);
            }else{
                this.classList.add(value);
            }
        }
    });

    if(action === 'contains'){
        return contains;
    }
    return this;
};

/**
 * Get or Set Attribute
 * @param attr
 * @param value
 * @returns {*}
 */
DOM.prototype.attribute = function(attr, value){
    if( !this.undefined(value) ){
        dom(this.elem).each(function(){
            this.setAttribute(attr, value);
        });
        return this;
    }

    return this.elem[0].getAttribute(attr);
};

/**
 * Get or Set Inner HTML
 * @param html
 * @returns {*}
 */
DOM.prototype.html = function(html){
    if( !this.undefined(html) ){
        dom(this.elem).each(function(){
            this.innerHTML = html;
        });
        return this;
    }
    return this.elem[0].innerHTML;
};

/**
 * Get or Set Inner Text
 * @param text
 * @returns {*}
 */
DOM.prototype.text = function(text){
    if( !this.undefined(text) ){
        dom(this.elem).each(function(){
            this.innerText = text;
        });
        return this;
    }
    return this.elem[0].innerText;
};

/**
 * Deep clone an elements
 * @returns {Array}
 */
DOM.prototype.clone = function(){
    var clones = [];
    dom(this.elem).each(function(){
        clones.push(this.cloneNode(true));
    });
    return clones;
};

/**
 * Get Vanilla JS Elements as Array or Single Node (if just one)
 * @returns {Array.<T>|*|Array}
 */
DOM.prototype.vanilla = function(){
    return this.elem;
};

/**
 * Test if variable is undefined
 * @param variable
 * @returns {boolean}
 */
DOM.prototype.undefined = function(variable){
    return typeof variable === 'undefined';
};

/**
 * Show element(s)
 */
DOM.prototype.show = function(){
    this.elem.forEach(function(elem){
        var init_display = elem.getAttribute('data-init-display');
        elem.style.display = (init_display) ? init_display : "block";
    });
};

/**
 * Hide element(s)
 */
DOM.prototype.hide = function(){
    this.elem.forEach(function(elem){
        elem.setAttribute('data-init-display', window.getComputedStyle(elem).getPropertyValue('display'));
        elem.style.display = "none";

    });
};

/**
 * Animate In
 * @param type
 * @returns {DOM}
 */
DOM.prototype.animateIn = function(type){
    var obj = this;
    this.elem.forEach(function(elem){
        dom(elem).classList("remove", "animated-out");
        setTimeout(function(){
            if( obj.undefined(type) || type === 'custom'){
                dom(elem).classList("remove", "animating-out");
            }else{
                dom(elem).classList("remove", type + "-animating-out");
            }
        }, 1);

    });
    return this;
};

/**
 * Animate Out
 * @param type
 * @returns {DOM}
 */
DOM.prototype.animateOut = function(type){
    var obj = this;
    this.elem.forEach(function(elem){
        var duration = window.getComputedStyle(elem).getPropertyValue('transition-duration');
        if(duration !== "0s"){
            var time = parseFloat(duration.replace("s", "")) * 1000;
        }else{
            dom(elem).style("transition-duration", ".4s");
            time = 400;
        }

        if( obj.undefined(type) || type === 'custom'){
            dom(elem).classList("add", "animating-out");
        }else{
            dom(elem).classList("add", type + "-animating-out");
        }

        setTimeout(function(){
            dom(elem).classList("add", "animated-out");
        }, time);
    });

    return this;
};

/**
 * To String
 * @returns {string}
 */
DOM.prototype.toString = function(){
    return "[object DOM]";
};
