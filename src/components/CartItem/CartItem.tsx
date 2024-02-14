import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartAction } from '../../store/cart.slice';
import { CartItemProps } from './CartItem.props';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const inc = () => {
		dispatch(cartAction.add(props.id));
	};

	const dec = () => {
		dispatch(cartAction.remove(props.id));
	};

	const remove = () => {
		dispatch(cartAction.delete(props.id));
	};

	return (
		<div className={styles['item']}>
			<div className={styles['image']} style={{backgroundImage:`url('${props.image}')`}}></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp; ₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['minus']} onClick={dec}>
					<img src="/minus.svg" alt="Удалить из корзины" />
				</button> 
				<div className={styles['number']}>{props.count}</div>
				<button className={styles['plus']} onClick={inc}>
					<img src="/plus.svg" alt="Добавить в корзину" />
				</button> 
				<button className={styles['remove']} onClick={remove}>
					<img src="/delete.svg" alt="Удалить все" />
				</button> 
			</div>
		</div>
	);
}

export default CartItem;