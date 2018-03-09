<template>
  <el-form :model="authorityEditInfo" ref="editAuthorityForm" label-width="150px">
    <el-col :span="12">
      <el-form-item label="登录账号：">
        <el-input v-model="authorityEditInfo.customerName" disabled></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="产品类型：">
        <el-select v-model="authorityEditInfo.specType" @change="changeSpecType" placeholder="请选择">
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
        <el-select v-model="authorityEditInfo.specInfoId" placeholder="请选择">
          <el-option
            v-for="item in productOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'authorityUpdateModal',
    props: ['authorityEditInfo'],
    data() {
      return {
        proTypeOptions: [],
        productOptions: []
      }
    },
    methods: {
      // 切换产品类型
      changeSpecType(data) {
        for (let i = 0; i < this.proTypeOptions.length; i++) {
          if (this.proTypeOptions[i].id === data) {
            this.productOptions = this.proTypeOptions[i].specInfo
            this.authorityEditInfo.specInfoId = this.productOptions[0].id
          }
        }
      },
      getParams() {
        this.$store.dispatch('GetAuthorityParams').then(data => {
          this.proTypeOptions = data.specType
          if (this.authorityEditInfo.specType) {
            for (let i = 0; i < this.proTypeOptions.length; i++) {
              if (this.proTypeOptions[i].id === this.authorityEditInfo.specType) {
                this.productOptions = this.proTypeOptions[i].specInfo
              }
            }
          }
        })
      },
      initForm() {
        this.$refs['editAuthorityForm'].resetFields()
      }
    },
    created() {
      this.getParams()
    }
  }
</script>

