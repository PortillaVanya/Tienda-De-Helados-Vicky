export const Loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative ${sizes[size]}`}>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-pink-500/20 rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-pink-500 rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
