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
	const existing_codes: Set<string> = new Set()
	expect( validateCode(code, ['testWord'], existing_codes) ).toBe(true)
	expect( validateCode(code, ['testWord'], existing_codes) ).toBe(false)
})

// Cassroom code tests
test('code: RATS42', () => {
	expect( validateCode('RATS42', distracting_words, new Set()) ).toBe(false)
})

test('code: RA1TSF', () => {
	expect( validateCode('RA1TSF', distracting_words, new Set()) ).toBe(false)
})

test('code: 3RQATS', () => {
	expect( validateCode('3RQATS', distracting_words, new Set()) ).toBe(false)
})

test('code: PIR7ATS77', () => {
	expect( validateCode('P7R7ATS7', distracting_words, new Set()) ).toBe(false)
})

test('code: miceand', () => {
	expect( validateCode('miceand', distracting_words, new Set()) ).toBe(true)
})

test('code: 1i11ypad', () => {
	expect( validateCode('1i11ypad', distracting_words, new Set()) ).toBe(true)
})