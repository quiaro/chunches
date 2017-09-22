import Home from '../components/Home'
import TheirItems from '../components/TheirItems'
import MyItems from '../components/MyItems'
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
    component: TheirItems,
  },
  {
    path: '/owned',
    name: 'owned',
    exact: true,
    component: MyItems,
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
