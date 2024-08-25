/**
 * --------------------------------------------------------------------------
 * WebFullSet WFSgoto.js
 * 
 * Licensed under MIT ??????????????????????????????????
 * --------------------------------------------------------------------------
 * OUR CONTACTS
 * Skype or telegram: @hjvf_07
 * Mail: onlycssclub@gmail.com
 * --------------------------------------------------------------------------
 * Vercion: 1.0.0
 * Date:    30.10.2023
 * --------------------------------------------------------------------------
 */

class WFSGoTo {
    constructor(config){
        this.config = config;
        this.goTo = 0;
        this.showbutton = ['top', 'firstScreen', 'lastScreen'];
        this.numberOptions = ['duration', 'spacebeforeElement', 'mobileFinish', 'mibileSpacebeforeElement']
        this.options = {
            elements: '.goto',
            duration: 1300,
            indicatorGoTop: 'go-to-top',
            typePath: '#',
            showGoToTopActiveClass: 'evo-gototop-visible',
            showGoToTop: 'top',
            spacebeforeElement: 200,
            mobileFinish: 992,
            mibileSpacebeforeElement: 0
        }

        if(typeof config === 'object'){
            this.options = {...this.options, ...config}
        }

        this.init();
    }
    
    init(){
        this.#validateOption();
    }

    #validateOption(){
        this.flagValidation = true;

        this.numberOptions.forEach(numberOption => {
            this.checEl = this.options[numberOption];
            
            if(!Number.isFinite(this.options[numberOption]) && !Number.isNaN(this.options[numberOption]) ) {
                alert(`WFSGoTo ${numberOption} = ${this.options[numberOption]} - should be a number`)
                this.flagValidation = false;
            }
        });

        this.triggers = document.querySelectorAll(`${this.options.elements} ,.${this.options.indicatorGoTop}`);

        if(this.flagValidation){
            this.bodyEl = document.documentElement;
            this.gotoElement = document.querySelectorAll(`.${this.options.indicatorGoTop}`);
            this.windowHeight = window.innerHeight;
            this.bodyHeight = this.bodyEl.clientHeight;
            this.positionflag = this.options.showGoToTop;

            if(this.triggers.length > 0){
                console.log(`!!! START - WFSGoTo !!!`);
                this.#allTriggers();
                this.#checkMobile();
                window.addEventListener('resize', this.#resizeWindow);

                if(this.gotoElement.length > 0){
                    this.#scrollActionGoToTop();
                    window.addEventListener('scroll', this.#scrollActionGoToTop);
                }
            }else {
                console.log(`!!! WFSGoTo : no items found !!!`);
            }
        }
    }

    #allTriggers(){
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', this.#setupTriggers);
        });
    }

    #setupTriggers = (event) => {
        event.preventDefault();
        this.clickLink(event, event.target);
    }

    #scrollWindowToTop = (event) => {
        window.scrollTo({
            top: this.goTo,
            left: 0,
            behavior: 'smooth'
        });
    }

    #checkMobile(){
        this.windowWidth = window.innerWidth;
        if(this.windowWidth < this.options.mobileFinish) {
            this.mobile = true;
            this.space = this.options.mibileSpacebeforeElement;
        }
        else {
            this.mobile = false;
            this.space = this.options.spacebeforeElement;
        }
    }

    #addClass(element){
        if(!element.classList.contains(this.options.showGoToTopActiveClass)) element.classList.add(this.options.showGoToTopActiveClass);
    }

    #removeClass(element){
        if(element.classList.contains(this.options.showGoToTopActiveClass)) element.classList.remove(this.options.showGoToTopActiveClass);
    }

    #scrollActionGoToTop = () => {
        this.positionTop = window.scrollY;
        this.gotoElement.forEach(element => {
            if(this.positionflag == this.showbutton[0]) {
                console.log(1);
                if(this.positionTop > 1) this.#addClass(element);
                else this.#removeClass(element);
            }
    
            if(this.positionflag == this.showbutton[1]) {
                if(this.positionTop >= this.windowHeight) this.#addClass(element);
                else this.#removeClass(element);
            }
            
            if(this.positionflag == this.showbutton[2]) {
                if(this.positionTop >= this.bodyHeight - this.windowHeight) this.#addClass(element);
                else this.#removeClass(element);
            } 
        });
    }

    #resizeWindow = () => {
        let _this = this;
        let _time;
        if(_time) clearTimeout(_time);
        _time = setTimeout(function(){
            _this.windowHeight = window.innerHeight;
            _this.bodyHeight = _this.bodyEl.clientHeight;

            _this.#checkMobile();
        }, 500);
    }

    clickLink(event){
        if(event.currentTarget.classList.contains(this.options.indicatorGoTop)){
            this.goTo = 0;
        }else{
            this.attrElement = event.currentTarget.getAttribute('href');
            this.fPrefix = this.attrElement.substring(0, this.options.typePath.length);
            this.elId = this.attrElement.slice(this.options.typePath.length)

            if(this.fPrefix === this.options.typePath){
                this.goToBox = document.getElementById(this.elId);
                this.goTo = this.goToBox.getBoundingClientRect().y + window.scrollY - this.space;
            }
        }

        this.#scrollWindowToTop(event);
    }

    destroy(){
        const triggers = document.querySelectorAll(this.options.elements);
        if(triggers.length > 0){
            triggers.forEach(trigger => {
                trigger.removeEventListener('click', this.#setupTriggers);
            });

            window.removeEventListener('resize', this.#resizeWindow);
            window.removeEventListener('scroll', this.#scrollActionGoToTop);
        }
    }
}


//  const nameOfVar = new WFSGoTo({
//    elements: '.goto',
//    duration: 1300,                                       ?? Animation time
//    indicatorGoTop: 'go-to-top',                          ?? The element we will look for in body 
//    typePath: '#',                                        ?? Type of prefix to the ID block. Sometimes it is necessary to change the type of the link so that it does not intersect with other elements (for example, an empty href).
//    showGoToTopActiveClass: 'evo-gototop-visible',        ?? The class that will be added when the button becomes visible. It's boring to hang all CSS styles on this class.
//    showGoToTop: 'top',                                   ?? top - after small scroll, firstScreen - after scroll first screen, lastScreen - at the end of page
//    spacebeforeElement: 200,                              ?? spacebeforeElement - "for desctop" Add extra padding to the active block. If the block does not have paddings, so that the menu does not move closer.
//    mobileFinish: 992,                                    ?? mobileFinish - The maximum resolution up to which resolution the mobile version works.
//    mibileSpacebeforeElement: 0
//  });

// DESTROY
// nameOfVar.destroy();
//# sourceMappingURL=../maps/WFSgoto.js.map
