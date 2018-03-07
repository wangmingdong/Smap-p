<template>
  <div class="app-container">
    <div class="table-header-container">
      <div class="table-search-container">
        <div class="form-container">
          <div class="form-label">登录账号：</div>
          <div class="form-content">
            <el-input placeholder="搜索内容" v-model="searchText" :clearable="true" v-on:change="queryData"></el-input>
          </div>
        </div>
        <div class="form-container">
          <div class="form-label">账号类型：</div>
          <div class="form-content">
            <el-select v-model="userType" @change="queryData" placeholder="请选择">
              <el-option
                v-for="item in userTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-container">
          <div class="form-label">账号状态：</div>
          <div class="form-content">
            <el-select v-model="userValid" @change="queryData" placeholder="请选择">
              <el-option
                v-for="item in userValidOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="table-btn-group">
        <el-button v-if="moduleOpts && moduleOpts.indexOf('3') > -1" @click="queryData">查询</el-button>
        <el-button type="primary" v-if="moduleOpts && moduleOpts.indexOf('1') > -1" @click="addAccount">新增</el-button>
        <el-button v-if="moduleOpts && moduleOpts.indexOf('4') > -1" @click="openUpdateUser">修改</el-button>
        <el-button type="danger" v-if="moduleOpts && moduleOpts.indexOf('2') > -1" @click="deleteUsers">删除</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" empty-text="无数据" @selection-change="selectRowData" element-loading-text="加载中" border fit highlight-current-row>
      <el-table-column align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{scope.row.userId}}
        </template>
      </el-table-column>
      <el-table-column label="登录账号" min-width="110">
        <template slot-scope="scope">
          {{scope.row.loginNo}}
        </template>
      </el-table-column>
      <el-table-column label="账号类型" min-width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.userType | statusFilter">{{formatType(scope.row.userType)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" v-if="scope.row.createDate"></i>
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="秘钥开始时间" min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" v-if="scope.row.keyBeginDate"></i>
          <span>{{scope.row.keyBeginDate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="秘钥结束时间" min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" v-if="scope.row.keyEndDate"></i>
          <span>{{scope.row.keyEndDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号状态" min-width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.userValid | statusFilter">{{formatStatus(scope.row.userValid)}}</el-tag>
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
    <el-dialog title="账号新增" :visible.sync="accountAddModal">
      <account-add-form ref="accountAddComponent" :account-add-info="addAccountInfo"></account-add-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="accountAddModal = false">取 消</el-button>
        <el-button type="primary" @click="doAddAccount">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="账号修改" :visible.sync="accountUpdateModal">
      <account-update-form ref="accountUpdateComponent" :account-edit-info="editAccountInfo"></account-update-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="accountUpdateModal = false">取 消</el-button>
        <el-button type="primary" @click="doUpdateAccount">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="账号详情" :visible.sync="accountInfoModal">
      <account-info-form ref="accountInfoComponent" :account-detail-info="accountInfo"></account-info-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="accountInfoModal = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
import accountAddForm from '@/views/custom/accountAdd.vue'
import accountUpdateForm from '@/views/custom/accountUpdate.vue'
import accountInfoForm from '@/views/custom/accountInfo.vue'

export default {
  components: {
    accountAddForm,
    accountUpdateForm,
    accountInfoForm
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      dataTotal: 0,
      searchText: '',
      userType: 1,
      userValid: 1,
      uNameStatus: 1,
      userTypeOptions: [],
      userValidOptions: [],
      accountAddModal: false,
      accountUpdateModal: false,
      addAccountInfo: {
        email: '',
        keyBeginDate: '',
        keyEndDate: '',
        keyValid: '1',
        loginNo: '',
        loginPwd: '',
        note: '',
        userId: '',
        userKey: '',
        userType: '1',
        userValid: '1'
      },
      editAccountInfo: null,
      multipleSelection: [],
      accountInfoModal: false,
      accountInfo: null
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'gray',
        2: 'gray',
        3: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getParams()
    this.initUser()
  },
  methods: {
    // 初始化新建用户
    initUser() {
      this.addAccountInfo.email = ''
      this.addAccountInfo.keyBeginDate = ''
      this.addAccountInfo.keyEndDate = ''
      this.addAccountInfo.keyValid = 1
      this.addAccountInfo.loginNo = ''
      this.addAccountInfo.loginPwd = ''
      this.addAccountInfo.note = ''
      this.addAccountInfo.userId = ''
      this.addAccountInfo.userKey = ''
      this.addAccountInfo.userType = ''
      this.addAccountInfo.userValid = ''
    },
    // 格式化状态
    formatStatus(status) {
      const statusObj = {
        1: '有效',
        0: '无效'
      }
      return statusObj[status]
    },
    // 格式化类型
    formatType(type) {
      const typeObj = {
        1: '正式',
        2: '测试'
      }
      return typeObj[type]
    },
    getParams() {
      this.$store.dispatch('GetParamsByCustom').then(data => {
        console.log(data)
        this.customOptions = data
        this.userTypeOptions = this.customOptions.userType
        this.userType = this.userTypeOptions[0].id
        this.userValidOptions = this.customOptions.userValid
        this.userValid = this.userValidOptions[0].id
        this.queryData()
      })
    },
    // 详情
    showInfo(index, row) {
      this.$store.dispatch('QueryCustom', row.userId).then(data => {
        this.accountInfo = data
        this.accountInfoModal = true
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
    // 打开增加用户
    addAccount() {
      this.accountAddModal = true
      if (this.$refs.accountAddComponent) {
        this.$refs.accountAddComponent.initForm()
        this.$refs.accountAddComponent.initSelection()
      }
    },
    // 打开修改用户
    openUpdateUser() {
      if (this.multipleSelection.length === 1) {
        this.$store.dispatch('QueryCustom', this.multipleSelection[0].userId).then(data => {
          this.editAccountInfo = data
          this.accountUpdateModal = true
        })
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    // 保存修改用户
    doUpdateAccount() {
      this.$refs.accountUpdateComponent.$refs.editAccountForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('UpdateCustom', this.editAccountInfo).then(data => {
            this.accountUpdateModal = false
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
    // 保存新建用户
    doAddAccount() {
      this.$refs.accountAddComponent.$refs.addAccountForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('CreateCustom', this.addAccountInfo).then(data => {
            this.accountAddModal = false
            this.initUser()
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
    // 删除用户
    deleteUsers() {
      if (this.multipleSelection.length) {
        this.$messageBox.confirm('请确认删除选中的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const userIds = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            userIds.push(this.multipleSelection[i].userId)
          }
          this.$store.dispatch('DeleteCustom', userIds.join(',')).then(data => {
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
      const param = {
        loginNo: this.searchText,
        userType: this.userType,
        userValid: this.userValid,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch('GetCustomList', param).then(data => {
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
