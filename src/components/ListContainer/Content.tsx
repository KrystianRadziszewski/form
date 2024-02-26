'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { SelectedItem } from './types';

interface ContentProps {
	items: SelectedItem[];
	setItems: Dispatch<SetStateAction<SelectedItem[]>>;
}

const Content = ({ items, setItems }: ContentProps): JSX.Element => {
	return (
		<div className="content mt-4 ">
			{items.map((item) => {
				return (
					<ContentItem
						item={item}
						setItems={setItems}
						key={item.fruit.name}
					/>
				);
			})}
		</div>
	);
};

interface ContentItemProps {
	item: SelectedItem;
	setItems: Dispatch<SetStateAction<SelectedItem[]>>;
}

const ContentItem = ({ item, setItems }: ContentItemProps): JSX.Element => {
	const [price, setPrice] = useState<number | undefined>(item.fruit.price);

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPrice = parseFloat(e.target.value);
		setPrice(isNaN(newPrice) ? undefined : newPrice);
	};

	const handleSetPrice = () => {
		setItems((prevState) => {
			return prevState.map((stateItem) => {
				if (stateItem.fruit.name === item.fruit.name) {
					return { ...stateItem, fruit: { ...stateItem.fruit, price: price } };
				}

				return stateItem;
			});
		});
	};

	return (
		<div
			key={item.fruit.name}
			className={`contentItem flex flex-col mt-4 gap-2 ${!item.checked ? 'hidden' : ''}`}>
			<span className="ml-2 font-semibold">{item.fruit.name}</span>
			{item.checked && (
				<>
					<input
						type="number"
						value={price !== undefined ? price : ''}
						onChange={handlePriceChange}
						placeholder="Wprowadź cenę"
						className="ml-2 mb-1 border rounded p-1"
					/>
					<button
						className="ml-2 w-32 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={() => handleSetPrice()}>
						Dodaj cenę
					</button>
				</>
			)}
		</div>
	);
};

export default Content;

// 2: <Content/> - powinien zawierać listę elementów, każdy ma checkbox. Jeśli checkbox zostanie zaznaczony to powinien pojawić się input gdzie można wpisać cenę. jeśli kliknie się dodaj cenę to cena pojawi się obok elementu
