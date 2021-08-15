export function portal(node: HTMLElement) {
	let target;

	function update() {
		console.log('update');
		target = document.querySelector('body');
		target.appendChild(node);
		node.hidden = false;
		console.log(node);
	}

	function destroy() {
		console.log('destroyed');
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	update();

	return {
		update,
		destroy,
	};
}
