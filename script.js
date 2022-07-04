function randomNumber(min, max) {
    return min + (Math.round(Math.random() * (max - min)))
}

function getHypotenuse(a, b) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

const ballNum = 20;
const connectionOpacityDistance = 500;

const container = document.getElementById('container');
console.log(container);

for (i = 0; i < ballNum; i++) {
    let ballDiv = document.createElement("div");
    ballDiv.classList.add('ball');
    let ballFillDiv = document.createElement("div");
    ballFillDiv.classList.add('fill');
    ballDiv.appendChild(ballFillDiv);
    container.appendChild(ballDiv);
}

let balls = Array.from(document.querySelectorAll('.ball'));

let ballPosition = {};
let ballDistance;

balls.forEach((ball, key) => {
    let ballXSpeed = randomNumber(-10, 10);
    let ballYSpeed  = randomNumber(-10, 10);
// let ballWidth = randomNumber(20, 50);
    let ballWidth = 26;
    let  ballRadius = ballWidth / 2;
    let screenWidth = window.innerWidth - ballWidth;
    let screenHeight = window.innerHeight - ballWidth;
    let x = Math.floor(Math.random() * screenWidth);
    let y = Math.floor(Math.random() * screenHeight);
    let ballMass = 4 * Math.PI * Math.pow(ballRadius, 3) / 3;
    ballPosition[key] = {'x': x, 'y': y, 'key': key, 'ballXSpeed': ballXSpeed, 'ballYSpeed': ballYSpeed, "screenWidth": screenWidth, 'screenHeight': screenHeight, 'ballRadius': ballRadius, 'ballMass': ballMass};

    ball.style.setProperty('--x', ballPosition[key]['x']+'px');
    ball.style.setProperty('--y', ballPosition[key]['y']+'px');
    ball.style.setProperty('--ballWidth', ballWidth+'px');
    ball.style.setProperty('--radius', ballPosition[key]['ballRadius']+'px');
    ball.classList.add('ball-'+key);
// ball.style.setProperty('--color', '#' + Math.floor(Math.random()*16777215).toString(16));
    ball.style.setProperty('--color', 'orangered');
    function updateBall () {
        if (ballPosition[key]['x'] + ballPosition[key]['ballXSpeed'] > ballPosition[key]['screenWidth']) {
            ballPosition[key]['ballXSpeed'] = - ballPosition[key]['ballXSpeed'];
        } else if (ballPosition[key]['x'] + ballPosition[key]['ballXSpeed'] < 0) {
            ballPosition[key]['ballXSpeed'] = - ballPosition[key]['ballXSpeed'];
        }
        if (ballPosition[key]['y'] + ballPosition[key]['ballYSpeed'] > ballPosition[key]['screenHeight']) {
            ballPosition[key]['ballYSpeed'] = - ballPosition[key]['ballYSpeed'];
        } else if (ballPosition[key]['y'] + ballPosition[key]['ballYSpeed'] < 0) {
            ballPosition[key]['ballYSpeed'] = - ballPosition[key]['ballYSpeed'];
        }

        Object.keys(ballPosition).forEach((iter) => {
            if (key != iter) {
                ballDistance = getHypotenuse(ballPosition[key]['x'] - ballPosition[iter]['x'], ballPosition[key]['y'] - ballPosition[iter]['y']);
                let connectOpacity;
                if (ballDistance >= connectionOpacityDistance) {
                    connectOpacity = 0;
                } else {
                    connectOpacity = (connectionOpacityDistance - ballDistance) / connectionOpacityDistance;
                }
                if (!(document.getElementById(key+iter) || document.getElementById(iter+key))) {
                    let rotate;
                    let connect = document.createElement("span");
                    connect.setAttribute('id', key+iter);
                    container.appendChild(connect);
                }
                let editConnect;
                if (document.getElementById(key+iter)) {
                    editConnect = document.getElementById(key+iter);
                } else if (document.getElementById(iter+key)) {
                    editConnect = document.getElementById(iter+key);
                }
                if (editConnect) {
                    editConnect.style.setProperty('--distance', ballDistance+'px');
                    editConnect.style.setProperty('--connectX', ballPosition[key]['x']+'px');
                    editConnect.style.setProperty('--connectY', ballPosition[key]['y']+'px');
                    editConnect.style.setProperty('--ballRadius', (ballPosition[key]['ballRadius'] - 1)+'px');
                    editConnect.style.setProperty('--opacity', connectOpacity);
                    if (ballPosition[key]['y'] >= ballPosition[iter]['y']) {
                        rotate = - Math.acos((ballPosition[iter]['x'] - ballPosition[key]['x']) / ballDistance);
                    } else {
                        rotate = Math.acos((ballPosition[iter]['x'] - ballPosition[key]['x']) / ballDistance);
                    }
                    editConnect.style.setProperty('--rotate', rotate+'rad');
                }

            }
        })

        ballPosition[key]['x'] = ballPosition[key]['x'] + ballPosition[key]['ballXSpeed'];
        ballPosition[key]['y'] = ballPosition[key]['y'] + ballPosition[key]['ballYSpeed'];

        ball.style.setProperty('--x', ballPosition[key]['x']+'px');
        ball.style.setProperty('--y', ballPosition[key]['y']+'px');
        requestAnimationFrame(updateBall);
    }
    requestAnimationFrame(updateBall);
})