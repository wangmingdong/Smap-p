<template>
  <div class="app-container">
    <div class="table-header-container">
      <div class="table-search-container">
        <div class="form-container">
          <div class="form-label">账号：</div>
          <div class="form-content">
            <el-input placeholder="搜索内容" v-model="searchText"></el-input>
          </div>
        </div>
        <div class="form-container">
          <div class="form-label">账号状态：</div>
          <div class="form-content">
            <el-select v-model="uNameStatus" placeholder="请选择">
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
        <el-button v-if="moduleOpts.indexOf('3') > -1">查询</el-button>
        <el-button type="primary" v-if="moduleOpts.indexOf('1') > -1" @click="addUser">新增</el-button>
        <el-button v-if="moduleOpts.indexOf('4') > -1">修改</el-button>
        <el-button type="danger" v-if="moduleOpts.indexOf('2') > -1">删除</el-button>
        {{moduleOpts}}
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
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
          <el-tag :type="scope.row.userStatus | statusFilter">{{scope.row.userStatus}}</el-tag>
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
          <span>{{scope.row.laseLoginTime}}</span>
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
    <el-dialog title="新增用户" :visible.sync="userAddModal">
      <user-add-form :user-add-info="addUserInfo"></user-add-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { mapGetters } from 'vuex'
import userAddForm from '@/views/custom/userAdd.vue'
import '@/styles/main.scss'

export default {
  components: {
    userAddForm
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      dataTotal: 50,
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
      addUserInfo: {
        username: '234',
        password: '',
        role: '',
        product: '',
        email: '',
        status: '',
        memo: ''
      }
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
    this.fetchData()
  },
  methods: {
    // 详情
    showInfo(index, row) {
      console.log(index, row)
    },
    // 分页
    currentPageChange(curPage) {
      console.log(curPage)
    },
    // 打开增加用户
    addUser() {
      this.userAddModal = true
    },
    // 保存新建用户
    doAddUser() {
      console.log(this.addUserInfo)
    },
    fetchData() {
      // this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      // 假数据
      this.listLoading = false
      this.list = [
        {
          'userId': '1',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        },
        {
          'userId': '2',
          'loginNo': 'admin',
          'userStatus': 1,
          'roleName': 'adinistrator',
          'email': 'xxxxx',
          'createDate': '2018-02-05 00:00:00',
          'laseLoginTime': '2019-03-15 14:46:55'
        }
      ]
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
