export function validateCode(code: string, distracting_words: string[], existing_codes: Set<string>): boolean
{

	if (!code || !code.length)
	{
		throw new Error('code is required')
	}

	if (!distracting_words || !distracting_words.length)
	{
		throw new Error('distracting_words is empty')
	}

	// check if code exists already
	if (existing_codes.has(code))
	{
		return false
	}

	// I would move the modfied word list and compiled regEx outside of the function to improve performance.

	// convert distracting_words into regEx
	const expList = distracting_words.map( word => word.split('').join('.*') ) // adds regex code between each char
	const blockedWordsExp = new RegExp(expList.join('|'), 'i')

	// test classroom code against distracting_words regEx
	if (blockedWordsExp.test(code))
	{
		return false
	}

	existing_codes.add(code)
	return true
}