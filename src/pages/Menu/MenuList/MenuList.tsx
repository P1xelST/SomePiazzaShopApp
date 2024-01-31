import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';
export function MenuList({products}: MenuListProps) {
	return <div className={styles['wrapper']}>
		{products.map(p => <ProductCard
			key={p.id}
			img={p.image}
			id={p.id}
			name={p.name}
			descr={p.ingridients?.join(', ')}
			rating={p.rating}
			price={p.price}
		/>
		)}
	</div>;
}