import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((state: RootState) => state.user.profile);
	const items = useSelector((state: RootState) => state.cart.items);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logOut = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};


	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src="/avatar.png" alt="avatarOfUser" />
				
				<div className={styles['name']}>{profile?.name}</div>
				<div className={styles['email']}>{profile?.email}</div>
			</div>
			<div className={styles['menu']}>
				<NavLink to='/' className={({isActive}) => cn(styles['link'], {
					[styles.active]: isActive
				})}>
					<img className={styles['icon']} src="/menu-icon.svg" alt="menu-icon" />
					Менюшка</NavLink>
				<NavLink to='/cart' className={({isActive}) => cn(styles['link'], {
					[styles.active]: isActive
				})}>
					<img className={styles['icon']} src="/cart-icon.svg" alt="cart-icon" />
					Корзинка <span className={styles['cart-count']}>{items.reduce((acc, item) => acc += item.count, 0)}</span></NavLink>
			</div>
			<img width='200' height='155' src="/ui-shigure-shigure-ui.gif"/>
			<div className={styles['btn-fixed']}>
				<Button className={styles['exit']} onClick={logOut}>
					<img src="/exitIcon.svg" alt="exitIcon" />
				Выход
				</Button>
			</div>
		</div>
		<div className={styles['content']}>
			<Outlet/>
		</div>
	</div>;
}

