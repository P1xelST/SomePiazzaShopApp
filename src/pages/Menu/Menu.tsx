import styles from './Menu.module.css';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { useEffect, useState } from 'react';
import { Product } from '../../Interfaces/pizza.interface';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';
import {MenuList}  from './MenuList/MenuList';

export function Menu() {
	// here you may use fetch or axios
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined> ();
	const getMenu = async () => {
		try {
			setLoading(true);
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setLoading(false);
			console.log('Kira topchik \n 🌚🌹 \n go watch movie together? \n If you have free time');
		} catch (err) {
			console.log(err);
			if(err instanceof Error) {
				setError(err.message);
			}
			setLoading(false);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав'/>
		</div>
		<div>
			{error && <>Ошибка: {error}</>}
			{!isLoading && <MenuList products={products} />}
			{isLoading && <>Загрузка данных...</>}
		</div>
	</>;
}

export default Menu;