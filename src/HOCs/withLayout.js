import { useRouter } from 'next/router';
import Layout from 'src/components/Layout/Layout';
import { useAuthentication } from 'src/provider/AuthenticationProvider';
import { useWalletConnector } from 'src/provider/WalletConnectProvider';

const withLayout = Component => {
  const LayoutedComponent = () => {
    // const { connectWallet } = useWalletConnector();

    return (
      <Layout>
        <Component />
      </Layout>
    );
  };

  return LayoutedComponent;
};

export default withLayout;
