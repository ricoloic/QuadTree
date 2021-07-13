let canvas, quadTree, queryAria;

function setup() {
    canvas = createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    // canvas = createCanvas(600, 600);
    const mainNodeDOM = canvas.parent();
    canvas.parent("canvas-container");
    mainNodeDOM.remove();

    background(30);

    const boundary = new Rectangle(width / 2, height / 2, width, height);
    quadTree = new QuadTree(boundary, 2);


    for (let i = 0; i < 1000; i++) {
        const p = {
            x: random(width / 3, (width / 3) * 2),
            y: random(height / 3, (height / 3) * 2)
        };
        quadTree.insert(p);
    }
}

function draw() {
    background(0)
        // if (mouseIsPressed) quadTree.insert({ x: mouseX, y: mouseY });

    // queryAria = new Rectangle(mouseX, mouseY, 100, 35);
    queryAria = new Circle(mouseX, mouseY, 35);

    quadTree.show({ boundary: false, points: true });

    // query aria
    stroke(0, 255, 0);
    strokeWeight(3);
    // rect(queryAria.x - queryAria.w, queryAria.y - queryAria.h, queryAria.w * 2, queryAria.h * 2);
    circle(queryAria.x, queryAria.y, queryAria.r * 2);

    let points = quadTree.query(queryAria);
    for (let p of points)
        point(p.x, p.y);
}