const axios = require('axios')

const json =
	'https://raw.githubusercontent.com/ensdomains/governance/420b2ce24ca18eba2ff2d13da40520be49f98923/airdrops/mainnet/{0}.json'

/* EDIT this array with all your addresses */
const addresses = [
	'0x49468F702436d1E590895fFA7155bCD393ce52aE',
	'0x734bB23e9EaFE199d808B4d3Cc4fadd66799dA2d',
]

const check_address = (address) => {
	const json_prefix = address.substring(2, 4)
	const url = json.replace(/\{0\}/, json_prefix)

	var config = {
		method: 'get',
		url: url,
	}

	axios(config)
		.then(function (res) {
			if (res?.data) {
				const { entries } = res.data

				if (entries?.hasOwnProperty(address)) {
					const {
						past_tokens,
						longest_owned_name,
						future_tokens,
						last_expiring_name,
						has_reverse_record,
						balance,
					} = entries[address]

					console.log(`${address}: ${(balance / 10 ** 18).toFixed(3)} ENS`)
				}
			}
		})
		.catch(function (err) {
			console.log(err)
		})
}

addresses.forEach((address) => {
	// toLowerCase to prevent mismatch when comparing checksummed addresses vs non checksummed ones
	check_address(address.toLowerCase())
})
