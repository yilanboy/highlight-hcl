import {describe, expect, it} from 'vitest';
import hljs from 'highlight.js/lib/core';
import hcl from '../src/index.js';

hljs.registerLanguage('hcl', hcl);

describe('highlight hashicorp configuration language', () => {
    it('should highlight the "resource" as keyword', () => {
        const code = 'resource "aws_vpc" "main" {';
        const result = hljs.highlightAuto(code, ['hcl']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">resource</span>');
    });

    it('should highlight the "data" as keyword', () => {
        const code = 'data "aws_vpc" "main" {';
        const result = hljs.highlightAuto(code, ['hcl']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">data</span>');
    });

    it('should highlight the "module" as keyword', () => {
        const code = 'module "main" {';
        const result = hljs.highlightAuto(code, ['hcl']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">module</span>');
    });

    it('should highlight the "variable" as keyword', () => {
        const code = 'variable "subnet_arn" {';
        const result = hljs.highlightAuto(code, ['hcl']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">variable</span>');
    });

    it('should highlight the "assert" as keyword', () => {
        const code = 'assert {';
        const result = hljs.highlightAuto(code, ['hcl']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">assert</span>');
    });

    it('should highlight the if expression', () => {
        const code = 'condition ? true_val : false_val';
        const result = hljs.highlightAuto(code, ['hcl']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">?</span>')
            .to.contain('<span class="hljs-keyword">:</span>');
    });

    it('should highlight the for expression', () => {
        const code = '{for s in var.list : s => upper(s)}';
        const result = hljs.highlightAuto(code, ['hcl']);

        expect(result.value)
            .to.contain('<span class="hljs-keyword">for</span>')
            .to.contain('<span class="hljs-keyword">in</span>')
            .to.contain('<span class="hljs-keyword">:</span>')
            .to.contain('<span class="hljs-keyword">=&gt;</span>');
    });

    it('should highlight "max()" as function', () => {
        const code = 'max(5, 12, 9)';
        const result = hljs.highlightAuto(code, ['hcl']);

        expect(result.value)
            .to.contain('<span class="hljs-title function_">max</span>');
    });

    it('should highlight "cidr_block" as attribute', () => {
        const code = 'cidr_block = each.value.cidr_block';
        const result = hljs.highlightAuto(code, ['hcl']);

        expect(result.value)
            .to.contain('<span class="hljs-attr">cidr_block</span>');
    });
});