// ****************** EZ Select ******************//
(function(){
    var EZ_Select = function(opts){
        this.options = Object.assign(EZ_Select.defaults , opts);
        this.ogList = document.getElementById(opts.selector);
        this.arr = [];
        this.wrapper = document.createElement('div');
        this.input = document.createElement('input');
        this.clicktouch_selectWrap = _clicktouch_selectWrap;
        this.clicktouch_selectMenu = _clicktouch_selectMenu;
        buildUI(this);
        addEvents(this);
    }

    // Private function to initialize the UI Elements
    function buildUI(select) {
        select.selectWrap = document.createElement('div');
        select.selectWrap.classList.add('selectWrap');
        select.selectMenuWrap = document.createElement('div');
        select.selectMenuWrap.classList.add('selectMenuWrap');
        select.wrapper.append(select.selectWrap);
        select.wrapper.append(select.selectMenuWrap);

        select.select = document.createElement('div');
        select.select.classList.add('select');
        select.input.setAttribute('hidden', 'true');
        select.input.setAttribute('id', select.options.inputId);
        select.input.setAttribute('name', select.options.inputId);
        select.input.setAttribute('value', select.ogList.querySelector("ul > li.selected").getAttribute('data-id'));

        select.selectSpan = document.createElement('span');
        select.selectSpan.innerHTML = select.ogList.querySelector("ul > li.selected").getAttribute('data-displayString');

        select.selectChevron = document.createElement('i');
        select.selectChevron.classList.add('fas', 'fa-chevron-down');

        select.select.append(select.selectSpan);
        select.select.append(select.selectChevron);

        select.selectWrap.append(select.select);
        select.selectWrap.append(select.input);

        select.selectMenu = select.ogList.cloneNode(true);
        select.selectMenu.classList.add('selectMenu', 'collapsed');
        
        select.ogList.setAttribute('id', select.ogList.getAttribute('id') + '_hid');
        select.ogList.setAttribute('hidden' , 'true');
        select.ogList.classList.add('selectMenu_hid');

        select.selectMenuWrap.append(select.selectMenu);

        select.wrapper.classList.add('ez-select-wrapper', select.options.wrapperClass);
        select.ogList.parentNode.insertBefore(select.wrapper , select.ogList);
    }

    function addEvents(select){
        select.selectWrap.addEventListener('touchstart', _clicktouch_selectWrap, false);
        select.selectWrap.addEventListener('mousedown', _clicktouch_selectWrap, false);
        select.selectWrap.addEventListener('blur', _blur_selectMenu, false);

        select.selectMenu.addEventListener('touchstart', _clicktouch_selectMenu, false);
        select.selectMenu.addEventListener('mousedown', _clicktouch_selectMenu, false);
    }

    _clicktouch_selectWrap = function(e) {
        e.preventDefault();
        var selectWrap;
        if (e.target.tagName === 'DIV') {
            selectWrap = e.target.parentElement;
        } else {
            selectWrap = e.target.parentElement.parentElement;
        }

        var selectMenu = selectWrap.parentElement.lastChild.firstChild;

        selectWrap.setAttribute('tabindex', 1);
        selectWrap.focus();
        selectWrap.classList.toggle('active');
        selectMenu.classList.toggle('collapsed');
    }

    _clicktouch_selectMenu  = function(e) {
        e.preventDefault();
        var clickedElement = e.target;
        var ezSelectWrap = clickedElement.closest('.ez-select-wrapper');
        var selectWrap = ezSelectWrap.firstChild;
        var selectMenu = ezSelectWrap.lastChild.firstChild;
        var select = selectWrap.firstChild;

        select.firstChild.innerHTML = clickedElement.getAttribute('data-displayString');
        selectWrap.lastChild.setAttribute('value', clickedElement.getAttribute('data-id'));
        selectWrap.classList.remove('active');
        selectMenu.classList.add('collapsed');
    }

    _blur_selectMenu = function(e) {
        var selectWrap = this;
        var selectMenu = selectWrap.parentElement.lastChild.firstChild;

        selectWrap.classList.remove('active');
        selectMenu.classList.add('collapsed');
    }
    
    EZ_Select.defaults = {
        selector : 'testSelect',
        inputId : 'ez-select-input',
        wrapperClass : 'ez-select-wrapper'
    }

    window.EZ_Select = EZ_Select;

})();
