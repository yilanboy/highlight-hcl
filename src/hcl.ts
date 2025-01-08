import type {HLJSApi} from 'highlight.js';

export default function (hljs: HLJSApi) {
    // map 'resource' in 'resource "aws_vpc" "main" {'
    // map 'data' in 'data "aws_vpc" "main" {'
    // map 'module' in 'module "main" {'
    // map 'ingress' in 'ingress {'
    // and more...
    const KEYWORDS = {
        scope: 'keyword',
        match: /\b\w+\b(?=(?:\s+".+")*\s*\{)/,
    };

    // the ':' in Conditional Expressions
    // condition ? true_val : false_val
    const QUESTION_MARK_IN_EXPRESSION = {
        scope: 'keyword',
        match: /\?/,
    };

    // the ':' in Conditional Expressions
    // condition ? true_val : false_val
    const COLON_IN_EXPRESSION = {
        scope: 'keyword',
        match: /:/,
    };

    const ARROW_EXPRESSION = {
        scope: 'keyword',
        match: /=>/,
    };

    const OPERATORS = {
        scope: 'operator',
        match: /[><+\-*\/]|==|<=|>=|!=/,
    };

    // 1 or 1.2
    const NUMBERS = {
        scope: 'number',
        match: /\b\d+(\.\d+)?\b/,
    };

    // "string"
    // "string and ${variable}"
    const STRINGS = {
        scope: 'string',
        begin: /"/,
        end: /"/,
        contains: [
            {
                scope: 'subst',
                begin: /\$\{/,
                end: /}/,
            },
        ],
    };

    // somethingLikeThis(
    const FUNCTION = {
        scope: 'title.function',
        match: /[a-zA-Z0-9_]+(?=\()/,
    };

    // somethingLikeThis =
    // exclude the case like 'bucket =' in 'aws_s3_bucket.main.bucket == "something"'
    const ATTRIBUTE = {
        scope: 'attr',
        match: /(?<!\S)[\w\-]+(?=\s*=[^=>])/,
    };

    const PUNCTUATIONS = {
        scope: 'punctuation',
        match: /[{}\[\](),]/,
    };

    return {
        case_insensitive: false,
        aliases: ['tf', 'hcl', 'terraform', 'opentofu', 'packer'],
        keywords: {
            keyword: ['for', 'in'],
            literal: ['true', 'false', 'null'],
        },
        contains: [
            hljs.COMMENT(/#/, /$/),
            KEYWORDS,
            QUESTION_MARK_IN_EXPRESSION,
            COLON_IN_EXPRESSION,
            ARROW_EXPRESSION,
            OPERATORS,
            NUMBERS,
            STRINGS,
            FUNCTION,
            ATTRIBUTE,
            PUNCTUATIONS,
        ],
    };
}
