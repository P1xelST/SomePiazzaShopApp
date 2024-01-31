import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../Interfaces/pizza.interface';
import { Suspense } from 'react';

export function Products() {
	const data = useLoaderData() as {data: Product};

	return <>
		<Suspense fallback={'Загружаем'}>
			<Await resolve={data.data}>
				{({data}: {data:Product}) => (
					<>Product - {data.name}</>
				)}
			</Await>
		</Suspense>
	</>;
}   