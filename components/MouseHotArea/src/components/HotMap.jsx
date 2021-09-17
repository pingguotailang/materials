import React, { useEffect, useRef } from 'react';
import './HotMap.scss';
import h337 from 'heatmap.js';
const HotMap = (props) => {
	const { data, width, height } = props;
	const ref = useRef();
	useEffect(() => {
		ref.current.heatmapInstance = h337.create({
			container: document.getElementsByClassName('MouseHotArea')[0],
			radius: 10,
		});
	}, []);
	useEffect(() => {
		if (data.length > 0) {
			const _data = data.map((item) => {
				return { x: item.x * width, y: item.y * height, value: item.value };
			});
			ref.current.heatmapInstance && ref.current.heatmapInstance.setData({ max: 20, min: 0, data: _data });
		}
	}, [data]);

	return <div ref={ref} className="MouseHotArea" style={{ width, height }}></div>;
};
export default HotMap;
