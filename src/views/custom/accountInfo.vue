<template>
  <el-form :model="accountDetailInfo" label-suffix=":" label-width="100px" :inline="true">
    <el-col :span="12">
      <el-form-item label="登录账号">
        {{accountDetailInfo.loginNo}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="登录密码">
        ******
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号类型">
        <span v-for="item in customOptions.userType" v-if="item.id == accountDetailInfo.userType" :key="item.id">
          {{item.name}}
        </span>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号状态">
        <span v-for="item in customOptions.userValid" v-if="item.id == accountDetailInfo.userValid" :key="item.id">
          {{item.name}}
        </span>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥">
        {{accountDetailInfo.userKey}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥有效性">
        <span v-for="item in customOptions.keyValid" v-if="item.id == accountDetailInfo.keyValid" :key="item.id">
          {{item.name}}
        </span>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥开始时间">
        {{accountDetailInfo.keyBeginDate}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="秘钥结束时间">
        {{accountDetailInfo.keyEndDate}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="邮箱">
        {{accountDetailInfo.email}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="备注信息">
        {{accountDetailInfo.note}}
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    props: ['accountDetailInfo'],
    data() {
      return {
        customOptions: {
          keyValid: [],
          userType: [],
          userValid: []
        },
        accountStatusOption: [
          { label: '有效', value: '1' },
          { label: '无效', value: '0' }
        ]
      }
    },
    methods: {
      getParams() {
        this.$store.dispatch('GetParamsByCustom').then(data => {
          this.customOptions = data
        })
      },
      initForm() {
      }
    },
    created() {
      this.getParams()
    }
  }
</script>

