import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import styles from './Login.module.css';
import Input from '../../components/Input/Input';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { LoginRespone } from '../../Interfaces/auth.nteraface';

export type LoginForm = {
	email: {
		value: string
	},
	password: {
		value: string
	}
}

export function Login() {
	const [error, setError] = useState<string | null>('');
	const navigate = useNavigate();

	const submit = async (e:FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & LoginForm;
		const {email,password} = target;

		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email:string, password:string) => {
		try {
			const {data} = await axios.post<LoginRespone>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			// console.log(data);
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		} catch(err) {
			if(err instanceof AxiosError) {
				console.error(err.message);
				setError(err.response?.data.message);
				setTimeout(() => {
					setError(null);
				},4000);
			}
		}
	};

	return <div className={styles['login']}>
		<Headling>Вход</Headling>
		{error && <div className={styles['error']}>{error}</div>}
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