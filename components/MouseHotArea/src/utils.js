export const initRecord = (afterClick) => {
	window.document.addEventListener('click', (e) => {
		if (window.mouseHotData) {
		} else {
			window.mouseHotData = [];
		}
		const browserW = document.body.clientWidth;
		const browserH = document.body.clientHeight;
		window.mouseHotData.push({ x: Number((e.x / browserW).toFixed(2)), y: Number((e.y / browserH).toFixed(2)), value: 1 });
		afterClick(window.mouseHotData);
	});
};
