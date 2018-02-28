<template>
  <el-form :model="roleAddInfo" style="min-height: 200px;" :rules="roleAddRule" ref="addRoleForm" label-width="100px">
    <el-col :span="12">
      <el-col :span="24">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input v-model="roleAddInfo.roleName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
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
      // 清空树勾选
      refreshModuleTree() {
        this.$refs.moduleTree.setCheckedKeys([])
      },
      // 获取模块权限
      getModules() {
        this.$store.dispatch('GetModules').then(data => {
          this.moduleData = data
          this.$refs.moduleTree.setCheckedKeys(this.roleAddInfo.roleModules)
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

