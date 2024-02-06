import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const logOut = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};


	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src="/avatar.png" alt="avatarOfUser" />
				
				<div className={styles['name']}>Parsefal</div>
				<div className={styles['email']}>something@yandex.com</div>
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
					Корзинка</NavLink>
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

