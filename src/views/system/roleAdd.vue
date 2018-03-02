<template>
  <el-form :model="roleAddInfo" style="min-height: 200px;" :rules="roleAddRule" ref="addRoleForm" label-width="100px">
    <el-col :span="12">
      <el-form-item label="角色名称：" prop="roleName">
        <el-input v-model="roleAddInfo.roleName"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号状态：">
        <el-select v-model="roleAddInfo.roleStatus" placeholder="请选择">
          <el-option
            v-for="item in accountStatusOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="备注信息：">
        <el-input type="textarea" v-model="roleAddInfo.note"></el-input>
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
                  <el-checkbox @click.native="handleOneCheckAll($event,item)" v-cloak v-if="!item.secondMenu" :indeterminate="item.isIndeterminate" v-model="item.checkAll"> {{item.moduleName}}</el-checkbox>
                      <span v-if="item.secondMenu" v-cloak>{{item.moduleName}}</span>
              </div>
              <div class="right h40">
                  <el-checkbox v-if="item.secondMenu" :indeterminate="item.isIndeterminate && !item.firstCheckAll" @change="checkSecondAll(item)" v-model="item.firstCheckAll"> 所有</el-checkbox>

                  <el-checkbox-group v-model="item.checkedOpts" @change="handleOneCheckedOptsChange(item)" v-else>
                      <el-checkbox  v-for="m in item.moduleOpts" :label="m.moduleId" :key="m.moduleId" v-cloak> {{m.moduleName}}</el-checkbox>
                  </el-checkbox-group>
              </div>
              <div class="line"></div>
              <ul v-show="item.secondMenu&&!item.folded">
                  <li class="h40" v-for="(secondMenu) in item.secondMenu" :key="secondMenu.moduleId">
                      <div class="left">
                          <el-checkbox   v-model="secondMenu.checkAll" :indeterminate="secondMenu.isIndeterminate && !secondMenu.checkAll" @change="handleCheckAllChange($event, item,secondMenu)" v-cloak>
                              {{secondMenu.moduleName}}
                          </el-checkbox>
                      </div>
                      <div class="right">
                          <el-checkbox-group v-model="secondMenu.checkedOpts" @change="handleCheckedOptsChange(item, secondMenu)">
                              <el-checkbox v-for="p in secondMenu.moduleOpts" :label="p.moduleId" :key="p.moduleId" v-cloak >
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
    name: 'roleAddModal',
    props: ['roleAddInfo'],
    data() {
      const roleName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('角色名称不能为空'))
        }
        this.$store.dispatch('CheckRepeatForRole', value).then(data => {
          if (parseInt(data.code, 10) === 200) {
            callback()
          } else {
            callback(new Error(data.msg))
          }
        })
      }
      return {
        moduleData: [],
        moduleProps: {
          children: 'nextLevel',
          label: 'moduleName'
        },
        selectModuleData: [],
        accountStatusOption: [
          { label: '有效', value: 1 },
          { label: '无效', value: 0 }
        ],
        roleAddRule: {
          roleName: [
            { validator: roleName, trigger: 'blur', required: true }
          ]
        }
      }
    },
    methods: {
      fold: function(item) {
        if (typeof item.folded === 'undefined') {
          this.$set(item, 'folded', true)
        } else {
          item.folded = !item.folded
        }
      },
      // 全选一项 (二级)
      handleCheckAllChange(event, item, secondMenu) {
        const arr = []
        for (let a = 0; a < secondMenu.moduleOpts.length; a++) {
          arr.push(secondMenu.moduleOpts[a].moduleId)
        }
        if (typeof secondMenu.checkedOpts === 'undefined') {
          this.$set(secondMenu, 'checkedOpts', arr)
        }
        secondMenu.checkedOpts = event ? arr : []
        // if (typeof secondMenu === 'undefined') {
        //     this.$set(secondMenu, 'isIndeterminate', false)
        // }
        // secondMenu.isIndeterminate = false;
        if (typeof secondMenu.checkAll === 'undefined') {
          this.$set(secondMenu, 'checkAll', true)
        }
        if (typeof item.isIndeterminate === 'undefined') {
          this.$set(item, 'isIndeterminate', true)
        }
        for (let a = 0; a < item.secondMenu.length; a++) {
          if (!item.secondMenu[a].checkAll) {
            item.isIndeterminate = true
            for (let a = 0; a < item.secondMenu.length; a++) {
              if (item.secondMenu[a].checkAll) {
                break
              } else {
                item.isIndeterminate = false
                item.firstCheckAll = false
              }
            }
            break
          } else {
            item.isIndeterminate = false
            item.firstCheckAll = true
          }
        }
        this.refreshModuleTree()
      },
      // 单选
      handleCheckedOptsChange(item, secondMenu) {
        const checkedCount = secondMenu.checkedOpts.length
        if (typeof secondMenu.checkAll === 'undefined') {
          this.$set(secondMenu, 'checkAll', false)
        }
        if (typeof secondMenu.isIndeterminate === 'undefined') {
          this.$set(secondMenu, 'isIndeterminate', false)
        }
        if (typeof item.isIndeterminate === 'undefined') {
          this.$set(item, 'isIndeterminate', true)
        }
        secondMenu.isIndeterminate = checkedCount > 0 && checkedCount < secondMenu.moduleOpts.length
        secondMenu.checkAll = checkedCount === secondMenu.moduleOpts.length
        if (checkedCount === 0) {
          secondMenu.isIndeterminate = false
        }
        for (let a = 0; a < item.secondMenu.length; a++) {
          if (!item.secondMenu[a].checkAll) {
            item.isIndeterminate = true
            for (let b = 0; b < item.secondMenu.length; b++) {
              if (item.secondMenu[b].checkedOpts.length > 0) {
                break
              } else {
                item.isIndeterminate = false
                item.firstCheckAll = false
              }
            }
            break
          } else {
            item.isIndeterminate = false
            item.firstCheckAll = true
          }
        }
        this.refreshModuleTree()
      },
      // 点击所有
      checkSecondAll: function(item) {
        if (typeof item.firstCheckAll === 'undefined') {
          this.$set(item, 'firstCheckAll', true)
        }
        for (let a = 0; a < item.secondMenu.length; a++) {
          this.checkItemAll(item.firstCheckAll, item.secondMenu[a])
        }
        item.isIndeterminate = false
      },
      checkItemAll(flag, item) {
        const arr = []
        for (let a = 0; a < item.moduleOpts.length; a++) {
          arr.push(item.moduleOpts[a].moduleId)
        }
        if (typeof item.checkedOpts === 'undefined') {
          this.$set(item, 'checkedOpts', arr)
        }
        item.checkedOpts = flag ? arr : []
        item.checkAll = flag
        if (!flag) {
          item.isIndeterminate = flag
        }
      },
      // 没有二级菜单
      handleOneCheckedOptsChange(item) {
        const checkedCount = item.checkedOpts.length
        if (typeof item.isIndeterminate === 'undefined') {
          this.$set(item, 'isIndeterminate', false)
        }
        if (typeof item.checkAll === 'undefined') {
          this.$set(item, 'checkAll', false)
        }
        item.isIndeterminate = checkedCount > 0 && checkedCount < item.moduleOpts.length
        item.checkAll = checkedCount === item.moduleOpts.length
      },
      handleOneCheckAll(event, item) {
        const arr = []
        for (let a = 0; a < item.moduleOpts.length; a++) {
          arr.push(item.moduleOpts[a].moduleId)
        }

        item.checkedOpts = event.target.checked ? arr : []
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
          const originModule = this.roleAddInfo.roleModules
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
        this.roleAddInfo.roleModules = []
        for (let i = 0; i < checkNodes.length; i++) {
          this.roleAddInfo.roleModules.push(checkNodes[i].moduleId)
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
