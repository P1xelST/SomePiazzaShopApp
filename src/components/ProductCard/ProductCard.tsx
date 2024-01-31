import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

function ProductCard(props:ProductCardProps) {
	return (
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{backgroundImage:`url('${props.img}')`}}>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span>₽</span>
					</div>
					<button className={styles['add-to-card']}>
						<img src="/order.svg" alt="order" />
					</button>   
					<div className={styles['rating']}>
						{props.rating}
						<img src="/star.svg" alt="star" />
					</div>
				</div> 
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.name}</div>
					<div className={styles['descr']}>{props.descr}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;