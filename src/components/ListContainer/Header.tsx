'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { SelectedItem, Fruit } from './types';

interface HeaderProps {
	items: SelectedItem[];
	setItems: Dispatch<SetStateAction<SelectedItem[]>>;
}

const Header = ({ items, setItems }: HeaderProps): JSX.Element => {
	const [selectAll, setSelectAll] = useState<boolean>(false);
	const [toggle, setToggle] = useState<boolean>(false);

	const selectAllHandler = (value: boolean) => {
		setSelectAll(value);
		const updatedItems = items.map((item) => ({
			...item,
			checked: value,
		}));
		setItems(updatedItems);
		setToggle(true);
	};

	return (
		<div className="header">
			<div className="flex justify-between items-center font-semibold cursor-pointer">
				<div
					className="checkbox"
					onClick={() => selectAllHandler(!selectAll)}>
					<input
						type="checkbox"
						name="select-all-checkbox"
						id="select-all-checkbox"
						checked={selectAll}
						onChange={() => selectAllHandler(!selectAll)}
					/>
					<label id="checkbox">
						<svg viewBox="0 0 100 100">
							<path
								className="box"
								d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"
							/>
							<polyline
								className="check"
								points="25.5,53.5 39.5,67.5 72.5,34.5 "
							/>
						</svg>
					</label>
				</div>
				<h3 onClick={() => setToggle(!toggle)}>Owoce</h3>

				<div className="arrow">
					{toggle ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m19.5 8.25-7.5 7.5-7.5-7.5"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m4.5 15.75 7.5-7.5 7.5 7.5"
							/>
						</svg>
					)}
				</div>
			</div>
			{toggle && (
				<ul className="my-5 ">
					{items.map((item) => {
						return (
							<Item
								checked={item.checked}
								key={item.fruit.name}
								name={item.fruit.name}
								price={item.fruit.price}
								setItems={setItems}
							/>
						);
					})}
				</ul>
			)}
		</div>
	);
};

interface ItemProps {
	checked: boolean;
	name: string;
	price?: number;
	setItems: Dispatch<SetStateAction<SelectedItem[]>>;
}

const Item = ({ checked, name, price, setItems }: ItemProps): JSX.Element => {
	const clickHandler = () => {
		setItems((prevState) => {
			return prevState.map((item) => {
				if (item.fruit.name === name) {
					return { ...item, checked: !checked };
				}

				return item;
			});
		});
	};

	return (
		<div className="Item flex justify-between items-center p-3 border-b border-gray-200">
			<div className="flex justify-between items-center ">
				<div
					className="checkbox"
					onClick={() => clickHandler()}>
					<input
						type="checkbox"
						name={name}
						id={name}
						checked={checked}
						onChange={() => clickHandler()}
					/>
					<label id="checkbox">
						<svg viewBox="0 0 100 100">
							<path
								className="box"
								d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"
							/>
							<polyline
								className="check"
								points="25.5,53.5 39.5,67.5 72.5,34.5 "
							/>
						</svg>
					</label>
				</div>
				<div className="ml-4 font-semibold">{name}</div>
			</div>
			{price && <div className="price font-semibold pr-6">{price} zł</div>}
		</div>
	);
};

export default Header;

// 1: <Header/> - powinien zawierać checkbox i strzałkę jak. klikniesz na checkbox to wszystkie elementy z listy (<Content />) powinny być zaznaczone, jak na strzałkę to lista rozwinie się
