function Playfield(object) {
    this.canvas = object.canvas;
    
    this.width = 600;
    this.height = 600;

    this.density = 15;
    this.gridWidth;
    this.gridHeight;

    this.color = '#FFF';
    this.foodColor = '#FF2020';

    this.snakes = new Array();
    this.interval = null;
    this.food;
    this.score = 0;
    this.high = 0;

    if (localStorage.getItem('high') != null) { parseInt(this.high = localStorage.getItem('high')) }

    if (object.width) { this.width = object.width }
    if (object.height) { this.height = object.height }

    if (object.density) { this.density = object.density }
    this.gridWidth = this.width / this.density;
    this.gridHeight = this.height / this.density;
    
    if (object.color) { this.color = object.color }
    if (object.foodColor) { this.foodColor = object.color }

    this.createFood = function() {
        var x = Math.floor(Math.random() * this.gridWidth);
        var y = Math.floor(Math.random() * this.gridHeight);
        var isCollide = false;
        for (s in this.snakes) {
            if (this.snakes[s].head[0] == x && this.snakes[s].head[1] == y) { isCollide = true }
            for (t in this.snakes[s].trail) {
                if (this.snakes[s].trail[t][0] == x && this.snakes[s].trail[t][1] == y) { isCollide = true }
            }
        }

        if (isCollide) {
            this.createFood();
        }

        else {
            this.food = [x, y];
        }
    }

    this.addScore = function() {
        this.score += 1;
        document.getElementById('score').innerText = this.score;

        if (this.score > this.high) {
            this.high = this.score;
            document.getElementById('high').innerText = this.high;
            localStorage.setItem('high', this.high);
        }
    }

    this.start = function() {
        document.getElementById('score').innerText = this.score;
        document.getElementById('high').innerText = this.high;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        var context = this.canvas.getContext('2d');
        context.scale(this.density, this.density);

        context.fillStyle = this.color;
        context.fillRect(0, 0, this.gridWidth, this.gridHeight);

        this.createFood();
    }

    this.bindSnake = function(snake) {
        this.snakes.push(snake);
        snake.bindField(this);
    }

    this.update = function() {
        var context = this.canvas.getContext('2d');
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        context.fillStyle = this.foodColor;
        context.fillRect(this.food[0], this.food[1], 1, 1);

        for (s in this.snakes) {
            context.fillStyle = this.snakes[s].color;
            context.fillRect(this.snakes[s].head[0], this.snakes[s].head[1], 1, 1);
            for (t in this.snakes[s].trail) {
                context.fillRect(this.snakes[s].trail[t][0], this.snakes[s].trail[t][1], 1, 1);
            }
        }
    }
}