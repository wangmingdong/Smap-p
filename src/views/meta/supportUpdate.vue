<template>
  <el-form :model="proEditInfo" :rules="proEditRule" ref="editProForm" label-position="left" label-width="150px" label-suffix=":" :inline="true">
    <el-col :span="12">
      <el-form-item label="产品名称" prop="specInfoName">
        <el-input v-model="proEditInfo.specInfoName"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品类型">
        <el-select v-model="proEditInfo.specType" @change="changeSpecType" placeholder="请选择">
          <el-option
            v-for="item in paramOption.specInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="上级产品">
        <el-select v-model="proEditInfo.fatherSpecId" @change="changeFatherSpecName" placeholder="请选择">
          <el-option
            v-for="item in paramOption.fatherInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品模式">
        <el-select v-model="proEditInfo.modeType" placeholder="请选择">
          <el-option
            v-for="item in paramOption.modeType"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品状态">
        <el-select v-model="proEditInfo.valid" placeholder="请选择">
          <el-option
            v-for="item in paramOption.valid"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品类型（二级）">
        <el-select v-model="proEditInfo.specTypeSec" placeholder="请选择">
          <el-option
            v-for="item in paramOption.specTypeSec"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="访问上线（天）">
        <el-input-number v-model="proEditInfo.dayMaxDownTimes" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="访问上线（分钟）">
        <el-input-number v-model="proEditInfo.minMaxDownTimes" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="全局共享标志">
        <el-radio-group v-model="proEditInfo.smapcFlag">
          <el-radio label="0">不共享</el-radio>
          <el-radio label="1">共享</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="产品介绍">
        <el-input v-model="proEditInfo.specInfoDesc"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'proUpdateModal',
    props: ['proEditInfo'],
    data() {
      const specInfoName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('产品名称不能为空'))
        }
        this.$store.dispatch('CheckRepeatForPro', { specInfoName: value, specInfoId: this.proEditInfo.specInfoId }).then(data => {
          if (parseInt(data.code, 10) === 200) {
            callback()
          } else {
            callback(new Error(data.msg))
          }
        })
      }
      return {
        paramOption: {
          modeType: [],
          smapcFlag: [],
          specInfo: [],
          specTypeSec: [],
          valid: [],
          fatherInfo: []
        },
        proEditRule: {
          specInfoName: [
            { validator: specInfoName, trigger: 'blur', required: true }
          ]
        }
      }
    },
    methods: {
      // 获取下拉参数
      getParams() {
        this.$store.dispatch('GetParamByPro').then(data => {
          if (data) {
            this.paramOption = data
            this.paramOption.fatherInfo = this.paramOption.specInfo[parseInt(this.proEditInfo.specType, 10) - 1].fatherSpecInfo
          }
        })
      },
      // 切换产品类型
      changeSpecType(data) {
        this.paramOption.fatherInfo = this.paramOption.specInfo[parseInt(data, 10) - 1].fatherSpecInfo
        if (this.paramOption.fatherInfo.length) {
          this.proEditInfo.fatherSpecId = this.paramOption.fatherInfo[0].id
        }
      },
      changeFatherSpecName(data) {
        this.$nextTick(() => {
          this.proEditInfo.fatherSpecId = data
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

