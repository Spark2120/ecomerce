import { useEffect } from 'react';

function useScrollToTop() {
	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	useEffect(() => {
		scrollToTop();
	}, []);
}
export default useScrollToTop;
