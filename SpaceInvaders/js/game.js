var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
var fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' });

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 800, 600);

var ship = {
    x: 400,
    y: 570,
    speed: 250
}

var alienspeed = 75;

var shipImage = new Image();
shipImage.src = "img/shuttle.png";
var alienImage = new Image();
alienImage.src = "img/enemy.png";
var explosionImage = new Image();
explosionImage.src = "img/explosion.png";

var gameover = false;
var aliens = [];
var explosions = [];
var lasers = {};
var playerScore = 0;
var alienMoveCase = "RIGHT";
var alienMissile = {};
var keysDown = {};

var level = 0;


var drummer = {};
drummer.destroy = new Audio("sound/banana.wav");
drummer.lose = new Audio("sound/loser.wav");
drummer.pew = new Audio("sound/pew.wav");

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);

var updateLevel = function() {
    alienspeed = 75;
    for (var i = 0; i < 11; i++) {
        for (var j = 0+level; j < 5+level; j++) {
            var alienScore;
            if (j < 1) alienScore = 30;
            else if (j < 3) alienScore = 20;
            else alienScore = 10;

            aliens.push({x: i*35+200, y: j*35, score: alienScore});
        }
    }
    level++;
};

var updatePlayerActions = function(modifier) {
    if (37 in keysDown && ship.x > 0) {
        ship.x -= ship.speed * modifier;
    }

    if (39 in keysDown && ship.x < 770) {
        ship.x += ship.speed * modifier;
    }

    if (32 in keysDown) {
        if (!ship.laser) {
            document.getElementById("pew").cloneNode(true).play();
            ship.laser = {x: ship.x, y: ship.y};
        }
        //drummer.pew.play();
    }
};

var update = function(modifier) {

    if (aliens.length === 0) {
        updateLevel();
    }

    updatePlayerActions(modifier);

    if (ship.laser) {
        ship.laser.y -= ship.speed * modifier;
    }

    if (ship.laser) {
        if (ship.laser.y < 0) {
            delete ship.laser;
        }
    }

    for (alien in aliens) {
        var xMin = aliens[alien].x;
        var xMax = aliens[alien].x+30;
        var yMin = aliens[alien].y;
        var yMax = aliens[alien].y+30;

        if (ship.laser) {
            if (ship.laser.x >= xMin && ship.laser.x <= xMax && ship.laser.y >= yMin && ship.laser.y <= yMax) {
                explosions.push({x: aliens[alien].x+15, y: aliens[alien].y+15, time: timestamp()});
                playerScore += aliens[alien].score

                aliens.splice(alien, 1);
                drummer.destroy.play();
                delete ship.laser;
                break;
            }
        }

        if (alienMissile.missile) {
            var am = alienMissile.missile;
            if (am.x >= ship.x && am.x <= ship.x+30 && am.y >= ship.y && am.y <= ship.y+30) {
                gameover = true;
                drummer.lose.play();
            }
        }

        if (!alienMissile.missile) {
            if (Math.random() > 0.95) {
                alienMissile.missile = {x: aliens[alien].x, y: aliens[alien].y};
            }
        }

        if (aliens[alien].x > 770) {
            alienMoveCase = "LEFT";
            break;
        }

        if (aliens[alien].x < 0) {
            alienMoveCase = "RIGHT";

            for (alien in aliens) {
                aliens[alien].y += 30;
            }
            alienspeed *= 1.05;
            break;
        }
    }

    if (alienMissile.missile) {
        alienMissile.missile.y += 150 * modifier;
        if (alienMissile.missile.y > 600) {
            delete alienMissile.missile;
        }
    }


    for (alien in aliens) {
        switch(alienMoveCase) {
            case "LEFT":
                aliens[alien].x -= alienspeed * modifier;
                break;
            case "RIGHT":
                aliens[alien].x += alienspeed * modifier;
                break;
        }
    }

};

var renderBackground = function() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 800, 600);
    ctx.fillStyle = "green";
    ctx.font = "20px Helvetica";
    ctx.fillText("Score: " + playerScore, 50, 50);
};

var renderAliens = function () {
    if (alienMissile.missile) {
        ctx.fillStyle = "red";
        ctx.fillRect(alienMissile.missile.x, alienMissile.missile.y, 2, 5);
    }

    for (alien in aliens) {
        ctx.drawImage(alienImage, aliens[alien].x, aliens[alien].y);
    }
};

var renderShip = function() {
    if (ship.laser) {
        ctx.fillStyle = "red";
        ctx.fillRect(ship.laser.x, ship.laser.y, 2, 5);
    }
    ctx.drawImage(shipImage, ship.x, ship.y);
};

var renderExplosions = function() {
    for (explosion in explosions) {
        ctx.drawImage(explosionImage, explosions[explosion].x, explosions[explosion].y);
        if ((explosions[explosion].time / 1000 + 0.25) < timestamp() / 1000) {
            delete explosions[explosion];
        }
    }
};

var render = function(modifier) {
    renderBackground();
    renderShip();
    renderAliens();
    renderExplosions();
};

var renderGameOver = function(modifier) {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, 800, 600);
    ctx.fillStyle = "red";
    ctx.font = "20px Helvetica";
    ctx.fillText("GAME OVER", 400, 300);

    ctx.fillStyle = "green";
    ctx.fillText("Score: " + playerScore, 400, 400);
};



function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

var now, dt,
    last = timestamp();

function frame() {
    fpsmeter.tickStart();
    now   = timestamp();
    dt    = Math.min(1, (now - last) / 1000);    // duration in seconds



    if (!gameover) {
        update(dt);
    }
    !gameover ? render(dt) : renderGameOver(dt);;
    last = now;
    fpsmeter.tick();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
