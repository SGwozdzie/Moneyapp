function Button({ children, className, ...props }) {
  let classes = "btn-primary";

  if (className) {
    if (!classes.includes(className)) classes += ` ${className}`;
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
