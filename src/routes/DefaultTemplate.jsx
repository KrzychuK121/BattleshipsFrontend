import { Outlet } from 'react-router-dom';

function DefaultTemplate() {
	return (
		<main>
            <Outlet />
		</main>
	);
}

export default DefaultTemplate;