const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  authority: state => state.user.authority,
  setting: state => state.user.setting,
  userId: state => state.user.userId,
  permission_routers: state => state.permission.routers,
  moduleOpts: state => state.user.moduleOpts,
  menuOpts: state => state.user.menuOpts,
  userList: state => state.system.userList,
  userTotal: state => state.system.userTotal
}
export default getters
