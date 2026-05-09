import { clsx } from 'clsx';

export const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-md p-6',
        hover && 'hover:shadow-lg transition-shadow duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
