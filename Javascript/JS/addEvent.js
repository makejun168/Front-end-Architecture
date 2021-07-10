class BomEvent {
    constructor(element) {
        this.elem = element
    }

    addEvent(type, handler) {
        if (this.elem.addEventListener) {
            this.elem.addEventListener(type, handler, false);
        } else if (this.elem.attachEvent) {
            this.elem.attachEvent(`on${type}`, function() {
                handler.call(this.elem)
            });
        } else {
            this.elem[`on${type}`] = handler;
        }
    }

    removeEvent(type, handler) {
        if (this.elem.removeEventListener) {
            this.elem.removeEventListener(type, handler, false);
        } else if (this.elem.detachEvent) {
            this.elem.detachEvent(`on${type}`, function() {
                handler.call(this.elem)
            });
        } else {
            this.elem[`on${type}`] = null;
        }
    }
}

function stopPropagation(ev) {
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else {
        ev.cancelBubble = true; // IE
    }
}

function preventDefault(ev) {
    if (ev.preventDefault) {
        ev.preventDefault();
    } else {
        ev.returnValue = false;
    }
}