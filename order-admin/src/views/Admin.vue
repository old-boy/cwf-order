<template>
  <div class="admin">
    <el-container>
      <el-aside width="auto">
        <el-row>
          <el-col :span="24">
            <el-menu
              :collapse="isCollapse"
              :default-active="navActive"
              :default-openeds="openeds"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#2f4050"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-info"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" route="/admin/userList"
                    >员工管理</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-share"></i>
                  <span>订单管理</span>
                </template>
                
                <el-menu-item-group>
                  <template slot="title">订单</template>
                  <el-menu-item index="2-1" route="/order/list"
                    >订单列表</el-menu-item
                  >
                  <el-menu-item index="2-2" route="/order/tag"
                    >订单标签</el-menu-item
                  >
                  <el-menu-item index="2-3" route="/product/list"
                    >产品列表</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-star-on"></i>
                  <span slot="title">客户管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组</template>
                  <el-menu-item index="3-1" route="/client/list"
                    >客户列表</el-menu-item
                  >
                  <el-menu-item index="3-2" route="/client/type"
                    >客户类型</el-menu-item
                  >
                  <el-menu-item index="3-3" route="/client/pay"
                    >汇款方式</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <transition name="fade" mode="out-in" appear>
        <el-container>
          <el-header>
            <el-row type="flex" justify="space-between">
              <el-col :span="6">
                <el-radio-group v-model="isCollapse" style="margin: 10px 0;">
                  <el-radio-button :label="false">展开</el-radio-button>
                  <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <div class="backToIndex">
                  <router-link to="/admin">回到首页</router-link>
                </div>
              </el-col>
              <el-col :sm="{ span: 5, offset: 13 }" :lg="{ span: 4, offset: 15 }">
                <div class="profile">
                  <img
                    :src="avatarUrl"
                    alt="logo"
                    width="42"
                    height="42"
                    v-if="avatarUrl"
                  />
                  <img
                    src="./../assets/img/a1.jpg"
                    alt="logo"
                    width="42"
                    height="42"
                    v-else
                  />
                </div>
                <el-dropdown @command="loginOut">
                  <span class="el-dropdown-link">
                    {{ formatRole
                    }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item command="1">基本资料</el-dropdown-item>
                    <el-dropdown-item command="2">修改密码</el-dropdown-item> -->
                    <el-dropdown-item command="3">退出</el-dropdown-item
                    >
                  </el-dropdown-menu>
                  <h4 class="login-name">{{ username }}</h4>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-header>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </transition>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapGetters } from 'vuex'
import { delCookie } from '../util/cookies'
export default {
    data () {
        return {
            isCollapse: false,
            openeds: [1],
            navActive: ''
        }
    },
    computed: {
        ...mapState([
            'username',
            'avatarUrl',
            'infoId'
        ]),
        ...mapGetters([
            'formatRole'
        ])
    },
    methods: {
      loginOut(command){
        console.log('command  ' + command)
          if(command === '3'){
              this.$ajax.get('/users/logout').then(res => {
                    if (res.data.status === '1') {
                        console.log(res.data.status)
                        this.$store.commit('SET_USERID', '')
                        this.$store.commit('SET_USERNAME', '')
                        this.$store.commit('SET_AVATAR', '')
                        this.$store.commit('SET_INFOID', '')
                        this.$store.commit('SET_ROLE', '')
                        delCookie('sessionId')
                        this.$router.push('/')
                    }
                })
          }
      },
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleCommand (command) {
            if (command === '1') {
                this.$router.push(`/admin/userInfo/${this.infoId}`)
            } else if (command === '3') {
                this.$ajax.get('/users/logout').then(res => {
                    console.log(res)
                    if (res.data.status === '1') {
                        console.log(res.data.status)
                        this.$store.commit('SET_USERID', '')
                        this.$store.commit('SET_USERNAME', '')
                        this.$store.commit('SET_AVATAR', '')
                        this.$store.commit('SET_INFOID', '')
                        this.$store.commit('SET_ROLE', '')
                        delCookie('sessionId')
                        this.$router.push('/')
                    }
                })
            }
      }
    },
    watch: {
        '$route' (to, from) {
            switch (to.path.slice(7)) {
                case 'userList':
                    this.navActive = '1-1'
                    break
                case '/order/add':
                    this.navActive = '2-1'
                    break
                case '/order/list':
                    this.navActive = '2-2'
                    break
                
                case '':
                    this.navActive = ''
                    break
                default:
                    this.navActive = '1-1'
            }
        }
    }
}
</script>

<style scoped lang="stylus">
.el-dropdown {
    line-height: 0;
    padding-top: 30px;
}

.login-name {
    position: absolute;
    top: 20px;
    left: 0;
    line-height: 0;
}

.el-dropdown-link {
    line-height: 0;
}

.profile {
    display: inline-block;
    height: 50px;
    margin-top: 10px;
    vertical-align: top;
}
.profile img {
    border-radius: 50%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
}
.el-menu-vertical-demo {
    height: 100vh;
    border: none;
}
.el-header {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 60px;
}

.el-aside {
    color: #333;
    line-height: 200px;
}

.el-main {
    background-color: #f3f3f4;
    color: #333;
}

body > .el-container {
    margin-bottom: 40px;
}

.backToIndex
    display inline-block
    vertical-align middle
    margin-left 5px
    a
        color #909399

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
} */
</style>
