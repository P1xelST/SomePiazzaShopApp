import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../Interfaces/pizza.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartAction } from '../../store/cart.slice';

const DELIVERY_FEE = 169;

export function Cart() {
	const [cartProducts, setCardProducts] = useState<Product[]>([]);
	const items = useSelector((s:RootState) => s.cart.items);
	const jwt = useSelector((s:RootState) => s.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const total = items.map(i => {
		const product = cartProducts.find(product => product.id === i.id);
		if(!product) {
			return 0;
		}
		return i.count * product.price;
	}).reduce((acc, item) => acc+= item,0);

	const getItem = async (id: number) => {
		const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)));
		setCardProducts(res);
	};

	const checkout = async () => {
		const {data} = await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartAction.clean());
		navigate('/success');
	};

	useEffect(() => {
		loadAllItems();
	},[items]);

	return <>
		<Headling className={styles['headling']}>Корзина</Headling>
		{items.map(i => {
			const product = cartProducts.find(product => product.id === i.id);
			if(!product) {
				return;
			}
			return <CartItem key={product.id} count={i.count} {...product}/>;
		})}
		<div className={styles['line']}> 
			<div className={styles['text']}>Итог</div>
			<div className={styles['price']}>{total}<span> ₽</span></div>
		</div>
		<hr className={styles['hr']}/>
		<div className={styles['line']}>
			<div className={styles['text']}>Доставка</div>
			<div className={styles['price']}>{DELIVERY_FEE}<span> ₽</span></div>
		</div>
		<hr className={styles['hr']}/>
		<div className={styles['line']}>
			<div className={styles['text']}>Итог {items.length}</div>
			<div className={styles['price']}>{total + DELIVERY_FEE}<span> ₽</span></div>
		</div>
		<div className={styles['checkout']}>
			<Button appearence='big' onClick={checkout}>оформить</Button>
		</div>
	</>;
}   