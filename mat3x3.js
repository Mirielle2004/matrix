/**
* @todo
* add inverse, determinant, mult
**/
class Mat3x3 {

    static validate(data) {
        let isValid = false;
        if(data instanceof Array) {
            if(data.length === 3) {
                for(let i=data.length-1; i > 0; i--) {
                    if(data[i].length < 3) 
                        throw new Error("Insufficient 3x3 matrice data");
                }
            } else {
                throw new Error("Insufficient 3x3 matrice data");
            }
        } else 
            throw new Error("Matrix must be an instance of Array");
    }

    static getData(arg) {
        if(arg instanceof Mat3x3) 
            return arg.data;
        else if(arg instanceof Array) {
            Mat3x3.validate(arg);
            return arg;
        }
        else 
            throw new Error("getData expects an argument of an Array instance");
    }

    static multiplyVec(vec, mat) {
        let res = [];
        let tmp = 0;
        let matData = Mat3x3.getData(mat);
        let vecData = vec;
        if(vec instanceof Array && vec.length === 3) 
            vecData = vec;
        else if(vec instanceof Object && vec.hasOwnProperty("x") 
            && vec.hasOwnProperty("y")) {
                vecData = [vec.x, vec.y, 1]
            }
        // multiply vec by row matrices
        for(let r=0; r < matData.length; r++) {
            tmp = 0;
            for(let j=0; j < matData.length; j++) {
                let prod = vecData[j] * matData[j][r];
                tmp += prod;
            }
            res.push(tmp);
        }
        return res;
    };

    static rotate(angle) {
        return new Mat3x3([
            [Math.cos(angle), Math.sin(angle), 0],
            [-Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1]
        ]);
    }

    static createEmpty() {
        return new Mat3x3([
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]);
    }

    /**
     * @constructor
     * @param {Array} data matrix data
     */
    constructor(data) {
        Mat3x3.validate(data);
        this.data = data;
    }

    /**
     * @method add
     * @description addition of matrices
     * @param {Object} arg a matrix
     * @returns {Mat3x3}
     */
    add(arg) {
        let res = [];
        let mat = Mat3x3.getData(arg);
        for(let r=0; r < this.data.length; r++) {
            res.push(new Array(3));
            for(let j=0; j < this.data.length; j++) {
                res[r][j] = this.data[r][j] + mat[r][j];
            }
        }
        return new Mat3x3(res);
    }

    /**
     * @method sub
     * @description subtraction of matrices
     * @param {Object} arg a matrix
     * @returns {Mat3x3}
     */
    sub(arg) {
        let res = [];
        let mat = Mat3x3.getData(arg);
        for(let r=0; r < this.data.length; r++) {
            res.push(new Array(3));
            for(let j=0; j < this.data.length; j++) {
                res[r][j] = this.data[r][j] - mat[r][j];
            }
        }
        return new Mat3x3(res);
    }

    /**
     * @method scale
     * @description scalar multiplication
     * @param {Object} arg a matrix
     * @returns {Mat3x3}
     */
    scale(s) {
        let res = [];
        let mat = Mat3x3.getData(arg);
        for(let r=0; r < this.data.length; r++) {
            for(let j=0; j < this.data.length; j++) {
                res[r][j] = this.data[r][j] * s;
            }
        }
        return new Mat3x3(res);
    }

    transpose() {
        return new Mat3x3([
            [this.data[0][0], this.data[1][0], this.data[2][0]],
            [this.data[0][1], this.data[1][1], this.data[2][1]],
            [this.data[0][2], this.data[1][2], this.data[2][2]]
        ]);
    }

}
