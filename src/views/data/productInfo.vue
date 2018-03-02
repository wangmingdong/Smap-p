<template>
  <el-form :model="productInfo" style="min-height: 200px;" ref="proInfoForm" label-width="100px">
    <el-col :span="12">
      <el-form-item label="版本：">
        {{productInfo.productName}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="数据文件：">
        {{productInfo.fileName}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="数据状态：">
        <el-tag :type="productInfo.fileState | statusFilter">{{formatStatus(productInfo.fileState)}}</el-tag>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="md5校验码：">
        {{productInfo.fileMD5}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="上传时间：">
        {{productInfo.createTime}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="发布时间：">
        {{productInfo.releaseTime}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="文件大小：">
        {{productInfo.fileSize}}
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="发布人员：">
        {{formatStatus(productInfo.releaseName)}}
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
  export default {
    name: 'productInfoModal',
    props: ['productInfo'],
    data() {
      return {
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: 'gray',
          1: '',
          2: 'success'
        }
        return statusMap[status]
      }
    },
    methods: {
      // 格式化状态
      formatStatus(status) {
        const patten = {
          0: '废弃',
          1: '未发布',
          2: '已发布'
        }
        return patten[status]
      },
      // 获取模块权限
      getModules() {
        this.$store.dispatch('GetModules').then(data => {
          this.moduleData = data
          // 默认禁止勾选
          for (let i = 0; i < this.moduleData.length; i++) {
            this.moduleData[i].disabled = true
            if (this.moduleData[i].nextLevel) {
              for (let j = 0; j < this.moduleData[i].nextLevel.length; j++) {
                this.moduleData[i].nextLevel[j].disabled = true
              }
            }
          }
        })
      }
    },
    created() {
      this.getModules()
    },
    mounted() {
    }
  }
</script>

