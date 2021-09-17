import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const SchulteGrid = forwardRef((props, ref) => {
	const { row, col, start, onFin, ...others } = props;
	const [data, setData] = useState([]);
	const [isFin, setIsFin] = useState(false);
	const [selected, setSelected] = useState(new Array(col * row).fill(false));
	const [lastSelected, setLastSelected] = useState(null);
	const [errorSelect, setErrorSelect] = useState(null);
	let cols = new Array(col).fill(undefined);
	let rows = new Array(row).fill(undefined);
	useEffect(() => {
		ref.current.reSort = reSort;
		reSort();
	}, [row, col, start]);
	useEffect(() => {
		if (isFin) {
			onFin();
		}
	}, [isFin]);
	const reSort = () => {
		let alls = new Array(row * col).fill(undefined).map((item, index) => index + start);
		alls.sort(() => {
			return Math.random() - 0.5;
		});
		setData(alls);
		setIsFin(false);
		setSelected(new Array(col * row).fill(false));
		setLastSelected(null);
		setErrorSelect(null);
	};
	const setError = (count) => {
		setErrorSelect(count);
		setTimeout(() => {
			setErrorSelect(null);
		}, 200);
	};
	const onItemClick = (count) => {
		if (lastSelected === null) {
			if (count === start) {
				selected[count] = true;
				setLastSelected(count);
			} else {
				setError(count);
			}
		} else {
			if (selected[count]) {
			} else {
				if (count === lastSelected + 1) {
					selected[count] = true;
					setLastSelected(count);
					if (count === start + row * col - 1) {
						setIsFin(true);
					}
				} else {
					setError(count);
				}
			}
		}
	};
	return (
		<div ref={ref} className="SchulteGrid" {...others}>
			{rows.map((item, index) => {
				return (
					<div className="row" key={'row' + index}>
						{cols.map((ele, eleIndex) => {
							const allIndex = index * col + eleIndex;
							const currentCount = data[allIndex] || allIndex;
							const isItemSelected = selected && selected[currentCount];
							let bg = isItemSelected ? 'green' : '';
							if (errorSelect === currentCount) {
								bg = 'red';
							}
							return (
								<div
									onClick={() => {
										onItemClick(currentCount);
									}}
									className="col"
									key={'item' + currentCount}
									style={{ backgroundColor: bg }}
								>
									{currentCount}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
});

SchulteGrid.propTypes = {
	start: PropTypes.number,
	row: PropTypes.number,
	col: PropTypes.number,
	onFin: PropTypes.func,
};

SchulteGrid.defaultProps = {
	start: 1,
	row: 5,
	col: 5,
};
export default SchulteGrid;
