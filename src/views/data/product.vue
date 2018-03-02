<template>
  <div class="app-container">
    <div class="table-header-container">
      <div class="table-search-container">
        <div class="form-container">
          <div class="form-label">产品：</div>
          <div class="form-content">
            <el-select v-model="specInfoId" @change="queryData" placeholder="请选择">
              <el-option
                v-for="item in productOptions"
                :key="item.specInfoId"
                :label="item.specInfoName"
                :value="item.specInfoId">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-container">
          <div class="form-label">版本：</div>
          <div class="form-content">
            <el-input v-model="productName" :clearable="true" v-on:change="queryData"></el-input>
          </div>
        </div>
      </div>
      <div class="table-btn-group">
        <el-button v-if="moduleOpts && moduleOpts.indexOf('3') > -1" @click="queryData">查询</el-button>
        <el-button type="primary" v-if="moduleOpts && moduleOpts.indexOf('5') > -1" @click="operatePro(1)">发布</el-button>
        <el-button type="danger" v-if="moduleOpts && moduleOpts.indexOf('6') > -1" @click="operatePro(0)">作废</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" ref="productTable" empty-text="无数据"
     @select-all="selectAllData" @select="selectRowData" element-loading-text="加载中" border fit highlight-current-row>
      <el-table-column align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{scope.row.specProductId}}
        </template>
      </el-table-column>
      <el-table-column label="版本" min-width="110">
        <template slot-scope="scope">
          {{scope.row.productName}}
        </template>
      </el-table-column>
      <el-table-column label="数据文件" min-width="110">
        <template slot-scope="scope">
          {{scope.row.fileName}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="上传时间" min-width="100">
        <template slot-scope="scope">
          <i class="el-icon-time" v-if="scope.row.createTime"></i>
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间" min-width="100">
        <template slot-scope="scope">
          <i class="el-icon-time" v-if="scope.row.releaseTime"></i>
          <span>{{scope.row.releaseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据状态" min-width="60" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.fileState | statusFilter">{{formatStatus(scope.row.fileState)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="md5校验码" min-width="110">
        <template slot-scope="scope">
          {{scope.row.fileMD5}}
        </template>
      </el-table-column>
      <el-table-column label="详细信息" align="center" min-width="50">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showInfo(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        @size-change="changeSizePage"
        @current-change="currentPageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        :total="dataTotal">
      </el-pagination>
    </div>
    <!-- 详情 -->
    <el-dialog :title="proInfoTitle" :visible.sync="productInfoModal">
      <product-info-form ref="productInfoComponent" :product-info="productInfo"></product-info-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="productInfoModal = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
import productInfoForm from '@/views/data/productInfo.vue'

export default {
  components: {
    productInfoForm
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      dataTotal: 0,
      searchText: '',
      specInfoId: '',
      productName: '',
      proInfoTitle: '',
      productOptions: [],
      roleAddModal: false,
      roleUpdateModal: false,
      multipleSelection: [],
      productInfoModal: false,
      productInfo: null
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '2': 'success',
        '0': 'gray',
        '1': ''
      }
      return statusMap[status]
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      this.$store.dispatch('GetProductForUser', this.$store.getters.userId).then(data => {
        this.productOptions = data
        this.specInfoId = this.productOptions[0].specInfoId
        this.queryData()
      })
    },
    // 格式化状态
    formatStatus(status) {
      const statusObj = {
        0: '废弃',
        1: '未发布',
        2: '已发布'
      }
      return statusObj[status]
    },
    // 详情
    showInfo(index, row) {
      if (this.productOptions) {
        for (let i = 0; i < this.productOptions.length; i++) {
          if (this.productOptions[i].specInfoId === this.specInfoId) {
            this.proInfoTitle = this.productOptions[i].specInfoName
          }
        }
      }
      this.$store.dispatch('GetProInfo', row.specProductId).then(data => {
        this.productInfo = data
        this.productInfoModal = true
      })
    },
    // 切换每页显示条数
    changeSizePage(size) {
      this.pageSize = size
      this.queryData()
    },
    // 分页
    currentPageChange(curPage) {
      this.currentPage = curPage
      this.queryData()
    },
    // 勾选一行改变
    selectAllData(dataList) {
      const selectTemp = [...dataList]
      for (let i = 0; i < selectTemp.length; i++) {
        if (selectTemp[i].fileState !== 1) {
          this.$message({
            type: 'warning',
            message: '只能勾选状态为未发布的数据'
          })
          this.$refs.productTable.toggleRowSelection(selectTemp[i], false)
        }
      }
      this.multipleSelection = dataList
    },
    selectRowData(dataList, row) {
      if (row.fileState !== 1) {
        this.$message({
          type: 'warning',
          message: '只能勾选状态为未发布的数据'
        })
        this.$refs.productTable.toggleRowSelection(row, false)
      }
      this.multipleSelection = dataList
    },
    // 批量操作
    operatePro(type) {
      if (this.multipleSelection.length) {
        this.$messageBox.confirm('请确认操作选中的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const specProductIds = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            specProductIds.push(this.multipleSelection[i].specProductId)
          }
          const param = {
            userId: this.$store.getters.userId,
            specProductId: specProductIds.join(',')
          }
          this.$store.dispatch(type ? 'PublishProduct' : 'DiscardProduct', param).then(data => {
            this.queryData()
            this.currentPage = 1
            this.$message({
              type: 'success',
              message: type ? '发布成功!' : '作废成功'
            })
          })
        })
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    // 查询
    queryData() {
      this.listLoading = true
      const param = {
        specInfoId: this.specInfoId,
        productName: this.productName,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch('GetProductList', param).then(data => {
        this.list = data.result
        this.dataTotal = data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'moduleOpts'
    ])
  }
}
</script>
