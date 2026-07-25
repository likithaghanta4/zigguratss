
import { users } from '../data/users';
import { useArtistCarousel } from '../hooks/useArtistCarousel';
import ArtistShowcase from './ArtistShowcase';




const Mostviewart = () => {
	// Custom Hooks
	const { activeId, direction, handleMouseEnter, setActiveId } = useArtistCarousel(users);

	return (
		<div className="relative h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black overflow-hidden">

			<ArtistShowcase
				users={users}
				activeId={activeId}
				direction={direction}
				handleMouseEnter={handleMouseEnter}
				setActiveId={setActiveId}
			/>
		</div>
	);
};

export default Mostviewart;