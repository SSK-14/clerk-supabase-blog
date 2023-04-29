type Props = {
  children: JSX.Element,
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="container h-screen mx-auto flex justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
