<template>
  <el-form :model="proDetailInfo" ref="editProForm" label-position="right" label-width="150px" label-suffix=":" :inline="true">
    <el-col :span="12">
      <el-form-item label="产品名称">
        {{proDetailInfo.specInfoName}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品类型">
        {{formatSelectOpts(paramOption.specInfo, proDetailInfo.specType)}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="上级产品">
        {{formatSelectOpts(paramOption.fatherInfo, proDetailInfo.fatherSpecId)}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品模式">
        {{formatSelectOpts(paramOption.modeType, proDetailInfo.modeType)}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品状态">
        {{formatSelectOpts(paramOption.valid, proDetailInfo.valid)}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品类型（二级）">
        {{formatSelectOpts(paramOption.specTypeSec, proDetailInfo.specTypeSec)}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="访问上限（天）">
        {{proDetailInfo.dayMaxDownTimes}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="访问上限（分钟）">
        {{proDetailInfo.minMaxDownTimes}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="全局共享标志">
        {{formatShareStatus(proDetailInfo.smapcFlag)}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品介绍">
        {{proDetailInfo.specInfoDesc}}
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'proUpdateModal',
    props: ['proDetailInfo'],
    data() {
      return {
        paramOption: {
          modeType: [],
          smapcFlag: [],
          specInfo: [],
          specTypeSec: [],
          valid: [],
          fatherInfo: []
        }
      }
    },
    methods: {
      // 获取下拉参数
      getParams() {
        this.$store.dispatch('GetParamByPro').then(data => {
          if (data) {
            this.paramOption = data
            this.paramOption.fatherInfo = this.paramOption.specInfo[parseInt(this.proDetailInfo.specType, 10) - 1].fatherSpecInfo
          }
        })
      },
      // 格式化下拉列表内容
      formatSelectOpts(opts, data) {
        for (let i = 0; i < opts.length; i++) {
          if (opts[i].id === data) {
            return opts[i].name
          }
        }
      },
      // 共享状态
      formatShareStatus(status) {
        const statusObj = {
          0: '不共享',
          1: '共享'
        }
        return statusObj[status]
      },
      // 切换产品类型
      changeSpecType(data) {
        this.paramOption.fatherInfo = this.paramOption.specInfo[parseInt(data, 10) - 1].fatherSpecInfo
        if (this.paramOption.fatherInfo.length) {
          this.proDetailInfo.fatherSpecId = this.paramOption.fatherInfo[0].id
        }
      },
      changeFatherSpecName(data) {
        this.$nextTick(() => {
          this.proDetailInfo.fatherSpecId = data
        })
      },
      initForm() {
        this.$refs['editProForm'].resetFields()
      }
    },
    created() {
      this.getParams()
    }
  }
</script>
