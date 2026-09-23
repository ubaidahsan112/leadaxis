import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Booking = ({ name }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate("/booking");
      });
    } else {
      navigate("/booking");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBooking}
      className="group flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-lime-200 hover:shadow-lg hover:shadow-lime-300/20"
    >
      <span>{name}</span>

      <FiArrowUpRight
        size={17}
        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </button>
  );
};

export default Booking;