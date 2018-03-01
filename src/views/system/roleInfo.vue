<template>
  <el-form :model="roleInfo" style="min-height: 200px;" ref="addRoleForm" label-width="100px">
    <el-col :span="12">
      <el-form-item label="角色名称：">
        {{roleInfo.roleName}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号状态：">
        {{formatStatus(roleInfo.roleStatus)}}
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
                  <el-checkbox v-if="item.secondMenu" :indeterminate="item.isIndeterminate" v-model="item.firstCheckAll" disabled> 所有</el-checkbox>

                  <el-checkbox-group v-model="item.checkedOpts" @change="handleOneCheckedOptsChange(item)" v-else>
                      <el-checkbox  v-for="m in item.moduleOpts" :label="m.moduleId" :key="m.moduleId" disabled v-cloak> {{m.moduleName}}</el-checkbox>
                  </el-checkbox-group>
              </div>
              <div class="line"></div>
              <ul v-show="item.secondMenu&&!item.folded">
                  <li class="h40" v-for="(secondMenu) in item.secondMenu" :key="secondMenu.moduleId">
                      <div class="left">
                          <el-checkbox   v-model="secondMenu.checkAll" :indeterminate="secondMenu.isIndeterminate" disabled v-cloak>
                              {{secondMenu.moduleName}}{{secondMenu.isIndeterminate}}
                          </el-checkbox>
                      </div>
                      <div class="right">
                          <el-checkbox-group v-model="secondMenu.checkedOpts">
                              <el-checkbox v-for="p in secondMenu.moduleOpts" :label="p.moduleId" :key="p.moduleId" v-cloak  disabled>
                                  {{p.moduleName}}
                              </el-checkbox>
                          </el-checkbox-group>
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
    methods: {
      // 格式化状态
      formatStatus(status) {
        const patten = {
          0: '无效',
          1: '有效'
        }
        return patten[status]
      },
      // 判断二级项半选全选 清空树勾选
      refreshModuleTree() {
        for (let i = 0; i < this.moduleData.length; i++) {
          const secArray = this.moduleData[i].secondMenu
          if (secArray) {
            for (let j = 0; j < secArray.length; j++) {
              if (secArray[j].checkedOpts.length === secArray[j].moduleOpts.length) {
                secArray[j].checkAll = true
                this.moduleData[i].isIndeterminate = true
              } else if (secArray[j].checkedOpts.length === 0) {
                secArray[j].checkAll = false
                secArray[j].isIndeterminate = false
              } else {
                secArray[j].isIndeterminate = true
                this.moduleData[i].isIndeterminate = true
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

<style>

.role-table {
    border: 1px solid #e0e0e0;
    border-bottom: none;
    padding: 0;
    position: relative;
    list-style-type:none;
}

.header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e7e7e7;
    background: #F8F8F9;
    text-align: center;
}

.vertical-line {
    width: 1px;
    height: 100%;
    background: #ddd;
    position: absolute;
    left: 30%;
    top: 0
}

.left {
    width: 30%;
    float: left;
    padding-left: 10px;
    user-select: none;
    cursor: pointer;
}

.one {
    padding-left: 20px;
}

.right {
    width: 70%;
    float: left;
    padding-left: 10px;
}

.item-icon {
    margin-left: -5px;
    padding: 5px;
}

.line {
    clear: both;
    width: 100%;
    height: 1px;
    background: #e0e0e0;
}
.h40{
    height: 39px;
    line-height: 39px;
    list-style-type:none;
}
[v-cloak] {
    display: none;
}
</style>
