function Ticker() {
  this.speed = 25;
  this.distance = -2;
  this.currentDistance = 0;
  this.currentCounter = 0;
  
  this.elem = $('.slider-strip ul');
  this.currentLength;
  this.currentWidth;
  this.currentHeight;
}

Ticker.prototype = {
  init : function() {
    this.setupWidths();
    this.startTicker();
  },
  
  setupWidths : function() {
    this.currentLength = this.elem.children('li').length;
    this.currentWidth = this.currentLength * this.elem.children('li').outerWidth();
    this.currentHeight = this.elem.children('li').outerHeight();
    this.elem.css({width : this.currentWidth, height : this.currentHeight });
  },
  
  startTicker : function() {
    var selfObject = this;
    setInterval(function() {selfObject.moveLeft()}, this.speed);
  },
  
  moveLeft : function() {
    var newDistance = this.distance * this.currentCounter;
    if (newDistance*-1 >= this.elem.children('li:first-child').outerWidth()) {
      this.resetOrder();
      newDistance = this.distance * this.currentCounter;
    }
    this.elem.css({left : newDistance});
    this.currentCounter++;
  },
  
  resetOrder : function() {
    this.currentCounter = 0;
    var newItem = this.elem.children('li').splice(0, 1);
    this.elem.append(newItem);
  }
}

$(function() {
  ticker = new Ticker();
  ticker.init();
});