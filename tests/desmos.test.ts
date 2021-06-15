import * as fs from 'fs'
// const fs = require('fs')
import { validateCode } from '../src/index'
// const validateCode = require('../src/index')

const desmosText = fs.readFileSync('desmos_distracting_words.txt', 'utf8').toString()
const desmosWords = desmosText.replace(/\r\n/g,'\n').split('\n')

// Initial check
test('default words against default words', () => {
	desmosWords.forEach(word => {
		expect( validateCode(word, desmosWords, new Set()) ).toBe(false)
	})
})

// Testing exceptions
test('empty code', () => {
	expect( () => validateCode('', ['testWord'], new Set()) ).toThrow('code is required')
})

test('empty array distracting_words', () => {
	expect( () => validateCode('testCode', [], new Set()) ).toThrow('distracting_words is empty')
})

// Testing existing codes
test('existing code', () => {
	const code = 'x'
	const existing_codes: Set<string> = new Set([code]) // create a set with a code
	expect( validateCode(code, ['testWord'], existing_codes) ).toBe(false)
})

test('adding the same code twice', () => {
	const code = 'x'
	const existing_codes: Set<string> = new Set()
	expect( validateCode(code, ['testWord'], existing_codes) ).toBe(true)
	expect( validateCode(code, ['testWord'], existing_codes) ).toBe(false)
})

// Cassroom code tests
test('code: RATS42', () => {
	expect( validateCode('RATS42', desmosWords, new Set()) ).toBe(false)
})

test('code: RA1TSF', () => {
	expect( validateCode('RA1TSF', desmosWords, new Set()) ).toBe(false)
})

test('code: 3RQATS', () => {
	expect( validateCode('3RQATS', desmosWords, new Set()) ).toBe(false)
})

test('code: PIR7ATS77', () => {
	expect( validateCode('P7R7ATS7', desmosWords, new Set()) ).toBe(false)
})

test('code: mice', () => {
	expect( validateCode('miceand', desmosWords, new Set()) ).toBe(true)
})

test('code: 1i11ypad', () => {
	expect( validateCode('1i11ypad', desmosWords, new Set()) ).toBe(true)
})