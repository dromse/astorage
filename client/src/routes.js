import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Main from './pages/Main'
import Upload from './pages/Upload'
import Login from './pages/Login'
import Profile from './pages/Profile'
import MyProfile from './pages/MyProfile'

import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
  SIGN_UP_ROUTE,
  UPLOAD_ROUTE,
  MY_PROFILE_ROUTE,
} from './utils/consts'

export const authRoutes = [
  { path: UPLOAD_ROUTE, Component: Upload },
  { path: SETTINGS_ROUTE, Component: Settings },
  { path: PROFILE_ROUTE, Component: Profile },
  { path: MY_PROFILE_ROUTE, Component: MyProfile },
]

export const publicRoutes = [
  { path: MAIN_ROUTE, Component: Main },
  { path: LOGIN_ROUTE, Component: Login },
  { path: SIGN_UP_ROUTE, Component: SignUp },
  { path: PROFILE_ROUTE, Component: Profile },
]
