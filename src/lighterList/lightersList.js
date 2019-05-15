import {Lighter} from '../lighter/lighter';
import './lighterList.less';



class LightersList {
    constructor(cssSelector) {
        this.lights = [];
        this.enabledLights = [];
        this.root = document.querySelector(cssSelector);
        this.activeElementIndex = 0;
        this.autoSwitchIntervalId = 0;
        this.autoMode = false;
        this.render();
        this.handleEvent();
    }

    render() {
        const btns = document.createElement('div');
        this.list = document.createElement('div');
        this.btnAdd = document.createElement('button');
        this.btnRemove = document.createElement('button');
        this.btnToggle = document.createElement('button');
        this.btnAutoMode = document.createElement('button');

        this.root.classList.add('lighters');
        this.list.classList.add('lighters__list');
        this.btnAdd.classList.add('lighters__btn', 'lighters__btn_add');
        this.btnRemove.classList.add('lighters__btn', 'lighters__btn_remove');
        this.btnToggle.classList.add('lighters__btn', 'lighters__btn_toggle');
        this.btnAutoMode.classList.add('lighters__btn', 'lighters__btn_auto');

        this.btnAdd.textContent = 'Add light';
        this.btnRemove.textContent = 'Remove light';
        this.btnToggle.textContent = 'Toggle light';
        this.btnAutoMode.textContent = 'Auto light';
        this.root.appendChild(this.list);

        btns.appendChild(this.btnAdd);
        btns.appendChild(this.btnRemove);
        btns.appendChild(this.btnToggle);
        btns.appendChild(this.btnAutoMode);

        this.root.appendChild(btns)
    }

    onLampToggleOn(lighter) {
        this.enabledLights.push(lighter);
        console.log(lighter, this.enabledLights);
    }

    onLampToggleOff(lighter) {
        const replaceLights = [];

        for (let elem of this.enabledLights) {
            if (elem !== lighter){
                replaceLights.push(elem);
            }
        }
         this.enabledLights = replaceLights;
        console.log(lighter, this.enabledLights);
    }

    addLamp() {
        const lighter = new Lighter(this.list, this.onLampToggleOn.bind(this), this.onLampToggleOff.bind(this));
        this.lights.push(lighter);
    }

    removeLamp() {
        const lighter = this.lights.pop();
        lighter.destroy();
    }

    toggleAll() {
        if (this.enabledLights.length > 0) {
            this.lights.forEach((lighter)=> {
                lighter.toggleOff();
            });
        } else {
            this.lights.forEach((lighter)=>{
                lighter.toggleOn();
            })
        }
    }

    toggleOnLight(light) {
        light.toggleOn();
    }

    toggleOffLight() {
        this.enabledLights. forEach((lamp)=>{
            lamp.toggleOff();
        });
    }

    handleEvent() {
        this.btnAdd.addEventListener('click', this.addLamp.bind(this));
        this.btnToggle.addEventListener('click', this.toggleAll.bind(this));
        this.btnRemove.addEventListener('click', this.removeLamp.bind(this));
        this.btnAutoMode.addEventListener('click', this.autoSwitch.bind(this));
    }

    switchLight() {
        if (this.activeElementIndex + 1 < this.lights.length) {
            this.activeElementIndex++;
        } else {
           this.activeElementIndex = 0;
        }
           this.toggleOffLight();
           this.toggleOnLight(this.lights[this.activeElementIndex]);
    }

    autoSwitch() {
        this.toggleOnLight(this.lights[this.activeElementIndex]);
        if (this.autoMode) {
            clearInterval(this.autoSwitchIntervalId);
            this.autoMode = false;
            this.toggleOffLight();
        } else  {
            this.autoMode = true;
            this.autoSwitchIntervalId = setInterval(()=>{
                this.switchLight()
            }, 1000);
        }
    }
}

export { LightersList }