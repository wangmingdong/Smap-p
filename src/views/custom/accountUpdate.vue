<template>
  <el-form :model="accountEditInfo" :rules="accountEditRule" ref="editAccountForm" label-suffix=":" label-width="110px" :inline="true">
    <el-col :span="12">
      <el-form-item label="登录账号">
        <el-input v-model="accountEditInfo.loginNo" disabled></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="登录密码">
        <el-input v-model="accountEditInfo.loginPwd" auto-complete="off" disabled></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号类型">
        <el-select v-model="accountEditInfo.userType" disabled placeholder="请选择">
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
        <el-select v-model="accountEditInfo.userValid" placeholder="请选择">
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
        <el-input v-model="accountEditInfo.userKey" disabled></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥有效性">
        <el-select v-model="accountEditInfo.keyValid" placeholder="请选择">
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
          v-model="accountEditInfo.keyBeginDate"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="秘钥开始时间">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥结束时间">
        <el-date-picker
          v-model="accountEditInfo.keyEndDate"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="秘钥结束时间">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="accountEditInfo.email"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="备注信息">
        <el-input v-model="accountEditInfo.note"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    props: ['accountEditInfo'],
    data() {
      const email = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        this.$store.dispatch('CheckRepeatForAccount', { email: this.accountEditInfo.email }).then(data => {
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
        accountEditRule: {
          email: [
            { validator: email, trigger: 'blur', required: true },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change blur' }
          ]
        }
      }
    },
    methods: {
      getParams() {
        this.$store.dispatch('GetParamsByCustom').then(data => {
          this.customOptions = data
        })
      },
      initForm() {
        this.$refs['editAccountForm'].resetFields()
      }
    },
    created() {
      this.getParams()
    }
  }
</script>

