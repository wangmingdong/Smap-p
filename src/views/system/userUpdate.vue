<template>
  <el-form :model="userEditInfo" :rules="userAddRule" ref="editUserForm" label-width="100px">
    <el-col :span="12">
      <el-form-item label="登录账号：">
        <el-input v-model="userEditInfo.loginNo" disabled></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="登录密码：">
        <el-input v-model="userEditInfo.loginPwd" auto-complete="off" disabled></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="角色选择：">
        <el-select v-model="userEditInfo.roleId" placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品选择：">
        <el-select v-model="userEditInfo.specInfoId" multiple placeholder="请选择">
          <el-option
            v-for="item in productOptions"
            :key="item.specInfoId"
            :label="item.specInfoName"
            :value="item.specInfoId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="userEditInfo.email"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号状态：">
        <el-select v-model="userEditInfo.userStatus" placeholder="请选择">
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
        <el-input type="textarea" v-model="userEditInfo.note"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'userUpdateModal',
    props: ['userEditInfo'],
    data() {
      const email = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        this.$store.dispatch('CheckRepeat', { email: value, userId: this.userEditInfo.userId }).then(data => {
          if (parseInt(data.code, 10) === 200) {
            callback()
          } else {
            callback(new Error(data.msg))
          }
        })
      }
      return {
        roleOptions: [],
        productOptions: [],
        accountStatusOption: [
          { label: '有效', value: '1' },
          { label: '无效', value: '0' }
        ],
        userAddRule: {
          email: [
            { validator: email, trigger: 'blur', required: true },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
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
      initForm() {
        this.$refs['editUserForm'].resetFields()
      }
    },
    created() {
      this.getRoles()
      this.getProducts()
    }
  }
</script>

