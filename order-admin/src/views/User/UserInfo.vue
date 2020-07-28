<template>
    <div class="UserInfo">
        <el-row class="source">
        <el-col :span="12">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>员工基本资料</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form ref="userInfoForm" :model="userInfoForm"  :label-width="formLabelWidth">
                    <el-form-item label="上传头像" class="upload-item">
                        <el-upload class="avatar-uploader"
                        action="/users/update/userInfo"
                        :show-file-list="false"
                        :headers="{flag: true}"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="userImageUrl" :src="userImageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="登录帐号">
                        <el-input v-model="userInfoForm.account" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="userInfoForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="职业">
                        <el-input v-model="userInfoForm.job"></el-input>
                    </el-form-item>
                    <el-form-item label="居住地">
                        <el-input v-model="userInfoForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="userInfoForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="userInfoForm.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateInfo">保存</el-button>
                        <el-button type="danger" native-type="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">

import { mapState } from 'vuex'
    export default {
        data () {
            return {
                userInfoForm: {
                    avatar: '',
                    username: '',
                    job: '',
                    address: '',
                    tel: '',
                    email: '',
                    account:''
                },
                userAccount:'',
                userImageUrl: '',
                formLabelWidth: '120px'
            }
        },
        computed: {
            ...mapState([
                    'userId'
                ]),
            userRole () {
                return this.$store.state.userId
            }
        },
        created () {
            this.loadingUserInfo()
            this.loadingUser()
        },
        
        methods: {
            loadingUser(){
                this.$ajax.get(`/users/${this.userId}`).then((res) => {
                    if (res.data.status === '1') {
                        this.userInfoForm.account = res.data.result.account
                    }
                })
            },
            loadingUserInfo () {
                this.userInfoForm.infoId = this.$store.state.infoId
                this.$ajax.get(`/users/userInfo/${this.userInfoForm.infoId}`).then(res => {
                    if (res.data.status === '1') {
                        let formData = res.data.result
                        console.log('formData  ' + formData)
                        this.userImageUrl = formData.avatar
                        this.userInfoForm.username = formData.username
                        this.userInfoForm.job = formData.job
                        this.userInfoForm.address = formData.address
                        this.userInfoForm.tel = formData.tel
                        this.userInfoForm.email = formData.email
                    }
                })
            },
            handleAvatarSuccess (res, file) {
                this.userImageUrl = URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload (file) {
                // const isJPG = file.type === 'image/jpeg'
                this.userInfoForm.avatar = file
                const isLt2M = file.size / 1024 / 1024 < 2

                /* if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                } */
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isLt2M
            },
            updateInfo () {
                this.userInfoForm.infoId = this.$store.state.infoId
                this.$ajax.post(`/users/update/userInfo/${this.userInfoForm.infoId}`, this.userInfoForm).then(res => {
                    console.log(res.data.status)
                    if (res.data.status === '1') {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.$store.commit('SET_USERNAME', res.data.result.username)
                        this.$router.push('/admin/userList')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader {
        /* margin-bottom: 20px; */
    }
    .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        font-size: 28px;
        color: #8c939d;
        width: 78px;
        height: 78px;
        line-height: 178px;
        text-align: center;
    }
    .avatar-uploader-icon:hover {
        border-color: #409EFF;
    }
    .avatar {
        width: 78px;
        height: 78px;
        display: block;
    }
    .upload-item{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 4rem;
    }
</style>
