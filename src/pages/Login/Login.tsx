import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import styles from './Login.module.css';
import Input from '../../components/Input/Input';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

export type LoginForm = {
	email: {
		value: string
	},
	password: {
		value: string
	}
}

export function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginState} = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if(jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e:FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const {email,password} = target;

		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email:string, password:string) => {
		dispatch(login({email, password}));
		// try {
		// 	const {data} = await axios.post<LoginRespone>(`${PREFIX}/auth/login`, {
		// 		email,
		// 		password
		// 	});
		// 	// console.log(data);
		// 	// localStorage.setItem('jwt', data.access_token);
		// 	dispatch(userActions.addJwt(data.access_token));
		// 	navigate('/');
		// } catch(err) {
		// 	if(err instanceof AxiosError) {
		// 		console.error(err.message);
		// 		setError(err.response?.data.message);
		// 		setTimeout(() => {
		// 			setError(null);
		// 		},4000);
		// 	}
		// }
	};

	return <div className={styles['login']}>
		<Headling>Вход</Headling>
		{loginState && <div className={styles['error']}>{loginState}</div>}
		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['field']}>
				<label htmlFor="email">Ваш email</label>
				<Input name='email' type="email" id='email' placeholder='email'/>
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Ваш password</label>
				<Input name='password' type="password" id='password' placeholder='Пароль'/>
			</div>
			<Button appearence='big' >Вход</Button>
		</form>
		<div className={styles['links']}>
			<div>Нет аакаунта?</div>
			<Link to="/auth/register">Зарегистрироваться</Link>
		</div>
	</div>;   
}