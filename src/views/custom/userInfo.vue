<template>
  <el-form :model="userDetailInfo" ref="userInfoForm" label-width="100px">
    <el-col :span="12">
      <el-form-item label="登录账号">
        {{userDetailInfo.loginNo}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="登录密码">
        {{userDetailInfo.loginPwd}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="角色选择">
        {{formatRole(userDetailInfo.roleId)}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品选择">
        {{formatProduct(userDetailInfo.specInfoId)}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="邮箱">
        {{userDetailInfo.email}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号状态">
        {{formatStatus(userDetailInfo.userStatus)}}
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="备注信息">
        {{userDetailInfo.note}}
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'userUpdateModal',
    props: ['userDetailInfo'],
    data() {
      return {
        roleOptions: [],
        productOptions: [],
        accountStatusOption: [
          { label: '有效', value: 1 },
          { label: '无效', value: 0 }
        ]
      }
    },
    methods: {
      // 格式化角色
      formatRole(roleId) {
        for (let i = 0; i < this.roleOptions.length; i++) {
          if (this.roleOptions[i].roleId === roleId) {
            return this.roleOptions[i].roleName
          }
        }
      },
      // 格式化产品
      formatProduct(proIds) {
        const result = []
        for (let i = 0; i < this.productOptions.length; i++) {
          for (let j = 0; j < proIds.length; j++) {
            if (this.productOptions[i].specInfoId === proIds[j]) {
              result.push(this.productOptions[i].specInfoName)
              break
            }
          }
        }
        return result.join(',')
      },
      getRoles() {
        this.$store.dispatch('GetRolesByUser').then(data => {
          this.roleOptions = data
        })
      },
      getProducts() {
        this.$store.dispatch('GetProByUser').then(data => {
          this.productOptions = data
        })
      },
      // 格式化状态
      formatStatus(status) {
        const statusObj = {
          1: '有效',
          0: '无效'
        }
        return statusObj[status]
      },
      initForm() {
        this.$refs['userInfoForm'].resetFields()
      }
    },
    created() {
      console.log(this.userDetailInfo)
      this.getRoles()
      this.getProducts()
    }
  }
</script>

