<template>
  <div class="app-container">
    <div class="table-header-container">
      <div class="table-search-container">
        <!-- <div class="form-container">
          <div class="form-label">账号：</div>
          <div class="form-content">
            <el-input placeholder="搜索内容" v-model="searchText" :clearable="true" v-on:change="queryData"></el-input>
          </div>
        </div> -->
      </div>
      <div class="table-btn-group">
        <el-button @click="queryData">查询</el-button>
        <el-button type="primary" @click="addAuthority">新增</el-button>
        <el-button @click="openUpdateAuthority">修改</el-button>
        <el-button type="danger" @click="deleteAuthoritys">删除</el-button>
        <el-button @click="goParentPage">返回</el-button>
      </div>
    </div>
    <el-table :data="authorityList" v-loading.body="listLoading" empty-text="无数据" @selection-change="selectRowData" element-loading-text="加载中" border fit highlight-current-row>
      <el-table-column align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="登录账号" min-width="110">
        <template slot-scope="scope">
          {{scope.row.customerName}}
        </template>
      </el-table-column>
      <el-table-column label="产品名称" min-width="110">
        <template slot-scope="scope">
          <span class="text-href" @click="showProduct(scope.row.specInfoId)">{{scope.row.specInfoName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品类型" min-width="100">
        <template slot-scope="scope">
          <span v-for="spec in specTypeOptions.specType" :key="spec.id" v-if="spec.id === scope.row.specType">
            {{spec.name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品模式" min-width="100">
        <template slot-scope="scope">
          <span v-for="mode in specTypeOptions.modeType" :key="mode.id" v-if="mode.id === scope.row.modeType">
            {{mode.name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="授权时间" min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" v-if="scope.row.authorizeTime"></i>
          <span>{{scope.row.authorizeTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="授权人员" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.authorizeName}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <el-dialog title="新增权限" :visible.sync="authorityAddModal">
      <authority-add-form ref="authorityAddComponent" :authority-add-info="addAuthorityInfo"></authority-add-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authorityAddModal = false">取 消</el-button>
        <el-button type="primary" @click="doAddAuthority">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改权限" :visible.sync="authorityUpdateModal">
      <authority-update-form ref="authorityUpdateComponent" :authority-edit-info="editAuthorityInfo"></authority-update-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authorityUpdateModal = false">取 消</el-button>
        <el-button type="primary" @click="doUpdateAuthority">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="权限详情" :visible.sync="authorityInfoModal">
      <authority-info-form ref="authorityInfoComponent" :authority-detail-info="authorityInfo"></authority-info-form>
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
      authorityList: [],
      listLoading: false,
      currentPage: 1,
      pageSize: 20,
      dataTotal: 0,
      searchText: '',
      customerName: '',
      uNameStatus: 1,
      authorityAddModal: false,
      authorityUpdateModal: false,
      specTypeOptions: {
        modeType: [],
        specType: []
      },
      addAuthorityInfo: {
        customerId: '',
        specInfoId: '',
        specType: '',
        customerName: '',
        userSpecModeId: ''
      },
      editAuthorityInfo: null,
      multipleSelection: [],
      authorityInfoModal: false,
      authorityInfo: null,
      proInfoModal: false,
      proInfo: null
    }
  },
  created() {
    this.queryData()
    this.initAuthority()
  },
  methods: {
    // 初始化新建权限
    initAuthority() {
      this.addAuthorityInfo.customerId = ''
      this.addAuthorityInfo.specInfoId = ''
      this.addAuthorityInfo.specType = ''
      this.addAuthorityInfo.customerName = ''
    },
    // 查看产品
    showProduct(id) {
      this.$store.dispatch('QueryPro', id).then(data => {
        this.proInfo = data
        this.proInfoModal = true
      })
    },
    // 返回上一页
    goParentPage() {
      this.$router.push({ path: '/custom/authority' })
    },
    // 详情
    showInfo(index, row) {
      this.$store.dispatch('QueryAuthority', { userSpecModeId: row.userSpecModeId }).then(data => {
        this.authorityInfo = data
        this.authorityInfoModal = true
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
    // 打开增加权限
    addAuthority() {
      this.authorityAddModal = true
    },
    // 打开修改权限
    openUpdateAuthority() {
      if (this.multipleSelection.length === 1) {
        this.$store.dispatch('QueryAuthority', { userSpecModeId: this.multipleSelection[0].userSpecModeId }).then(data => {
          this.editAuthorityInfo = data[0]
          this.authorityUpdateModal = true
        })
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    // 保存修改权限
    doUpdateAuthority() {
      this.$refs.authorityUpdateComponent.$refs.editAuthorityForm.validate((valid) => {
        if (valid) {
          const param = {
            pmUserId: this.$store.getters.userId,
            customerId: this.editAuthorityInfo.customerId,
            specInfoId: this.editAuthorityInfo.specInfoId,
            userSpecModeId: this.editAuthorityInfo.userSpecModeId
          }
          this.$store.dispatch('CheckRepeatForAuthority', param).then(data => {
            if (parseInt(data.code, 10) === 300) {
              this.$message({
                type: 'error',
                message: data.msg
              })
            } else {
              delete param.customerId
              this.$store.dispatch('UpdateAuthority', param).then(data => {
                this.authorityUpdateModal = false
                this.queryData()
              })
            }
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
    // 保存新建权限
    doAddAuthority() {
      this.$refs.authorityAddComponent.$refs.addAuthorityForm.validate((valid) => {
        if (valid) {
          const checkParam = {
            customerId: this.addAuthorityInfo.customerId,
            specInfoId: this.addAuthorityInfo.specInfoId
          }
          this.$store.dispatch('CheckRepeatForAuthority', checkParam).then(data => {
            if (parseInt(data.code, 10) === 300) {
              this.$message({
                type: 'error',
                message: data.msg
              })
            } else {
              const param = {
                pmUserId: this.$store.getters.userId,
                specInfoId: this.addAuthorityInfo.specInfoId,
                customerId: this.addAuthorityInfo.customerId
              }
              this.$store.dispatch('CreateAuthority', param).then(data => {
                this.authorityAddModal = false
                this.initAuthority()
                this.$refs.authorityAddComponent.initForm()
                this.$refs.authorityAddComponent.getParams()
                this.queryData()
              })
            }
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
    // 删除权限
    deleteAuthoritys() {
      if (this.multipleSelection.length) {
        this.$messageBox.confirm('请确认删除选中的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const authorityIds = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            authorityIds.push(this.multipleSelection[i].userSpecModeId)
          }
          this.$store.dispatch('DeleteAuthority', authorityIds.join(',')).then(data => {
            this.queryData()
            this.currentPage = 1
            this.$message({
              type: 'success',
              message: '删除成功!'
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
      this.$store.dispatch('GetSpecTypeParamsForPro').then(data => {
        this.specTypeOptions = data
        this.$store.dispatch('QueryAuthority', { customerId: this.$route.params.id }).then(data => {
          this.authorityList = data
          if (this.authorityList.length) {
            this.addAuthorityInfo.customerName = this.authorityList[0].customerName
            this.addAuthorityInfo.customerId = this.authorityList[0].customerId
          }
          this.dataTotal = data.length
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
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
