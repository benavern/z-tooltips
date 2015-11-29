(function() {

  // constructor
  this.ZTOOLTIPS = function(el) {
    if(el == "undefined") throw Error("You must attach a DOM object!");
    this.el = el;
    this.text = this.el.dataset.ztooltips || "ZTooltips by ZeZeN.";

    var _this = this;

    __createTooltips();

    this.el.addEventListener('mouseenter', function() {
      _this.getText.call(_this);
    })

  }


  // private functions
  function __createTooltips() {
    var tooltip = document.createElement("div");
    tooltip.className = "tooltips-container"
    tooltip.innerHTML = this.text;
    document.body.appendChild(tooltip);
  }

  // public functions
  this.ZTOOLTIPS.prototype.getText = function(){
    console.log(this.text);
  }













  var ztooltips = document.querySelectorAll(".z-tooltips");
  for (var i=0; i<ztooltips.length; i++){
    (function(x) {
      new ZTOOLTIPS(ztooltips[x]);
    })(i);
  }


})();
