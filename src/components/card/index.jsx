function Card(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-md bg-white bg-clip-border dark:!bg-navy-800 dark:text-white ${extra} border border-black`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
