<template>
  <el-form :model="accountAddInfo" :rules="accountAddRule" ref="addAccountForm" label-suffix=":" label-width="110px" :inline="true">
    <el-col :span="12">
      <el-form-item label="登录账号" prop="loginNo">
        <el-input v-model="accountAddInfo.loginNo"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="登录密码" prop="loginPwd">
        <el-input v-model="accountAddInfo.loginPwd" auto-complete="off"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号类型">
        <el-select v-model="accountAddInfo.userType" placeholder="请选择">
          <el-option
            v-for="item in customOptions.userType"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号状态">
        <el-select v-model="accountAddInfo.userValid" placeholder="请选择">
          <el-option
            v-for="item in customOptions.userValid"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥">
        <el-input type="text" v-model="accountAddInfo.userKey">
          <el-button slot="append" @click="createKey">生成</el-button>
        </el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥有效性">
        <el-select v-model="accountAddInfo.keyValid" placeholder="请选择">
          <el-option
            v-for="item in customOptions.keyValid"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥开始时间">
        <el-date-picker
          v-model="accountAddInfo.keyBeginDate"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="秘钥开始时间">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥结束时间">
        <el-date-picker
          v-model="accountAddInfo.keyEndDate"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="秘钥结束时间">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="accountAddInfo.email"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="备注信息">
        <el-input v-model="accountAddInfo.note"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    props: ['accountAddInfo'],
    data() {
      const loginNo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('登录账号不能为空'))
        }
        this.$store.dispatch('CheckRepeatForAccount', { loginNo: this.accountAddInfo.loginNo }).then(data => {
          if (parseInt(data.code, 10) === 200) {
            callback()
          } else {
            callback(new Error(data.msg))
          }
        })
      }
      const loginPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('登录密码不能为空'))
        } else {
          callback()
        }
      }
      const email = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        this.$store.dispatch('CheckRepeatForAccount', { email: this.accountAddInfo.email }).then(data => {
          if (parseInt(data.code, 10) === 200) {
            callback()
          } else {
            callback(new Error(data.msg))
          }
        })
      }
      return {
        customOptions: {
          keyValid: [],
          userType: [],
          userValid: []
        },
        accountAddRule: {
          loginNo: [{ validator: loginNo, trigger: 'blur', required: true }],
          loginPwd: [{ validator: loginPwd, trigger: 'blur', required: true }],
          email: [
            { validator: email, trigger: 'blur', required: true },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change blur' }
          ]
        }
      }
    },
    methods: {
      // 初始化下拉列表值
      initSelection() {
        this.accountAddInfo.userType = this.customOptions.userType[0].id
        this.accountAddInfo.keyValid = this.customOptions.keyValid[0].id
        this.accountAddInfo.userValid = this.customOptions.userValid[0].id
      },
      // 生成秘钥
      createKey() {
        this.$refs['addAccountForm'].validateField('loginNo', msg => {
          if (!msg) {
            this.$refs['addAccountForm'].validateField('loginPwd', psdMsg => {
              if (!psdMsg) {
                this.$store.dispatch('GetUserKey', {
                  loginNo: this.accountAddInfo.loginNo,
                  loginPwd: this.accountAddInfo.loginPwd
                }).then(data => {
                  this.accountAddInfo.userKey = data.userKey
                })
              }
            })
          }
        })
      },
      getParams() {
        this.$store.dispatch('GetParamsByCustom').then(data => {
          this.customOptions = data
          this.initSelection()
        })
      },
      initForm() {
        this.$refs['addAccountForm'].resetFields()
      }
    },
    created() {
      this.getParams()
    }
  }
</script>

