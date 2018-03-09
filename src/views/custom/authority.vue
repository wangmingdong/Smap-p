<template>
  <div class="app-container">
    <div class="table-header-container">
      <div class="table-search-container">
        <div class="form-container">
          <div class="form-label">产品名称：</div>
          <div class="form-content">
            <el-input placeholder="搜索内容" v-model="searchText" :clearable="true" v-on:change="queryData"></el-input>
          </div>
        </div>
      </div>
      <div class="table-btn-group">
        <el-button v-if="moduleOpts && moduleOpts.indexOf('3') > -1" @click="queryData">查询</el-button>
        <el-button v-if="moduleOpts && moduleOpts.indexOf('4') > -1" @click="doProductEdit">修改</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" empty-text="无数据" @selection-change="selectRowData" element-loading-text="加载中" border fit highlight-current-row>
      <el-table-column align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{scope.row.customerId}}
        </template>
      </el-table-column>
      <el-table-column label="登录账号" min-width="100">
        <template slot-scope="scope">
          {{scope.row.customerName}}
        </template>
      </el-table-column>
      <el-table-column label="产品名称" min-width="300">
        <template slot-scope="scope">
          <span class="text-href" @click="showProduct(item.id)" v-for="item in scope.row.specInfo" :key="item.id">
            {{item.name}} ;
          </span>
        </template>
      </el-table-column>
      <el-table-column label="客户类型" min-width="50">
        <template slot-scope="scope">
          {{scope.row.customerType}}
        </template>
      </el-table-column>
      <el-table-column label="客户状态" min-width="50">
        <template slot-scope="scope">
          {{scope.row.customerValid}}
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center" min-width="50">
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
    <el-dialog title="权限详情" :visible.sync="authorityInfoModal">
      <authority-info-form ref="authorityInfoComponent" :authority-list="authorityInfoList"></authority-info-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="authorityInfoModal = false">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 产品 -->
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
import authorityAddForm from '@/views/custom/authorityAdd.vue'
import authorityUpdateForm from '@/views/custom/authorityUpdate.vue'
import authorityInfoForm from '@/views/custom/authorityInfo.vue'
import proInfoForm from '@/views/meta/supportInfo.vue'

export default {
  components: {
    authorityAddForm,
    authorityUpdateForm,
    authorityInfoForm,
    proInfoForm
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      dataTotal: 0,
      searchText: '',
      uNameStatus: 1,
      authorityAddModal: false,
      authorityUpdateModal: false,
      addAuthorityInfo: {
        loginNo: '',
        specInfoId: '',
        selectProType: []
      },
      editAuthorityInfo: null,
      multipleSelection: [],
      authorityInfoModal: false,
      authorityInfoList: [],
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
  },
  methods: {
    // 查看产品
    showProduct(id) {
      this.$store.dispatch('QueryPro', id).then(data => {
        this.proInfo = data
        this.proInfoModal = true
      })
    },
    // 详情
    showInfo(index, row) {
      this.$store.dispatch('QueryAuthority', { customerId: row.customerId }).then(data => {
        this.authorityInfoList = data
        this.authorityInfoModal = true
      })
    },
    // 编辑权限
    doProductEdit(index, row) {
      if (this.multipleSelection.length === 1) {
        this.$router.push({ path: 'privilege/' + this.multipleSelection[0].customerId })
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
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
    // 勾选一行
    selectRowData(val) {
      this.multipleSelection = val
    },
    // 查询
    queryData() {
      this.listLoading = true
      const param = {
        specInfoName: this.searchText,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch('GetAuthorityList', param).then(data => {
        this.list = data.result
        this.dataTotal = data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  },
  mounted() {
    // 防止从三层返回 不触发查询按钮权限
    this.$store.dispatch('GetModuleAuthority', 7)
  },
  computed: {
    ...mapGetters([
      'moduleOpts'
    ])
  }
}
</script>
