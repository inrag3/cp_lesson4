import {Lexer} from "../src/lexer";
import {Token, Tokens} from "../src/token";

describe("lexer class", () => {
    let lexer;

    beforeAll(() => {
        lexer = new Lexer();
    })

    test('empty string', () => {
        const tokens = lexer.tokenization("");
    
        const expected = [];
    
        expect(tokens).toStrictEqual(expected);
    });

    test('only spaces', () => {
        const tokens = lexer.tokenization("    ");
    
        const expected = [];
    
        expect(tokens).toStrictEqual(expected);
    });

    test('variables', () => {
        
        const tokens = lexer.tokenization("was dxy");
    
        const expected = [
            new Token(Tokens.VARIABLE, 'w'),
            new Token(Tokens.VARIABLE, 'a'),
            new Token(Tokens.VARIABLE, 's'),
            new Token(Tokens.VARIABLE, 'd'),
            new Token(Tokens.VARIABLE, 'x'),
            new Token(Tokens.VARIABLE, 'y'),
        ]
    
        expect(tokens).toBe(expected);
    })

    test('numbers', () => {
        const tokens = lexer.tokenization("122 3 0.2 62.33");
    
        const expected = [
            new Token(Tokens.NUMBER, '122'),
            new Token(Tokens.NUMBER, '3'),
            new Token(Tokens.NUMBER, '0.2'),
            new Token(Tokens.NUMBER, '62.33'),
        ]
    
        expect(tokens).toStrictEqual(expected);
    })

    test('operations', () => {
        const tokens = lexer.tokenization("*-* +^^*-");

        const expected = [
            new Token(Tokens.MULTIPLY, '*'),
            new Token(Tokens.MINUS, '-'),
            new Token(Tokens.MULTIPLY, '*'),
            new Token(Tokens.PLUS, '+'),
            new Token(Tokens.POWER, '^'),
            new Token(Tokens.POWER, '^'),
            new Token(Tokens.MULTIPLY, '*'),
            new Token(Tokens.MINUS, '-'),
        ]
        
        expect(tokens).toStrictEqual(expected);
    })
   
    test('mixed', () => {
        const tokens = lexer.tokenization("2x + 3.14y - z^2");
    
        const expected = [
            new Token(Tokens.NUMBER, '2'),
            new Token(Tokens.MULTIPLY, '*'),
            new Token(Tokens.VARIABLE, 'x'),
            new Token(Tokens.PLUS, '+'),
            new Token(Tokens.NUMBER, '3.14'),
            new Token(Tokens.MULTIPLY, '*'),
            new Token(Tokens.VARIABLE, 'y'),
            new Token(Tokens.MINUS, '-'),
            new Token(Tokens.VARIABLE, 'z'),
            new Token(Tokens.POWER, '^'),
            new Token(Tokens.NUMBER, '2'),
        ];
    
        expect(tokens).toStrictEqual(expected);
    });

    test('operation without spaces', () => {
        const tokens = lexer.tokenization("2x^2-3*y+5");
    
        const expected = [
            new Token(Tokens.NUMBER, '2'),
            new Token(Tokens.MULTIPLY, '*'),
            new Token(Tokens.VARIABLE, 'x'),
            new Token(Tokens.POWER, '^'),
            new Token(Tokens.NUMBER, '2'),
            new Token(Tokens.MINUS, '-'),
            new Token(Tokens.NUMBER, '3'),
            new Token(Tokens.MULTIPLY, '*'),
            new Token(Tokens.VARIABLE, 'y'),
            new Token(Tokens.PLUS, '+'),
            new Token(Tokens.NUMBER, '5'),
        ];
    
        expect(tokens).toStrictEqual(expected);
    });

    test('decimal and negative numbers', () => {
        const tokens = lexer.tokenization("-3.5 + 0.2 - -4");
    
        const expected = [
            new Token(Tokens.NUMBER, '-3.5'),
            new Token(Tokens.PLUS, '+'),
            new Token(Tokens.NUMBER, '0.2'),
            new Token(Tokens.MINUS, '-'),
            new Token(Tokens.NUMBER, '-4'),
        ];
    
        expect(tokens).toStrictEqual(expected);
    });

    test('empty parentheses', () => {
        const tokens = lexer.tokenization("()");
    
        const expected = [
            new Token(Tokens.LEFT_PARENTHESIS, '('),
            new Token(Tokens.RIGHT_PARENTHESIS, ')'),
        ];
    
        expect(tokens).toStrictEqual(expected);
    });

    test('expression with parentheses', () => {
        const tokens = lexer.tokenization("(2 + 3) * 4");
    
        const expected = [
            new Token(Tokens.LEFT_PARENTHESIS, '('),
            new Token(Tokens.NUMBER, '2'),
            new Token(Tokens.PLUS, '+'),
            new Token(Tokens.NUMBER, '3'),
            new Token(Tokens.RIGHT_PARENTHESIS, ')'),
            new Token(Tokens.MULTIPLY, '*'),
            new Token(Tokens.NUMBER, '4'),
        ];
    
        expect(tokens).toStrictEqual(expected);
    });

    test('nested parentheses', () => {
        const tokens = lexer.tokenization("(x + (y -    3)) ^ 2");
    
        const expected = [
            new Token(Tokens.LEFT_PARENTHESIS, '('),
            new Token(Tokens.VARIABLE, 'x'),
            new Token(Tokens.PLUS, '+'),
            new Token(Tokens.LEFT_PARENTHESIS, '('),
            new Token(Tokens.VARIABLE, 'y'),
            new Token(Tokens.MINUS, '-'),
            new Token(Tokens.NUMBER, '3'),
            new Token(Tokens.RIGHT_PARENTHESIS, ')'),
            new Token(Tokens.RIGHT_PARENTHESIS, ')'),
            new Token(Tokens.POWER, '^'),
            new Token(Tokens.NUMBER, '2'),
        ];
    
        expect(tokens).toStrictEqual(expected);
    });

});
