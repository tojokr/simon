simon = {
    rootElement: 'simon',
    buttons: [],
    values: [],
    currentPosition: 0,
    currentSpeedRatio: 1,
    delay: 1.5,

    playAllTimer: null,

    init: function(config) {
        this.buttons = document.getElementById(this.rootElement).getElementsByTagName('div');
    },
    getNextRandom: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    addNextValue: function() {
        this.values.push(this.getNextRandom(0, this.buttons.length-1));
    },
    playAll: function() {
        var self = this;

        this.addNextValue();

        this.playAllTimer = setInterval(function() {
            var button = self.buttons[self.values[self.currentPosition]];
            for(var i = 0; i < self.buttons.length; i++) {
                self.buttons[i].style.backgroundColor = '#ddd';
            }
            button.style.backgroundColor = '#eee';

            self.currentPosition++;

            if (self.currentPosition >= self.values.length) {
                self.resetPlayAllTimer();
            }
        }, this.delay * this.currentSpeedRatio * 1000);
    },
    resetPlayAllTimer: function() {
        clearInterval(this.playAllTimer);
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    simon.init();
    simon.addNextValue();

    simon.playAll();
});
