/*eslint-disable*/
import memory from 'rollup-plugin-memory';
import buble from 'rollup-plugin-buble';

export default function(config) {
	let format = config.format;
	return {
		external: [
			'preact',
			'preact/hooks',
			'dlv'
		],
		output: {
			strict: false,
			exports: format==='es' ? null : 'named',
			globals: {
				preact: 'preact',
				'preact/hooks': 'preactHooks',
				dlv: 'dlv'
			}
		},
		plugins: [
			format!=='es' && memory({
				path: 'src/entry.js',
				contents: "export { default } from './index';"
			}),
			buble({
				jsx: 'h'
			})
		].filter(Boolean)
	};
}
