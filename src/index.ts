const fs = require('fs')

function validateCode(code: string, distracting_words: string[], existing_codes: Set<string>): boolean
{
	try
	{
		// check if code exists already
		if (existing_codes.has(code))
		{
			return false
		}

		// convert distracting_words into regEx
		// I would move the modfied word list and compiled regEx outside of the function to improve performance.
		const expList = distracting_words.map( word => word.split('').join('.*') ) // add regex code between each char
		const blockedWordsExp = new RegExp(expList.join('|'), 'i')

		// test classroom code against distracting_words regEx
		if (blockedWordsExp.test(code))
		{
			return false
		}

		existing_codes.add(code)
		return true
	}
	catch (ex)
	{
		console.error(ex)
	}
}



const wordText: string = fs.readFileSync('desmos_distracting_words.txt', 'utf8').toString()

const wordList = wordText.replace(/\r\n/g,'\n').split('\n') // replace with appending every word to regex string instead of list
const existing_codes: Set<string> = new Set()


const testArr = 
[
	'rats',
	'rants',
	'RATS42',
	'RA1TSF',
	'3RQATS',
	'3RQATOS',
	'RATSEGGFUZZY',
	'bird',
	'bird',
]
testArr.forEach(i => console.log(`${i}: ${validateCode(i, wordList, existing_codes)}`) )

// const codeIsValid = validateCode('rats', wordList, existing_codes)
// console.log(codeIsValid)
let dbgr = 0;