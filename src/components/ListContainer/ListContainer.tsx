'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import Content from './Content';
import { SelectedItem, Fruit } from './types';

const fruits: Fruit[] = [
	{
		name: 'Jabłka',
	},
	{
		name: 'Banany',
	},
	{
		name: 'Pomarańcze',
	},
	{
		name: 'Wiśnie',
	},
	{
		name: 'Winogrono',
	},
];

const ListContainer = (): JSX.Element => {
	const [items, setItems] = useState<SelectedItem[]>([]);

	useEffect(() => {
		let defaultItems: SelectedItem[] = [];
		fruits.map((fruit) => {
			defaultItems.push({ checked: false, fruit });
		});
		setItems(defaultItems);
	}, []);

	return (
		<div className="p-4 max-w-sm mx-auto mt-10 ">
			<Header
				items={items}
				setItems={setItems}
			/>
			<Content
				items={items}
				setItems={setItems}
			/>
		</div>
	);
};

export default ListContainer;

// 2. Lista o nazwie <ListContainer />
// - powinna zawierać 2 komponenty
// 1: <Header/> - powinien zawierać checkbox i strzałkę jak. klikniesz na checkbox to wszystkie elementy z listy (<Content />) powinny być zaznaczone, jak na strzałkę to lista rozwinie się
// 2: <Content/> - powinien zawierać listę elementów, każdy ma checkbox. Jeśli checkbox zostanie zaznaczony to powinien pojawić się input gdzie można wpisać cenę. jeśli kliknie się dodaj cenę to cena pojawi się obok elementu
