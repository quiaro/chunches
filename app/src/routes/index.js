import HomePublic from './HomePublic'
import HomePrivate from './HomePrivate'
import OfferedItems from './OfferedItems'
import OwnedItems from './OwnedItems'
import MyNetwork from './Network'
import LoginCallback from './LoginCallback'
import NotFoundPage from './NotFoundPage'

const routes = [
  {
    path: '/',
    name: 'public-home',
    exact: true,
    public: true,
    component: HomePublic,
  },
  {
    path: '/home',
    name: 'private-home',
    exact: true,
    component: HomePrivate,
  },
  {
    path: '/offered',
    name: 'offered',
    exact: true,
    component: OfferedItems,
  },
  {
    path: '/owned',
    name: 'owned',
    exact: true,
    component: OwnedItems,
  },
  {
    path: '/network',
    name: 'network',
    exact: true,
    component: MyNetwork,
  },
  {
    path: '/callback',
    name: 'callback',
    public: true,
    component: LoginCallback,
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFoundPage,
  },
];

export default routes;
