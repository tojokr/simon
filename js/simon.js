simon = {
    rootElement: 'simon',
    buttons: [],
    values: [],
    currentPosition: 0,
    currentSpeedRatio: 1,
    minSpeedRatio: 0.5,
    delay: 1.5,

    playAllTimer: null,
    isUserToPlay: false,

    init: function(config) {
        var self = this;

        this.buttons = document.getElementById(this.rootElement).getElementsByTagName('div');

        document.getElementById(this.rootElement).addEventListener('mousedown', function(event) {
            self.play(event.target);
        });
        document.getElementById(this.rootElement).addEventListener('touchstart', function(event) {
            self.play(event.target);
        });
    },
    getNextRandom: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    addNextValue: function() {
        this.values.push(this.getNextRandom(0, this.buttons.length-1));
    },
    showAll: function() {
        var self = this;

        this.isUserToPlay = false;
        this.currentPosition = 0;

        this.addNextValue();

        document.getElementById('score').innerHTML = this.values.length - 1;

        this.playAllTimer = setInterval(function() {

            if (self.currentPosition >= self.values.length) {
                self.resetPlayAllTimer();
                return;
            }

            var button = self.buttons[self.values[self.currentPosition]];
            for(var i = 0; i < self.buttons.length; i++) {
                self.buttons[i].className = 'inactive';
            }
            button.className = 'active';

            self.currentPosition++;
        }, this.delay * this.currentSpeedRatio * 1000);
    },
    resetPlayAllTimer: function() {
        clearInterval(this.playAllTimer);
        this.currentPosition = 0;
        this.isUserToPlay = true;

        for(var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].className = 'inactive';
        }
    },
    play: function(element) {
        if (this.isUserToPlay) {
            element.className = 'active';
            if (element && element.id === this.buttons[this.values[this.currentPosition]].id) {
                this.currentPosition++;
                if (this.currentPosition >= this.values.length) {
                    this.currentSpeedRatio = Math.max(this.currentSpeedRatio - 1, this.minSpeedRatio);
                    this.showAll();
                }
                return; // OK
            }

            this.values = [];

            this.showAll();
        }
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    simon.init();

    simon.showAll();
});
