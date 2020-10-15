<template>
	<view class="login">
		<Status></Status>
		<view class="login-logo">
			<image src="../../static/image/logo.png" mode="aspectFill"></image>
		</view>
		<view class="login-info">
			<view class="login-info-user">
				<u-input v-model="userName" type="text" placeholder = "请输入账号" placeholder-style = "font-size: 14px;color: #969696;" />

			</view>
			<view class="login-info-user">
				<u-input v-model="password" type="password" placeholder = "请输入密码" :password-icon="false" placeholder-style = "font-size: 14px;color: #969696;" />
			</view>
		</view>
		<view class="login-button" role = "button" @click="$u.throttle(login, 500)">登录</view>
		<view class="forget-password" @click="goToForgetPassword">忘记密码</view>
	</view>
</template>

<script>
	 export default {
		 onLoad() {
			 // this.initCid()
			
		 },
		 data () {
			 return {
				 userName: '',
				 password: ''
			 }
		 },
		 methods: {
			// async initCid () {
			// 	let cid = plus.push.getClientInfo().clientid
			// 	let res = await this.$fetch(this.$api.upd_cid, {cid: cid}, "put", 'form')
			// 	console.log(res)
			//  },
			 goToForgetPassword () {
				 uni.navigateTo({
				 	url: './forgetPassword'
				 })
			 },
			async login () {
				 // if (!this.$u.test.mobile(this.userName)) return uni.showToast({icon: 'none', title: '手机号输入有误'})
				 if (this.userName.trim() == '') return uni.showToast({
				 	icon: 'none',
					title: '请先输入账号'
				 })
				 if (this.password.trim() == '') return uni.showToast({
				 	icon: 'none',
					title: '请先输入密码'
				 })
				 
				 let res = await this.$fetch(this.$api.login, {username: this.userName, password: this.password}, "POST", 'JSON')
				 console.log(res)
				 uni.showToast({
				 	icon: 'none',
					title: res.msg
				 })
				 uni.setStorageSync('token', res.token)
				 let cid = plus.push.getClientInfo().clientid
				 let getCid = await this.$fetch(this.$api.upd_cid, {cid: cid}, "put", 'form')
				 console.log(getCid)
				 setTimeout(() => {
					 uni.switchTab({
					 	url: '../index/index'
					 })
				 }, 500)
			 }
			 
		 } 
	 }
</script>

<style lang="less">
	.login{
		.login-logo{
			padding-top: 156rpx;
			text-align: center;
			image{
				width: 242rpx;
				height: 320rpx;
			}
		}
		.login-info{
			padding-top: 106rpx;
			box-sizing: border-box;
			.login-info-user{
				width: 582rpx;
				height: 100rpx;
				background: #F8F8F8;
				border-radius: 4px;
				padding: 30rpx;
				box-sizing: border-box;
				margin: 0 auto;
				display: flex;
				// justify-content: center;
				align-items: center;
				&:nth-child(2){
					margin-top: 30rpx;
				}
			}
		}
		.login-button{
			width: 582rpx;
			height: 100rpx;
			line-height: 100rpx;
			background-image: linear-gradient(180deg, #3EDCDF 0%, #1DB7BC 100%);
			border-radius: 5px;
			font-family: PingFangSC-Semibold;
			font-size: 17px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			margin: 0 auto;
			margin-top: 80rpx;
			box-sizing: border-box;
		}
		.forget-password{
			position: fixed;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #A2A2A2;
			letter-spacing: 0;
			
		}
	}
</style>
