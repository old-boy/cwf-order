const getters = {
    formatRole: (state) => {
        let role = ''
        switch (state.role) {
            case 0:
                role = '普通用户'
                break
            case 1:
                role = '邮件激活后的用户'
                break
            case 2:
                role = '会计'
                break
            case 3:
                role = '采购'
                break
            case 6:
                role = '国内销售'
                break
            case 8:
                role = '国外销售'
                break
            case 10:
                role = '管理'
                break
            case 50:
                role = '超级管理员'
                break
        }
        return role
    }
}

export default getters
