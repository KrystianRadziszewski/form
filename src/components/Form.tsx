'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
	category: yup.string().required('Wybierz kategorię'),
});

export const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="max-w-sm mx-auto mt-10">
			<div className="mb-4 grid">
				<label
					htmlFor="category"
					className="block text-gray-700 font-bold text-lg">
					Jedzenie
				</label>
				<select
					{...register('category')}
					className={`block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
						errors.category ? 'border-red-500' : ''
					}`}
					id="category">
					<option value="">Wybierz...</option>
					<option value="Warzywa">Warzywa</option>
					<option value="Owoce">Owoce</option>
				</select>
				{errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
			</div>
			<button
				type="submit"
				className="w-24 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
				Wyślij
			</button>
		</form>
	);
};

export default Form;
