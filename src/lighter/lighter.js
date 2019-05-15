import './lighter.less';

// <div class="lighter lighter_toggle">
//     <div class="lighter_light"></div>
//     <div class="lighter_switcher"></div>
//     </div>

class Lighter {
    /**
     * @param {object} parentElement Dom object of parent element for lamp,
     * where it should be inserted
     * @param {function} [toggleOnHandler] Function calls when lamp is toggle on
     * @param {function} [toggleOffHandler] Function calls when lamp is toggle off
     */

    constructor(parentElement, toggleOnHandler, toggleOffHandler) {

        this.parentElement = parentElement;
        this.toggleOnHandler = toggleOnHandler;
        this.toggleOffHandler = toggleOffHandler;
        this.isOn = false;
        this.bindToggle = this.toggle.bind(this);
        this.render();
        this.handleEvents();
    }

    destroy() {
        this.switcher.removeEventListener('click', this.bindToggle);
        this.toggleOff(this);
        this.lighter.remove();

    }

    render() {
        this.lighter = document.createElement('div');
        this.light = document.createElement('div');
        this.switcher = document.createElement('div');

        this.lighter.classList.add('lighter');
        this.light.classList.add('lighter_light');
        this.switcher.classList.add('lighter_switcher');

        this.lighter.appendChild(this.light);
        this.lighter.appendChild(this.switcher);

        this.switcher.textContent = 'ON';

        this.parentElement.appendChild(this.lighter);
    }

    toggleOn() {
        this.isOn = true;
        this.lighter.classList.add('lighter_toggle');
        if (this.toggleOnHandler instanceof Function) {
            this.toggleOnHandler(this);
        }
    }

    toggleOff() {
        this.isOn = false;
        this.lighter.classList.remove('lighter_toggle');
        if (this.toggleOffHandler instanceof Function) {
            this.toggleOffHandler(this);
        }
    }

    toggle() {
        if (this.isOn) {
            this.toggleOff();
        } else {
            this.toggleOn();

        }

        console.log(this.isOn);
    }

    handleEvents() {
        this.switcher.addEventListener('click', this.bindToggle);
    }
}

export { Lighter }