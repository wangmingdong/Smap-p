<template>
  <el-form :model="userAddInfo" :rules="userAddRule" ref="addUserForm" label-width="100px">
    <el-col :span="12">
      <el-form-item label="登录账号" prop="loginNo">
        <el-input v-model="userAddInfo.loginNo"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="登录密码">
        <el-input v-model="userAddInfo.loginPwd" auto-complete="off"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="角色选择">
        <el-select v-model="userAddInfo.roleId" placeholder="请选择">
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
      <el-form-item label="产品选择">
        <el-select v-model="userAddInfo.specInfoId" multiple placeholder="请选择">
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
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userAddInfo.email"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号状态">
        <el-select v-model="userAddInfo.userStatus" placeholder="请选择">
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
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="userAddInfo.note"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'userAddModal',
    props: ['userAddInfo'],
    data() {
      const loginNo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'))
        }
        this.$store.dispatch('CheckRepeat', { loginNo: value }).then(data => {
          if (parseInt(data.code, 10) === 200) {
            callback()
          } else {
            callback(new Error(data.msg))
          }
        })
      }
      const email = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        this.$store.dispatch('CheckRepeat', { email: value }).then(data => {
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
          { label: '有效', value: 1 },
          { label: '无效', value: 0 }
        ],
        userAddRule: {
          loginNo: [
            { validator: loginNo, trigger: 'blur', required: true }
          ],
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
          if (this.roleOptions.length) {
            this.userAddInfo.roleId = this.roleOptions[0].roleId
          }
        })
      },
      getProducts() {
        this.$store.dispatch('GetProByUser').then(data => {
          this.productOptions = data
          if (this.productOptions.length) {
            this.userAddInfo.specInfoId = [this.productOptions[0].specInfoId]
          }
        })
      },
      initForm() {
        this.$refs['addUserForm'].resetFields()
      }
    },
    created() {
      this.getRoles()
      this.getProducts()
    },
    mounted() {
      // this.getRoles()
      // this.getProducts()
    }
  }
</script>

