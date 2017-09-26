import Home from '../components/Home'
import OfferedItems from '../components/OfferedItems'
import OwnedItems from '../components/OwnedItems'
import MyNetwork from '../components/MyNetwork'
import Profile from '../components/Profile'
import Messages from '../components/Messages'
import LoginCallback from './LoginCallback'
import NotFoundPage from './NotFoundPage'

const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    public: true,
    component: Home,
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
    path: '/profile',
    name: 'profile',
    exact: true,
    component: Profile,
  },
  {
    path: '/messages',
    name: 'messages',
    exact: true,
    component: Messages,
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
    public: true,
    component: NotFoundPage,
  },
];

export default routes;
