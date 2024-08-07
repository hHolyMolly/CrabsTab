import useGetMe from '@hooks/useGetMe';

import Router from '@configs/Router';

function App() {
  useGetMe();

  return <Router />;
}

export default App;
