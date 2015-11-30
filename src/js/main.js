(function() {

  // constructor
  this.ZTOOLTIPS = function(el) {
    if(el == "undefined") {
      throw Error("You must attach a DOM object!");
    }
    else{
      this.el = el;
      this.text = this.el.dataset.ztooltips || "ZTooltips by ZeZeN.";
      this.tooltip = null;
      this.timer = null;
      __createTooltips.call(this);
    }
  };

  // private functions
  function __createTooltips() {
    // tooltip element creation
    this.tooltip = document.createElement("div");
    this.tooltip.className = "z-tooltip-container";
    this.tooltip.innerHTML = this.text;
    document.body.appendChild(this.tooltip);
    //attach show/hide event triggers
    __attachListeners.call(this);
  }

  function __attachListeners() {
    var _this = this;
    // mouse enter
    _this.el.addEventListener('mouseenter', function(e) {
      _this.show.call(_this,e);
    });
    //mouse leave
    _this.el.addEventListener('mouseleave', function() {
      _this.hide.call(_this);
    });
  }

  // fade in
  function __fadeIn(el, display){
    var _this = this;
    clearTimeout(this.timer);
    el.style.display = display || "block";
    el.style.opacity = 0;
    var setOpacity = function (){
      el.style.opacity = parseFloat(el.style.opacity) + 0.05;
      if(el.style.opacity < 1 || el.style.opacity < 1.0){
        _this.timer = setTimeout(setOpacity, 20);
      }
    };
    setOpacity();
  }

  // fade out
  function __fadeOut(el){
    var _this = this;
    clearTimeout(this.timer);
    var setOpacity = function (){
      el.style.opacity = parseFloat(el.style.opacity) - 0.05;
      if(el.style.opacity > 0 || el.style.opacity >0.0){
        _this.timer = setTimeout(setOpacity, 20);
      }
      else{
        el.style.display = "none";
      }
    };
    setOpacity();
  }


  // public functions
  this.ZTOOLTIPS.prototype.show = function(event){
    var _this = this;

    var position = {
      x : event.pageX,
      y : event.pageY
    };
    this.tooltip.style.left = position.x + "px";
    this.tooltip.style.top  = position.y + "px";

    __fadeIn.call(this, this.tooltip);
  };

  this.ZTOOLTIPS.prototype.hide = function(){
    __fadeOut.call(this, this.tooltip);
  };










//====================================================================

//  Create all tooltips

  var ztooltips = document.querySelectorAll(".z-tooltips");

  for (var i=0; i<ztooltips.length; i++){
    (function(x) {
      new ZTOOLTIPS(ztooltips[x]);
    })(i);
  }


})();
