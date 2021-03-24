var playfield = new Playfield({
    canvas: document.getElementById('canvas'),
    color: '#212121',
    width: 600,
    height: 600
});

var snake = new Snake({
    color: '#F1F1F1',
    killColor: '#D1D1D1',
    size: 5
});

playfield.bindSnake(snake);

playfield.start();

snake.addKeyListener('w', snake.setDirection, 'n');
snake.addKeyListener('a', snake.setDirection, 'w');
snake.addKeyListener('s', snake.setDirection, 's');
snake.addKeyListener('d', snake.setDirection, 'e');

snake.addKeyListener('arrowup', snake.setDirection, 'n');
snake.addKeyListener('arrowleft', snake.setDirection, 'w');
snake.addKeyListener('arrowdown', snake.setDirection, 's');
snake.addKeyListener('arrowright', snake.setDirection, 'e');

snake.addKeyListener(' ', snake.restart);

setInterval(function() {
    snake.update();
}, 50);