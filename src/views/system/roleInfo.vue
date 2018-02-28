<template>
  <el-form :model="roleInfo" style="min-height: 200px;" ref="addRoleForm" label-width="100px">
    <el-col :span="12">
      <el-col :span="24">
        <el-form-item label="角色名称：">
          {{roleInfo.roleName}}
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="账号状态：">
          {{formatStatus(roleInfo.roleStatus)}}
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注信息：">
          {{roleInfo.note}}
        </el-form-item>
      </el-col>
    </el-col>
    <el-col :span="12">
      <el-col :span="24">
        <el-form-item label="权限选择：">
          <el-tree :data="moduleData" :props="moduleProps" default-expand-all node-key="moduleId" ref="moduleTree" show-checkbox @check-change="selectModules" @node-click="clickModules"></el-tree>
        </el-form-item>
      </el-col>
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
      // 树结构初始化
      setTreeNode() {
        this.$refs.moduleTree.setCheckedKeys(this.roleInfo.roleModules)
      },
      // 清空树勾选
      refreshModuleTree() {
        this.$refs.moduleTree.setCheckedKeys([])
      },
      // 获取模块权限
      getModules() {
        this.$store.dispatch('GetModules').then(data => {
          this.moduleData = data
          // 默认禁止勾选
          for (let i = 0; i < this.moduleData.length; i++) {
            this.moduleData[i].disabled = true
            if (this.moduleData[i].nextLevel) {
              for (let j = 0; j < this.moduleData[i].nextLevel.length; j++) {
                this.moduleData[i].nextLevel[j].disabled = true
              }
            }
          }
          this.$refs.moduleTree.setCheckedKeys(this.roleInfo.roleModules)
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
      // 点击树节点
      clickModules(data) {
        console.log(data)
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

