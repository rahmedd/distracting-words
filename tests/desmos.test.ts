import * as fs from 'fs'
import { validateCode } from '../src/index'

const desmosTextFile = fs.readFileSync('desmos_distracting_words.txt', 'utf8').toString()
const distracting_words = desmosTextFile.replace(/\r\n/g,'\n').split('\n')

// Initial check
test('default words against default words', () => {
	distracting_words.forEach(word => {
		expect( validateCode(word, distracting_words, new Set()) ).toBe(false)
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
	const existingCodes: Set<string> = new Set()
	expect( validateCode(code, ['testWord'], existingCodes) ).toBe(true)
	expect( validateCode(code, ['testWord'], existingCodes) ).toBe(false)
})

// combinations
test('distracting word and in existing_codes', () => {
	const code = 'fuzzy'
	const existing_codes: Set<string> = new Set([code])
	expect( validateCode(code, distracting_words, existing_codes) ).toBe(false)
})

test('distracting word and not in existing_codes', () => {
	const code = 'fuzzy'
	const existing_codes: Set<string> = new Set()
	expect( validateCode(code, distracting_words, existing_codes) ).toBe(false)
})

test('not distracting word and not in existing_codes', () => {
	const code = 'laptop'
	const existing_codes: Set<string> = new Set()
	expect( validateCode(code, distracting_words, existing_codes) ).toBe(true)
})

test('not distracting word and in existing_codes', () => {
	const code = 'laptop'
	const existing_codes: Set<string> = new Set([code])
	expect( validateCode(code, ['testWord'], existing_codes) ).toBe(false)
})

// Cassroom code tests
test('start with a distracting word', () => {
	expect( validateCode('RATS42', distracting_words, new Set()) ).toBe(false)
})

test('char in the middle and end of a distracting word ', () => {
	expect( validateCode('RA1TSF', distracting_words, new Set()) ).toBe(false)
})

test('char in the beginning and middle of a distracting word', () => {
	expect( validateCode('3RQATS', distracting_words, new Set()) ).toBe(false)
})

test('distracting word/numbers in the middle of another distracting word', () => {
	expect( validateCode('P7R7ATS7', distracting_words, new Set()) ).toBe(false)
})

test('non distracting code', () => {
	expect( validateCode('miceand', distracting_words, new Set()) ).toBe(true)
})

test('three numbers in a non distracting word', () => {
	expect( validateCode('1i11ypad', distracting_words, new Set()) ).toBe(true)
})