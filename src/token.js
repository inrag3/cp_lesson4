const Tokens = Object.freeze({
    VARIABLE: "VARIABLE",
    NUMBER:  "NUMBER",
    PLUS: "PLUS",
    MINUS: "MINUS",
    MULTIPLY: "MULTIPLY",
    POWER: "POWER",
    LEFT_PARENTHESIS: "LEFT_PARENTHESIS",
    RIGHT_PARENTHESIS: "RIGHT_PARENTHESIS",
});

class Token {
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
}

export {Token, Tokens}