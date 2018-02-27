const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  authority: state => state.user.authority,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  moduleOpts: state => state.user.moduleOpts,
  userList: state => state.userManage.userList,
  userTotal: state => state.userManage.userTotal
}
export default getters
