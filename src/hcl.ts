import type {CallbackResponse, HLJSApi} from 'highlight.js';

export default function (hljs: HLJSApi) {
    // map 'resource' in 'resource "aws_vpc" "main" {'
    // map 'data' in 'data "aws_vpc" "main" {'
    // map 'module' in 'module "main" {'
    // map 'ingress' in 'ingress {'
    // and more...
    const KEYWORDS = {
        scope: 'keyword',
        match: /\b(?<match>\w+)\b(?=(?:\s+".+")*\s*\{)/,
    };

    // for, in and if
    const FOR_KEYWORD = {
        scope: 'keyword',
        match: /(?<=\b)(?<match>for|in|if)(?=\b)/,
    };

    // the '?' in Conditional Expressions
    // condition ? true_val : false_val
    const QUESTION_MARK_IN_EXPRESSION = {
        scope: 'keyword',
        match: /(?<match>\?)/,
    };

    // the ':' in Conditional Expressions
    // condition ? true_val : false_val
    const COLON_IN_EXPRESSION = {
        scope: 'keyword',
        match: /(?<match>:)/,
    };

    // =>
    const ARROW_EXPRESSION = {
        scope: 'keyword',
        match: /(?<match>=>)/,
    };

    // true
    // false
    // null
    const LITERAL = {
        scope: 'literal',
        match: /(?<match>\btrue|false|null\b)/
    };

    // string
    // number
    // bool
    const TYPE = {
        scope: 'type',
        match: /(?<match>\bstring|number|bool\b)/
    };

    // 1 or 1.2
    const NUMBERS = {
        scope: 'number',
        match: /\b(?<match>\d+(\.\d+)?)\b/,
    };

    // "string"
    // "string and ${variable}"
    const STRINGS = {
        scope: 'string',
        begin: /(?<begin>")/,
        end: /(?<end>")/,
        contains: [
            {
                scope: 'subst',
                begin: /(?<begin>\$\{)/,
                end: /(?<end>})/,
            },
        ],
    };

    // <<JSON
    // { "name": "Allen" }
    // JSON
    //
    // or
    //
    // <<-JSON
    // { "name": "Allen" }
    // JSON
    const HEREDOC = {
        scope: 'string',
        begin: /<<-?[ \t]*(?<begin>\w+)\n/,
        end: /[ \t]*(?<end>\w+)\b/,
        'on:begin': (match: string[], response: CallbackResponse) => {
            response.data._beginMatch = match[1] || match[2];
        },
        'on:end': (match: string[], response: CallbackResponse) => {
            if (response.data._beginMatch !== match[1]) {
                response.ignoreMatch();
            }
        },
    };

    // somethingLikeThis(
    const FUNCTION = {
        scope: 'title.function',
        match: /(?<match>[a-zA-Z0-9_]+)(?=\()/,
    };

    // somethingLikeThis =
    // exclude the case like 'bucket =' in 'aws_s3_bucket.main.bucket == "something"'
    const RESOURCE_ATTRIBUTE = {
        scope: 'attr',
        match: /(?<!\S)(?<match>[\w\-]+)(?=\s*=[^=>])/,
    };

    // {}
    // []
    // ()
    // ,
    const PUNCTUATIONS = {
        scope: 'punctuation',
        match: /(?<match>[{}\[\](),])/,
    };

    // > and <
    // + and -
    // * and /
    // == and !=
    // <= and >=
    // !
    const OPERATORS = {
        scope: 'operator',
        match: /(?<match>[><+\-*\/]|<=|>=|==|!=|!)/,
    };

    // aws_instance.main.public_ip
    // the 'aws_instance.main' and '.public_ip' in 'aws_instance.main[0].public_ip'
    // the 'aws_instance.main' and '.public_ip' in 'aws_instance.main["web"].public_ip'
    const ATTRIBUTE = {
        scope: 'attr',
        match: /(?<match>[a-zA-Z0-9._*]+)/,
    };

    return {
        case_insensitive: false,
        aliases: ['tf', 'hcl', 'terraform', 'opentofu', 'packer'],
        contains: [
            hljs.COMMENT(/#/, /$/),
            KEYWORDS,
            FOR_KEYWORD,
            QUESTION_MARK_IN_EXPRESSION,
            COLON_IN_EXPRESSION,
            ARROW_EXPRESSION,
            LITERAL,
            TYPE,
            NUMBERS,
            STRINGS,
            HEREDOC,
            FUNCTION,
            RESOURCE_ATTRIBUTE,
            PUNCTUATIONS,
            OPERATORS,
            ATTRIBUTE
        ],
    };
}
