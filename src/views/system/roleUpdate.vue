<template>
  <el-form :model="roleEditInfo" style="min-height: 200px;" ref="editRoleForm" label-width="100px">
    <el-col :span="12">
      <el-col :span="24">
        <el-form-item label="角色名称：">
          {{roleEditInfo.roleName}}
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="账号状态：">
          <el-select v-model="roleEditInfo.roleStatus" placeholder="请选择">
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
          <el-input type="textarea" v-model="roleEditInfo.note"></el-input>
        </el-form-item>
      </el-col>
    </el-col>
    <el-col :span="12">
      <el-col :span="24">
        <el-form-item label="权限选择：">
          <el-tree :data="moduleData" :props="moduleProps" default-expand-all node-key="moduleId" ref="moduleTree" show-checkbox @check-change="selectModules"></el-tree>
        </el-form-item>
      </el-col>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'roleAddModal',
    props: ['roleEditInfo'],
    data() {
      return {
        moduleData: [],
        moduleProps: {
          children: 'nextLevel',
          label: 'moduleName'
        },
        selectModuleData: [],
        accountStatusOption: [
          { label: '有效', value: '1' },
          { label: '无效', value: '0' }
        ]
      }
    },
    methods: {
      // 清空树勾选
      refreshModuleTree() {
        this.$refs.moduleTree.setCheckedKeys([])
      },
      // 初始化勾选
      checkModuleTree() {
        this.$refs.moduleTree.setCheckedKeys([])
        this.$refs.moduleTree.setCheckedKeys(this.roleEditInfo.roleModules)
      },
      // 获取模块权限
      getModules() {
        this.$store.dispatch('GetModules').then(data => {
          this.moduleData = data
          this.$refs.moduleTree.setCheckedKeys(this.roleEditInfo.roleModules)
        })
      },
      // 选择树节点
      selectModules(data, checked, indeterminate) {
        const checkNodes = this.$refs.moduleTree.getCheckedNodes()
        this.roleEditInfo.roleModules = []
        for (let i = 0; i < checkNodes.length; i++) {
          this.roleEditInfo.roleModules.push(checkNodes[i].moduleId)
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

