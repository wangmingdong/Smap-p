<template>
  <el-form :model="authorityAddInfo" ref="addAuthorityForm" label-width="150px">
    <el-col :span="12">
      <el-form-item label="登录账号：">
        {{authorityAddInfo.customerName}}
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="产品类型：">
        <el-select v-model="authorityAddInfo.specType" @change="changeSpecType" placeholder="请选择">
          <el-option
            v-for="item in proTypeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="产品列表：">
        <el-select v-model="authorityAddInfo.specInfoId" @change="changeSpecList" placeholder="请选择">
          <el-option
            v-for="item in productOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    {{authorityAddInfo.userSpecModeId}}
  </el-form>
</template>
<script>
  export default {
    name: 'authorityUpdateModal',
    props: ['authorityAddInfo', 'authorityCustomer'],
    data() {
      return {
        proTypeOptions: [],
        productOptions: [],
        selectProType: [],
        proProp: {
          children: 'specInfo',
          label: 'name',
          value: 'id'
        }
      }
    },
    methods: {
      // 切换产品类型
      changeSpecType(data) {
        for (let i = 0; i < this.proTypeOptions.length; i++) {
          if (this.proTypeOptions[i].id === data) {
            this.productOptions = this.proTypeOptions[i].specInfo
            this.authorityAddInfo.specInfoId = this.productOptions[0].id
            break
          }
        }
      },
      changeSpecList(data) {
        this.authorityAddInfo.specInfoId = data
      },
      getParams() {
        this.$store.dispatch('GetAuthorityParams').then(data => {
          this.proTypeOptions = data.specType
          this.authorityAddInfo.specType = this.proTypeOptions[0].id
          if (this.authorityAddInfo.specType) {
            this.changeSpecType(this.authorityAddInfo.specType)
          }
        })
      },
      initForm() {
        this.$refs['addAuthorityForm'].resetFields()
      }
    },
    created() {
      this.getParams()
    }
  }
</script>

