<template>
  <div class="app-container">
    <div class="table-header-container">
      <div class="table-search-container">
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
        <el-button v-if="moduleOpts && moduleOpts.indexOf('3') > -1" @click="queryData">查询</el-button>
        <el-button type="primary" v-if="moduleOpts && moduleOpts.indexOf('1') > -1" @click="addRole">新增</el-button>
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
          {{scope.row.roleId}}
        </template>
      </el-table-column>
      <el-table-column label="角色名称" min-width="110">
        <template slot-scope="scope">
          {{scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column label="账号状态" min-width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.roleStatus | statusFilter">{{scope.row.roleStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" v-if="scope.row.createDate"></i>
          <span>{{scope.row.createDate}}</span>
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
    <el-dialog title="新增角色" :visible.sync="roleAddModal">
      <role-add-form ref="roleAddComponent" :role-add-info="addRoleInfo"></role-add-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleAddModal = false">取 消</el-button>
        <el-button type="primary" @click="doAddRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改角色" :visible.sync="roleUpdateModal">
      <role-update-form ref="roleUpdateComponent" :role-edit-info="editRoleInfo"></role-update-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleUpdateModal = false">取 消</el-button>
        <el-button type="primary" @click="doUpdateUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="角色详情" :visible.sync="roleInfoModal">
      <role-info-form ref="roleInfoComponent" :role-info="roleInfo"></role-info-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="roleInfoModal = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
import roleAddForm from '@/views/system/roleAdd.vue'
import roleUpdateForm from '@/views/system/roleUpdate.vue'
import roleInfoForm from '@/views/system/roleInfo.vue'

export default {
  components: {
    roleAddForm,
    roleUpdateForm,
    roleInfoForm
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
      roleAddModal: false,
      roleUpdateModal: false,
      addRoleInfo: {
        roleName: '',
        roleModules: '',
        roleStatus: 1,
        note: ''
      },
      editRoleInfo: null,
      multipleSelection: [],
      roleInfoModal: false,
      roleInfo: null
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '有效': 'success',
        '无效': 'gray'
      }
      return statusMap[status]
    }
  },
  created() {
    this.queryData()
    this.initRole()
  },
  methods: {
    // 初始化新建角色
    initRole() {
      this.addRoleInfo.roleName = ''
      this.addRoleInfo.roleModules = []
      this.addRoleInfo.roleStatus = 1
      this.addRoleInfo.note = ''
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
      this.$store.dispatch('QueryRole', row.roleId).then(data => {
        this.roleInfo = data
        if (this.$refs.roleInfoComponent) {
          this.$refs.roleInfoComponent.getModules()
        }
        this.roleInfoModal = true
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
    // 打开增加角色
    addRole() {
      this.roleAddModal = true
      this.initRole()
      if (this.$refs.roleAddComponent) {
        this.$refs.roleAddComponent.getModules()
      }
    },
    // 打开修改角色
    openUpdateUser() {
      if (this.multipleSelection.length === 1) {
        this.$store.dispatch('QueryRole', this.multipleSelection[0].roleId).then(data => {
          this.editRoleInfo = data
          this.roleUpdateModal = true
          if (this.$refs.roleUpdateComponent) {
            setTimeout(() => {
              this.$refs.roleUpdateComponent.getModules()
            })
          }
        })
      } else {
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        })
      }
    },
    // 保存修改角色
    doUpdateUser() {
      this.$refs.roleUpdateComponent.$refs.editRoleForm.validate((valid) => {
        if (valid) {
          const newModule = []
          const editModeles = this.$refs.roleUpdateComponent.moduleData
          for (let i = 0; i < editModeles.length; i++) {
            if (editModeles[i].firstCheckAll || editModeles[i].isIndeterminate) {
              newModule.push(editModeles[i].moduleId + ':' + '')
              if (editModeles[i].secondMenu.length) {
                for (let j = 0; j < editModeles[i].secondMenu.length; j++) {
                  if (editModeles[i].secondMenu[j].checkedOpts.length) {
                    newModule.push(editModeles[i].secondMenu[j].moduleId + ':' + editModeles[i].secondMenu[j].checkedOpts.join(','))
                  }
                }
              }
            }
          }
          this.editRoleInfo.roleModules = newModule.join(';')
          this.$store.dispatch('UpdateRole', this.editRoleInfo).then(data => {
            this.roleUpdateModal = false
            this.$refs.roleUpdateComponent.refreshModuleTree()
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
    // 保存新建角色
    doAddRole() {
      this.$refs.roleAddComponent.$refs.addRoleForm.validate((valid) => {
        if (valid) {
          const newModule = []
          const addModeles = this.$refs.roleAddComponent.moduleData
          for (let i = 0; i < addModeles.length; i++) {
            if (addModeles[i].firstCheckAll || addModeles[i].isIndeterminate) {
              newModule.push(addModeles[i].moduleId + ':' + '')
              if (addModeles[i].secondMenu.length) {
                for (let j = 0; j < addModeles[i].secondMenu.length; j++) {
                  if (addModeles[i].secondMenu[j].checkedOpts.length) {
                    newModule.push(addModeles[i].secondMenu[j].moduleId + ':' + addModeles[i].secondMenu[j].checkedOpts.join(','))
                  }
                }
              }
            }
          }
          this.addRoleInfo.roleModules = newModule.join(';')
          this.$store.dispatch('CreateRole', this.addRoleInfo).then(data => {
            this.roleAddModal = false
            if (parseInt(data.code, 10) === 200) {
              this.initRole()
              this.$refs.roleAddComponent.initForm()
              this.$refs.roleAddComponent.refreshModuleTree()
              this.queryData()
            } else {
              this.$message({
                message: data.msg,
                type: 'error'
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
    // 删除角色
    deleteUsers() {
      if (this.multipleSelection.length) {
        this.$messageBox.confirm('请确认删除选中的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const roleIds = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            roleIds.push(this.multipleSelection[i].roleId)
          }
          this.$store.dispatch('DeleteRole', roleIds.join(',')).then(data => {
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
        roleStatus: this.uNameStatus,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch('GetRoleList', param).then(data => {
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
