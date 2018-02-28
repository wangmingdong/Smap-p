<template>
  <div class="app-container">
    <div class="table-header-container">
      <div class="table-search-container">
        <div class="form-container">
          <div class="form-label">账号：</div>
          <div class="form-content">
            <el-input placeholder="搜索内容" v-model="searchText" :clearable="true" v-on:change="queryData"></el-input>
          </div>
        </div>
        <div class="form-container">
          <div class="form-label">账号状态：</div>
          <div class="form-content">
            <el-select v-model="uNameStatus" @change="queryData" placeholder="请选择">
              <el-option
                v-for="item in uNameStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="table-btn-group">
        <el-button v-if="moduleOpts.indexOf('3') > -1" @click="queryData">查询</el-button>
        <el-button type="primary" v-if="moduleOpts.indexOf('1') > -1" @click="addUser">新增</el-button>
        <el-button v-if="moduleOpts.indexOf('4') > -1" @click="openUpdateUser">修改</el-button>
        <el-button type="danger" v-if="moduleOpts.indexOf('2') > -1" @click="deleteUsers">删除</el-button>
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
      <el-table-column label="账号" min-width="110">
        <template slot-scope="scope">
          {{scope.row.loginNo}}
        </template>
      </el-table-column>
      <el-table-column label="账号状态" min-width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.userStatus | statusFilter">{{formatStatus(scope.row.userStatus)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色" min-width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最后登录时间" min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.lastLoginTime}}</span>
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
        layout="prev, pager, next"
        @current-change="currentPageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="dataTotal">
      </el-pagination>
    </div>
    <!-- 新增 -->
    <el-dialog title="新增用户" :visible.sync="userAddModal">
      <user-add-form ref="userAddComponent" :user-add-info="addUserInfo"></user-add-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userAddModal = false">取 消</el-button>
        <el-button type="primary" @click="doAddUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改用户" :visible.sync="userUpdateModal">
      <user-update-form ref="userUpdateComponent" :user-edit-info="editUserInfo"></user-update-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userUpdateModal = false">取 消</el-button>
        <el-button type="primary" @click="doUpdateUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="用户详情" :visible.sync="userInfoModal">
      <user-info-form ref="userInfoComponent" :user-detail-info="userInfo"></user-info-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userInfoModal = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
import userAddForm from '@/views/system/userAdd.vue'
import userUpdateForm from '@/views/system/userUpdate.vue'
import userInfoForm from '@/views/system/userInfo.vue'

export default {
  components: {
    userAddForm,
    userUpdateForm,
    userInfoForm
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
      uNameStatusOptions: [
        {
          label: '有效',
          value: 1
        },
        {
          label: '无效',
          value: 0
        }
      ],
      userAddModal: false,
      userUpdateModal: false,
      addUserInfo: {
        loginNo: '',
        loginPwd: '',
        roleId: '',
        specInfoId: '',
        email: '',
        userStatus: 1,
        note: ''
      },
      editUserInfo: null,
      multipleSelection: [],
      userInfoModal: false,
      userInfo: null
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
    this.initUser()
  },
  methods: {
    // 初始化新建用户
    initUser() {
      this.addUserInfo.loginNo = ''
      this.addUserInfo.loginPwd = ''
      this.addUserInfo.email = ''
      this.addUserInfo.userStatus = 1
      this.addUserInfo.note = ''
    },
    // 格式化状态
    formatStatus(status) {
      const statusObj = {
        1: '有效',
        0: '无效'
      }
      return statusObj[status]
    },
    // 详情
    showInfo(index, row) {
      console.log(index, row)
      this.$store.dispatch('QueryUser', row.userId).then(data => {
        this.userInfo = data
        this.userInfoModal = true
      })
    },
    // 分页
    currentPageChange(curPage) {
      this.currentPage = curPage
      this.queryData()
    },
    // 打开增加用户
    addUser() {
      this.userAddModal = true
    },
    // 打开修改用户
    openUpdateUser() {
      if (this.multipleSelection.length === 1) {
        this.$store.dispatch('QueryUser', this.multipleSelection[0].userId).then(data => {
          this.editUserInfo = data
          this.userUpdateModal = true
        })
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    // 保存修改用户
    doUpdateUser() {
      console.log(this.editUserInfo)
      this.$refs.userUpdateComponent.$refs.editUserForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('UpdateUser', this.editUserInfo).then(data => {
            this.userUpdateModal = false
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
    doAddUser() {
      this.$refs.userAddComponent.$refs.addUserForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('CreateUser', this.addUserInfo).then(data => {
            this.userAddModal = false
            this.initUser()
            this.$refs.userAddComponent.initForm()
            this.$refs.userAddComponent.getRoles()
            this.$refs.userAddComponent.getProducts()
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
          this.$store.dispatch('DeleteUser', userIds.join(',')).then(data => {
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
        userStatus: this.uNameStatus,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch('GetUserList', param).then(data => {
        console.log(data)
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
