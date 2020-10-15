// 请在此对象写后端的请求接口列表
export default {

	// dev: 'http://192.168.8.8:8097/',
	// pro: 'http://192.168.8.8:8097/',
	dev: 'http://134.175.151.248:8097/',
	pro: 'http://134.175.151.248:8097/',
	
	//　上传头像地址
	baseLocation: 'https://img.bajiaostar.com/', 
	
	// 七牛
	unloadLocation: 'https://upload.qiniup.com/', 
	get_qiniu_token: "/system/user/get_qiniu_token", // 七牛token
	// Rsa
	publiukey: '-----BEGIN PUBLIC KEY-----'+ 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgT3u4r5d3HH0nFHciSFrKj7bc2cTTpqJwLo5oTrG5EyEiNAho3H4vi5yuBhF/A8Vq64XS3mjAwH1lxWt+yvXNKiDhOKrRUcHVzw/FsUp0AGBjlq+hnXjm7paU9kO1aQo67kM1HbukMuQRhshBJsD5/FsFQHURMPIShIpHEMjUlQIDAQAB' +'-----END PUBLIC KEY-----',
	
	// 百度
	get_baidu_token: "/system/user/get_baidu_token", // 百度token
	/**
	 * 登录
	 */
	login: "/login_no_captche",
	get_user_detail: "/system/user/get_user_detail", // 获取用户信息
	upd_user_info: "/system/user", // 更新用户信息
	upd_pwd: "/upd_pwd", // 忘记密码
	verification_code: "/mobile_verification_code", // 验证码
	
	/**
	 * 我的
	 */
	list_and_task: "/bajiaostar/order/list_and_task" , // 我的任务
	changeJobStatus: "/system/user/changeJobStatus", // 更新用户状态
	clien_list: "/bajiaostar/flow/clien_list", // 积分
	integral_list: "/bajiaostar/ranking/integral_list", // 积分排名
	list_client: "/bajiaostar/evaluate/list_client", // 评价
	upd_cid: "/system/user/upd_cid", // cid
	get_new_version: '/bajiaostar/version/get_new_version',
	/**
	 * 任务
	 */
	list_enum: "/bajiaostar/type/list_enum", // 任务类型
	start_order: "/bajiaostar/order/start_order", // 开始任务
	refuse: "/bajiaostar/order/refuse", // 拒绝任务
	list_and_task_by_id: "/bajiaostar/order/list_and_task_by_id", // 任务详情
	tasklist_client: "/bajiaostar/record/list_client", // 通知列表
	finish_order: "/bajiaostar/order/finish_order", // 完成任务
	order_address_clock_in: "/bajiaostar/order/order_address_clock_in", // 扫码
}
