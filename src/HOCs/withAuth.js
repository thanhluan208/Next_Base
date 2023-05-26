import { useRouter } from 'next/router';
import { useAuthentication } from 'src/provider/AuthenticationProvider';

const withAuth = Component => {
  const AuthenticatedComponent = () => {
    const { isLogged } = useAuthentication();
    const router = useRouter();

    if (!isLogged) {
      router.push('/login');
      return null;
    }

    return <Component />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
