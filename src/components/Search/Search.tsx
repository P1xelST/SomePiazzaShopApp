import styles from './Search.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({isValid = true, className, ...props}, ref) {
	return (
		<div className={styles['searchWrapper']}>
			<img className={styles['icon']} src="/searchIcon.svg" alt="searchIcon" />
			<input ref={ref} className={cn(styles['input'], className, {
				[styles['invalid']]: isValid
			})} {...props}/>
		</div>
	);
});

export default Search;