<template>
  <el-form :model="form" label-width="100px">
    <el-col :span="12">
      <el-form-item label="登录账号">
        <el-input v-model="userAddInfo.username"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="登录密码">
        <el-input v-model="userAddInfo.password" auto-complete="off"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="角色选择">
        <el-select v-model="userAddInfo.role" placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品选择">
        <el-select v-model="userAddInfo.product" placeholder="请选择">
          <el-option
            v-for="item in productOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="邮箱">
        <el-input v-model="userAddInfo.email"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="账号状态">
        <el-input v-model="userAddInfo.status"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="userAddInfo.memo"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'caseEditPanel',
    props: ['userAddInfo'],
    data() {
      return {
        form: null,
        roleOptions: [
          { label: '123', value: '123' }
        ],
        productOptions: [
          { label: '123', value: '123' }
        ]
      }
    }
  }
</script>

