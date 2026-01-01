
const SelectionCard = ({ title, price, onClick, className, Illustration }) => {
    return (
        <div
            onClick={onClick}
            className={`
        cursor-pointer 
        group 
        relative 
        overflow-hidden 
        rounded-2xl 
        border 
        border-white/10 
        bg-fins-green/60
        p-8 
        transition-all 
        duration-500 
        hover:border-fins-gold
        hover:bg-fins-green/80 
        hover:shadow-2xl
        hover:shadow-fins-gold/20
        backdrop-blur-sm
        flex
        flex-col
        items-center
        justify-center
        gap-6
        min-h-[350px]
        animate-pulse-border
        ${className}
      `}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-fins-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Decorative circle element behind text */}
            <div className="absolute w-32 h-32 rounded-full bg-fins-gold/5 blur-2xl group-hover:bg-fins-gold/10 transition-all duration-500" />

            {/* Illustration Area */}
            {Illustration && (
                <div className="w-48 h-32 relative z-10 transition-transform duration-500 group-hover:scale-110">
                    <Illustration className="w-full h-full drop-shadow-2xl" />
                </div>
            )}

            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-center relative z-10 font-serif">
                {title}
            </h2>

            <p className="text-2xl text-fins-gold relative z-10 font-light tracking-wide">
                {price}
            </p>
        </div>
    );
};

export default SelectionCard;
