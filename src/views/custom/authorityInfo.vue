<template>
  <el-form ref="authorityInfoForm" label-width="100px" label-suffix=":">
    <div v-if="!authorityList.length" style="text-align: center;">无数据</div>
    <el-card class="box-card" v-if="authorityList.length" v-for="item in authorityList" :key="item.userSpecModeId">
      <el-col :span="12">
        <el-form-item label="登录账号">
          {{item.customerName}}
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="产品名称">
          {{item.specInfoName}}
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="产品类型">
          <span v-for="spec in specTypeOptions.specType" :key="spec.id" v-if="spec.id === item.specType">
            {{spec.name}}
          </span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="产品模式">
          <span v-for="mode in specTypeOptions.modeType" :key="mode.id" v-if="mode.id === item.specType">
            {{mode.name}}
          </span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="授权时间">
          {{item.authorizeTime}}
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="授权人员">
          {{item.authorizeName}}
        </el-form-item>
      </el-col>
    </el-card>
  </el-form>
</template>
<script>
  export default {
    props: ['authorityList'],
    data() {
      return {
        specTypeOptions: {
          modeType: [],
          specType: []
        }
      }
    },
    methods: {
      getParams() {
        this.$store.dispatch('GetSpecTypeParamsForPro').then(data => {
          this.specTypeOptions = data
        })
      },
      initForm() {
        this.$refs['authorityInfoForm'].resetFields()
      }
    },
    created() {
      this.getParams()
    }
  }
</script>

