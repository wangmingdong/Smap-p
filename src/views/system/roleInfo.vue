<template>
  <el-form :model="roleInfo" style="min-height: 200px;" ref="addRoleForm" label-width="100px">
    <el-col :span="12">
      <el-form-item label="角色名称：">
        {{roleInfo.roleName}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号状态：">
        <el-tag :type="roleInfo.roleStatus | statusFilter">{{formatStatus(roleInfo.roleStatus)}}</el-tag>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="备注信息：">
        {{roleInfo.note}}
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <ul class="role-table col-xs-offset-2 col-md-offset-1 col-sm-offset-2">
          <li class="header">
              <div class="left">菜单列表</div>
              <div class="right">功能权限</div>
          </li>
          <div class="vertical-line"></div>
          <li  v-for="(item) in moduleData" :key="item.moduleId">
              <div class="left h40"  @click="fold(item)">
                  <i :class="{'el-icon-caret-right':item.folded,'el-icon-caret-bottom':!item.folded}"
                    v-cloak v-if="item.secondMenu"
                    class="item-icon"></i>
                  <el-checkbox v-cloak v-if="!item.secondMenu" :indeterminate="item.isIndeterminate" v-model="item.checkAll" disabled> {{item.moduleName}}</el-checkbox>
                      <span v-if="item.secondMenu" v-cloak>{{item.moduleName}}</span>
              </div>
              <div class="right h40">
                <el-tag :type="item.firstCheckAll ? 'success' : item.isIndeterminate? '' : 'info'">
                  所有
                  <i v-if="item.firstCheckAll" class="el-icon-check"></i>
                  <i v-if="item.isIndeterminate && !item.firstCheckAll" class="el-icon-minus"></i>
                  <i v-if="!item.firstCheckAll && !item.isIndeterminate" class="el-icon-close"></i>
                </el-tag>
              </div>
              <div class="line"></div>
              <ul v-show="item.secondMenu&&!item.folded">
                  <li class="h40" v-for="(secondMenu) in item.secondMenu" :key="secondMenu.moduleId">
                      <div class="left">
                          <el-tag :type="secondMenu.checkAll ? 'success' : secondMenu.isIndeterminate? '' : 'info'">
                            {{secondMenu.moduleName}}
                            <i v-if="secondMenu.checkAll" class="el-icon-check"></i>
                            <i v-if="secondMenu.isIndeterminate" class="el-icon-minus"></i>
                            <i v-if="!secondMenu.checkAll && !secondMenu.isIndeterminate" class="el-icon-close"></i>
                          </el-tag>
                      </div>
                      <div class="right">
                        <span class="btn-opts-cell" v-for="p in secondMenu.moduleOpts" :label="p.moduleId" :key="p.moduleId">
                          <el-tag :type="secondMenu.checkedOpts.indexOf(p.moduleId) > -1 ? 'success' : 'info'">
                            {{p.moduleName}}
                            <i v-if="secondMenu.checkedOpts.indexOf(p.moduleId) > -1" class="el-icon-check"></i>
                            <i v-if="secondMenu.checkedOpts.indexOf(p.moduleId) === -1" class="el-icon-close"></i>
                          </el-tag>
                        </span>
                      </div>
                      <div class="line"></div>
                  </li>
              </ul>
              <div class="line"></div>
          </li>
      </ul>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'roleInfoModal',
    props: ['roleInfo'],
    data() {
      return {
        moduleData: [],
        moduleProps: {
          children: 'nextLevel',
          label: 'moduleName',
          disabled: 'disabled'
        },
        selectModuleData: []
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'gray',
          1: 'success'
        }
        return statusMap[status]
      }
    },
    methods: {
      // 格式化状态
      formatStatus(status) {
        const patten = {
          0: '无效',
          1: '有效'
        }
        return patten[status]
      },
      fold: function(item) {
        if (typeof item.folded === 'undefined') {
          this.$set(item, 'folded', true)
        } else {
          item.folded = !item.folded
        }
      },
      // 判断二级项半选全选 清空树勾选
      refreshModuleTree() {
        for (let i = 0; i < this.moduleData.length; i++) {
          const secArray = this.moduleData[i].secondMenu
          this.moduleData[i].firstCheckAll = true
          if (secArray) {
            for (let j = 0; j < secArray.length; j++) {
              if (secArray[j].checkedOpts.length === secArray[j].moduleOpts.length) {
                secArray[j].checkAll = true
                this.moduleData[i].isIndeterminate = true
              } else if (secArray[j].checkedOpts.length === 0) {
                secArray[j].checkAll = false
                secArray[j].isIndeterminate = false
                this.moduleData[i].firstCheckAll = false
              } else {
                secArray[j].isIndeterminate = true
                this.moduleData[i].isIndeterminate = true
                this.moduleData[i].firstCheckAll = false
              }
              this.$set(secArray, j, secArray[j])
              this.$set(this.moduleData, i, this.moduleData[i])
            }
          }
        }
      },
      // 获取模块权限
      getModules() {
        this.$store.dispatch('GetModules').then(data => {
          this.moduleData = data
          const originModule = this.roleInfo.roleModules
          for (let i = 0; i < this.moduleData.length; i++) {
            for (let j = 0; j < originModule.length; j++) {
              if (this.moduleData[i].moduleId === originModule[j].moduleId) {
                this.moduleData[i] = Object.assign(this.moduleData[i], originModule[j])
              }
            }
          }
          this.refreshModuleTree()
        })
      },
      // 选择树节点
      selectModules(data, checked, indeterminate) {
        const checkNodes = this.$refs.moduleTree.getCheckedNodes()
        this.roleInfo.roleModules = []
        for (let i = 0; i < checkNodes.length; i++) {
          this.roleInfo.roleModules.push(checkNodes[i].moduleId)
        }
      },
      initForm() {
        this.$refs['addRoleForm'].resetFields()
      }
    },
    created() {
      this.getModules()
    },
    mounted() {
    }
  }
</script>

