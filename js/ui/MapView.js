class MapView {
    constructor(window, canvas, world, character) {
        this.window = window;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.world = world;
        this.character = character;
        this.sprites = {
            main: {
                left: MapView.loadImage('../lildude_l.png'),
                right: MapView.loadImage('../lildude_r.png'),
            },
        };
    }

    renderBackground() {
        this.context.fillStyle = '#FFFFFF';
        this.context.strokeStyle = '#550500';
        this.context.lineWidth = 10;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderLevels() {
        this.world.getLevels().map(({
            id,
            x,
            y,
            isSecret,
        }) => {
            this.context.lineWidth = 3;

            this.context.beginPath();
            // this.context.arc(x, y, 20, 0, 2*Math.PI);
            this.context.strokeStyle = '#550500';
            this.context.fillStyle = '#FFFFFF';
            this.context.ellipse(x, y, 25, 13, 0, 0, 2*Math.PI);
            this.context.fill();
            this.context.stroke();

            this.context.beginPath();
            // this.context.arc(x, y, 20, 0, 2*Math.PI);
            this.context.fillStyle = '#FFFF00';
            this.context.ellipse(x, y, 15, 7, 0, 0, 2*Math.PI);
            this.context.fill();
            this.context.stroke();

            // level signage
            this.context.lineWidth = 1;
            this.context.fillStyle = isSecret ? '#00DD11' : '#444444';
            this.context.strokeStyle = isSecret ? '#00AA05' : '#444444';
            this.context.fillText(id, x-9, y-15);
            this.context.strokeText(id, x-9, y-15);
        });
    }

    renderPaths() {
        this.world.getLevels().map(({
            id,
            x,
            y,
            paths,
        }) => {
            paths.map((path) => {
                const {
                    x: toX,
                    y: toY,
                } = this.world.getLevel(path.destination);
                this.renderPath(x, y, toX, toY, path.isSecret);
            });
        });
    }

    renderPathArrow(fromX, fromY, toX, toY) {
        const arrowRadius = 10;
        const arrowDist = 35; // distance from "to" point
        const dx = toX - fromX;
        const dy = toY - fromY;
        const length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        const arrowX = toX - (arrowDist * (dx)) / length;
        const arrowY = toY - (arrowDist * (dy)) / length;

        this.context.beginPath();

        let angle = Math.atan2(dy, dx)
        let x = arrowRadius * Math.cos(angle) + arrowX;
        let y = arrowRadius * Math.sin(angle) + arrowY;
        this.context.moveTo(x, y);

        angle += (1.0/3.0) * (2 * Math.PI)
        x = arrowRadius * Math.cos(angle) + arrowX;
        y = arrowRadius * Math.sin(angle) + arrowY;
        this.context.lineTo(x, y);

        angle += (1.0/3.0) * (2 * Math.PI)
        x = arrowRadius *Math.cos(angle) + arrowX;
        y = arrowRadius *Math.sin(angle) + arrowY;
        this.context.lineTo(x, y);

        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }

    renderPath(fromX, fromY, toX, toY, isSecret) {
        this.context.strokeStyle = '#222222';
        this.context.fillStyle = '#222222';
        if (isSecret) {
            this.context.setLineDash([5, 15]);
        }
        else {
            this.context.setLineDash([]);
        }
        this.context.lineWidth = 2;
        this.context.beginPath();
        this.context.moveTo(fromX, fromY);
        this.context.lineTo(toX, toY);
        this.context.stroke();
        this.context.setLineDash([]);

        this.renderPathArrow(fromX, fromY, toX, toY,);
    }

    renderCharacter () {
        const x = this.character.getX();
        const y = this.character.getY();
        const ms = Date.now();
        const sprite = Math.round(ms / 333) % 2 === 0 ? this.sprites.main.left : this.sprites.main.right;

        // shadow
        this.context.beginPath();
        this.context.globalAlpha = 0.7;
        this.context.fillStyle = '#222222';
        this.context.ellipse(x, y, 12, 3, 0, 0, 2*Math.PI);
        this.context.fill();
        this.context.globalAlpha = 1;

        // sprite
        this.context.drawImage(sprite, x - sprite.width/2, y - sprite.height + 3);
    }

    render () {
        // this.canvas.width = this.window.innerWidth - 50;
        // this.canvas.height = this.window.innerHeight - 50;
        this.canvas.width = MapView.WIDTH;
        this.canvas.height = MapView.HEIGHT;

        this.renderBackground();
        this.renderLevels();
        this.renderPaths();
        this.renderCharacter();
    }
}

MapView.WIDTH = 800;
MapView.HEIGHT = 600;

MapView.loadImage = (path) => {
    var image = new Image();
    image.src = path;
    return image;
};

export default MapView;
