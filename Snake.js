function Snake(object) {
    this.trail = new Array();
    this.startingSize = 5;
    this.head = [20, 20];
    this.facing = 'e';
    this.pendingFace = '';
    this.color = '#000';
    this.killColor = '#202020';
    this.field;
    this.moving = false;
    this.dead = false;

    self = this;

    if (object.size) { this.startingSize = object.size }
    if (object.start) { this.head = object.start }
    if (object.facing) { this.facing = object.facing }
    if (object.color) { this.color = object.color }
    if (object.killColor) { this.killColor = object.killColor }

    this.start = function() {
        this.dead = false;

        this.head = this.start;
        this.trail = new Array();
        this.facing = '';
        this.moving = false;

        var context = this.field.canvas.getContext('2d');
        context.fillStyle = this.color;
        context.fillRect(this.head[0], this.head[1], 1, 1);
    }

    this.expand = function() {
        var before = this.head;
        if (this.facing == 'n') { this.head = [this.head[0], this.head[1] - 1] }
        else if (this.facing == 'e') { this.head = [this.head[0] + 1, this.head[1]] }
        else if (this.facing == 's') { this.head = [this.head[0], this.head[1] + 1] }
        else if (this.facing == 'w') { this.head = [this.head[0] - 1, this.head[1]] }
        
        this.trail.unshift(before);

        this.checkCollision();
        this.field.update();
    }

    this.bindField = function(field) {
        this.field = field;
    }

    this.setDirection = function(direction) {
        if (this.moving) {
            var canChange = true;
            if (self.pendingFace == '') {
                if (self.facing == 'n' && direction == 's') { canChange = false }
                else if (self.facing == 'e' && direction == 'w') { canChange = false }
                else if (self.facing == 's' && direction == 'n') { canChange = false }
                else if (self.facing == 'w' && direction == 'e') { canChange = false }
            }

            else { canChange = false }

            if (canChange) {
                self.pendingFace = direction;
            }
        }

        else {
            self.facing = direction;
            moving = true;
        }
    }

    this.kill = function() {
        this.dead = true;
        var context = this.field.canvas.getContext('2d');
        context.fillStyle = this.killColor;
        context.fillRect(this.head[0], this.head[1], 1, 1);
        document.getElementById('die').style.display = 'block';
    }

    this.restart = function() {
        if (self.dead) {
            location.reload();
        }
    }

    this.addKeyListener = function(key, action, param) {
        document.addEventListener('keydown', function(event) {
            if (event.key.toLowerCase() == key) {
                if (param) { action(param) }
                else { action() }
            }
        });
    }

    this.checkCollision = function() {
        var canMove = true;
        for (t in this.trail) {
            //if (ahead[0] == this.trail[t][0] && ahead[1] == this.trail[t][1]) {
            if (this.head[0] == this.trail[t][0] && this.head[1] == this.trail[t][1]) {
                canMove = false;
            }
        }

        if (this.head[0] >= this.field.gridWidth || this.head[0] <= -1 || this.head[1] >= this.field.gridHeight || this.head[1] <= -1) {
            canMove = false;
        }

        if (!canMove) {
            this.kill();
        }

        if (this.head[0] == this.field.food[0] && this.head[1] == this.field.food[1]) {
            canMove = false;
            this.expand();
            this.field.createFood();
            this.field.addScore();
        }

        return canMove;
    }

    this.update = function() {
        if (!this.dead) {
            if (this.pendingFace != '') {
                this.facing = this.pendingFace;
                this.pendingFace = '';
            }

            if (this.facing != '') {
                if (this.trail.length < this.startingSize) {
                    this.expand();
                }

                else {
                    if (this.checkCollision()) {
                        if (this.pendingFace != '') {
                            this.facing = this.pendingFace;
                            this.pendingFace = '';
                        }

                        var updated = new Array();
                        beforeHead = [this.head[0], this.head[1]];
                        if (this.facing == 'n') { this.head = [this.head[0], this.head[1] - 1] }
                        else if (this.facing == 'e') { this.head = [this.head[0] + 1, this.head[1]] }
                        else if (this.facing == 's') { this.head = [this.head[0], this.head[1] + 1] }
                        else if (this.facing == 'w') { this.head = [this.head[0] - 1, this.head[1]] }
                        for (t in this.trail) {
                            if (t == 0) {
                                updated[t] = beforeHead;
                            }

                            else {
                                updated[t] = this.trail[t-1];
                            }
                        }

                        //console.log(beforeHead[0] + ', ' + beforeHead[1] + ' => ' + this.head[0] + ', ' + this.head[1]);

                        this.trail = updated;
                        this.field.update();
                    }
                }
            }
        }
    }
}