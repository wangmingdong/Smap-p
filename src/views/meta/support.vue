<template>
  <div class="app-container">
    <div class="table-header-container">
      <div class="table-search-container">
        <div class="form-container">
          <div class="form-label">产品名称：</div>
          <div class="form-content">
            <el-input placeholder="搜索内容" v-model="specInfoName" :clearable="true" v-on:change="queryData"></el-input>
          </div>
        </div>
      </div>
      <div class="table-btn-group">
        <el-button v-if="moduleOpts && moduleOpts.indexOf('3') > -1" @click="queryData">查询</el-button>
        <el-button type="primary" v-if="moduleOpts && moduleOpts.indexOf('1') > -1" @click="addPro">新增</el-button>
        <el-button v-if="moduleOpts && moduleOpts.indexOf('4') > -1" @click="openUpdatePro">修改</el-button>
        <el-button type="primary" v-if="moduleOpts && moduleOpts.indexOf('7') > -1" @click="syncPros">同步</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" empty-text="无数据" @selection-change="selectRowData"
     element-loading-text="加载中" border fit highlight-current-row>
      <el-table-column align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{scope.row.specInfoId}}
        </template>
      </el-table-column>
      <el-table-column label="产品名称" min-width="110">
        <template slot-scope="scope">
          {{scope.row.specInfoName}}
        </template>
      </el-table-column>
      <el-table-column label="产品类型" min-width="80" align="center">
        <template slot-scope="scope">
          {{formatSpecType(scope.row.specType)}}
        </template>
      </el-table-column>
      <el-table-column label="父产品" min-width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.fatherSpecName}}
        </template>
      </el-table-column>
      <el-table-column label="产品模式" min-width="100" align="center">
        <template slot-scope="scope">
          {{formaModeType(scope.row.specTypeSec)}}
        </template>
      </el-table-column>
      <el-table-column label="产品状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.valid | statusFilter">{{formatStatus(scope.row.valid)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="产品建立时间" min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" v-if="scope.row.createTime"></i>
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="全局共享标志" min-width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.smapcFlag | statusFilter">{{formatSmapcFlag(scope.row.smapcFlag)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="详细信息" align="center" min-width="110">
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
    <!-- 新增 -->
    <el-dialog title="新增产品" :visible.sync="proAddModal">
      <pro-add-form ref="proAddComponent" :pro-add-info="addProInfo"></pro-add-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="proAddModal = false">取 消</el-button>
        <el-button type="primary" @click="doAddPro">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改产品" :visible.sync="proUpdateModal">
      <pro-update-form ref="proUpdateComponent" :pro-edit-info="editProInfo"></pro-update-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="proUpdateModal = false">取 消</el-button>
        <el-button type="primary" @click="doUpdatePro">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="产品详情" :visible.sync="proInfoModal">
      <pro-info-form ref="proInfoComponent" :pro-detail-info="proInfo"></pro-info-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="proInfoModal = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
import proAddForm from '@/views/meta/supportAdd.vue'
import proUpdateForm from '@/views/meta/supportUpdate.vue'
import proInfoForm from '@/views/meta/supportInfo.vue'

export default {
  components: {
    proAddForm,
    proUpdateForm,
    proInfoForm
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      dataTotal: 0,
      specInfoName: '',
      proAddModal: false,
      proUpdateModal: false,
      addProInfo: {
        dayMaxDownTimes: '',
        fatherSpecId: '',
        minMaxDownTimes: '',
        modeType: '',
        smapcFlag: '0',
        specInfoDesc: '',
        specInfoId: '',
        specInfoName: '',
        specType: '',
        specTypeSec: '9',
        valid: '1'
      },
      editProInfo: null,
      multipleSelection: [],
      proInfoModal: false,
      proInfo: null
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'gray',
        3: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.queryData()
    this.initPro()
  },
  methods: {
    // 初始化新建产品
    initPro() {
      this.addProInfo.fatherSpecId = ''
      this.addProInfo.dayMaxDownTimes = ''
      this.addProInfo.fatherSpecId = ''
      this.addProInfo.minMaxDownTimes = ''
      this.addProInfo.modeType = ''
      this.addProInfo.smapcFlag = '0'
      this.addProInfo.specInfoDesc = ''
      this.addProInfo.specInfoId = ''
      this.addProInfo.specInfoName = ''
      this.addProInfo.specType = ''
      this.addProInfo.specTypeSec = '9'
      this.addProInfo.valid = '1'
    },
    // 格式化产品类型
    formatSpecType(status) {
      const statusObj = {
        1: '文件型',
        2: '接口型'
      }
      return statusObj[status]
    },
    formatSpecTypeSec(status) {
      const statusObj = {
        1: '常规',
        2: '其他'
      }
      return statusObj[status]
    },
    formatValid(status) {
      const statusObj = {
        0: '无效',
        1: '有效'
      }
      return statusObj[status]
    },
    formaModeType(status) {
      const statusObj = {
        1: '日产品',
        2: '月产品',
        3: '周产品',
        4: '季产品',
        9: '其他'
      }
      return statusObj[status]
    },
    // 格式化状态
    formatStatus(status) {
      const statusObj = {
        1: '有效',
        0: '无效'
      }
      return statusObj[status]
    },
    formatSmapcFlag(status) {
      const statusObj = {
        1: '共享',
        0: '不共享'
      }
      return statusObj[status]
    },
    // 详情
    showInfo(index, row) {
      this.$store.dispatch('QueryPro', row.specInfoId).then(data => {
        this.proInfo = data
        this.proInfoModal = true
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
    // 打开增加产品
    addPro() {
      this.proAddModal = true
      if (this.$refs.proAddComponent) {
        this.$refs.proAddComponent.getParams()
        this.$refs.proAddComponent.initForm()
      }
    },
    // 打开修改产品
    openUpdatePro() {
      if (this.multipleSelection.length === 1) {
        this.$store.dispatch('QueryPro', this.multipleSelection[0].specInfoId).then(data => {
          this.editProInfo = data
          if (this.$refs.proUpdateComponent) {
            this.$refs.proUpdateComponent.getParams()
            this.$refs.proUpdateComponent.initForm()
          }
          this.proUpdateModal = true
        })
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    // 保存修改产品
    doUpdatePro() {
      this.$refs.proUpdateComponent.$refs.editProForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('UpdatePro', this.editProInfo).then(data => {
            this.proUpdateModal = false
            this.queryData()
          })
        } else {
          this.$message({
            message: '表单验证失败',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 保存新建产品
    doAddPro() {
      this.$refs.proAddComponent.$refs.addProForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('CreatePro', this.addProInfo).then(data => {
            this.proAddModal = false
            this.initPro()
            this.queryData()
          })
        } else {
          this.$message({
            message: '表单验证失败',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 勾选一行
    selectRowData(val) {
      this.multipleSelection = val
    },
    // 同步产品
    syncPros() {
      if (this.multipleSelection.length) {
        this.$messageBox.confirm('请确认同步选中的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const specInfoIds = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            if (this.multipleSelection[i].smapcFlag === '1') {
              specInfoIds.push(this.multipleSelection[i].specInfoId)
            }
          }
          this.$store.dispatch('SyncPro', specInfoIds.join(',')).then(data => {
            this.queryData()
            this.currentPage = 1
            this.$message({
              type: 'success',
              message: '同步成功!'
            })
          })
        })
      } else {
        this.$message({
          message: '请至少选择一条数据',
          type: 'warning'
        })
      }
    },
    // 查询
    queryData() {
      this.listLoading = true
      const param = {
        specInfoName: this.specInfoName,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch('GetProList', param).then(data => {
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
