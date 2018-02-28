<template>
  <div class="menu-wrapper">
    <div v-loading.body="sideLoading">
      <template v-for="item in routes" v-if="!item.hidden&&item.children">
        <router-link v-if="item.children.length===0 && !item.children[0].children && !item.alwaysShow" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
          <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
            <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
            <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.name||item.path" :key="item.name" v-show="item.meta && item.meta.visible">
          <template slot="title">
            <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
          </template>

          <template v-for="child in item.children" v-if="!child.hidden && child.meta && child.meta.visible">
            <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

            <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
              <el-menu-item :index="item.path+'/'+child.path" @click="selectMenu(child.meta.moduleId)">
                <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sideLoading: true
    }
  },
  methods: {
    selectMenu(id) {
      this.$store.dispatch('GetModuleAuthority', id).then(() => {
        // this.sideLoading = false
      }).catch(() => {
        // this.sideLoading = false
      })
    }
  },
  mounted: function() {
    const routes = this.routes
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].meta) {
        routes[i].meta.visible = false
        const authorities = this.$store.getters.authority
        for (var auth in authorities) {
          // 一级菜单权限
          if (routes[i].meta.title === auth) {
            routes[i].meta.visible = true
            // 二级菜单权限
            if (routes[i].children) {
              for (let y = 0; y < routes[i].children.length; y++) {
                const routeChild = routes[i].children[y]
                if (routeChild.meta) {
                  routeChild.meta.visible = false
                  for (let n = 0; n < authorities[auth].length; n++) {
                    const authInfo = authorities[auth][n]
                    if (routeChild.meta.title === authInfo.moduleName) {
                      routeChild.meta.visible = true
                      routeChild.meta.moduleId = authInfo.pmModulesId
                      break
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    // 处理初始化未隐藏项站位空白
    setTimeout(() => {
      this.sideLoading = false
    })
    // 刷新页面，查询按钮权限
    this.selectMenu(this.$router.history.current.meta.moduleId)
  }
}
</script>
