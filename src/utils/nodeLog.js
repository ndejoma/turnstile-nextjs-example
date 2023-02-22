/**
 *
 * A small utility format Object that are logged to Stdout in Node.js
 * It prettifies the objects that are logged to the Terminal
 * @export
 * @param {*} values
 */
export default function nodeLog(...values) {
	console.log('%o', ...values);
}
