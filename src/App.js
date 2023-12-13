import React, { useState } from 'react';
import styles from './Calc.module.css';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operations = [
	{ id: 'clear', value: 'Clear' },
	{ id: '-', value: '-' },
	{ id: '+', value: '+' },
	{ id: '=', value: '=' },
];

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [isResult, setResult] = useState(false);

	const clickToNumber = (event) => {
		if (event.target === event.currentTarget) {
			return;
		}
		const targetValue = event.target.innerText;
		if (operator) {
			setOperand2(operand2 + targetValue);
			setResult(false);
		} else {
			setOperand1(operand1 + targetValue);
			setResult(false);
		}
	};

	const clickToCount = (event) => {
		const targetValue = event.target.innerText;
		if (targetValue === 'Clear') {
			setOperand1('');
			setOperand2('');
			setOperator('');
			setResult(false);
		}
		if (targetValue === '+') {
			setOperator('+');
			setResult(false);
		}
		if (targetValue === '-') {
			setOperator('-');
			setResult(false);
		}
		if (targetValue === '=') {
			setResult(true);
			if (operand2) {
				if (operator === '+') {
					setOperand1(Number(operand1) + Number(operand2));
					setOperand2('');
					setOperator('');
				}
				if (operator === '-') {
					setOperand1(Number(operand1) - Number(operand2));
					setOperand2('');
					setOperator('');
				}
			}
		}
	};

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<p className={isResult ? styles.resultValue : styles.value}>
					{operator ? operand2 : operand1}
				</p>
				<div className={styles.grids}>
					<div className={styles.grid} onClick={clickToNumber}>
						{numbers.map((item, index, array) => (
							<button
								key={index} // Всего 10 цифр, менять местами их не смысла, поэтому поставил индекс ключем
								className={
									index !== array.length - 1
										? styles.number
										: styles.null // Вынес отдельный класс для нуля, чтобы растянуть его в сетке grid
								}
							>
								{item}
							</button>
						))}
					</div>
					<div className={styles.grid2} onClick={clickToCount}>
						{operations.map((item) => (
							<button key={item.id} className={styles.operation}>
								{item.value}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
