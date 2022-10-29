const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(height, width, perecentage = 25) {
        this._height = height;
        this._width = width;
        this._perecentage = perecentage;
        this._field = Field.generateField(height, width, perecentage);
    }

    // print() method
    print() {
        for (let row of this._field) {
            console.log(row.join(' '));
        }
    }

    playGame() {
        let y = 0;
        let x = 0;
        let userMove;
        let allowedMoves = this.allowedMoves(y, x);

        while (!allowedMoves) {
            this._field = Field.generateField(this._height, this._width, this._perecentage);
        };

        while(this._field[y][x] !== hat && this._field[y][x] !== hole) {
            console.clear();
            this._field[y][x] = pathCharacter;
            this.print();
            allowedMoves = this.allowedMoves(y, x);
            if (!allowedMoves) {
                console.log('You can not move any further more. Plese choose another direction.')
            }
            userMove = prompt('Which direction would you like to move? Please enter U for Up, R for Right, D for Down and L for Left. \n')

            while (!allowedMoves.includes(userMove.toUpperCase())) {
                userMove = prompt('The move you entered is invalid or forbidden. Please, try again: ')
            }

            switch (userMove.toUpperCase()) {
                case 'U':
                    y -= 1;
                    break;
                case 'R':
                    x += 1;
                    break;
                case 'D':
                    y += 1;
                    break;
                case 'L':
                    x -= 1;
                    break;
            }
        }
        if (this._field[y][x] === hat) {
            console.log('You find your hat! You win.');
        } else if (this._field[y][x] === hole) {
            console.log('You just fall in a hole. Game over!');
        }
    }

    allowedMoves(y, x) {
        const allowedMoves = [];
        // up:
        if (y && this._field[y - 1][x] !== pathCharacter) {
            allowedMoves.push('U');
        };
        // right
        if (x < this._field[0].length - 1 && this._field[y][x + 1] !== pathCharacter) {
            allowedMoves.push('R');
        };
        // down
        if (y < this._field.length - 1 && this._field[y + 1][x] !== pathCharacter) {
            allowedMoves.push('D');
        };
        // left
        if (x && this._field[y][x - 1] !== pathCharacter) {
            allowedMoves.push('L');
        }
        return allowedMoves;
    }

    static generateField(height, width, perecentage = 25) {
        let newField = [];
        if (perecentage > 50) {
            perecentage = 35;
            console.log('The perecentage of holes, eing too high, has been set to 35%');
        }
        let numberOfHoles = Math.floor(height * width * perecentage / 100);

        let hatY = 0;
        let hatX = 0;
        while (!hatX && !hatY) {
            hatY = Math.floor(Math.random() * height);
            hatX = Math.floor(Math.random() * width);
        };
        for (let row = 0; row < height; row++) {
            const rowArray = [];
            for (let column = 0; column < width; column++) {
                if (row === 0 && column === 0) {
                    rowArray.push(pathCharacter);
                    continue;
                };

                if (row === hatY && column === hatX) {
                    rowArray.push(hat);
                    continue;
                }
                rowArray.push(fieldCharacter);
            };
            newField.push(rowArray);
        };

        for (numberOfHoles; numberOfHoles > 0; numberOfHoles--) {
            let holeY = 0;
            let holeX = 0;
            while (newField[holeY][holeX] !== fieldCharacter) {
                holeY = Math.floor(Math.random() * height);
                holeX = Math.floor(Math.random() * width);
            }
            newField[holeY][holeX] = hole;
        }
        return newField;
    }
}

let playGround = new Field(10, 10);
console.log(playGround.playGame());