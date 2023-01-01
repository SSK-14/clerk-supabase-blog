type Props = {
  children: JSX.Element,
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="container mx-auto mt-10 flex justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
